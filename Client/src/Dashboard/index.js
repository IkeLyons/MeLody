import React, { Component, Fragment } from 'react';
import { ListBox } from 'primereact/listbox';
import { Link } from 'react-router-dom';
import { Button } from 'primereact/button';
import Header from '../Components/Header.js';
import PlaylistCard from './components/playlistCard.js';

import './styles.css';
import img_path from './public/logo192.png';

export default class index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: 'Mukesh',
      selectedUserPlaylist: null,
      selectedUserForgroupsandFriends: null,
      selectedItem: null,
      playlistCards: [],
      isVisibleUserPlayLists: true,
      isVisibleGroupPlayLists: false,
      isVisibleFriendPlayLists: false
    };

    this.usersPlayLists = {
      Mukesh: [
        {
          name: 'long Drive',
          code: 'LD22',
          genre: 'bluesMusic',
          collaborators: ['IkeLyons']
        },
        {
          name: 'My Workout',
          code: 'MW21',
          genre: 'rockMusic',
          collaborators: ['IkeLyons']
        },
        { name: 'study', code: 'SM56', genre: 'jazzMusic', collaborators: [] },
        {
          name: 'The Big Sleep',
          code: 'GS199',
          genre: 'soulMusic',
          collaborators: ['Tabitha', 'IceJJFish']
        },
        {
          name: 'PaRTy Night',
          code: 'PM17',
          genre: 'rocknrollMusic',
          collaborators: ['Tabitha', 'IceJJFish', 'Brandon']
        },
        {
          name: 'Running',
          code: 'RN77',
          genre: 'hiphopMusic',
          collaborators: []
        },
        {
          name: 'PaRTy Night Friday',
          code: 'PF17',
          genre: 'rocknrollMusic',
          collaborators: ['Brandon']
        },
        {
          name: 'PaRTy Night Sunday',
          code: 'PS17',
          genre: 'rocknrollMusic',
          collaborators: ['Brandon']
        }
      ],
      IkeLyons: [
        {
          name: 'long Drive 2',
          code: 'LD22',
          genre: 'bluesMusic',
          collaborators: []
        },
        {
          name: 'My Workout 2',
          code: 'MW21',
          genre: 'rockMusic',
          collaborators: []
        },
        { name: 'study', code: 'SM56', genre: 'jazzMusic', collaborators: [] },
        {
          name: 'The GoodNight Sleep 2',
          code: 'GS199',
          genre: 'soulMusic',
          collaborators: []
        },
        {
          name: 'PaRTy Night 2',
          code: 'PM17',
          genre: 'rocknrollMusic',
          collaborators: []
        },
        {
          name: 'Running 2',
          code: 'RN77',
          genre: 'hiphopMusic',
          collaborators: []
        },
        {
          name: 'PaRTy Night Friday 2',
          code: 'PF17',
          genre: 'rocknrollMusic',
          collaborators: []
        },
        {
          name: 'PaRTy Night Sunday 2',
          code: 'PS17',
          genre: 'rocknrollMusic',
          collaborators: []
        }
      ]
    };
    this.groupUsersList = [
      { name: 'Group1', code: 'G1' },
      { name: 'Group2', code: 'G2' },
      { name: 'Group3', code: 'G3' },
      { name: 'Group4', code: 'G4' }
    ];

    this.friendUsersList = [
      { name: 'IkeLyons', code: 'IK' },
      { name: 'Tabitha', code: 'TB' },
      { name: 'Brandon', code: 'BD' },
      { name: 'IceJJFish', code: 'IJ' }
    ];

    this.userPlaylistTemplate = this.userPlaylistTemplate.bind(this);
    this.cardPlaylistTemplate = this.cardPlaylistTemplate.bind(this);
    this.userSearchModule = this.userSearchModule.bind(this);
    this.setUserPlayLists = this.setUserPlayLists.bind(this);
    this.setGroupsPlayLists = this.setGroupsPlayLists.bind(this);
    this.setFriendsPlayLists = this.setFriendsPlayLists.bind(this);
  }

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

  cardPlaylistTemplate(selected_user_name) {
    if (selected_user_name === null) return;

    if (typeof selected_user_name !== 'string') {
      console.log(typeof selected_user_name);
      console.log(Object.values(selected_user_name)[0]);
    }

    var data_playlists = this.usersPlayLists;
    var temp_data = [];

    Object.entries(data_playlists).forEach(([k, v]) => {
      // console.log(selected_user_name);
      if (k === selected_user_name) {
        temp_data.push(v);
      }
    });

    if (temp_data.length === 0) return;

    let allPlaylists = [];
    temp_data[0].forEach((d) => {
      allPlaylists.push(d);
    });
    return allPlaylists.map((playlist) => {
      return <PlaylistCard key={playlist.code} playlist={playlist} />;
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
    // this.setState({selectedUserPlaylist:'Mukesh'});
    this.setState({
      isVisibleUserPlayLists: true,
      isVisibleGroupPlayLists: false,
      isVisibleFriendPlayLists: false,
      selectedUserPlaylist: 'Mukesh'
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
    this.setState({
      isVisibleUserPlayLists: false,
      isVisibleGroupPlayLists: false,
      isVisibleFriendPlayLists: true
    });
  };

  render() {
    return (
      <Fragment>
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
                  {' '}
                  <Link
                    to={'/Melody/ProfileView'}
                    className="pi pi-user"
                  ></Link>
                </span>
              </div>
              <span className="container-playlistcard">
                {this.cardPlaylistTemplate(this.state.selectedUserPlaylist)}
              </span>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}
