import React, { Component } from 'react';

export default class SongInfoBar extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  }

  render() {
    return (
      <div className="song-info-cont">
        <img
          className="song-image"
          alt={this.props.song.name}
          src={this.props.song.songImage}
          onError={(e) =>
            (e.target.src =
              'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png')
          }
        />
        <div className="song-title">{this.props.song.songTitle}</div>
        <div className="song-artist">{this.props.song.artist}</div>
        <div className="song-album">{this.props.song.album}</div> 
        <div className="song-length">{this.millisToMinutesAndSeconds(this.props.song.time)}</div>
      </div>
    );
  }
}
