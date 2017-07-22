import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import Paper from 'material-ui/Paper';
import { lightBlack, cyan50 } from 'material-ui/styles/colors';
import { NavLink } from "react-router-dom"
import Cookies from 'universal-cookie';
const cookies = new Cookies();

var pin = null;
export default class Home extends React.Component {
    constructor(props) {

        super(props);
    }
     handleLoginButton() {
        // window.location.replace('http://local.skyfonts.com:3002/api/login');


    }
    componentWillMount() {
        //  window.location.replace('http://localhost:3002/api/login')        
        window.location.replace('http://sfvotes.azurewebsites.net/api/login');

        
    }
    render() { return null }
    // render() {
    //     return (
    //         <div>
    //             {console.log(localStorage.length)}
    //             {console.log(cookies)} {console.log(cookies.get('alias'))}

    //             {!cookies.get('alias') &&
    //                 <RaisedButton label="Login" onTouchTap={this.handleLoginButton.bind(this)} />}
    //         </div>
    //     );
    // }
}
