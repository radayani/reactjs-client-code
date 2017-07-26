import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

export default class LoginPage extends React.Component {

    handleButtonClick(){
        fetch('/login') 
        .then(respose => respose.json());
    }
    render(){
        return(
            <RaisedButton label="login" onTouchTap={this.handleButtonClick.bind(this)}/>
        );
    }
}