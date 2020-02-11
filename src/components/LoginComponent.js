import React from 'react';
import '../App.css';
import { useState } from "react"

function LoginComponent(props) {

  const [ username, setUsername] = useState("")
  const [ password, setPassword] = useState("")
  const [ error, setError] = useState(undefined)

  const login = async () => {
    //create my "token" starting from username and password
    //contact the APIs to prove identity
    const base64usernameAndPassword = btoa(username + ":" + password);
    const resp = await fetch("http://localhost:3500/testauth", {
      headers: {
        "Authorization": "Basic " + base64usernameAndPassword
      }
    })

    if (resp.ok){
      const respJson = await resp.json();
      console.log(respJson)
      props.setUserAuth(base64usernameAndPassword)
    }
    else{
      //console log
      setError("Username and password incorrect")
      setUsername("")
      setPassword("")
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <input type="text" placeholder="username" value={username} onChange={e => setUsername(e.target.value)}></input>
        <input type="password" placeholder="*********" value={password} onChange={e => setPassword(e.target.value)}></input>
        <input type="button" onClick={login} value="Login"></input>
        {error && <h2>{error}</h2>}
      </header>
    </div>
  );
}

export default LoginComponent;
