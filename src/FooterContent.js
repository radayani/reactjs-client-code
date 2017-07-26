import React from 'react';
import { blueGrey800, fullBlack } from 'material-ui/styles/colors';
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

                    <span style={{ color: blueGrey800 }}><a style={{ color: blueGrey800, textDecoration: 'none' }} target="_blank" href='https://privacy.microsoft.com/en-gb/privacystatement' rel="noopener noreferrer" >Privacy</a> </span>
                    <span style={{ color: fullBlack }}>&nbsp;|&nbsp;</span>

                    <span style={{ color: blueGrey800 }}>                    <a style={{ color: blueGrey800, textDecoration: 'none' }} target="_blank" href='https://www.microsoft.com/EN-US/privacystatement/DPN/Default.aspx' rel="noopener noreferrer" >Protection</a></span>
                    <span style={{ color: fullBlack }}>&nbsp;|&nbsp;</span>

                    <span style={{ color: blueGrey800 }}>                    <a style={{ color: blueGrey800, textDecoration: 'none' }} target="_blank" href='https://garagehackbox.azurewebsites.net/msft/policies' rel="noopener noreferrer" >Policies</a> </span>
                </div>
            </div>
        );
    }
}