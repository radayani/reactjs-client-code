// --------------------------------------------------------------------------------------------------------------------
// <copyright file="VerticalMenu.js" company="Microsoft">
//     Microsoft Copyright.
// </copyright>
// <summary>
//   The component on the top right with 3 vertical dots which lets you change of User Mode or Logout of the app 
// </summary>
// <author>
//    Raveena Dayani (radayani)  
// </author>
// --------------------------------------------------------------------------------------------------------------------
import React from 'react';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import { fullWhite } from 'material-ui/styles/colors';
import Divider from 'material-ui/Divider';
import { NavLink } from "react-router-dom";

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';

export default class VerticalMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            // menuItemClicked: false
        }
    }
    handleNavLinkClick() {
        this.setState({ open: !this.state.open }, function () {
            switch (localStorage.userMode) {
                case 'voter':
                    localStorage.setItem("userMode", 'presenter');
                    break;
                case 'presenter':
                    localStorage.setItem("userMode", 'voter');
                    break;
                default: break;
            }
        })


    }
    handleButtonClick() {
        window.location.replace('http://sfvote.azurewebsites.net/api/logout')
    }
    handleOnRequestChange = (value) => {
        this.setState({
            open: value,
        });
    }
    openIconButtonClick() {
        this.setState({ open: true });
    }

    render() {
        return (
            <MuiThemeProvider muiTheme={localStorage.userMode === 'presenter' ? getMuiTheme(darkBaseTheme) : getMuiTheme(lightBaseTheme)}>
                <div>
                    <IconMenu
                        open={this.state.open}
                        iconStyle={{ color: fullWhite }}
                        iconButtonElement={
                            <IconButton onTouchTap={this.openIconButtonClick.bind(this)}  ><MoreVertIcon /></IconButton>
                        }
                        targetOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
                        onRequestChange={this.handleOnRequestChange.bind(this)}
                    >
                        <NavLink to={`/home/${localStorage.myPIN}/userMode/presenter/projects`} style={{ textDecoration: 'none' }} onTouchTap={this.handleNavLinkClick.bind(this)}>
                            {(localStorage.userMode === 'voter') &&
                                <MenuItem value="1" primaryText="Presenter Mode" style={{ color: '#ff1493', textColor: '#ff1493' }} />
                            }
                        </NavLink>

                        <NavLink to={`/home/${localStorage.myPIN}/userMode/voter/vote`} style={{ textDecoration: 'none' }} onTouchTap={this.handleNavLinkClick.bind(this)} >
                            {localStorage.userMode === 'presenter' &&
                                <MenuItem value="2" primaryText="Voter Mode" />
                            }
                        </NavLink>

                        {(localStorage.userMode !== 'presenter' && localStorage.userMode != 'voter') &&
                                <MenuItem value="2" disabled={true} primaryText="User? or Presenter?" />
                            }
                        <Divider />
                        <MenuItem value="3" primaryText="Logout" onTouchTap={this.handleButtonClick.bind(this)} />
                    </IconMenu>
                </div>
            </MuiThemeProvider>
        );
    }
}