import React from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"

const mapStateToProps = state => state
const mapDispatchToProps = dispatch => ({
    setUserToken: base64 => dispatch({
      type:"SET_USERBASE64",
      payload: base64
    }) 
  })
  

class CallbackComponent extends React.Component{

    componentDidMount = () => {
        const search = document.location.search;
        if (search && search.includes("access_token")){
            const accessToken = search.split("=")[1];
            this.props.setUserToken(accessToken)
            localStorage.setItem("access_token", accessToken)
            this.props.history.push("/profile")
        }
    }

    render () {
        return (<div>Loading...</div>)
    }

}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CallbackComponent))