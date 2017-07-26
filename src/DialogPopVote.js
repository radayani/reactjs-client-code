import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import Snackbar from 'material-ui/Snackbar';
import Paper from 'material-ui/Paper';
import AppBarComp from './AppBarComp';
import TextField from 'material-ui/TextField';
import FooterContent from './FooterContent';
import FaCheck from 'react-icons/lib/fa/check';
import { pinkA200, pink50, redA700, fullWhite, green500, grey500 } from 'material-ui/styles/colors';
import CircularProgress from 'material-ui/CircularProgress';


const styles = {
    block: {
        maxWidth: 250,
        textAlign: 'left'
    },

    margins: {
        margin: 10,
        verticalAlign: true,
        width: 300,
        paddingRight: 100,
        padding: 5,
        marginBottom: 0,
        display: 'inline-block',

    }
}
export default class DialogPopVote extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            voteSaved: false,
            snackbarOpen: false,
            invalidProjectSelected: false,
            alreadyVoted: false,
            chosenProjectTitle: '',
            voterAlias: null,
            voterPin: null,
            incompleteDetails: false,
            pinValidated: false
        };
    }

    handleRequestClose() {
        this.setState({ snackbarOpen: false, incompleteDetails: false, });
    }


    handleBroadWinVoteButton() {
        // console.log(this.state.incompleteDetails + " incomp details ???? broad");

        // if (!this.state.voterPin || !this.state.voterAlias) {
        //     this.setState({ snackbarOpen: true, incompleteDetails: true, });
        // }
        // else {
            fetch(`/api/castVote?id=${this.props.presenterSelectedProjId}&alias=${this.state.voterAlias}`, {

                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',

                }
            })
                .then(function (response) {

                    if (response.status !== 200) {
                        // console.log('Looks like there was a problem. Status Code: ' +
                        // response.status);
                        return;
                    }


                    // Examine the text in the response  
                    // response.json()
                    // .then(function (data) {
                    //   console.log(data);  
                    //   projs=data;
                    //   console.log(projs);
                    // });
                }
                )
                .then(this.setState({ successfullySavedVote: true, voteSaved: true, snackbarOpen: true, incompleteDetails: false, voterAlias: null, voterPin: null, pinAdded: false, aliasAdded: false, pinValidated: false }))
                .catch(function (err) {
                    console.log('Fetch Error :-S', err);
                });

        // }


        // this.setState({ voteSaved: true, snackbarOpen: true, incompleteDetails: true, });
        // CALL API TO SAVE THIS VOTE
    }

    handleNarrowWinVoteButton() {
        // console.log(this.state.incompleteDetails + " incomp details ????");

        if (!this.state.voterPin || !this.state.voterAlias) {
            this.setState({ snackbarOpen: true, incompleteDetails: true, });
        }
        else {
            fetch(`/api/castVote?id=${this.props.match.params.projId}&alias=${this.state.voterAlias}`, {

                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',

                }
            })
                .then(function (response) {

                    if (response.status !== 200) {
                        // console.log('Looks like there was a problem. Status Code: ' +
                        // response.status);
                        return;
                    }


                    // Examine the text in the response  
                    // response.json()
                    // .then(function (data) {
                    //   console.log(data);  
                    //   projs=data;
                    //   console.log(projs);
                    // });
                }
                )
                .then(this.setState({ successfullySavedVote: true, voteSaved: true, snackbarOpen: true, incompleteDetails: false, voterAlias: null, voterPin: null, pinAdded: false, aliasAdded: false }))
                .catch(function (err) {
                    console.log('Fetch Error :-S', err);
                });


        }

        // CALL API TO SAVE THIS VOTE
    }
    // handleSearchUpdate(searchText, dataSource, params) {
    //     this.setState({ searchedText: searchText });
    // }

    handleClose() {
        if (this.props.votepageOpen)
            this.props.onCloseCallback();
        else
            this.props.history.goBack();
    }

    componentDidMount() {
        // console.log("PROPS TITLE" + this.props.votepageOpen);
        if (!this.props.votepageOpen) {
            fetch(`/api/projectTitle?id=${this.props.match.params.projId}`, {

                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',

                }
            })
                .then(res => res.json())
                .then(chosenProjectTitle => this.setState({ chosenProjectTitle }
                    // , function () { console.log(chosenProjectTitle + " render now please..") }
                ))
                .catch(function (err) {
                    console.log('Fetch Error :-S', err);
                });
        }
    }

    handlePinUpdate(event, newValue) {
        // console.log("pin validated");
        // console.log(this.state.pinValidated);
        this.setState({ voterPin: newValue, pinAdded: true });
        if (newValue.length > 6) {
            fetch(`/api/validatePin?alias=${this.state.voterAlias}&pin=${newValue}`)
                .then(res => res.json())
                .then(pinValidated => this.setState({ pinValidated }, function () { console.log(pinValidated) }))

                .catch(function (err) {
                    console.log('Fetch Error :-S', err);
                });


        }
        else console.log("still invalid");

    }
    handleAliasUpdate(event, newValue) {
        this.setState({ voterAlias: newValue, });
    }

    render() {
        if (this.props.votepageOpen) {
            const presenterActions = [
                <div>
                    <FlatButton
                        label="Close"
                        secondary={true}
                        onTouchTap={this.handleClose.bind(this)}
                    />
                    <FlatButton
                        label="Vote"
                        disabled={!this.state.pinValidated}
                        secondary={true}
                        keyboardFocused={true}
                        onTouchTap={this.handleBroadWinVoteButton.bind(this)}
                    />
                </div>
            ];

            return (
                <div className="content">
                    <div className="App-footer" style={{ backgroundColor: pink50 }}>
                        <FooterContent />
                    </div>
                    <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)} >
                        <Dialog
                            title={this.props.presenterSelectedProj}
                            actions={presenterActions}
                            modal={true}
                            open={this.props.votepageOpen}
                            autoScrollBodyContent={false}
                            onRequestClose={this.handleClose.bind(this)}>

                            <div className='newline'>
                                <TextField

                                    floatingLabelFocusStyle={{ color: pinkA200 }}
                                    underlineFocusStyle={{ borderColor: pinkA200 }}
                                    disabled={false}
                                    id="alias-field"
                                    floatingLabelText="Alias"
                                    style={{ margin: 2 }}
                                    onChange={this.handleAliasUpdate.bind(this)} />

                                <div className='sameline'>
                                    <TextField
                                        floatingLabelFocusStyle={{ color: pinkA200 }}
                                        underlineFocusStyle={{ borderColor: pinkA200 }}
                                        disabled={false}
                                        id="pin-field"
                                        floatingLabelText="Your Voter Code"
                                        style={{ margin: 2 }}
                                        onChange={this.handlePinUpdate.bind(this)} />
                                    {this.state.pinValidated ? <FaCheck style={{ color: green500 }} /> : null}
                                    {!this.state.pinValidated && this.state.pinAdded ? <CircularProgress size={20} thickness={4} style={{ color: grey500 }}/> : null}
                                </div>

                                <TextField
                                    floatingLabelFocusStyle={{ color: pinkA200 }}
                                    underlineFocusStyle={{ borderColor: pinkA200 }}
                                    disabled={false}
                                    id="project-field"
                                    floatingLabelText={this.props.presenterSelectedProj}
                                    disabled={true}
                                    style={{ margin: 2 }} />

                            </div>
                            {this.state.incompleteDetails && !this.state.voteSaved &&
                                <Snackbar
                                    style={{ width: 260 }}
                                    open={this.state.snackbarOpen}
                                    message={"Alias or Voter Code Invalid"}
                                    contentStyle={{ color: fullWhite }}

                                    autoHideDuration={1000}
                                    bodyStyle={{ backgroundColor: redA700 }}
                                    onRequestClose={this.handleRequestClose.bind(this)} />}

                            {!this.state.incompleteDetails && this.state.voteSaved
                                &&
                                <Snackbar
                                    style={{ width: 260 }}
                                    open={this.state.snackbarOpen}
                                    message="Vote Saved Successfully!"
                                    autoHideDuration={1000}
                                    onRequestClose={this.handleRequestClose.bind(this)} />}
                        </Dialog>
                    </MuiThemeProvider>
                </div>
            );
        }
        return (
            <div className="content">
                <div className="App-footer" style={{ backgroundColor: pink50 }}>
                    <FooterContent />
                </div>
                {localStorage.length > 0 &&
                    <div className="App-header">
                        <AppBarComp />
                    </div>
                }
                <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)} >
                    <Paper zDepth={1} style={styles.margins}>
                        <div style={{ marginTop: 10 }}><b>{this.state.chosenProjectTitle}</b>

                            <div className='newline'>
                                <TextField

                                    floatingLabelFocusStyle={{ color: pinkA200 }}
                                    underlineFocusStyle={{ borderColor: pinkA200 }}
                                    disabled={false}
                                    id="alias-field"
                                    floatingLabelText="Alias"
                                    onChange={this.handleAliasUpdate.bind(this)}
                                    style={{ margin: 2 }} />
                                <div className='sameline'>

                                    <TextField
                                        floatingLabelFocusStyle={{ color: pinkA200 }}
                                        underlineFocusStyle={{ borderColor: pinkA200 }}
                                        disabled={false}
                                        id="pin-field"
                                        floatingLabelText="Your Voter Code"
                                        onChange={this.handlePinUpdate.bind(this)}
                                        style={{ margin: 2 }} />
                                   {this.state.pinValidated ? <FaCheck style={{ color: green500 }} />: null}
                                   {!this.state.pinValidated && this.state.pinAdded ?<CircularProgress size={20} thickness={4} style={{ color: grey500 }}/>: null}
                                </div>
                                <TextField
                                    floatingLabelFocusStyle={{ color: pinkA200 }}
                                    underlineFocusStyle={{ borderColor: pinkA200 }}
                                    disabled={false}
                                    id="project-field"
                                    floatingLabelText={this.state.chosenProjectTitle}
                                    disabled={true}
                                    style={{ margin: 2 }} />
                                <div className='sameline' style={{ marginTop: 30 }}>

                                    <FlatButton
                                        label="Close"
                                        secondary={true}
                                        onTouchTap={this.handleClose.bind(this)} />

                                    <FlatButton
                                        label="Vote"
                                        disabled={!this.state.pinValidated}

                                        secondary={true}
                                        keyboardFocused={true}
                                        onTouchTap={this.handleNarrowWinVoteButton.bind(this)} />

                                </div>

                                {this.state.incompleteDetails && !this.state.voteSaved &&
                                    <Snackbar
                                        open={this.state.snackbarOpen}
                                        message={"Alias or Voter Code Invalid"}
                                        contentStyle={{ color: fullWhite }}
                                        autoHideDuration={1000}
                                        bodyStyle={{ backgroundColor: redA700 }}
                                        onRequestClose={this.handleRequestClose.bind(this)} />}

                                {!this.state.incompleteDetails && this.state.voteSaved &&
                                    <Snackbar
                                        open={this.state.snackbarOpen}
                                        message={"Vote Saved Successfully!"}
                                        bodyStyle={{ backgroundColor: pinkA200 }}
                                        contentStyle={{ color: fullWhite }}

                                        autoHideDuration={1000}
                                        onRequestClose={this.handleRequestClose.bind(this)} />}
                            </div>
                        </div>
                    </Paper>
                </MuiThemeProvider>
            </div>
        );
    }
}
