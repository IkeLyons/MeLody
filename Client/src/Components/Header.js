import React from 'react';
import './Header.css'
import {Link} from 'react-router-dom'

/**
* @author
* @function Header
**/

const Header = (props) => {

  return(
    <div className='container-head'>

        <h1>Me Lody</h1>
        <ul>
            <Link to='/Home'> 
                <li>Home</li>
            </Link>
            <Link to='/Logout'> 
                <li>LogOUT</li>
            </Link>            
        </ul>
    </div>
   )

 }

export default Header