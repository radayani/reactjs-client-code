import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import Paper from 'material-ui/Paper';
import { lightBlack, cyan50 } from 'material-ui/styles/colors';
import { NavLink } from "react-router-dom"

var pin = null;
export default class Home extends React.Component {
    constructor(props) {

        super(props);
        localStorage.clear();
        localStorage.setItem("alias", this.props.alias);
    }
    handleLoginButton() {
        // window.location.replace('http://local.skyfonts.com:3002/api/login');
        window.location.replace('http://sfvotes.azurewebsites.net/api/login');
        
    }

    render() {
        return (
            // <NavLink to={`/user/${this.props.alias}`} >
            <RaisedButton label="Login" onTouchTap={this.handleLoginButton.bind(this)} />
            // </NavLink>
        );
    }
}
