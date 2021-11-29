import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import './logoff.css'

import { Button } from 'primereact/button';

export default class Logoff extends Component {


    componentDidMount(){
        localStorage.removeItem('username');
    }

    render() {
        return (
            <div className='logout-card'>
                <h1>Successfully Logged off.</h1>
                <p>Thanks for choosing Melody</p>
                <Button className='logout-btn'><Link className='pi pi-fw pi-sign-in' to='/Login'>LogIN</Link></Button>
            </div>
        )
    }
}
