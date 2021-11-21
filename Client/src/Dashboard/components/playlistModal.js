import React, { Component, Fragment } from 'react';
import { Button } from 'primereact/button';

export default class PlaylistModal extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  onClose = (e) => {
    this.props.onClose();
  };
  render() {
    const showHideClassName = this.props.show
      ? 'playlist-modal-cnt display-block'
      : 'playlist-modal-cnt display-none';
    console.log(showHideClassName);
    return (
      <Fragment>
        <div className={showHideClassName}>
          <form>
            <input type="text" placeholder="Enter Song Name" />
            <input type="button" value="search" />
          </form>
          <div className="playlist-content">{this.props.children}</div>
          <div className="actions" onClick={this.onClose}>
            <Button
              icon="pi pi-times"
              className="modal-close-button p-button-rounded p-button-help p-button-outlined"
            />
          </div>
        </div>
      </Fragment>
    );
  }
}
