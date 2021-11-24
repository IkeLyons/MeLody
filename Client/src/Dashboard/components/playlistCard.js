import React, { Component } from 'react';

import { Card } from 'primereact/card';
import img_hip from '../public/hiphopMusic.png';
import img_blue from '../public/bluesMusic.png';
import img_rockroll from '../public/rocknrollMusic.png';
import img_rock from '../public/rockMusic.png';
import PlaylistModal from './playlistModal';




export default class playlistCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false
    };
  }

  cardHeader = (img_name) => (
    
    <img
      className="play-img"
      alt="Card"
      src={img_name}
    />
  );
  showPlaylistModal = (e) => {
    this.setState({
      show: true
    });
  };

  hidePlaylistModal = (e) => {
    this.setState({
      show: false
    });
  };

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
            Collaborators: {this.props.playlist.collaborators.join(',')}
          </div>
        )}
      </Card>
      <PlaylistModal 
          onClose={this.hidePlaylistModal}
          show={this.state.show}
        />
      </div>
    );
  }
}
