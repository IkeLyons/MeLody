import React from "react";
import "./ProfileView.css";
import userPic from "./blankprofilepic.png";
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
    			<h1>Username</h1>
    			<div className = "userAvatar">
                    <img src = {userPic}/>
                </div>
    		</div>

            {/*work to get this based on how many user has inputted*/}
    		<div className = "genreInfo">
                <span className = "chip"><Chip label= "Genre 1" className= "p-mb-2 p-mr-2" removable/></span>
                <span className = "chip"><Chip label= "Genre 2" className= "p-mb-2 p-mr-2" removable/></span>
                <span className = "chip"><Chip label= "Genre 3" className= "p-mb-2 p-mr-2" removable/></span>
    		</div>

    		<div className = "anthem">
                My Anthem
                {/*Insert Song display here*/}
    		</div>

    		<div className = "aboutMe">
                About Me
                <p className = "aboutMeContent">TEXT</p>
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
