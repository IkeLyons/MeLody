import React, { Component, Fragment } from 'react';
import { ListBox } from 'primereact/listbox';
import { Link } from 'react-router-dom';
import PlaylistCard from './components/playlistCard.js';
import Header from '../Components/Header.js';
import { Messages } from 'primereact/messages';


import './styles.css';
import img_path from './public/logo192.png';

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
    this.usersPlayLists = {}

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
        { name: 'study', code: 'SM56', genre: 'bluesMusic', collaborators: [] },
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
      Ike: [
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
        { name: 'study', code: 'SM56', genre: 'bluesMusic', collaborators: [] },
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
        }
      ]};
    this.groupUsersList = [
      { name: 'Group1', code: 'G1' },
      { name: 'Group2', code: 'G2' },
      { name: 'Group3', code: 'G3' },
      { name: 'Group4', code: 'G4' }
    ];

    this.friendUsersList = [];

    this.userPlaylistTemplate = this.userPlaylistTemplate.bind(this);
    this.cardPlaylistTemplate = this.cardPlaylistTemplate.bind(this);
    this.userSearchModule = this.userSearchModule.bind(this);
    this.setUserPlayLists = this.setUserPlayLists.bind(this);
    this.setGroupsPlayLists = this.setGroupsPlayLists.bind(this);
    this.setFriendsPlayLists = this.setFriendsPlayLists.bind(this);
    this.getFriendsUserList =  this.getFriendsUserList.bind(this);
    this.getusersPlayLists = this.getusersPlayLists.bind(this);
    this.showError = this.showError.bind(this);
  }

  componentDidMount(){
    if(localStorage.getItem('username') !== null)
      this.getFriendsUserList();
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
  getFriendsUserList=()=>{
    var user = localStorage.getItem('username')
    var that = this;
    var data = {
            'user': user,
            'name': that.state.name,
            'code': that.state.code,
            'genre':that.state.genre,
            'collaborators': that.state.collaborators,
            'songs': that.state.songs
        }
    console.log(data);

      var api_link = 'http://localhost:4000/api/app/getUsers';

      fetch(api_link)
        .then((res)=>{
            
            res.json().then((data)=>{
              Object.entries(data).forEach(([k, v]) => {
                this.friendUsersList.push({'name': v.user_name, 'code': v.user_name})
              })
              console.log(this.friendUsersList);
            })
            .catch((err)=>{
              that.showError('Server connection Error');
            })
        })
        .catch((err)=>{
            that.showError('Server connection Error');
        })

}
  getusersPlayLists = () =>{

    alert("here");
    var api_link = 'http://localhost:4000/playlist/api/getUserPlaylist';
    var data = {
      'user' : (this.state.selectedUserPlaylist === null ? this.state.username : this.state.selectedUserPlaylist)
    }
    var req = new Request(api_link, {
            method: 'POST',
            headers: new Headers({ 'Content-Type': 'application/json' }),
            body: JSON.stringify(data)
          });

          fetch(req)
            .then((res)=> res.json())
              .then(data => {

                var final = {};
                var temp_arr =[];
                var user_tmep = ""
                for(var i = 0; i < data.length; i++){
                  user_tmep = data[i].user;
                  var newObj = {
                    code: data[i].code,
                    genre: data[i].genre,
                    name: data[i].name,
                    collaborators: data[i].collaborators
                  }
                  temp_arr.push(newObj);
                }
                final[user_tmep] = temp_arr

                this.usersPlayLists = final

            })
            .catch((err)=>{
                // that.showError('Server connection Error');
            })
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

  // Returns all of the playlist cards for the inputed username
  cardPlaylistTemplate(selected_user_name) {
    
    if (selected_user_name === null || selected_user_name === undefined) return;

    if (typeof selected_user_name !== 'string') {
      console.log(typeof selected_user_name);
      console.log(Object.values(selected_user_name)[0]);
    }

    // this.getusersPlayLists();
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
    console.log('this.usersPlayLists '+ allPlaylists);
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
        <Header stitle={'Dashboard'}/>
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
                  <p>MY Playlists</p>
                </span>
                <span>
                  <Link to={'/Melody/ProfileView'} className="pi pi-user-edit"></Link>
                </span>
                <span>
                  <Link to={'/Melody/AddPlaylist'} className="pi pi-calendar-plus"></Link>
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
