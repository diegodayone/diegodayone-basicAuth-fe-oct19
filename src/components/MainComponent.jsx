import React from "react"
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom"
import LoginComponent from "./LoginComponent"
import MyProfile from "./MyProfile"
import PrivateRoute from "./PrivateRoute"
import RegisterComponent from "./RegisterComponent"
import { connect } from "react-redux"

const mapStateToProps = state => state
const mapDispatchToProps = dispatch => ({
    setUserToken: base64 => dispatch({
      type:"SET_USERBASE64",
      payload: base64
    }) 
  })
  

class MainComponent extends React.Component {
    // state = {
    //     userAuth: undefined
    // }
    render(){
        return (
        <Router>
            <h1> Welcome to our app! Ready to login or register!</h1>
            <div style={{ display: "flex", justifyContent: "space-evenly"}}>
                <Link to="/register">Register</Link>
                <Link to="/login">Login</Link>
                <Link to="/profile">Profile</Link>
            </div>
            <Switch>
                <Route path="/register">
                    <RegisterComponent  /> 
                    {/* setUserAuth={(userAuth) => this.setState({ userAuth: userAuth})} */}
                </Route>
                <Route path="/login">
                    <LoginComponent />
                    {/* setUserAuth={(userAuth) => this.setState({ userAuth: userAuth})} */}
                </Route>
                <PrivateRoute isAuthenticated={this.props.userToken} path="/profile" component={MyProfile}/>
            </Switch>
        </Router>)
    }

    componentDidMount = () => {
        const currentBase64 = localStorage.getItem("userBase64")
        if (currentBase64)
            this.props.setUserToken(currentBase64)
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(MainComponent)