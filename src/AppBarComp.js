<<<<<<< HEAD
// --------------------------------------------------------------------------------------------------------------------
// <copyright file="AppBarComp.js" company="Microsoft">
//     Microsoft Copyright.
// </copyright>
// <summary>
//   The app bar component on the top in place of the header which holds the menu icons
// </summary>
// <author>
//    Raveena Dayani (radayani)  
// </author>
// --------------------------------------------------------------------------------------------------------------------
=======
>>>>>>> 40367f3dba24eba528a0b47c8cfc4602b4574ca9
import React from 'react';
import AppBar from 'material-ui/AppBar';
import BadgeOnVoteIcon from './BadgeOnVoteIcon';
import { darkBlack } from 'material-ui/styles/colors';
import VerticalMenu from './VerticalMenu';

const style = {
    paddingTop: 15,
    marginTop: 0,
    backgroundColor: darkBlack,
    height: 80,
    paddingLeft: 0
}
export default class AppBarComp extends React.Component {
    render() {
        // if (localStorage.myPIN != null && localStorage.userMode != null && localStorage.alias != null) {
        if (localStorage.alias != null) {
            return (
                <AppBar
                    style={style}
                    title="Science Fair Voting"
                    iconElementRight={<VerticalMenu />}
                    iconElementLeft={<BadgeOnVoteIcon />} />
            );
        }
        return (
            <AppBar
                style={style}
                title="Science Fair Voting"
                showMenuIconButton={false} />
        );
    }
}