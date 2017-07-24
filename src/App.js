import React, { Component } from 'react';
import axios from 'axios';
import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom"
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { cyan700, cyan50, cyan500, blueGrey50 } from 'material-ui/styles/colors';
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
import FooterContent from './FooterContent';
// import Auth from './Auth';
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


// const PrivateRoute = ({ component, redirectTo, ...rest }) => {
//     return (
//         <Route {...rest} render={routeProps => {
//             return auth.loggedIn() ? (
//                 renderMergedProps(component, routeProps, rest)
//             ) : (
//                     <Redirect to={{
//                         pathname: redirectTo,
//                         state: { from: routeProps.location }
//                     }} />
//                 );
//         }} />
//     );
// };


const cookies = new Cookies();
class App extends Component {

    componentDidMount() {
        // console.log("component did mount");
        // this.setState({ alias: 'umkhande' });
        //get api call 
        // console.log("component will mount");
        // if (localStorage.getItem('access_token') != cookies.get('access_token') || localStorage.getItem('access_token') == null) {
        //     window.location.replace('http://sfvotes.azurewebsites.net/api/login');

        // }


    }

    componentWillMount() {
        // cookie.save('name', 'radayani', {path:'/'});


    }

    constructor(props) {
        localStorage.setItem('access_token', cookies.get('access_token'));

        localStorage.setItem("alias", cookies.get('alias'));
        // console.log("alias" + cookies.get('alias'));
        super(props);
        // fetch('/')
        //     .then(res => res.json())
        //     .then(auth => this.setState({ auth: auth }, function () { console.log(auth + "auth mounted") }));
        // console.log("app.js constructor called " + cookies.get('access_token' + localStorage.access_Token));
        this.state = { userMode: '', auth: [], alias: '' };
        // console.log("cookie" + cookies.getAll());
    }

    render() {

        if (localStorage.getItem('access_token') !== null && localStorage.getItem('access_token') == cookies.get('access_token')) {
            return (
                <MuiThemeProvider muiTheme={muiTheme}>
                    <BrowserRouter>
                        <div className="App">
                        <div className="content">
                            <div className="App-footer" style={{backgroundColor:cyan50}}>
                                <FooterContent />
                            </div>
                            {
                                // App headers starts from the first page when it goes there
                            }
                            <Switch>
                                <PropsRoute exact path='/' component={Home} auth={auth} />
                                <PropsRoute exact path='/home/:pin/register' component={RegisterComp} />
                                {//  <Route exact path={`/loginPage`} component={LoginPage} />
                                }
                                {/* Generate PIN */}
                                <PropsRoute exact path={`/home`} component={GenerateMyPinComponent} pin={"pin mil gayi"} />

                                {/* /radayani_13wsq2/userMode = voter */}
                                {/* /radayani_13wsq2/userMode = presenter */}
                                <PropsRoute exact path="/home/:pin/userMode" component={UserModeComponent} />

                                {/* /radayani_13wsq2/userMode/voter/myprojects = Button: Feedback/Continue Reading..*/}
                                {/* /radayani_13wsq2/userMode/presenter/myprojects = Button: Take Visiter Vote */}
                                {/* 24 Hours of Pain: 
                            <Route exact path="/:alias/:pin/userMode/:modeId/myProjects" component={MyProjectsCards} />*/}
                                <PropsRoute exact path="/home/:pin/userMode/voter/projects" component={MyVotedProjectsCards} />
                                <PropsRoute exact path="/home/:pin/userMode/voter/projects/:projId/feedback" component={DialogPopFeedback} />
                                <PropsRoute exact path="/home/:pin/userMode/presenter/projects" component={MyRegisteredProjectsCards} />
                                <PropsRoute exact path="/home/:pin/userMode/presenter/projects/:projId/vote" ptitle={"this"} component={DialogPopVote} />

                                {/* /radayani_13wsq2/userMode/voter/mainVotePage = Alias(already filled, disabled), PIN(already filled, disabled), Project(searchable) */}
                                {/* /radayani_13wsq2/userMode/presenter/mainVotePage = Alias(open), PIN(open), Project(searchable)  */}
                                <Route exact path="/home/:pin/userMode/voter/vote" component={SearchFilterComponent} />

                            </Switch>
                            </div>
                        </div>
                    </BrowserRouter>
                </MuiThemeProvider>
            );
        }
        else
            //  window.location.replace('http://localhost:3002/api/login')        
            return window.location.replace('http://sfvotes.azurewebsites.net/api/login');
    }
}

export default App;

