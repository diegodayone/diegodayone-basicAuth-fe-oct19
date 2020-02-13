import React from 'react';
import '../App.css';
import { useState } from "react"
import {withRouter} from "react-router-dom"
import {connect} from "react-redux"
import FacebookLoginWithButton from "react-facebook-login"

const mapStateToProps = state => state
const mapDispatchToProps = dispatch => ({
  setUserToken: base64 => dispatch({
    type:"SET_USERBASE64",
    payload: base64
  }) 
})

function LoginComponent(props) {

  const [ username, setUsername] = useState("")
  const [ password, setPassword] = useState("")
  const [ saveCredentials, setSaveCredentials] = useState(false)
  const [ error, setError] = useState(undefined)

  const login = async () => {
    //create my "token" starting from username and password
    //contact the APIs to prove identity
    const resp = await fetch("http://localhost:3451/user/signin",  {
      body: JSON.stringify({
        username,
        password
      }),
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    })

    if (resp.ok){
      const respJson = await resp.json();
      console.log(respJson)
      if (saveCredentials)
        localStorage.setItem("access_token", respJson.access_token)
        
      props.setUserToken(respJson.access_token)
      props.history.push("/profile")
    }
    else{
      //console log
      setError("Username and password incorrect")
      setUsername("")
      setPassword("")
    }
  }

  const facebookLogin = async (fbData) => {
    console.log(fbData)
    if (fbData.accessToken){
      const apiResp = await fetch("http://localhost:3451/user/facebookLogin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          access_token: fbData.accessToken
        })
      })

      if (apiResp.ok){
        const respJson = await apiResp.json()
        localStorage.setItem("access_token", respJson.access_token)
        props.setUserToken(respJson.access_token)
        props.history.push("/profile")
      }
      else{
        console.log(apiResp)
        setError("Some problem with your token!")
      }
    }
    else{
      console.log(fbData)
      setError("Cannot login on facebook ")
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <input type="text" placeholder="username" value={username} onChange={e => setUsername(e.target.value)}></input>
        <input type="password" placeholder="*********" value={password} onChange={e => setPassword(e.target.value)}></input>
        <span>Remember me</span>
        <input type="checkbox" value={saveCredentials} onChange={e => setSaveCredentials(!saveCredentials)}/>
        <input type="button" onClick={login} value="Login"></input>
        {error && <h2>{error}</h2>}
        <FacebookLoginWithButton
          appId="953776218349854"
          fields="name,picture,email"
          icon="fa-facebook"
          callback={facebookLogin}
        />

      </header>
    </div>
  );
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginComponent));
