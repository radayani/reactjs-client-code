// --------------------------------------------------------------------------------------------------------------------
// <copyright file="App.js" company="Microsoft">
//     Microsoft Copyright.
// </copyright>
// <summary>
//   The main start file on client-side 
// </summary>
// <author>
//    Raveena Dayani (radayani)  
// </author>
// --------------------------------------------------------------------------------------------------------------------
import React, { Component } from 'react';
import { Switch, Route, BrowserRouter } from "react-router-dom"
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { cyan700, cyan50} from 'material-ui/styles/colors';
import GenerateMyPinComponent from './GenerateMyPinComponent';
import UserModeComponent from './UserModeComponent';
import MyVotedProjectsCards from './MyVotedProjectsCards';
import MyRegisteredProjectsCards from './MyRegisteredProjectsCards';
import SearchFilterComponent from './SearchFilterComponent';
import DialogPopFeedback from './DialogPopFeedback';
import DialogPopVote from './DialogPopVote';
import Cookies from 'universal-cookie';
import Home from './Home';
import FooterContent from './FooterContent';
import './App.css';
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

const cookies = new Cookies();
class App extends Component {

    componentDidMount() {}

    componentWillMount() {}

    constructor(props) {
        localStorage.setItem('access_token', cookies.get('access_token'));

        localStorage.setItem("alias", cookies.get('alias'));
        super(props);
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
                                <div className="App-footer" style={{ backgroundColor: cyan50 }}>
                                    <FooterContent />
                                </div>
                                {
                                    // App headers starts from the first page when it goes there
                                }
                                <Switch>

                                    
                                <PropsRoute exact path='/' component={Home} auth={auth} />
                                    <PropsRoute exact path='/home/:pin/register' component={RegisterComp} />
                                    {/* Generate PIN */}
                                    <PropsRoute exact path={`/home`} component={GenerateMyPinComponent} pin={"pin mil gayi"} />
                                    <PropsRoute exact path="/home/:pin/userMode" component={UserModeComponent} />
                                    <PropsRoute exact path="/home/:pin/userMode/voter/projects" component={MyVotedProjectsCards} />
                                    <PropsRoute exact path="/home/:pin/userMode/voter/projects/:projId/feedback" component={DialogPopFeedback} />
                                    <PropsRoute exact path="/home/:pin/userMode/presenter/projects" component={MyRegisteredProjectsCards} />
                                    <PropsRoute exact path="/home/:pin/userMode/presenter/projects/:projId/vote" ptitle={"this"} component={DialogPopVote} />
                                    <Route exact path="/home/:pin/userMode/voter/vote" component={SearchFilterComponent} />
                                </Switch>
                            </div>
                        </div>
                    </BrowserRouter>
                </MuiThemeProvider>
            );
        }
        else
            return window.location.replace('http://sfvote.azurewebsites.net/api/login');
    }
}

export default App;

