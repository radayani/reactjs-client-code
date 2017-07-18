import React, { Component } from 'react';
import axios from 'axios';
import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom"
import Checkbox from 'material-ui/Checkbox';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { cyan100, redA700, green700, grey100 } from 'material-ui/styles/colors';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import GenerateMyPinComponent from './GenerateMyPinComponent';
import UserModeComponent from './UserModeComponent';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
// import MyProjectsCards from './MyProjectsCards';
import MyVotedProjectsCards from './MyVotedProjectsCards';
import MyRegisteredProjectsCards from './MyRegisteredProjectsCards';
import SearchFilterComponent from './SearchFilterComponent';
import DialogPopFeedback from './DialogPopFeedback';
import DialogPopVote from './DialogPopVote';
import Cookies from 'universal-cookie';
import LoginPage from './LoginPage';
import Paper from 'material-ui/Paper';
import Home from './Home';
import AutoComplete from 'material-ui/AutoComplete';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import Snackbar from 'material-ui/Snackbar';

const cookies = new Cookies();


const styles = {
    // block: {
    //     maxWidth: 390,
    // },
    // radioButton: {
    //     marginTop: 15,

    //     textAlign: 'left'
    // },
    margins: {
        width: 310,
        marginTop: 8,
        padding: 10,
        display: 'inline-block',
        marginBottom: 20,

    },
    customWidth: {
        width: 300,
    },
    // registerButton: {
    //     backgroundColor: cyan100,
    //     marginRight: 30,
    // },
};




const dataSourceConfig = {
    text: 'title',
    value: 'id',
};
var projs = null;
export default class RegisterComp extends Component {
    constructor(props) {
        localStorage.setItem("alias", cookies.get('alias'));
        super(props);
        this.state = {
            venueListOpen: false,
            venueValue: -1,
            projectValue: -1,
            projects: [],
            venues: null,
            chosenProjs: null,
            registered: false,
            alreadyRegistered: false,
            snackbarOpen: false,
            options: [
                { label: "CSS", value: "css" },
                { label: "HTML", value: "html" },
                { label: "JavaScript", value: "js" },
                { label: "Ruby on Rails", value: "ror" },
            ],
            selectFieldName: "my-select",
            selectPlaceholder: "Choose some options...",
        }
        console.log(this.state.projects + "projects");
    }

    onChange = function (obj) {
        console.log("EVENT", obj.event); // "added" or "removed" 
        console.log("ITEM", obj.item);   // item that has been added/removed { label: '...', value: '...' } 
        console.log("VALUE", obj.value); // [{label: '...', value: '...'}, {label: '...', value: '...'}] 
    }

    updateDimensions() {
        if (window.innerWidth < 400) {
            this.setState({ deviceWindow: 'narrowWindow' }, function () { console.log("device window set, rerender...") });
        }
        else {
            this.setState({ deviceWindow: 'broadWindow' }, function () { console.log("device window set, rerender...") });
        }
    }
    componentDidMount() {


        this.updateDimensions();
        window.addEventListener("resize", this.updateDimensions.bind(this));

    }

    // componentWillReceiveProps() {

    //     fetch(`http://localhost:3002/api/getMyUnRegProjects?alias=${localStorage.alias}`, {

    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Accept': 'application/json',

    //         }
    //     }).then(res => res.json())
    //     .then(projects => this.setState({ projects }, function () { console.log(projects + "votedProjects set.. should be able to render the change now") }));

    // }
    componentWillMount() {
        fetch(`/api/getMyUnRegProjects?alias=${localStorage.alias}`, {

            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',

            }
        })
            .then(res => res.json())
            .then(projects => this.setState({ projects }, function () { console.log(projects + "votedProjects set.. should be able to render the change now") }));


    }

    componentWillUpdate() {
        console.log("will update");
    }
    handleRequestClose = () => {
        this.setState({
            snackbarOpen: false,
            projectValue: -1,
            venueValue: -1,
            registered: false
        });

        fetch(`/api/getMyUnRegProjects?alias=${localStorage.alias}`, {

            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',

            }
        })
            .then(res => res.json())
            .then(projects => this.setState({ projects }, function () { console.log(projects + "votedProjects set.. should be able to render the change now") }));


    };

    handleProjectSelection(event, index, value) {
        console.log(event + " " + index + " " + value);
        this.setState({ projectValue: value });
    }
    handleVenueSelection(event, index, value) {
        console.log(event + " " + index + " " + value);
        this.setState({ venueValue: value });

    }
    handleRegistrationButton() {
        if (this.state.projectValue != -1 && this.state.venueValue != -1) {
            fetch(`http://localhost:3002/api/registerProject`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',

                },
                body: JSON.stringify({
                    'alias': localStorage.alias,
                    'venue_id': this.state.venueValue,
                    'projects': this.state.projectValue
                })

            })
                .then(function (response) {

                    if (response.status !== 200) {
                        console.log('Looks like there was a problem. Status Code: ' +
                            response.status);
                        return;
                    }

                    // Examine the text in the response  
                    response.json()
                        .then(function (data) {
                            console.log(data);
                            projs = data;
                            console.log(projs);
                        });
                }).then(this.setState({ registered: true, snackbarOpen: true }))
                // .then(this.forceUpdate())
                .catch(function (err) {
                    console.log('Fetch Error :-S', err);
                });



        }

    }
    render() {
        console.log("render" + this.state.projects);
        return (
            <div >
                <Paper zDepth={1} style={styles.margins}>
                    <h3 style={{ marginTop: 10, textAlign: 'center' }}><b>Resgistration</b></h3>

                    <DropDownMenu
                        style={styles.customWidth}
                        value={this.state.projectValue}
                        onChange={this.handleProjectSelection.bind(this)}
                        autoWidth={true}
                    >
                        <MenuItem value={-1} primaryText="Select Project to Register" />
                        {this.state.projects.map(function (elem, i) {
                            return (
                                <MenuItem value={elem.id} primaryText={elem.name} key={i} />
                            );
                        }, this)}


                    </DropDownMenu>

                    <br />
                    <br />

                    <DropDownMenu
                        style={styles.customWidth}
                        value={this.state.venueValue}
                        onChange={this.handleVenueSelection.bind(this)}
                        autoWidth={true}
                    >
                        <MenuItem value={-1} primaryText="Demo Booth Venue Preference" />
                        <MenuItem value={101} primaryText="Hyderabad: MPR B1" />
                        <MenuItem value={102} primaryText="Hyderabad: MPR B2" />
                        <MenuItem value={103} primaryText="Hyderabad: B1B2 Lane LG" />
                        <MenuItem value={104} primaryText="Hyderabad: MPR B3" />
                        <MenuItem value={105} primaryText="Hyderabad: B3 Lobby" />

                    </DropDownMenu>
                    <br /><br /><br />
                    <RaisedButton label="Register" onTouchTap={this.handleRegistrationButton.bind(this)} />
                </Paper>
                {this.state.projectValue == -1 && this.state.registered
                    &&
                    <Snackbar
                        style={{ width: 300 }}
                        open={this.state.snackbarOpen}
                        message="Please Select a Project!"
                        autoHideDuration={1000}
                        bodyStyle={{ backgroundColor: redA700 }}

                        onRequestClose={this.handleRequestClose.bind(this)} />
                }

                {this.state.venueValue == -1 && this.state.registered
                    &&
                    <Snackbar
                        style={{ width: 300 }}
                        open={this.state.snackbarOpen}
                        message="Please Provide Booth Venue Preference!"
                        autoHideDuration={1000}
                        bodyStyle={{ backgroundColor: redA700 }}

                        onRequestClose={this.handleRequestClose.bind(this)} />
                }
                {this.state.projectValue != -1 && this.state.venueValue != -1 && this.state.registered
                    &&
                    <Snackbar
                        style={{ width: 300 }}
                        open={this.state.snackbarOpen}
                        message="Registered Project Successfully!"
                        autoHideDuration={1000}
                        bodyStyle={{ backgroundColor: green700 }}

                        onRequestClose={this.handleRequestClose.bind(this)} />
                }
            </div>



        );
    }
}