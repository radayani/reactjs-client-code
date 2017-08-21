// --------------------------------------------------------------------------------------------------------------------
// <copyright file="BadgeOnVoteIcon.js" company="Microsoft">
//     Microsoft Copyright.
// </copyright>
// <summary>
//   The badge component on top left should show the count of the projects the user has voted for but hasn't provided a feedback to. The drawer on the left which gets opened on hamburger menu icon click shows the useful menu options as per the currently selected user mode. 
// </summary>
// <author>
//    Raveena Dayani (radayani)  
// </author>
// --------------------------------------------------------------------------------------------------------------------
import React from 'react';
import Badge from 'material-ui/Badge';
import VotedProjectsIcon from './VotedProjectsIcon';

export default class BadgeOnVoteIcon extends React.Component {

    // write function to call the API which gets the count of voted projects for which no feedback has been provided by that alias. Inside render, based on this count, if 0 don't render the badge, directly render the VOtedProjectsIcon, if more, then show 

    render() {
        if (localStorage.getItem("userMode") === 'voter') {
            return (
                <Badge
                    badgeContent={0}
                    primary={true}

                    badgeStyle={{ top: 0, right: 35, position: 'absolute' }}>

                    <VotedProjectsIcon />

                </Badge>
            );}
        else if (localStorage.getItem("userMode") === 'presenter')
            return <VotedProjectsIcon />
        else return <VotedProjectsIcon />
    }
}
