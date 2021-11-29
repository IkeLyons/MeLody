
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const playlistSchema = new Schema({
  user:{
    type:String,
    required: true
  },
  code:{
    type: String,
    required: true
  },
  name:{
      type:String,
      required: true
  },
  genre:{
    type:String,
    required: true
},
  collaborators:{
    type:String,
    required: false
},
  songs:[{}]
},{timestamps: true});

const playlistcollection = mongoose.model('playlistcollection', playlistSchema);


export default playlistcollection;