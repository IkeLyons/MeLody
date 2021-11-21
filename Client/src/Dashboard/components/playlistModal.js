import React, { Component, Fragment } from 'react';
import { Button } from 'primereact/button';

export default class PlaylistModal extends Component {
  constructor(props) {
    super(props);

    this.state = { value: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              placeholder="Enter Song Name"
              value={this.state.value}
              onChange={this.handleChange}
            />
            <input type="submit" value="Submit" />
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
