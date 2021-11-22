import React, { Component, Fragment } from 'react';
import SongInfoBar from './songInfoBar.js';
import { Button } from 'primereact/button';
import playlist_img from '../public/hip.png';
import img_dummy from '../public/logo192.png';
import SpotifySong from './spotifySong.js'

export default class PlaylistModal extends Component {
  constructor(props) {
    super(props);

    this.state = { value: '' };
    this.playlistData = {
      image: '',
      name: 'longDrive'
    };
    this.playlistSongs = [
      { songImage: '', songTitle: 'The Show Goes On', artist: 'Lupe Fiasco' },
      { songImage: '', songTitle: 'The Show Goes On', artist: 'Lupe Fiasco' },
      { songImage: '', songTitle: 'All of the Lights', artist: 'Kanye West' }
    ];
    this.spotifySongs = [];

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.songInfoTemplate = this.songInfoTemplate.bind(this);
  }

  songInfoTemplate(option) {
    var data_songs = this.playlistSongs;
    return data_songs.map((song) => {
      return <SongInfoBar song={song} />;
    });
  }

  addPlaylistSong(song) {
    this.playlistSongs.push(song);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

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
          let responseTitle = data.message[0]["name"];
          let responseArtist = data.message[0]["artists"][0]["name"];
          let responseLink = data.message[0]["href"];
          let song = {songImage: '', songTitle: responseTitle, artist: responseArtist};
          that.playlistSongs.push(song);
          that.setState({ value:'' });
        }
      });
    });
    this.setState({ value: '' });
  }

  onClose = (e) => {
    this.props.onClose();
  };

  render() {
    const showHideClassName = this.props.show
      ? 'playlist-modal-cnt display-block'
      : 'playlist-modal-cnt display-none';
    return (
      <Fragment>
        <div className={showHideClassName}>
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
          <div className="playlist-header">Playlist Image and Title</div>
          <div className="playlist-content">
            {this.songInfoTemplate(this.state.playlistSongs)}
          </div>
        </div>
      </Fragment>
    );
  }
}
