import React, { Component } from "react"
import { Route, Redirect } from "react-router-dom"


const PrivateRoute = ({ component: Component, ...rest}) => (
    <Route {...rest} render={(props) =>
                rest.isAuthenticated 
                ? <Component {...props} />
                : <Redirect to="/login" />
        // {
        //     if (!rest.isAuthenticated)
        //         props.history.push("/login")
        //     return <Component {...props}/>
        // } 

        //yourwebsite.com/recover/?123asidjuidnc1iowuc901wbcaowsciba
        // ==> mongo, recover the user linked to that code 
        // create a new token for that user generateToken({ _id. ....})
    }/>
)

export default PrivateRoute