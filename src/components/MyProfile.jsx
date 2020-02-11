import React from "react"
import { connect} from "react-redux"

const mapStateToProps = state => state

class MyProfile extends React.Component {

    state= {
        user: undefined
    }

    render(){
        return <div>
            I'm authorized
            {this.state.user && <h2>Hey i'm {this.state.user.username} and I'm {this.state.user.role}</h2> }
        </div>
    }

    componentDidMount = async () =>{
        const user = await fetch("http://localhost:3500/testauth", {
            headers: {
                "Authorization": "Basic " + this.props.userToken
            }
        })

        const userJson = await user.json();
        this.setState({ user: userJson})
    }

}

export default connect(mapStateToProps)(MyProfile)