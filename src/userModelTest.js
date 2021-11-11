import React from "react"


// just a placeholder class so that i can keep track of some users 
// while working on the playlist view

class User extends React.Component {
	constructor(name) {
		super()
		this.name = name
	}

	getInitials() {
   		var names = this.name.split(' '),
		initials = names[0].substring(0, 1).toUpperCase();
    
		if (names.length > 1) {
			initials += names[names.length - 1].substring(0, 1).toUpperCase();
		}
		return initials;
	};
}

export default User