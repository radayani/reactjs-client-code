<<<<<<< HEAD
// --------------------------------------------------------------------------------------------------------------------
// <copyright file="RegisterComp.js" company="Microsoft">
//     Microsoft Copyright.
// </copyright>
// <summary>
//   The component page which lets the project presenter Register themselves for a booth for demonstrations in Hackathon Science Fair  
// </summary>
// <author>
//    Raveena Dayani (radayani)  
// </author>
// --------------------------------------------------------------------------------------------------------------------
=======
>>>>>>> 40367f3dba24eba528a0b47c8cfc4602b4574ca9
import React, { Component } from 'react';
import { redA700, green700, } from 'material-ui/styles/colors';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import AppBarComp from './AppBarComp';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import Cookies from 'universal-cookie';
import Paper from 'material-ui/Paper';
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
        maxWidth: 600,
        marginTop: 8,
        padding: 10,
        display: 'inline-block',
        marginBottom: 20,

    },
    customWidth: {
        width: 300,
    },
    registeredProjsMargin: {
        marginTop: 8,
        padding: 10,
        display: 'inline-block',
        marginBottom: 20,
        maxWidth: 500
    }
    // registerButton: {
    //     backgroundColor: cyan100,
    //     marginRight: 30,
    // },
};





var projs = null;
export default class RegisterComp extends Component {
    constructor(props) {
        // console.log("cookies.get" + cookies.get('alias'));
        localStorage.setItem("alias", cookies.get('alias'));
        super(props);

        fetch(`/api/getAvailableVenue`, {

            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                
            }
        })
            .then(res => res.json())
            .then(venues => this.setState({ venues }
                // , function () { console.log(venues) }
            ));
        this.state = {
            venueListOpen: false,
            venueValue: -1,
            locationValue: 'null',
            registerButtonClicked: false,
            registeredProjects: [],
            projectValue: -1,
            projects: [],
            venues: [],
            locations: [],
            chosenProjs: null,
            registered: false,
            alreadyRegistered: false,
            snackbarOpen: false,
            projectSelected: false,
            options: [
                { label: "CSS", value: "css" },
                { label: "HTML", value: "html" },
                { label: "JavaScript", value: "js" },
                { label: "Ruby on Rails", value: "ror" },
            ],
            selectFieldName: "my-select",
            selectPlaceholder: "Choose some options...",
        }
        // console.log(this.state.projects + "projects");
    }

    onChange = function (obj) {
        // console.log("EVENT", obj.event); // "added" or "removed" 
        // console.log("ITEM", obj.item);   // item that has been added/removed { label: '...', value: '...' } 
        // console.log("VALUE", obj.value); // [{label: '...', value: '...'}, {label: '...', value: '...'}] 
    }

    updateDimensions() {
        if (window.innerWidth < 400) {
            this.setState({ deviceWindow: 'narrowWindow' }
                // , function () { console.log("device window set, rerender...") }
            );
        }
        else {
            this.setState({ deviceWindow: 'broadWindow' }
                // , function () { console.log("device window set, rerender...") }
            );
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
            .then(projects => this.setState({ projects }
                // , function () { console.log("zzzzzz: "); console.log(projects) }
            ));

        fetch(`/api/getRegisteredProjects?alias=${localStorage.alias}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',

            }

        })
            .then(res => res.json())
            .then(registeredProjects => this.setState({ registeredProjects }
                // , function () { console.log(" REGISTERED CALLED: "); console.log(registeredProjects) }
            ))
            .catch(function (err) {
                console.log('Fetch Error :-S', err);
            });


    }

    componentWillUpdate() {
        // console.log("will update");


    }
    handleRequestClose = () => {
        fetch(`/api/getRegisteredProjects?alias=${localStorage.alias}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',

            }

        })
            .then(res => res.json())
            .then(registeredProjects => this.setState({ registeredProjects }
                // , function () { console.log(" REGISTERED CALLED: "); console.log(registeredProjects) }
            ))
            .catch(function (err) {
                console.log('Fetch Error :-S', err);
            });
        this.setState({
            snackbarOpen: false,
            projectValue: -1,
            venueValue: -1,
            locations: [],
            locationValue: 'null',
            registered: false,
            registerButtonClicked: false,
            projectSelected: false
        });


        fetch(`/api/getMyUnRegProjects?alias=${localStorage.alias}`, {

            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',

            }
        })
            .then(res => res.json())
            .then(projects => this.setState({ projects }
                // , function () { console.log(projects + "votedProjects set.. should be able to render the change now") }
            ))
            .catch(function (err) {
                console.log('Fetch Error :-S', err);
            });




    };

    handleProjectSelection(event, index, value) {
        // console.log(event + " " + index + " " + value);
        this.setState({ projectValue: value, projectSelected: true });
    }

    handleVenueSelection(event, index, value) {
        // console.log(event + " " + index + " " + value + "location....");
        this.setState({ venueValue: value });

        fetch(`/api/getAvailableLocation?venue=${value}`, {

            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',

            }
        })
            .then(res => res.json())
            .then(locations => this.setState({ locations }
                // , function () { console.log(locations) }
            ))
            .catch(function (err) {
                console.log('Fetch Error :-S', err)
            });

    }
    handleLocationSelection(event, index, value) {
        // console.log(event + " " + index + " " + value);
        this.setState({ locationValue: value, venueId: value });

    }
    handleRegistrationButton() {
        if (this.state.projectValue === -1 || this.state.venueValue === -1) {
            this.setState({ registerButtonClicked: true, snackbarOpen: true });
        }
        else if (this.state.projectValue != -1 && this.state.venueValue != -1) {
            fetch(`/api/registerProject`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',

                },
                body: JSON.stringify({
                    'alias': localStorage.alias,
                    'venue_id': this.state.venueId,
                    'projects': this.state.projectValue
                })

            })
                .then(function (response) {

                    if (response.status !== 200) {
                        // console.log('Looks like there was a problem. Status Code: ' +
                        // response.status);
                        return;
                    }

                    // Examine the text in the response  
                    response.json()
                        .then(function (data) {
                            // console.log(data);
                            projs = data;
                            // console.log(projs);
                        });
                }).then(this.setState({ registered: true, snackbarOpen: true }))
                // .then(this.forceUpdate())
                .catch(function (err) {
                    console.log('Fetch Error :-S', err);
                });


        }



    }
    render() {
        // console.log("render" + this.state.projects);
        return (
            <div >
                {localStorage.length > 0 &&
                    <div className="App-header">
                        <AppBarComp />
                    </div>
                }
                <Paper zDepth={1} style={styles.margins}>
                    <h3 style={{ marginTop: 10, textAlign: 'center' }}><b>Registration</b></h3>
                    <DropDownMenu
                        style={styles.customWidth}
                        value={this.state.projectValue}
                        onChange={this.handleProjectSelection.bind(this)}
                        autoWidth={true}
                    >
                        <MenuItem value={-1} primaryText="Select Project to Register" />
                        {this.state.projects.map(function (elem, i) {
                            // { console.log("PROJECTS" + this.state.projects.length) }
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
                        <MenuItem value={-1} primaryText="Venue Preference" />

                        {this.state.venues.map(function (elem, i) {
                            return (
                                <MenuItem value={elem.venue} primaryText={elem.venue} key={i} />
                            );
                        }, this)}

                    </DropDownMenu>

                    <br />
                    <br />

                    <DropDownMenu
                        style={styles.customWidth}
                        value={this.state.locationValue}
                        onChange={this.handleLocationSelection.bind(this)}
                        autoWidth={true}
                    >
                        <MenuItem value={'null'} primaryText="Location Preference" />

                        {this.state.locations.map(function (elem, i) {
                            return (
                                <MenuItem value={elem.id} primaryText={elem.Location} key={i} />
                            );
                        }, this)}

                    </DropDownMenu>

                    <br />
                    <RaisedButton label="Register" onTouchTap={this.handleRegistrationButton.bind(this)} />

                </Paper><br />

                {//console.log("REGISTERED PRJECTS : " + this.state.registeredProjects)
                }
                <br />
                <Paper style={styles.registeredProjsMargin}>
                    <h5 style={{ marginTop: 10, textAlign: 'left' }}>My Registered Projects</h5>

                    <Table onRowSelection={this.handleRowSelection}>
                        <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                            <TableRow>
                                <TableHeaderColumn style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}> Registered Projects</TableHeaderColumn>
                                <TableHeaderColumn>Venue</TableHeaderColumn>
                                <TableHeaderColumn>Location</TableHeaderColumn>

                            </TableRow>
                        </TableHeader>
                        <TableBody displayRowCheckbox={false} showRowHover={true}>
                            {
                                this.state.registeredProjects.map(function (elem, i) {

                                    return (
                                        <TableRow striped={true} selectable={false} hoverable={true} key={i}>
                                            <TableRowColumn style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>{elem.title}</TableRowColumn>
                                            <TableRowColumn style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>{elem.venue}</TableRowColumn>
                                            <TableRowColumn style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>{elem.Location}</TableRowColumn>
                                        </TableRow>
                                    );

                                }, this)}

                        </TableBody>
                    </Table>
                </Paper>

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

                {this.state.registerButtonClicked && (this.state.projectValue === -1 || this.state.venueValue === -1)
                    &&
                    <Snackbar
                        style={{ width: 300 }}
                        open={this.state.snackbarOpen}
                        message="Invalid Details!"
                        autoHideDuration={1000}
                        bodyStyle={{ backgroundColor: redA700 }}

                        onRequestClose={this.handleRequestClose.bind(this)} />
                }
            </div>



        );
    }
}