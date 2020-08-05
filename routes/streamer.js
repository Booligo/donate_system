const express = require('express');
const router = express.Router();
const get_streamer = require('../functions/get_id');

router.get('/all_streamers/:id', (req, res) => {
    const streamer = [req.params.id];
    get_streamer.get_id(streamer,(err, data) =>{
        if(err){
            res.status(500);
            res.send(err);
        }else
            res.send(data);
    });
});
module.exports = router;
