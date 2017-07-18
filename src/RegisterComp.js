import React, { Component } from 'react';
import axios from 'axios';
import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom"
import Checkbox from 'material-ui/Checkbox';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { cyan100 } from 'material-ui/styles/colors';
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
import Snackbar from 'material-ui/Snackbar';
const styles = {
    block: {
        maxWidth: 310,
    },
    radioButton: {
        marginTop: 15,

        textAlign: 'left'
    },
    margins: {
        width: 310,
        marginTop: 8,
        padding: 5,
        display: 'inline-block',
        marginBottom: 20,

    },
    registerButton: {
        backgroundColor: cyan100,
        marginRight: 30,
    },
};

// const dataSource1 = [
//   {
//     text: 'proj 1',
//     value: (
//       <Checkbox
//       style={styles.checkbox}
//     />
//     ),
//   },
//   {
//     text: 'proj 2',
//     value: (
//       <Checkbox
//       style={styles.checkbox}
//     />
//     ),
//   },
// ];



const dataSourceConfig = {
    text: 'title',
    value: 'id',
};
var projs = null;
export default class RegisterComp extends Component {
    constructor(props) {
        localStorage.setItem("alias", "umkhande");
        super(props);
        this.state = {
            venueListOpen: false,
            venueValue: 'nochoice',
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

        fetch(`/api/getMyUnRegProjects?alias=${localStorage.alias}`, {

            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',

            }
        }).then(res => res.json())
            .then(projects => this.setState({ projects }, function () { console.log(projects + "votedProjects set.. should be able to render the change now") }));


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

    handleRegisterButton() {
        console.log("this");
        fetch(`/api/projects/RegisterProjects`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',

            },
            body: {
                "alias": localStorage.alias,
                "venue_id": this.state.venues,
                "projects": this.state.chosenProjs
            }

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
            }).then(this.setState({ registered: true, snackbarOpen: true })).then(this.forceUpdate())
            .catch(function (err) {
                console.log('Fetch Error :-S', err);
            });


    }
    componentDidUpdate() {
        console.log("will update");
    }
    handleRequestClose = () => {
        this.setState({
            snackbarOpen: false,
            // invalidProjectSelected: false,
            registered: false
        });
    };


    handleSearchUpdate(searchText, dataSource, params) {
        console.log(searchText);

        console.log(dataSource);
        // this.setState({ searchedText: searchText, projects:this.state.projects });





        // .then(function(res){
        //   this.setState({projects: res.json().then(function(data){console.log(data)})});
        // })
        this.setState({ searchedText: searchText }, function () { console.log("searched updated to:" + this.state.searchedText) });


    }
    handleClose = () => {
        this.setState({ venueListOpen: false });
    };
    handleRadioSelect(event, value) {
        console.log(event + " " + value);
        this.setState({ venues: value });
    }
    handleVenueForProj(x, y) {
        console.log("x: " + x);
        this.setState({ venueListOpen: true, selectedProjId: x, selectedProjTitle: y });
    }
    handleChange(event, index, value) {
        this.setState({ venueValue:value });
    }

    render() {
        console.log("render" + this.state.projects);
        return (
            <div className="default">
                {this.state.projects == undefined &&
                    <FlatButton label="Show My Projects" onTouchTap={this.handleGetProjects.bind(this)} />
                }

                {
                    this.state.projects.map(function (elem, i) {
                        return (

                            <Card key={i}>
                                <CardHeader

                                    title={elem.name}

                                    actAsExpander={false}
                                    showExpandableButton={false}
                                />

                                <CardActions>
                                    <DropDownMenu
                                        key={i}
                                        value={this.state.venueValue}
                                        onChange={this.handleChange.bind(this)}
                                        style={styles.customWidth}
                                        autoWidth={true}
                                    >
                                    <MenuItem value={'nochoice'} primaryText="No Preference" />
                                        <MenuItem value={'hydB1Mpr'} primaryText="Hyderabad: MPR B1" />
                                        <MenuItem value={'hydB2Mpr'} primaryText="Hyderabad: MPR B2" />
                                        <MenuItem value={'hydB1B2Aisle'} primaryText="Hyderabad: B1B2 Lane LG" />
                                        <MenuItem value={'hydB3Mpr'} primaryText="Hyderabad: MPR B3" />
                                        <MenuItem value={'hydB3lobby'} primaryText="Hyderabad: B3 Lobby" />

                                    </DropDownMenu>

                                </CardActions>

                            </Card>

                        );
                    }, this)}

            </div>


        );
    }
}