import React from "react"
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom"
import LoginComponent from "./LoginComponent"
import MyProfile from "./MyProfile"
import PrivateRoute from "./PrivateRoute"

class MainComponent extends React.Component {
    state = {
        userAuth: undefined
    }
    render(){
        return (
        <Router>
            <h1> whatever</h1>
            <Link to="/login">Login</Link>
            <Link to="/profile">Profile</Link>
            <Switch>
                <Route path="/login">
                    <LoginComponent setUserAuth={(userAuth) => this.setState({ userAuth: userAuth})}></LoginComponent>
                </Route>
                <PrivateRoute isAuthenticated={this.state.userAuth} path="/profile" component={MyProfile}/>
            </Switch>
        </Router>)
    }

}

export default MainComponent