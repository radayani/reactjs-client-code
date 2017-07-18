import React, { Component } from 'react';
import axios from 'axios';
import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom"
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { cyan700 } from 'material-ui/styles/colors';
import GenerateMyPinComponent from './GenerateMyPinComponent';
import UserModeComponent from './UserModeComponent';
// import MyProjectsCards from './MyProjectsCards';
import MyVotedProjectsCards from './MyVotedProjectsCards';
import MyRegisteredProjectsCards from './MyRegisteredProjectsCards';
import SearchFilterComponent from './SearchFilterComponent';
import DialogPopFeedback from './DialogPopFeedback';
import DialogPopVote from './DialogPopVote';
import Cookies from 'universal-cookie';
import LoginPage from './LoginPage';
import Home from './Home';
// import cookie from 'react-cookie';
// import NotFound from './NotFound';
import './App.css';
import AppBarComp from './AppBarComp';
import RegisterComp from './RegisterComp';
const muiTheme = getMuiTheme({
    palette: {
        textColor: cyan700,
    },
    appBar: {
        height: 50,
    },
});

var auth = null;

const renderMergedProps = (component, ...rest) => {
    const finalProps = Object.assign({}, ...rest);
    return (
        React.createElement(component, finalProps)
    );
}

const PropsRoute = ({ component, ...rest }) => {
    return (
        <Route {...rest} render={routeProps => {
            return renderMergedProps(component, routeProps, rest);
        }} />
    );
}


const PrivateRoute = ({ component, redirectTo, ...rest }) => {
    return (
        <Route {...rest} render={routeProps => {
            return auth.loggedIn() ? (
                renderMergedProps(component, routeProps, rest)
            ) : (
                    <Redirect to={{
                        pathname: redirectTo,
                        state: { from: routeProps.location }
                    }} />
                );
        }} />
    );
};


const cookies = new Cookies();
class App extends Component {

    componentDidMount() {
        console.log("component did mount");
        this.setState({ alias: 'umkhande' });
        //get api call 



    }

    componentWillMount() {
        // cookie.save('name', 'radayani', {path:'/'});
        console.log("component will mount" + localStorage.alias);
        

    }

    constructor(props) {

        super(props);
        // fetch('/')
        //     .then(res => res.json())
        //     .then(auth => this.setState({ auth: auth }, function () { console.log(auth + "auth mounted") }));
        console.log("app.js constructor called ");
        this.state = { userMode: '', auth: [], alias: '' };
        cookies.set('myCat', 'Pacman', { path: '/' });
        console.log("cookie" + cookies.getAll()); // Pacman


        // this.state = {onboarded:cookie.load('onboarded')};
    }

    render() {

        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <BrowserRouter>
                    <div className="App">
                        <div className="App-header">
                            <AppBarComp />
                        </div>
                        <Switch>
                            <PropsRoute exact path='/' component={Home} auth={auth} />
                            <PropsRoute exact path='/user/:alias/register' component={RegisterComp} props="hi"/>

                            {//  <Route exact path={`/loginPage`} component={LoginPage} />
                            }
                            {/* Generate PIN */}
                            <PropsRoute exact path={`/user/:alias`} component={GenerateMyPinComponent} pin={"pin mil gayi prop se"} />

                            {/* /radayani_13wsq2/userMode = voter */}
                            {/* /radayani_13wsq2/userMode = presenter */}
                            <PropsRoute exact path="/user/:alias/:pin/userMode" component={UserModeComponent} />

                            {/* /radayani_13wsq2/userMode/voter/myprojects = Button: Feedback/Continue Reading..*/}
                            {/* /radayani_13wsq2/userMode/presenter/myprojects = Button: Take Visiter Vote */}
                            {/* 24 Hours of Pain: 
                            <Route exact path="/:alias/:pin/userMode/:modeId/myProjects" component={MyProjectsCards} />*/}
                            <PropsRoute exact path="/user/:alias/:pin/userMode/voter/myProjects" component={MyVotedProjectsCards} />
                            <PropsRoute exact path="/user/:alias/:pin/userMode/voter/myProjects/:projId/feedback" component={DialogPopFeedback} />
                            <PropsRoute exact path="/user/:alias/:pin/userMode/presenter/myProjects" component={MyRegisteredProjectsCards} />
                            <PropsRoute exact path="/user/:alias/:pin/userMode/presenter/myProjects/:projId/votePage" component={DialogPopVote} />

                            {/* /radayani_13wsq2/userMode/voter/mainVotePage = Alias(already filled, disabled), PIN(already filled, disabled), Project(searchable) */}
                            {/* /radayani_13wsq2/userMode/presenter/mainVotePage = Alias(open), PIN(open), Project(searchable)  */}
                            <Route exact path="/user/:alias/:pin/userMode/:modeId/mainVotePage" component={SearchFilterComponent} />

                        </Switch>
                    </div>
                </BrowserRouter>
            </MuiThemeProvider>
        );
    }
}

export default App;

