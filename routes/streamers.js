const express = require('express');
const router = express.Router();
const {get_streamers} = require('../storage/get_list_of_streamers.js');
const {get_streamer_id} = require('../storage/get_streamer_by_id');
router.get('/', (req, res) => {
    let {page, size} = req.query;
    page = Number(page);
    size = Number(size);
    get_streamers(page, size, (err, data) => {
        if (err) {
            res.status(500);
            res.send(err);
        } else {
            res.send(data);
        }
    });
});
router.get('/:id', (req, res) => {
    const streamer = [req.params.id];
    get_streamer_id(streamer, (err, data) => {
        if (err) {
            res.status(500);
            res.send(err);
        } else {
            res.send(data);
        }
    });
});
module.exports = router;
