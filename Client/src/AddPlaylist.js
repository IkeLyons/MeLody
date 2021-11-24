import React, { Component, Fragment } from 'react'
import { InputText } from 'primereact/inputtext';
import { RadioButton } from 'primereact/radiobutton';
import './addplaylist.css'
import Header from './Components/Header'


import { Button } from 'primereact/button';
import { Messages } from 'primereact/messages';

export default class AddPlaylist extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             code: null,
             name: null,
             genre: null,
             collaborators: null,
             songs: null,
             loading2: false,
        }
        this.onLoadingClick2 = this.onLoadingClick2.bind(this);
    }
    showError(strerr) {
        this.msgs1.show([
          {
            severity: 'error',
            summary: 'Server Error :',
            detail: strerr,
            sticky: true
          }
        ]);
      }
      showApprove(strmsg) {
        this.msgs1.show([
          {
            severity: 'success',
            summary: 'Success :',
            detail: strmsg,
            sticky: true
          }
        ]);
      }
    onLoadingClick2() {
        this.setState({ loading2: true });
        setTimeout(() => {
            this.setState({ loading2: false });
        }, 2000);
        var that = this;
        var user = localStorage.getItem('username')
        var data = {
                'user': user,
                'name': that.state.name,
                'code': that.state.code,
                'genre':that.state.genre,
                'collaborators': that.state.collaborators,
                'songs': that.state.songs
            }
        console.log(data);

        var req = new Request('http://localhost:4000/playlist/api/addUserPlaylist', {
            method: 'POST',
            headers: new Headers({ 'Content-Type': 'application/json' }),
            body: JSON.stringify(data)
          });

          fetch(req)
            .then((res)=>{
                console.log(res.status);
                res.json().then((data)=>{
                    that.showApprove('Sucessfully posted data to server.');
                })
                .catch((err)=>{
                    that.showError('Unable to post data, record id exists');
                })
            })
            .catch((err)=>{
                that.showError('Server connection Error');
            })

    }
    
    render() {
        return (
            <Fragment>
            <Header stitle={'Add Playlist'}/>
            <div className='add-container'>
                {
                    (this.msgs1 === null) ? null : 
                    <Messages ref={(el) => (this.msgs1 = el)} />
                }
                
                <div className="add-card">
                <div className='side-container'>
                    <h2>Welcome ,</h2>
                    <h2>{localStorage.getItem('username')}</h2>
                </div>
                <div className='details-container'>
                    <h3>Enter playlist code</h3>
                    <span className="p-float-label">
                        <InputText id="inputtext" value={this.state.code} onChange={(e) => this.setState({ code: e.target.value })} />
                        <label htmlFor="inputtext">code</label>
                    </span>
                    <h3>Enter playlist Name</h3>
                    <span className="p-float-label">
                        <InputText id="inputtext" value={this.state.name} onChange={(e) => this.setState({ name: e.target.value })} />
                        <label htmlFor="inputtext">name</label>
                    </span>
                    <h3>Select your playlist genre</h3>
                    <div className="list-container">
                        <div className="p-field-radiobutton">
                            <RadioButton inputId="genre1" name="city" value="bluesMusic" onChange={(e) => this.setState({genre: e.value})} checked={this.state.genre === 'bluesMusic'} />
                            <label htmlFor="genre1">Blues</label>
                        </div>
                        <div className="p-field-radiobutton">
                            <RadioButton inputId="city2" name="city" value="rockMusic" onChange={(e) => this.setState({genre: e.value})} checked={this.state.genre === 'rockMusic'} />
                            <label htmlFor="city2">Rock</label>
                        </div>
                        <div className="p-field-radiobutton">
                            <RadioButton inputId="city3" name="city" value="rocknrollMusic" onChange={(e) => this.setState({genre: e.value})} checked={this.state.genre === 'rocknrollMusic'} />
                            <label htmlFor="city3">RockNRoll</label>
                        </div>
                        <div className="p-field-radiobutton">
                            <RadioButton inputId="city4" name="city" value="hiphopMusic" onChange={(e) => this.setState({genre: e.value})} checked={this.state.genre === 'hiphopMusic'} />
                            <label htmlFor="city4">Hip Hop</label>
                        </div>
                    </div>
                    <h3>Enter your Collaborators, in comma separated</h3>
                    <span className="p-float-label">
                        <InputText id="inputtext" value={this.state.collaborators} onChange={(e) => this.setState({ collaborators: e.target.value })} />
                        <label htmlFor="inputtext">collaborators(,)</label>
                    </span>
                    <h3>Enter your Songs Link, in comma separated</h3>
                    <span className="p-float-label">
                        <InputText id="inputtext" value={this.state.songs} onChange={(e) => this.setState({ songs: e.target.value })} />
                        <label htmlFor="inputtext">songs(,)</label>
                    </span>
                    <Button className='submit-add' label="Submit" loading={this.state.loading2} onClick={this.onLoadingClick2} />
                </div>
                        

                </div>
            </div>
            </Fragment>
        )
    }
}

