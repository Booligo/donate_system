const express = require('express');
const router = express.Router();
const streamers= require('../storage/get_list_of_streamers.js');
const  streamer_id = require('../storage/get_streamer_by_id');

router.get('/', (req, res) => {
    let {page,size} = req.query;
    page = Number(page);
    size = Number(size);
    streamers.get_list_of_streamers(page,size,(err, data) =>{
        if(err){
            res.status(500);
            res.send(err);
        }else
            res.send(data);
    });
});

router.get('/:id', (req, res) => {
    const streamer = [req.params.id];
    streamer_id.get_streamer_dy_id(streamer,(err, data) =>{
        if(err){
            res.status(500);
            res.send(err);
        }else
            res.send(data);
    });
});
module.exports = router;
