import React, { Component, Fragment } from 'react';
import { ListBox } from 'primereact/listbox';
import { Link } from 'react-router-dom';
import PlaylistCard from './components/playlistCard.js';
import Header from '../Components/Header.js';
import { Messages } from 'primereact/messages';

import './styles.css';
import img_path from './public/logo192.png';
import Footer from '../Components/Footer.js';

// The main component of the Dashboard, which displays friends, groups, and playlists
export default class index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: localStorage.getItem('username'),
      selectedUserPlaylist: null,
      selectedUserForgroupsandFriends: null,
      selectedItem: null,
      playlistCards: [],
      isVisibleUserPlayLists: true,
      isVisibleGroupPlayLists: false,
      isVisibleFriendPlayLists: false
    };
    this.usersPlayLists = {};
    this.groupUsersList = [
      { name: 'Group1', code: 'G1' },
      { name: 'Group2', code: 'G2' },
      { name: 'Group3', code: 'G3' },
      { name: 'Group4', code: 'G4' }
    ];
    this.fwduser = null;

    this.friendUsersList = [];

    this.userPlaylistTemplate = this.userPlaylistTemplate.bind(this);
    this.cardPlaylistTemplate = this.cardPlaylistTemplate.bind(this);
    this.userSearchModule = this.userSearchModule.bind(this);
    this.setUserPlayLists = this.setUserPlayLists.bind(this);
    this.setGroupsPlayLists = this.setGroupsPlayLists.bind(this);
    this.setFriendsPlayLists = this.setFriendsPlayLists.bind(this);
    this.getFriendsUserList = this.getFriendsUserList.bind(this);
    this.getusersPlayLists = this.getusersPlayLists.bind(this);
    this.showError = this.showError.bind(this);
  }

  componentDidMount() {
    if (localStorage.getItem('username') !== null) this.getFriendsUserList();
  }
  showError(strerr) {
    this.msgs1.show([
      {
        severity: 'error',
        summary: 'Server Error :',
        detail: strerr,
        sticky: true
      }
    ]);
  }
  getFriendsUserList = () => {
    var user = localStorage.getItem('username');
    var that = this;
    var data = {
      user: user,
      name: that.state.name,
      code: that.state.code,
      genre: that.state.genre,
      collaborators: that.state.collaborators,
      songs: that.state.songs
    };
    console.log(data);

    var api_link = 'http://localhost:4000/api/app/getUsers';

    fetch(api_link)
      .then((res) => {
        res
          .json()
          .then((data) => {
            Object.entries(data).forEach(([k, v]) => {
              this.friendUsersList.push({
                name: v.user_name,
                code: v.user_name
              });
            });
            console.log(this.friendUsersList);
          })
          .catch((err) => {
            that.showError('Server connection Error');
          });
      })
      .catch((err) => {
        that.showError('Server connection Error');
      });
  };
  getusersPlayLists = () => {
    var api_link = 'http://localhost:4000/playlist/api/getUserPlaylist';
    var user_value =
      this.state.selectedUserPlaylist === null
        ? this.state.username
        : this.state.selectedUserPlaylist;

    var data = {
      user: user_value
    };

    // this.setState({fwduser: user_value});
    var req = new Request(api_link, {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(data)
    });

    fetch(req)
      .then((res) => res.json())
      .then((data) => {
        var final = {};
        var temp_arr = [];
        var user_tmep = '';
        for (var i = 0; i < data.length; i++) {
          user_tmep = data[i].user;
          const newObj = {
            code: data[i].code,
            genre: data[i].genre,
            name: data[i].name,
            collaborators: data[i].collaborators
          };
          temp_arr.push(newObj);
        }
        final[user_tmep] = temp_arr;

        this.usersPlayLists = final;
        console.log(final);
        console.log(this.usersPlayLists);
      })
      .catch((err) => {
        // that.showError('Server connection Error');
      });
  };

  userPlaylistTemplate(option) {
    return (
      <div className="user-item">
        <img
          className="user-image"
          alt={option.name}
          src={img_path}
          onError={(e) =>
            (e.target.src =
              'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png')
          }
        />
        <div>{option.name}</div>
      </div>
    );
  }

  // Returns all of the playlist cards for the inputed username
  cardPlaylistTemplate(selected_user_name) {
    if (selected_user_name === null || selected_user_name === undefined) return;

    if (typeof selected_user_name !== 'string') {
      console.log(typeof selected_user_name);
      console.log(Object.values(selected_user_name)[0]);
    }

    this.getusersPlayLists();
    var data_playlists = this.usersPlayLists;
    var temp_data = [];

    Object.entries(data_playlists).forEach(([k, v]) => {
      console.log(selected_user_name);
      if (k === selected_user_name) {
        temp_data.push(v);
      }
    });

    if (temp_data.length === 0) return;

    let allPlaylists = [];
    temp_data[0].forEach((d) => {
      allPlaylists.push(d);
    });
    console.log('allPlaylists');
    console.log(allPlaylists);
    return allPlaylists.map((playlist) => {
      return (
        <PlaylistCard
          key={playlist.code}
          playlist={playlist}
          fwduser={selected_user_name}
        />
      );
    });
  }

  userSearchModule(listofplaylists) {
    console.log(listofplaylists);
    return (
      <div className="cnt-selectuser">
        <ListBox
          value={this.state.selectedUserForgroupsandFriends}
          options={listofplaylists}
          onChange={(e) =>
            this.setState({ selectedUserForgroupsandFriends: e.value })
          }
          filter
          optionLabel="name"
          itemTemplate={this.userPlaylistTemplate}
          style={{ width: '15rem' }}
          listStyle={{ maxHeight: '40em' }}
        />
      </div>
    );
  }

  setUserPlayLists = (e) => {
    e.preventDefault();

    this.setState({
      isVisibleUserPlayLists: true,
      isVisibleGroupPlayLists: false,
      isVisibleFriendPlayLists: false,
      selectedUserPlaylist: this.state.username
    });
  };
  setGroupsPlayLists = (e) => {
    e.preventDefault();

    this.setState({
      isVisibleUserPlayLists: false,
      isVisibleGroupPlayLists: true,
      isVisibleFriendPlayLists: false
    });
    // console.log('In Group' + this.state.isVisibleGroupPlayLists);
  };
  setFriendsPlayLists = (e) => {
    e.preventDefault();

    console.log('In Friend');
    // console.log(e.target.alt);
    this.setState({
      isVisibleUserPlayLists: false,
      isVisibleGroupPlayLists: false,
      isVisibleFriendPlayLists: true,
      selectedUserPlaylist: e.target.alt
    });
  };

  render() {
    return (
      <Fragment>
        <Header stitle={'Dashboard'} />
        <Messages ref={(el) => (this.msgs1 = el)} />
        <div className="container-main">
          <div className="container-side">
            <div
              className="side-link-block"
              onClick={(e) => this.setUserPlayLists(e)}
            >
              <div>
                <span>{this.state.username}</span>
              </div>
            </div>
            <div
              className="side-link-block"
              onClick={(e) => this.setGroupsPlayLists(e)}
            >
              <div>
                <span>Groups</span>
              </div>
              <span>
                {' '}
                {this.state.isVisibleGroupPlayLists
                  ? this.userSearchModule(this.groupUsersList)
                  : null}
              </span>
            </div>
            <div className="side-link-block" onClick={this.setFriendsPlayLists}>
              <div>
                <span>Friends</span>
              </div>
              <span>
                {' '}
                {!this.state.isVisibleFriendPlayLists
                  ? null
                  : this.userSearchModule(this.friendUsersList)}
              </span>
            </div>
          </div>
          <div className="container-dash">
            <div className="cnt-alllists">
              <div className="cnt-listheader">
                <span>
                  <p>My Playlists</p>
                </span>
                <span>
                  <Link
                    to={'/Melody/ProfileView'}
                    className="pi pi-user-edit"
                  ></Link>
                </span>
                <span>
                  <Link
                    to={'/Melody/AddPlaylist'}
                    className="pi pi-calendar-plus"
                  ></Link>
                </span>
              </div>
              <span className="container-playlistcard">
                {this.cardPlaylistTemplate(this.state.selectedUserPlaylist)}
              </span>
            </div>
          </div>
        </div>
        <Footer />
      </Fragment>
    );
  }
}
