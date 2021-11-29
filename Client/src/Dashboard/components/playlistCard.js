import React, { Component } from 'react';
import '../styles.css'

import { Card } from 'primereact/card';
import img_hip from '../public/hiphopMusic.png';
import img_blue from '../public/bluesMusic.png';
import img_rockroll from '../public/rocknrollMusic.png';
import img_rock from '../public/rockMusic.png';
// import PlaylistModal from './playlistModal';


import { Button } from 'primereact/button';


export default class playlistCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      playlistSongsdata: null,
      value: " ",

    };
    this.playlistSongs = [];
    this.conentdata =[];

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.songInfoTemplate = this.songInfoTemplate.bind(this);
  }

  cardHeader = (img_name) => (
    
    <img
      className="play-img"
      alt="Card"
      src={img_name}
    />
  );
  
  getSongsForPlayListCode(){

    if(this.props.fwduser === null) return;
    this.playlistSongs=[];

    var that = this;
      // search for the song by requesting the api
      var req = new Request('http://localhost:4000/playlist/api/getsongsforcode', {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body: JSON.stringify({'user':this.props.fwduser,
                            'code': this.props.playlist.code})
      });
     
      fetch(req)
            .then((res)=> res.json())
              .then(data => {
                console.log('getSongsForPlayListCode'+ data)
                data.forEach((row)=>{
                  var tmp = {
                    songImage: row.code,
                    songTitle: row.name,
                    artist: row.singer,
                    album: row.album_name,
                    time: row.duration
                  }
                  that.playlistSongs.push(tmp);
                  
                })
                that.setState({playlistSongsdata: that.playlistSongs})

            })
            .catch((err)=>{
                // that.showError('Server connection Error');
            })
  }

  millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
  }

  showPlaylistModal = (e) => {
    this.setState({
      show: true
    });
    this.getSongsForPlayListCode();
    // this.songInfoTemplate();
  };

  hidePlaylistModal = (e) => {
    this.setState({
      show: false
    });
  };

  handleSubmit(event) {
    event.preventDefault();
    var data = {
      song: this.state.value
    };
    // search for the song by requesting the api
    var request = new Request('http://localhost:4000/api/song', {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(data)
    });
    var that = this;
    fetch(request).then((response) => {
      console.log(response);
      if (response.status === 400) throw new Error();
      response.json().then(function (data) {
        if (response.status === 401) that.showError(data.message);
        else if (response.status === 402) that.showError(data.message);
        else {
          console.log(data.message);
          let responseImage = data.message[0]['album']['images'][0]['url'];
          let responseAlbum = data.message[0]['album']['name'];
          let responseTitle = data.message[0]['name'];
          let responseArtist = data.message[0]['artists'][0]['name'];
          let responseTime = data.message[0]['duration_ms'];
          let responseLink = data.message[0]['href'];
          let song = {
            songImage: responseImage,
            songTitle: responseTitle,
            artist: responseArtist,
            album: responseAlbum,
            time: responseTime
          };
          that.playlistSongs.push(song);
          that.setState({ value: '' });
        }
      });
    });
    this.setState({ value: '' });
  }

  onClose = (e) => {
    this.setState({show: false})
  };

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  songInfoTemplate(data){

    if(data === undefined || data === null) return;
    console.log('songInfoTemplate')
    console.log('---------- ROWS-------');

    return(data.map((row)=>{
      console.log(row);
      return(
        <div className="song-info-cont">
        <Button icon="pi pi-tick" className="p-button-rounded p-button-info"/>
        <img
          className="song-image"
          alt={row.name}
          src={row.songImage}
          onError={(e) =>
            (e.target.src =
              'https://i.scdn.co/image/ab67616d0000b273cd4fbef085542cb698fd598c')
          }
          />
        <div className="song-title">{row.songTitle}</div>
        <div className="song-artist">{row.artist}</div>
        <div className="song-album">{row.album}</div>
        <div className="song-length">
        {this.millisToMinutesAndSeconds(row.time)}
        </div>
      </div> 
      );
    }));

  }



  render() {
    var img_path;
    if(this.props.playlist.genre === 'bluesMusic')
      img_path = img_blue;
    else if(this.props.playlist.genre === 'rockMusic')
      img_path = img_rock;
    else if(this.props.playlist.genre === 'rocknrollMusic')
      img_path = img_rockroll;
    else if(this.props.playlist.genre === 'soulMusic')
      img_path = img_rock;
    else if(this.props.playlist.genre === 'hiphopMusic')
      img_path = img_hip;


    return (
      <div
      onClick={(e) => {
        if (!this.state.show) {
          this.showPlaylistModal();
        }
      }}
    >
      <Card
        className="container-card toggle-button"
        title={this.props.playlist.name}
        style={{ width: '12em', height: 'auto', margin: '7px','box-shadow': '0 3px 10px rgb(0 0 0 / 60%)',background: 'tomato'}}
        //need user defined image
        header={this.cardHeader(img_path)}
        >
        {this.props.playlist.collaborators.length > 0 && (
          <div>
            Collaborators: {this.props.playlist.collaborators}
          </div>
        )}
      </Card>

      {/* <PlaylistModal 
          onClose={this.hidePlaylistModal}
          show={this.state.show}
          songList = {this.state.playlistSongsdata}
          name_ = {this.props.playlist.name}
        /> */}

        {(this.state.show)?
          <div className= 'playlist-modal-cnt display-block'>
            <div className="search-close-header">
              <form
                className="playlist-modal-search"
                onSubmit={this.handleSubmit}
              >
              <input
                type="text"
                placeholder="Enter Song Name"
                value={this.state.value}
                onChange={this.handleChange}
              />
              <Button
                className="submit-button"
                type="submit"
                icon="pi pi-search"
              />
              </form>
              <Button
                onClick={this.onClose}
                icon="pi pi-times"
                className="modal-close-button"
              />
          </div>
          <div className="playlist-header">
            <h2>
              {this.props.playlist.name}
            </h2>
          </div>
          <div className='song-content-conatiner'>
            <div className="songs-header">
              <div></div>
              <div>Title</div>
              <div>Artist</div>
              <div>Album</div>
              <Button className = "time-header p-disabled" icon = "pi pi-clock"/>
            </div>
            <div className="playlist-content">
             {this.songInfoTemplate(this.state.playlistSongsdata)}
            </div>
          </div>
          </div>
        :
        null
      }

      </div>
    );
  }
}
