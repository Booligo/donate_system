const express = require('express');
const router = express.Router();
const  streamer_id = require('../Functions/get_streamer_by_id');

router.get('/all_streamers/:id', (req, res) => {
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
