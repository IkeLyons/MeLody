

import React, { Component } from 'react'
import './style.css'

import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Messages } from 'primereact/messages';
import { Message } from 'primereact/message';


export default class Login extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            username:'',
            password:'',
            msg:''
       }
       this.submitForm = this.submitForm.bind(this);
       this.showError = this.showError.bind(this);
       this.showPasswordError = this.showPasswordError.bind(this);
    }
    showError(strerr){
        this.msgs1.show([
            { severity: 'error', summary: 'Server Error :', detail: strerr, sticky: true }
        ]);
    }
    showApprove(strmsg){
        this.msgs1.show([
            { severity: 'success', summary: 'Success :', detail: strmsg, sticky: true }
        ]);
    }
    showPasswordError(){
        <Message severity="error" />
    }
    verifyLogin(data){
        console.log('In Submit Login')
        var request = new Request('http://localhost:4000/api/validateLogin', {
            method: 'POST',
            headers: new Headers({ 'Content-Type': 'application/json' }),
            body: JSON.stringify(data)
        });

        var that = this;
        fetch(request)
        .then(function(response){
            if(response.status === 400)
                throw new Error();
            response.json()
            .then(function(data){
                if(response.status === 401)
                    that.showError(data.message);
                else if(response.status === 402)
                    that.showError(data.message);
                else{
                    localStorage.setItem('username', that.state.username);
                    localStorage.setItem('isLogged', 'true');
                    that.showApprove("Sucessfully Logged In.");
                    that.props.history.push('/Melody/Dashboard')
                    
                }
            })
        })
        .catch(function (err) {
            that.showError("BAD Request");
        })
    
            
    }

    submitForm = async(event) =>{
        event.preventDefault();

        var data ={
            _username: this.state.username,
            _password: this.state.password,
            _msg: this.state.msg
        }
        console.log(data);
        this.verifyLogin(data);

    }
    

    

    render() {
        localStorage.setItem('isLogged', 'false');
        return (
            <div className="Login">
                <Messages ref={(el) => this.msgs1 = el} />

                <div id="contianerLogin" className="p-formgroup-inline">
                    <span className="p-float-label">
                        <InputText id="username" value={this.state.username} onChange={(e) => this.setState({username: e.target.value})} />
                        <label htmlFor="username">Username</label>
                        
                    </span>

                    <span className="p-float-label">
                        <InputText id="username" value={this.state.password} onChange={(e) => this.setState({password: e.target.value})} />
                        <label htmlFor="username">Password</label>
                    </span>
                    <Button id="login_btn" type="button" className="p-button-outlined p-button-info" label="Sign In"
                        onClick={this.submitForm}
                    />
                </div>

                <div className="footer_login">
                    <span className="label_Melody">@MeLody</span>
                    <span className="label_statement"><i> “Where words fail, MUSIC SPEAKS"</i></span>
                </div>
                
            </div>
        )
    }
}
