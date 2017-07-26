import React from 'react';
import AppBarComp from './AppBarComp';
import Paper from 'material-ui/Paper';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import { cyan100, grey500 } from 'material-ui/styles/colors';
import RaisedButton from 'material-ui/RaisedButton';
import DialogPopFeedback from './DialogPopFeedback';
import { NavLink } from "react-router-dom";
import CircularProgress from 'material-ui/CircularProgress';

const styles = {
  voterButton: {
    backgroundColor: cyan100,
    marginRight: 30,
  },
};

export default class MyVotedProjectsCards extends React.Component {
  constructor(props) {
    super(props);
    localStorage.setItem("userMode", "voter");
    // console.log("my voted projects comp constructor" + localStorage.userMode);
    // console.log(" URL " + this.props.match.params.modeId);
    this.state = {
      votedProjects: [],
      feedbackOpen: false,
      voterSelectedProj: '',

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
    // console.log("unmouting Projects List page.............." + localStorage.userMode);
  }

  componentWillReceiveProps(nextProps) {
    // console.log("comp received PROPS: " + this.props.match.url + " nextprops:" + nextProps.match.url);
    if (this.props.match.url !== nextProps.match.url && localStorage.userMode == 'voter') {
      // console.log("VOTED PROJS LIST API CALLED")
      fetch(`/api/votedProjects?alias=${localStorage.alias}`)
        .then(res => res.json())
        .then(votedProjects => this.setState({ votedProjects }
          // , function () { console.log(votedProjects + " render now please..") }
        ));
    }
  }

  componentWillUpdate(nextProps) {
    // console.log("component will udpate " + localStorage.userMode + " nextprops:" + localStorage.userMode);
  }

  shouldComponentUpdate() {
    return true;
  }

  componentDidMount() {
    // console.log("THIS !!!!!  project list did mount" + localStorage.userMode);
    if (localStorage.userMode === 'voter') {
      // console.log("VOTED PROJS LIST API CALLED");

      fetch(`/api/votedProjects?alias=${localStorage.alias}`, {

        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',

        }
      })

        .then(res => res.json())
        .then(votedProjects => this.setState({ votedProjects }
          // , function () { console.log(votedProjects + "votedProjects set.. should be able to render the change now") }
        ));
    }
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions.bind(this));

  }

  componentWillMount() {
    // console.log("mounting projects list page................ " + localStorage.userMode)
    localStorage.setItem("userMode", "voter");
    window.removeEventListener("resize", this.updateDimensions.bind(this));
  }

  handleClose = () => {
    this.setState({ feedbackOpen: false });
  };

  handleOpen = (proj) => {
    this.setState({ feedbackOpen: true, voterSelectedProj: proj });
  };

  componentDidUpdate() {
    // console.log("component did update");
  }

  render() {
    return (
      <div className="default">
        {localStorage.length > 0 &&
          <div className="App-header">
            <AppBarComp />
          </div>
        }

        {this.state.votedProjects.length == 0 ? <Paper zDepth={2} style={{ textAlign: 'center', padding: 20, display: 'inline-block', alignContent: 'center', alignSelf: 'center' }}>Either no voted projects in your name, <br /> Or page hasn't loaded yet. <br/>Please refresh or contact us if problem persists.<br/><br/>  <br/> <CircularProgress size={20} thickness={4} style={{ color: grey500 }}/></Paper> :
          this.state.votedProjects.map(function (elem, i) {
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
                  <a target="_blank" href="https://garagehackbox.azurewebsites.net/hackathons/oneweek/projects/tile" rel="noopener noreferrer"  >
                    <FlatButton label="Continue Reading..." style={styles.voterButton} />
                  </a>
                  {this.state.deviceWindow === 'narrowWindow' &&
                    <NavLink to={`/api/${localStorage.alias}/${localStorage.myPIN}/userMode/voter/myProjects/${elem.id}/feedback?${this.state.deviceWindow}`} >
                      <RaisedButton label="Feedback" />
                    </NavLink>
                  }
                  {this.state.deviceWindow === 'broadWindow' &&
                    <RaisedButton label="Feedback" onTouchTap={this.handleOpen.bind(this, elem.title)} />
                  }
                </CardActions>
              </Card>
            );
          }, this)}

        {this.state.feedbackOpen
          &&
          <DialogPopFeedback voterSelectedProj={this.state.voterSelectedProj} feedbackOpen={this.state.feedbackOpen} onCloseCallback={this.handleClose.bind(this)} isItPhoneWindow={this.state.phoneWindow} />}
      </div>
    );
  }
}