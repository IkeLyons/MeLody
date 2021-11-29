import React, { Component, Fragment } from 'react';
import { Button } from 'primereact/button';
import '../styles.css';

export default class PlaylistModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      songlist: null
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.songInfoTemplate = this.songInfoTemplate.bind(this);
  }
  componentDidMount() {
    this.setState({ songList: this.props.songList });
  }

  // convert time returned from spotify api from ms to minutes and seconds
  millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
  }

  // searches for a given song title and artist, removes any songs with that combo from playlist songs
  // removeSong(removedSongTitle, removedSongArtist) {
  //   this.playlistSongs = this.playlistSongs.filter(function (el) {
  //     return el.songTitle !== removedSongTitle;
  //   });
  //   this.setState({ value: '' });
  // }

  //creates an entry in the playlistModal containing one song, with the x button to remove that song from the playlist
  songInfoTemplate() {
    console.log(this.props.songList);
    if (this.props.songList === undefined || this.props.songList === null)
      return;
    console.log('songInfoTemplate');
    console.log('---------- ROWS-------');

    return (
      <div>
        {this.props.songList.forEach((row) => {
          console.log(row);
          <div className="song-info-cont">
            <Button
              icon="pi pi-tick"
              className="p-button-rounded p-button-info"
            />
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
          </div>;
        })}
      </div>
    );
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
          <div className="playlist-header">
            <h2>{this.props.name_}</h2>
          </div>
          <div className="song-content-conatiner">
            <div className="songs-header">
              <div></div>
              <div>Title</div>
              <div>Artist</div>
              <div>Album</div>
              <Button className="time-header p-disabled" icon="pi pi-clock" />
            </div>
            <div className="playlist-content">{this.songInfoTemplate()}</div>
          </div>
        </div>
      </Fragment>
    );
  }
}
