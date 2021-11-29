import React, { Component, Fragment } from 'react'
import { InputText } from 'primereact/inputtext';
import { RadioButton } from 'primereact/radiobutton';
import './addplaylist.css'
import Header from './Components/Header'
import { ListBox } from 'primereact/listbox';


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
             selectedsongvalue: null,
             selecedlistvalue: null,
             songsListfromApi: [],
        }
        this.cities = [
            { name: 'New York', code: 'NY' },
            { name: 'Rome', code: 'RM' },
            { name: 'London', code: 'LDN' },
            { name: 'Istanbul', code: 'IST' },
            { name: 'Paris', code: 'PRS' }
        ];

        this.new_list_songs = [];
        this.new_disp_songs = [];
        

        this.onLoadingClick2 = this.onLoadingClick2.bind(this);
        this.handleSearchSongs = this.handleSearchSongs.bind(this);
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
    onLoadingClick2(e) {
        if(localStorage.getItem('username') === null) return;
        e.preventDefault()
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
                'songs': that.new_list_songs
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
            this.setResetAll();

    }

    setResetAll(){
        this.setState({
            code: null,
             name: null,
             genre: null,
             collaborators: null,
             songs: null,
             loading2: false,
             selectedsongvalue: null,
             selecedlistvalue: null,
             songsListfromApi: [],
        })
    }

    handleSearchSongs = (e) =>{
        this.setState({ selectedsongvalue: e.target.value });
    }

    handleSubmit = (e) =>{
        e.preventDefault();
        // alert("Inisde submit" + this.state.selectedsongvalue);
        var data = {
            song: this.state.selectedsongvalue
          };
        var search_song_list = [];
        var that = this;
        // search for the song by requesting the api
        var request = new Request('http://localhost:4000/api/song', {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(data)
        });

          fetch(request).then((response) => {
            console.log(response);
            if (response.status === 400) throw new Error();
            response.json().then(function (data) {
              if (response.status === 401) this.showError(data.message);
              else if (response.status === 402) this.showError(data.message);
              else {
                var temp_collection = {};

                
                data.message.forEach((row)=>{
                    temp_collection ={
                        code : row.album.images[0].url,
                        album_name: row.album.name,
                        name: row.name,
                        singer: row.artists[0].name,
                        duration: row.duration_ms
                    }
                    search_song_list.push({name: temp_collection.name,
                        value: temp_collection});
                })
                console.log('search_song_list');
                

                that.setState({songsListfromApi: search_song_list});
                console.log(that.state.songsListfromApi);
              }
            })
            .catch((err)=>{
                this.showError(err)
            })
          });



    }

    addSongsToList = (e) =>{
        this.new_list_songs.push(this.state.selecedlistvalue)
        this.new_disp_songs.push(this.state.selecedlistvalue.name)
        this.setState({songs: this.new_disp_songs})
       
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
                    <h3>Songs Link, in comma separated</h3>
                    <form className="playlist-modal-search" onSubmit={(e)=>this.handleSubmit(e)}>
                        <input
                            type="text"
                            placeholder="Enter Song Name"
                            value={this.state.selectedsongvalue}
                            onChange={this.handleSearchSongs}
                        />
                        <Button className="submit-button" type="submit" icon="pi pi-search" />
                        </form>
                    <span className="p-label songlist-textbox">
                        <InputText id="inputtext" value={this.state.songs} />
                    </span>
                    <Button className='submit-add' label="Submit" loading={this.state.loading2} onClick={(e) => this.onLoadingClick2(e)} />
                </div>
                <div className='playlist-search-card'>
                    <div>
                        <ListBox className='songlistbox' value={this.state.selecedlistvalue} options={this.state.songsListfromApi} onChange={(e) => this.setState({ selecedlistvalue: e.value })} optionLabel="name" style={{ width: '29rem' }} />
                        <Button label="Add Song" onClick={(e)=>this.addSongsToList(e)}/>
                    </div>
                    
                </div>
               
                </div>
            </div>
            </Fragment>
        )
    }
}

