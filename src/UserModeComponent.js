import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { NavLink } from "react-router-dom"
import Paper from 'material-ui/Paper';
import AppBarComp from './AppBarComp';

const style = {
  button: {
    margin: 10,
    height: 60,
    width: 150
  },
  paper: {
    marginTop: 10,
    maxWidth: 250,
    padding: 5,
    textAlign: 'center',
    display: 'inline-block',
    marginBottom: 20
  },
  innerPaper: {
    maxWidth: 230,
    padding: 10,
    textAlign: 'center',
    display: 'inline-block'
  }
};

class UserModeComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userMode: ''
    };
  }

  handleVoterButtonClick() {
    localStorage.setItem("userMode", 'voter');
    // cookies.set('userMode', 'voter');
  }

  handlePresenterButtonClick() {
    localStorage.setItem("userMode", 'presenter');
    // cookies.set('userMode', 'presenter');
  }

  render() {
    return (
              <div>

        {localStorage.length > 0 &&
          <div className="App-header">
            <AppBarComp />
          </div>
        }
        <Paper zDepth={3} style={style.paper}>
          
          {localStorage.userMode != 'presenter' && localStorage.userMode != 'voter' &&
          <Paper zdepth={1} style={style.innerPaper}>
            Select <b>Voter</b> Mode to vote for other's projects. <br/><br/> Select <b>Presenter</b> Mode to take votes for your registered projects <br />
          </Paper>}
          {localStorage.userMode === 'voter'
            &&
            <Paper zdepth={1} style={style.innerPaper}>
              You are currently in <br /><b>Voter Mode</b> <br/> <br/>  In order to take votes for your registered<br/> projects, go to <br /> menu icon on top right <br /> select <b>Presenter Mode</b>
            </Paper>
          }

          {localStorage.userMode === 'presenter'
            &&
            <Paper zdepth={1} style={style.innerPaper}>
              You are currently in <br /><b>Presenter Mode</b>. <br /><br /> In order to vote for other's projects, go to <br /> menu icon on top right <br /> select <b>Voter Mode</b>
            </Paper>
          }
          <br />
          <NavLink to={`${this.props.match.url}/voter/vote`}>
            <RaisedButton label="Voter" primary={true} style={style.button} onTouchTap={this.handleVoterButtonClick} />
          </NavLink>
          <br />
          <br />
          <NavLink to={`${this.props.match.url}/presenter/projects`} >
            <RaisedButton label="Presenter" secondary={true} style={style.button} onTouchTap={this.handlePresenterButtonClick} />
          </NavLink>
          {localStorage.userMode != 'presenter' && localStorage.userMode != 'voter' &&
          <Paper zdepth={1} style={style.innerPaper}>
            To switch mode later, go to the <b>menu on top right </b>and select the other mode <br />
          </Paper>}
        </Paper>
      </div>
    );
  }
}

export default UserModeComponent;