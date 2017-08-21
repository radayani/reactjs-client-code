// --------------------------------------------------------------------------------------------------------------------
// <copyright file="NotFound.js" company="Microsoft">
//     Microsoft Copyright.
// </copyright>
// <summary>
//   The page component which should get displayed if user is visiting a page which doesn't exist
// </summary>
// <author>
//    Raveena Dayani (radayani)  
// </author>
// --------------------------------------------------------------------------------------------------------------------
import React from 'react';

const NotFound = () => (
  <div className="main-content not-found">
    <i className="material-icons icn-error"/>
    <h2>Page Not Found</h2>
  </div>
);

export default NotFound;