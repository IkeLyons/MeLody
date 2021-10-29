import React from "react";
import styles from "./ProfileView.css"
import settingsGear from "./settingsgear.png"
import userPic from "./blankprofilepic.png"
import {Button} from "primereact/button"
import {Avatar} from "primereact/avatar"

class ProfileView extends React.Component {
  render() {
    return( 
    	<div className = {styles.profileContainer}>
    		<p>Profile Info!</p>
    		<div className = "upperButtons">
    			<Button label = "Edit Profile"/>
    			<button>
    				<img src = {settingsGear}/>
    			</button>
    		</div>

    		<div className = "userInfo">
    			<h1>Username</h1>
    			<Avatar image = {userPic} shape = "circle"/>
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
