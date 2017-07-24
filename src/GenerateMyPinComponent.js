import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import Paper from 'material-ui/Paper';
import { lightBlack, cyan50, fullWhite } from 'material-ui/styles/colors';
import { NavLink } from "react-router-dom";
import AppBarComp from './AppBarComp';
import FaArrowRight from 'react-icons/lib/fa/arrow-right';
// import CopyToClipboard from 'react-copy-to-clipboard';
import Cookies from 'universal-cookie';
import shortid from 'shortid';
const style = {
    paper: {
        marginTop: 8,
        width: 250,

        padding: 5,
        textAlign: 'center',
        display: 'inline-block',
        marginBottom: 20
    },
    button: {
        backgroundColor: cyan50,
        marginBottom: 20,
        height: 60,
    },
    innerPaper: {
        width: 230,
        padding: 10,
        textAlign: 'center',
        display: 'inline-block'
    },
    pinSpan: {
        padding: 10,
        textAlign: 'center',
        display: 'inline-block'
    },
    msgPaper: {
        width: 230,
        marginTop: 20,
        padding: 8
        ,
        textAlign: 'center',
        display: 'inline-block'
    }
};


const cookies = new Cookies();
export default class GenerateMyPinComponent extends React.Component {
    constructor(props) {
        localStorage.setItem("alias", cookies.get('alias'));
        if (cookies.get('myPIN')) {
            // console.log("PIN WAS ALREADY SET");
            localStorage.setItem("myPIN", cookies.get('myPIN'));
        }
        super(props);
        // console.log(this.props.pin);
        // console.log("cookie my pin: ");
        // console.log(cookies.get('myPIN'));

        // console.log("PIN generation comp costructor called" + localStorage);
        this.state = {
            // copied: false,
            // myPIN: cookies.get('myPIN'),
            open: false
        };



        // if (localStorage.alias !== this.props.match.params.alias) {
        //     localStorage.setItem("alias", this.props.match.params.alias);
        // }
    }

    componentWillMount() {
        // console.log(" pin: " + this.state.myPIN);

    }
    componentDidMount() {
        // localStorage.setItem("alias", this.props.match.params.alias);
        // console.log(this.state.myPIN);



    }
    handleRequestClose = () => {
        this.setState({
            open: false,
        });
    };

    // onCopy() {
    //     this.setState({ copied: true });
    // }

    handleButtonClick() {
        // console.log(localStorage.myPIN + " thinking");
        if (!localStorage.myPIN) {
            // console.log(localStorage.myPIN + " entered");
            var x = shortid();
            // LIMITATION WITH SHORTID NPM PACKAGE - THIS PIN CANT GO IN URL ??????
            // https://www.npmjs.com/package/shortid HERE IT SAYS IT IS URL FRIENDLY - BUT I GOT A '/' IN THE ID - dangerous 
            x = x.replace('/', 'x');
            x = x.replace('?', 'x');
            x = x.replace('#', 'x');

            fetch(`/api/savePin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',

                },
                body: JSON.stringify({
                    'alias': localStorage.alias,
                    'unique_pin': x
                })
            })
                .then(function (response) {

                    if (response.status !== 200) {
                        // console.log('Looks like there was a problem. Status Code: ' +
                            // response.status);
                        return;
                    }

                })
                .then(
                // cookies.set('myPIN', x),
                localStorage.setItem("myPIN", x),
                this.setState({ myPIN: x })
                )
                .catch(function (err) {
                    console.log('Fetch Error :-S', err);
                })



        }

        // this.setState({ myPIN: localStorage.myPIN });
    }
    render() {
        // { console.log("render..") }
        return (
            <div>
                {localStorage.length > 0 &&
                    <div className="App-header">
                        <AppBarComp />
                    </div>
                }
                <Paper style={style.paper} zDepth={3} >
                    <Paper zDepth={1} style={style.innerPaper}>
                        To cast your votes <br /> <b>directly at the booths</b> <br />during Science Fair.
                    </Paper>
                    <br />
                    <br />

                    {(!localStorage.myPIN || localStorage.myPIN == undefined)
                        &&
                        <RaisedButton label="Generate My PIN" primary={true} style={style.button} onTouchTap={this.handleButtonClick.bind(this)} />
                    }

                    {localStorage.myPIN != undefined &&
                        <div>
                            <RaisedButton
                                label="Generate My PIN"
                                disabled={true}
                                primary={true}
                                style={style.button}
                                onTouchTap={this.handleButtonClick.bind(this)} />

                            <Snackbar
                                open={this.state.open}
                                message="Successfully generated your unique PIN!"
                                autoHideDuration={1000}
                                onRequestClose={this.handleRequestClose}
                                style={{ background: lightBlack }} />
                            <br />

                            <span style={style.pinSpan}><b>{localStorage.myPIN}</b></span>
                            <Paper zDepth={1} style={style.msgPaper}>
                                You'll need this <b>Voter's Code</b>!<br /> <br />No need to remember, <br /> you'll find your code in the menu on top left
                            </Paper>

                        </div>
                    }
                </Paper>
                <br />

                {
                    localStorage.myPIN != null
                    &&
                    <NavLink to={`/home/${localStorage.myPIN}/userMode`}>
                        {// <NavLink to={`home/${this.props.match.url}/${localStorage.myPIN}/userMode`}>
                        }
                        <RaisedButton label="Continue" labelPosition='before' primary={true}><FaArrowRight style={{color:fullWhite}}/></RaisedButton>
                    </NavLink>}
            </div>
        );


    }
}


