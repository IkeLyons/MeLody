import React from "react";
import styles from "./ProfileView.css"
import userPic from "./blankprofilepic.png"
import { FaCog } from "react-icons/fa"

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

    		<div className = "genreInfo">
    		</div>

    		<div className = "Anthem">
    		</div>

    		<div className = "aboutMe">
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
