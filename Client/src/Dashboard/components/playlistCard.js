import React, { Component } from 'react';

import PlaylistModal from './playlistModal.js';
import { Card } from 'primereact/card';
import img_hip from '../public/hip.png';

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
      onError={(e) =>
        (e.target.src =
          'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png')
      }
    />
  );

  showPlaylistModal = (e) => {
    console.log('show');
    this.setState({
      show: true
    });
  };

  hidePlaylistModal = (e) => {
    console.log('hide');
    this.setState({
      show: false
    });
    console.log(this.state.show);
  };

  render() {
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
          style={{ width: '12em', height: 'auto', margin: '7px' }}
          //need user defined image
          header={this.cardHeader(img_hip)}
        >
          {this.props.playlist.collaborators.length > 0 && (
            <div>
              Collaborators: {this.props.playlist.collaborators.join(', ')}
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
