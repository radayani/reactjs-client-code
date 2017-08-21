<<<<<<< HEAD
// --------------------------------------------------------------------------------------------------------------------
// <copyright file="Home.js" company="Microsoft">
//     Microsoft Copyright.
// </copyright>
// <summary>
//   The first page where the user lands as the main url is hit. It redirects the user to the AAD login page if user isn't logged in already.
// </summary>
// <author>
//    Raveena Dayani (radayani)  
// </author>
// --------------------------------------------------------------------------------------------------------------------
=======
>>>>>>> 40367f3dba24eba528a0b47c8cfc4602b4574ca9
import React from 'react';

export default class Home extends React.Component {
    constructor(props) {

        super(props);
    }
<<<<<<< HEAD
    componentWillMount() {
        window.location.replace('http://sfvote.azurewebsites.net/api/login');
    }
    
    render() { return null }
=======
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
>>>>>>> 40367f3dba24eba528a0b47c8cfc4602b4574ca9
}
