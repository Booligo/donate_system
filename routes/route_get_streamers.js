const express = require('express');
const router = express.Router();
const route_get_streamers= require('../functions/get_list_of_streamers.js');
router.get('/streamers', (req, res) => {
    let {page,size} = req.query;
    page = Number(page);
    size = Number(size);
    route_get_streamers.get_list_of_streamers(page,size,(err, data) =>{
        if(err){
            res.status(500);
            res.send(err);
        }else
            res.send(data);
    });
});
module.exports = router;
