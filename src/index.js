<<<<<<< HEAD
// --------------------------------------------------------------------------------------------------------------------
// <copyright file="index.js" company="Microsoft">
//     Microsoft Copyright.
// </copyright>
// <summary>
//   The main start file of the react application which tells where to start looking for the react components
// </summary>
// <author>
//    Raveena Dayani (radayani)  
// </author>
// --------------------------------------------------------------------------------------------------------------------
=======
>>>>>>> 40367f3dba24eba528a0b47c8cfc4602b4574ca9
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

ReactDOM.render(<App name="reactjs"  />, document.getElementById('root'));
registerServiceWorker();
