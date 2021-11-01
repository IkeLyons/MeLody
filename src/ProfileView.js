import React from "react";
import styles from "./ProfileView.css"
import userPic from "./blankprofilepic.png"
import { Button } from "primereact/button"
import { Avatar } from "primereact/avatar"
import { FaCog } from "react-icons/fa"

class ProfileView extends React.Component {
  render() {
    return( 
    	<div className = "profileContainer">
    		<p>Profile Info!</p>
    		<div className = "upperButtons">
    			<Button label = "Edit Profile"/>
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
