import React from 'react';

export default class Home extends React.Component {
    constructor(props) {

        super(props);
    }
     handleLoginButton() {
        // window.location.replace('http://local.skyfonts.com:3002/api/login');


    }
    componentWillMount() {
        window.location.replace('http://sfvote.azurewebsites.net/api/login');
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
