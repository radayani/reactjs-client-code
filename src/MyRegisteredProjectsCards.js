import React from 'react';
import AppBarComp from './AppBarComp';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import { cyan100, pinkA200, pink50, lightBlack } from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import RaisedButton from 'material-ui/RaisedButton';
import DialogPopFeedback from './DialogPopFeedback';
import DialogPopVote from './DialogPopVote';
import { NavLink } from "react-router-dom";
import FooterContent from './FooterContent';

import Cookies from 'universal-cookie';
const cookies = new Cookies();

const styles = {
  presenterButton: {
    backgroundColor: pinkA200,
  },
  presenterButtonRegister: {
    registered: {
      float: 'right'
    },
    notregistered: {
      backgroundColor: lightBlack,
      float: 'right'
    }
  },
};

export default class MyRegisteredProjectsCards extends React.Component {
  constructor(props) {
    super(props);
    localStorage.setItem("userMode", "presenter");
    cookies.set('userMode', 'presenter');
    this.state = {
      registeredProjects: [],
      unregProjects: [],
      votepageOpen: false,
      presenterSelectedProj: '',
      dontAllowVote: false,

    };
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
  componentWillUnmount() {
    // console.log("unmouting Projects List page.............." + this.props.match.url);
  }

  componentWillReceiveProps(nextProps) {
    // console.log("comp received PROPS: " + this.props.match.url + " nextprops:" + nextProps.match.url)

    if (this.props.match.url !== nextProps.match.url && localStorage.userMode === 'presenter') {
      // console.log("REGISTERED PROJS LIST API CALLED")
      fetch(`/api/getMyUnRegProjects?alias=${localStorage.alias}`, {

        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',

        }
      })
        .then(res => res.json())
        .then(unregProjects => this.setState({ unregProjects }
          // , function () { console.log("zzzzzz: "); console.log(unregProjects) }
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
  }

  componentWillUpdate(nextProps) {

    // console.log("component will udpate " + this.props.match.url + " nextprops:" + nextProps.match.url);
  }

  shouldComponentUpdate() {
    return true;
  }

  componentDidMount() {
    // console.log("THIS !!!!!  project list did mount" + localStorage.userMode);
    if (localStorage.userMode === 'presenter') {
      // console.log("REGISTERD PROJS LIST API CALLED")
      fetch(`/api/getMyUnRegProjects?alias=${localStorage.alias}`, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
      })
        .then(res => res.json())
        .then(unregProjects => this.setState({ unregProjects }
          // , function () { console.log("zzzzzz: "); console.log(unregProjects) }
        ));
      fetch(`/api/getRegisteredProjects?alias=${localStorage.alias}`, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
        .then(res => res.json())
        .then(registeredProjects => this.setState({ registeredProjects }
          // , function () { console.log("registeredProjects set.. should be able to render the change now") }
        ));
    }
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions.bind(this));
  }

  componentWillMount() {
    // console.log("mounting projects list page................ " + this.props.match.url)
    localStorage.setItem("userMode", "presenter");
    window.removeEventListener("resize", this.updateDimensions.bind(this));
  }


  handleRegisteration() {
    // console.log("handled registeration");
  }

  handleClose = () => {
    this.setState({ votepageOpen: false })
  };

  handleOpen = (proj, projId) => {
    this.setState({ votepageOpen: true, presenterSelectedProj: proj, presenterSelectedProjId: projId })
  };

  // componentDidUpdate() {
  //   console.log("component did update");
  // }

  render() {
    return (
      <div className="default">
        <div className="App-footer" style={{ backgroundColor: pink50}}>
          <FooterContent />
        </div>
        {localStorage.length > 0 &&
          <div className="App-header">
            <AppBarComp />
          </div>
        }
        <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
          <div className="default voterButton presenterButton">
            {this.state.registeredProjects.map(function (elem, i) {
              // { console.log(elem) }
              return (

                <Card key={i}>
                  <CardHeader
                    title={elem.title}
                    subtitle={elem.tagline}
                    actAsExpander={true}
                    showExpandableButton={true}
                  />
                  <CardText expandable={true}>
                    {elem.description}
                  </CardText>
                  <CardActions>
                    {this.state.deviceWindow === 'narrowWindow' &&
                      <NavLink to={`/home/${localStorage.myPIN}/userMode/presenter/projects/${elem.project_id}/vote?${this.state.deviceWindow}`} >
                        <FlatButton label="Take Vote" style={styles.presenterButton} disabled={false} />
                      </NavLink>

                    }
                    {this.state.deviceWindow == 'broadWindow' &&

                      <FlatButton label="Take Vote" style={styles.presenterButton} onTouchTap={this.handleOpen.bind(this, elem.title, elem.project_id)} disabled={false} />

                    }

                    <FlatButton label="Registered" style={styles.presenterButtonRegister.registered} disabled={true} />



                  </CardActions>
                </Card>

              );
            }, this)}





            {this.state.unregProjects.map(function (elem, i) {
              // { console.log(elem) }
              return (

                <Card key={i}>
                  <CardHeader
                    title={elem.name}
                    subtitle={elem.tagline}
                    actAsExpander={true}
                    showExpandableButton={true}
                  />
                  <CardText expandable={true}>
                    {elem.description}
                  </CardText>
                  <CardActions>
                    {this.state.deviceWindow === 'narrowWindow' &&
                      <FlatButton label="Take Vote" style={styles.presenterButton} disabled={true} />

                    }
                    {this.state.deviceWindow == 'broadWindow' &&

                      <FlatButton label="Take Vote" style={styles.presenterButton} disabled={true} />

                    }

                    <NavLink to={`/home/${localStorage.myPIN}/register`} >
                      <FlatButton label="Register" style={styles.presenterButtonRegister.notregistered} />
                    </NavLink>

                  </CardActions>
                </Card>

              );
            }, this)}

            {this.state.votepageOpen && <DialogPopVote presenterSelectedProj={this.state.presenterSelectedProj} presenterSelectedProjId={this.state.presenterSelectedProjId} votepageOpen={this.state.votepageOpen} onCloseCallback={this.handleClose.bind(this)} isItPhoneWindow={this.state.phoneWindow} />}
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}