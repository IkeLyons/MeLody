import React from "react";
import "./ProfileView.css";
import "primereact/resources/themes/bootstrap4-light-blue/theme.css"
import userPic from "./blankprofilepic.png";
import anthemCover from "./ManonTheMoonTheEndofDay.jpg";
import { FaCog } from "react-icons/fa";
import { Chip } from "primereact/chip";

class ProfileView extends React.Component {
  render() {
    return( 
    	<div className = "profileContainer">
    		<div className = "upperButtons">
    			<a href = "#"><button className = "editProfile">Edit Profile</button></a>
    			<a href = "#" id = "settings"><FaCog /></a>
    		</div>

    		<div className = "userInfo">
    			<h1>username</h1>
    			<div className = "userAvatar">
                    <img src = {userPic}/>
                </div>
    		</div>

            {/*work to get this based on how many user has inputted*/}
    		<div className = "genreInfo">
                <span className = "chip"><Chip label= "Rap" className= "p-chip p-mb-2 p-mr-2"/></span>
                <span className = "chip"><Chip label= "Sea Shanties" className= "p-chip p-mb-2 p-mr-2"/></span>
                <span className = "chip"><Chip label= "2010s Pop" className= "p-chip p-mb-2 p-mr-2"/></span>
    		</div>

    		<div className = "anthem">
                My Anthem
                <div className = "anthemDisplay">
                    <img src = {anthemCover}/>
                    <div className = "anthemInfo">
                        <span>Soundtrack 2 My Life</span>
                        <span>Kid Cudi</span>
                        <span>Man on the Moon</span>
                    </div>
                </div>
    		</div>

    		<div className = "aboutMe">
                About Me
                <p className = "aboutMeContent">
                    His palms are sweaty, knees weak, arms are heavy
                    There's vomit on his sweater already, mom's spaghetti
                </p>
    		</div>

    		<div className = "topTracks">
    		</div>

    		<div className = "mesh">
    		</div>
 		</div> 
    )
  }
}

export default ProfileView;
