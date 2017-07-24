import React from 'react';
import AppBarComp from './AppBarComp';
import { Link } from "react-router-dom"

import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import { cyan50, pinkA200, lightBlack, blueGrey800, fullBlack } from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import RaisedButton from 'material-ui/RaisedButton';
import DialogPopFeedback from './DialogPopFeedback';
import DialogPopVote from './DialogPopVote';
import { NavLink } from "react-router-dom"
const style = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '..', height: '..' }
const style2 = { paddingTop: 5, display: 'flex', justifyContent: 'center', alignItems: 'center', width: '..', height: '..' }


export default class FooterContent extends React.Component {
    render() {
        return (
            <div>
                <div style={style}>
                    <img src='/imgs/Microsoft_footer_logo.png' />
                    <span style={{ color: blueGrey800 }}>©2017 Microsoft</span>
                    <img src='/imgs/TheGarage_logo_small.png' />
                </div>
                <div style={style2}>
                    <span style={{ color: blueGrey800 }}> Microsoft Confidential</span>
                    <span style={{ color: fullBlack }} >&nbsp;|&nbsp;</span>

                    <span style={{ color: blueGrey800 }}><a style={{ color: blueGrey800, textDecoration: 'none' }} target="_blank" href='https://privacy.microsoft.com/en-gb/privacystatement'>Privacy</a> </span>
                    <span style={{ color: fullBlack }}>&nbsp;|&nbsp;</span>

                    <span style={{ color: blueGrey800 }}>                    <a style={{ color: blueGrey800, textDecoration: 'none' }} target="_blank" href='https://www.microsoft.com/EN-US/privacystatement/DPN/Default.aspx'>Protection</a></span>
                    <span style={{ color: fullBlack }}>&nbsp;|&nbsp;</span>

                    <span style={{ color: blueGrey800 }}>                    <a style={{ color: blueGrey800, textDecoration: 'none' }} target="_blank" href='https://garagehackbox.azurewebsites.net/msft/policies'>Policies</a> </span>
                </div>
            </div>
        );
    }
}