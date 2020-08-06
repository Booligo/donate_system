const express = require('express');
const router = express.Router();
const streamers= require('../Functions/get_list_of_streamers.js');
router.get('/all_streamers', (req, res) => {
    let {page,size} = req.query;
    page = Number(page);
    size = Number(size);
    streamers.get_list_of_streamers(page,size,(err,data) =>{
        if(err){
            res.status(500);
            res.send(err);
        }else
            res.send(data);
    });
});
module.exports = router;
