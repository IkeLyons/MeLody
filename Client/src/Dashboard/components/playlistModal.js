import React, { Component, Fragment } from 'react';
import { Button } from 'primereact/button';

export default class PlaylistModal extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  onClose = (e) => {
    this.props.onClose && this.props.onClose(e);
  };
  render() {
    if (!this.props.show) {
      return null;
    }
    return (
      <Fragment>
        <div className="playlist-modal-cnt">
          <div className="playlist-content">{this.props.children}</div>
          <div className="actions">
            <Button
              icon="pi pi-times"
              className="modal-close-button p-button-rounded p-button-help p-button-outlined"
              onClick={this.onClose}
            />
          </div>
        </div>
      </Fragment>
    );
  }
}
