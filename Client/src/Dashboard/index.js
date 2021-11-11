import React, { Component, Fragment } from 'react'
import { ListBox } from 'primereact/listbox';
import { Link } from 'react-router-dom';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import Header from '../Components/Header.js';



import './styles.css'
import img_path from './public/logo192.png'
import img_rock from './public/ironmaiden_rock.jpeg'
import img_jazz from './public/jazz.png'
import img_soul from './public/soul.jpeg'
import img_hip from './public/hip.png'
import img_rnr from './public/rnr.jpeg'




export default class index extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             username: 'Mukesh',
             selectedUserPlaylist: null,
             selectedUserForgroupsandFriends: null,
             selectedItem: null,
             data_cards: [],
             isVisibleUserPlayLists:true,
             isVisibleGroupPlayLists:false,
             isVisibleFriendPlayLists:false,

        }
        
        this.usersPlayLists = {
            'Mukesh':[
                { name: 'long Drive', code: 'LD22',genre:'bluesMusic' },
                { name: 'My Workout', code: 'MW21',genre:'rockMusic' },
                { name: 'study', code: 'SM56',genre:'jazzMusic' },
                { name: 'The GoodNight Sleep', code: 'GS199',genre:'soulMusic' },
                { name: 'PaRTy Night', code: 'PM17',genre:'rocknrollMusic' },
                { name: 'Running', code: 'RN77',genre:'hiphopMusic' },
                { name: 'PaRTy Night Friday', code: 'PF17',genre:'rocknrollMusic' },
                { name: 'PaRTy Night Sunday', code: 'PS17',genre:'rocknrollMusic' },
            ],
            'IkeLyons':[
                { name: 'long Drive', code: 'LD22',genre:'bluesMusic' },
                { name: 'My Workout', code: 'MW21',genre:'rockMusic' },
                { name: 'study', code: 'SM56',genre:'jazzMusic' },
                { name: 'The GoodNight Sleep', code: 'GS199',genre:'soulMusic' },
                { name: 'PaRTy Night', code: 'PM17',genre:'rocknrollMusic' },
                { name: 'Running', code: 'RN77',genre:'hiphopMusic' },
                { name: 'PaRTy Night Friday', code: 'PF17',genre:'rocknrollMusic' },
                { name: 'PaRTy Night Sunday', code: 'PS17',genre:'rocknrollMusic' },
            ]

        };
        this.groupUsersList = [
            { name: 'Group1', code: 'G1' },
            { name: 'Group2', code: 'G2' },
            { name: 'Group3', code: 'G3' },
            { name: 'Group4', code: 'G4' },
        ];

        this.friendUsersList = [
            { name: 'IkeLyons', code: 'IK' },
            { name: 'Tabitha', code: 'TB' },
            { name: 'Brandon', code: 'BD' },
            { name: 'IceJJFish', code: 'IJ' },
        ];


        this.userPlaylistTemplate = this.userPlaylistTemplate.bind(this);
        this.cardPlaylistTemplate = this.cardPlaylistTemplate.bind(this);
        this.userSearchModule = this.userSearchModule.bind(this);
        this.setUserPlayLists = this.setUserPlayLists.bind(this);
        this.setGroupsPlayLists = this.setGroupsPlayLists.bind(this);
        this.setFriendsPlayLists = this.setFriendsPlayLists.bind(this);
    }

    // componentDidMount(){
    //     this.setState({username: localStorage.getItem('username')})
    // }
    userPlaylistTemplate(option) {
        return (
            <div className="user-item">
                <img className="user-image"  alt={option.name} src={img_path}
                    onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} 
                />
                <div>{option.name}</div>
            </div>
        );
    }


    cardHeader = (img_name)=>(
        <img className='play-img' alt="Card" src={img_name} onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} />
    );
    cardPlaylistTemplate(selected_user_name){
        
        if(selected_user_name === null) return;

        
        if(typeof(selected_user_name) !== 'string') {
            console.log(typeof(selected_user_name));
            console.log((Object.values(selected_user_name)[0]));
        }
        

        var data_playlists = this.usersPlayLists;

        
        var temp_data = [];
        var blues = [];
        var rock = [];
        var jazz = [];
        var rocknroll = [];
        var soul = [];
        var hip = [];
 
        Object.entries(data_playlists).forEach(([k,v])=>{
            // console.log(selected_user_name);
            if(k === selected_user_name){
                temp_data.push(v);
            }
        });
        
        if(temp_data.length === 0) return;

        temp_data[0].forEach((d)=>{
            // console.log(d.genre);
            if(d.genre === 'bluesMusic') blues.push(d);
            else if(d.genre === 'rockMusic') rock.push(d);
            else if(d.genre === 'jazzMusic') jazz.push(d);
            else if(d.genre === 'soulMusic') soul.push(d);
            else if(d.genre === 'rocknrollMusic') rocknroll.push(d);
            else if(d.genre === 'hiphopMusic') hip.push(d);
        })

        return(

            <span className='container-playlistcard'>
                {
                rock.map(d=>(
                <Card className="container-card" title={d.name} 
                    subTitle={"Genre: "+d.genre}
                    style={{ width: '12em', height:'auto',margin: '7px' }} 
                    header={this.cardHeader(img_rock)}>
                    </Card>))
                }
                {
                jazz.map(d=>(
                <Card className="container-card" title={d.name} 
                    subTitle={"Genre: "+d.genre}
                    style={{ width: '12em', height:'auto',margin: '7px' }} 
                    header={this.cardHeader(img_jazz)}>
                    </Card>))
                }
                {
                soul.map(d=>(
                <Card className="container-card" title={d.name} 
                    subTitle={"Genre: "+d.genre}
                    style={{ width: '12em', height:'auto',margin: '7px' }} 
                    header={this.cardHeader(img_soul)}>
                    </Card>))
                }
                {
                rocknroll.map(d=>(
                <Card className="container-card" title={d.name} 
                    subTitle={"Genre: "+d.genre}
                    style={{ width: '12em', height:'auto',margin: '7px' }} 
                    header={this.cardHeader(img_rnr)}>
                    </Card>))
                }
                {
                hip.map(d=>(
                <Card className="container-card" title={d.name} 
                    subTitle={"Genre: "+d.genre}
                    style={{ width: '12em', height:'auto',margin: '7px' }} 
                    header={this.cardHeader(img_hip)}>
                    </Card>))
                }
            </span>
        )
    }
    userSearchModule(listofplaylists){
        
        console.log(listofplaylists);
        return(
            <div className='cnt-selectuser'>
                <ListBox value={this.state.selectedUserForgroupsandFriends} 
                options={listofplaylists} 
                onChange={(e) => this.setState({ selectedUserForgroupsandFriends: e.value })} 
                filter optionLabel="name"
                itemTemplate={this.userPlaylistTemplate} style={{ width: '15rem' }} 
                listStyle={{ maxHeight: '40em' }} 
                />
            </div>
        );
    }

    setUserPlayLists = (e) =>{
        e.preventDefault();
        // this.setState({selectedUserPlaylist:'Mukesh'});
        this.setState({isVisibleUserPlayLists: true,
            isVisibleGroupPlayLists: false,
            isVisibleFriendPlayLists: false,
            selectedUserPlaylist:'Mukesh'}
            );

    }
    setGroupsPlayLists = (e) =>{
        e.preventDefault();
        
        this.setState({isVisibleUserPlayLists: false,
            isVisibleGroupPlayLists: true,
            isVisibleFriendPlayLists: false});
        // console.log('In Group' + this.state.isVisibleGroupPlayLists);
    }
    setFriendsPlayLists =(e) =>{
        e.preventDefault();
        console.log('In Friend');
        this.setState({isVisibleUserPlayLists: false,
            isVisibleGroupPlayLists: false,
            isVisibleFriendPlayLists: true});
    }

    
    
    render() {
        var that = this;
        return (
            <Fragment>
                <div className='container-main'>
                    <div className='container-side'>
                        <div className='side-link-block'onClick={(e) => this.setUserPlayLists(e)} >
                            <div><span >{this.state.username}</span></div>
                        </div>
                        <div className='side-link-block' onClick={(e) => this.setGroupsPlayLists(e)}>
                            <div><span >Groups</span></div>
                            <span> {this.state.isVisibleGroupPlayLists ? this.userSearchModule(this.groupUsersList) : null}</span>
                        </div>
                        <div className='side-link-block' onClick={this.setFriendsPlayLists}>
                            <div><span >Friends</span></div>
                            <span> {!this.state.isVisibleFriendPlayLists ? null : this.userSearchModule(this.friendUsersList)}</span>
                        </div>
                    </div>
                    <div className='container-dash'>
                        <div className='cnt-alllists'>
                            <div className='cnt-listheader'>
                                <span><p>MY Playlists</p></span>
                                <span> <Link to={'/AddNewPlayList/'} className='pi pi-calendar-plus'></Link></span>
                            </div>
                            {
                                (this.state.isVisibleUserPlayLists) ?
                                    this.cardPlaylistTemplate(this.state.selectedUserPlaylist) :
                                    this.cardPlaylistTemplate(this.state.selectedUserForgroupsandFriends)
                            }
                    
                        </div>
                        
                    </div>
                </div>
            </Fragment>

        )
    }
}
