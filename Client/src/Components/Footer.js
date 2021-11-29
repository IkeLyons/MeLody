import React, { Component } from 'react'
import './footer.css'

export default class Footer extends Component {
    render() {
        return (
            <div className='footer-container'>
                <div className='contact-card'>
                    <span>Developers:  </span>
                    <span>Mukesh, </span>
                    <span>Ikelyons, </span>
                    <span>Tabitha, </span>
                    <span>JJ, </span>
                    <span>Brandon</span>
                    
                    <div className='card-find'>
                        <span></span>
                        <span>Find Us at  </span>
                        <i className="pi pi-facebook" style={{'fontSize': '1.5em'}}></i>
                        <span> - </span>
                        <i className="pi pi-twitter" style={{'fontSize': '1.5em'}}></i>
                        <span> - </span>
                        <i className="pi pi-google" style={{'fontSize': '1.5em'}}></i>
                    </div>
                </div>
                <div className='info-card'>
                    Melody @ MISIC @ LISTEN @ ENJOY
                </div>
            </div>
        )
    }
}
