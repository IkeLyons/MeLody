import React, { Component } from 'react';

import PlaylistModal from './playlistModal.js';
import { Card } from 'primereact/card';
import img_hip from '../public/hip.png';

export default class playlistCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: true
    };
  }

  cardHeader = (img_name) => (
    <img
      className="play-img"
      alt="Card"
      src={img_name}
      onError={(e) =>
        (e.target.src =
          'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png')
      }
    />
  );

  showPlaylistModal = e => {
    this.setState({
      show: !this.state.show
    });
  };

  render() {
    return (
      <div>
        <Card
          className="container-card toggle-button"
          title={this.props.playlist.name}
          style={{ width: '12em', height: 'auto', margin: '7px' }}
          //need user defined image
          header={this.cardHeader(img_hip)}
          onClick = {e => {this.showPlaylistModal();}}
        >
          {this.props.playlist.collaborators.length > 0 && (
            <div>
              Collaborators: {this.props.playlist.collaborators.join(', ')}
            </div>
          )}
        </Card>
        <PlaylistModal onClose={this.showPlaylistModal} show={this.state.show}/>
      </div>
    );
  }
}
