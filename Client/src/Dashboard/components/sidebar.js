// import React, { Component } from 'react'
// import './sidebar.css'

// export default class sidebar extends Component {
//     constructor(props) {
//         super(props)
    
//         this.state = {
//              username: 'Mukesh',
//              isVisibleUserPlayLists:false,
//              isVisibleGroupsPlayLists:false,
//              isVisibleFriendsPlayLists:false,

//         }
//     }
//     // componentDidMount(){
//     //     this.setState({username: localStorage.getItem('username')})
//     // }

//     setUserPlayLists = (event) =>{
//         event.preventDefault();
//         this.setState({
//             isVisibleUserPlayLists:true,
//             isVisibleGroupsPlayLists:false,
//             isVisibleFriendsPlayLists:false,
//         })
//     }

//     render() {
//         return (
//             <div className='container-side'>
//                 <div className='side-link-block'>
//                     <span onClick={this.setUserPlayLists}>{this.state.username}</span>
//                 </div>
//                 <div className='side-link-block'>
//                     <span onClick={this.setGroupsPlayLists}>Groups</span>
//                 </div>
//                 <div className='side-link-block'>
//                 <span onClick={this.setFriendsPlayLists}>Friends</span>
//                 </div>
//             </div>
//         )
//     }
// }
