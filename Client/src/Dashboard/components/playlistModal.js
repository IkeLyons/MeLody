import React, { Component, Fragment } from 'react';
import { Button } from 'primereact/button';

export default class PlaylistModal extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    console.log(this.props.children);
  }
  onClose = (e) => {
    this.props.onClose && this.props.onClose(e);
  };
  render() {
    const showHideClassName = this.props.show
      ? 'playlist-modal-cnt display-block'
      : 'playlist-modal-cnt display-none';
    return (
      <Fragment>
        <div className={showHideClassName}>
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
