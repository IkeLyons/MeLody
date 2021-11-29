import React, { Component, Fragment } from 'react'
import './header.css'
import {Link} from 'react-router-dom'

import logo from '../Dashboard/public/Melody.jpg'

/**
* @author
* @function Header
**/

export class Header extends Component {

    
    render() {
        
        return(
            <div className="header-card">
                <div className="card-logo">
                    <a href="https://www.rpi.edu"> <img className='rpi-logo' src={logo} alt="Kiwi standing on oval" /></a>
                </div>
                <div className="card-name"><h2>{this.props.stitle}</h2></div>
                                  
                <div className="card">
                    <ul className='homebar'>
                        <Link className='pi pi-home' to='/Melody/Dashboard'>Home</Link>
                        <Link className='pi pi-fw pi-sliders-h' to='/Settigns'>Settings</Link>
                        <Link className='pi pi-fw pi-question' to='/AboutUs'>About</Link>
                        <Link className='pi pi-fw pi-sign-out' to='/Logoff'>LogOut</Link>
                    </ul>
                </div>
            </div>
      );
    }

}
export default Header;
