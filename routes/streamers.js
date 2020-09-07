const express = require('express');
const router = express.Router();
const {get_streamers} = require('../storage/get_list_of_streamers.js');
const {get_streamer_id} = require('../storage/get_streamer_by_id');
const {get_top_donaters} = require('../storage/get_top_donaters_of_streamers');
router.get('/', (req, res) => {
    let {page, size} = req.query;
    page = Number(page);
    size = Number(size);
    get_streamers(page, size).then((data) => {
        res.send(data);
    }).catch((err) => {
        res.status(500);
        res.send(err);
    });
});
router.get('/:id', (req, res) => {
    const streamer = req.params.id;
    get_streamer_id(streamer).then((data) => {
        res.send(data);
    }).catch((err) => {
        res.status(500);
        res.send(err);
    });
});
router.get('/:id/donaters', (req, res) => {
    let {page, size} = req.query;
    page = Number(page);
    size = Number(size);
    const streamer = req.params.id;
    get_top_donaters(page, size, streamer).then((data) => {
        res.send(data);
    }).catch((err) => {
        res.status(500);
        res.send(err);
    });
});
router.get('/:id/statistic', (req, res) => {
    let {page, size} = req.query;
    page = Number(page);
    size = Number(size);
    const streamer = req.params.id;
    let stats = {};
    get_top_donaters(page, size, streamer).then(( data) => {
        stats["top_donaters"] = data;
        get_streamer_id(streamer).then(( result) => {
            stats["total_donates"] = result;
            res.send(stats);
        }).catch((err) => {
            res.status(500);
            res.send(err);
        });
    });
});
module.exports = router;
