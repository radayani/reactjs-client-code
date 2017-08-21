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
import React from 'react';

export default class Home extends React.Component {
    constructor(props) {

        super(props);
    }
    componentWillMount() {
        window.location.replace('http://sfvote.azurewebsites.net/api/login');
    }
    
    render() { return null }
}
