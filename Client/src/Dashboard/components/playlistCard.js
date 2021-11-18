import React, { Component } from 'react';

import { Card } from 'primereact/card';
import img_hip from '../public/hip.png';

export default class playlistCard extends Component {
  constructor(props) {
    super(props);

    this.state = {};
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

  render() {
    return (
      <Card
        className="container-card"
        title={this.props.playlist.name}
        style={{ width: '12em', height: 'auto', margin: '7px' }}
        header={this.cardHeader(img_hip)}
      >
        {this.props.playlist.collaborators.length > 0 && (
          <div>
            Collaborators: {this.props.playlist.collaborators.join(', ')}
          </div>
        )}
      </Card>
    );
  }
}
