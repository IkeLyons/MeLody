import express from 'express';
import { createRequire } from 'module';
import playlistcollection from '../DB/models/playlistcollection.js'

const require = createRequire(import.meta.url);
const router = express.Router();
var pass = {
    message: 'OK'
  };
  
  var error_message = {
    message: 'Request Service Error.'
  };


router.post('/api/addUserPlaylist',(req,res)=>{
    var req_data = req.body;
    console.log(req_data);
    if (req_data.name.length === 0) res.status(400).send(error_message);
    
  playlistcollection.findOne({code: req_data.code, user: req_data.user,})
  .then((result)=>{
      
    if(result === null){
      var name_list = [];
      name_list.push(req_data.user);
      if(req_data.collaborators !== null){
        for(var ele of req_data.collaborators.split(","))
          name_list.push(ele.trim());
      }
      
      

      for(var each_name of name_list){
        console.log("name_list " + each_name);
        const newlist = new playlistcollection({
          user: each_name,
          code: req_data.code,
          name: req_data.name,
          genre: req_data.genre,
          collaborators: req_data.collaborators,
          songs: req_data.songs,
  
        })
        console.log('result ' + newlist);
        newlist.save()
      }
      res.status(200).send(pass);
    }
    else{
      res.status(409).send("Playlist with same code alrealy exists!!!");
    }
  })
  .catch((err)=>{
      console.log(err);
  })
});

router.post('/api/getUserPlaylist',(req,res)=>{
  var request = req.body;

  playlistcollection.find({user: request.user})
    .then((result)=>{
      console.log((result[0]));
      res.status(200).send(result);
    })
    .catch((err)=>{
      res.status(400).send(error_message);
    })
});
export default router;
