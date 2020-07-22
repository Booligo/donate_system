const express = require('express');
const router = express.Router();

router.post('/donate/form', function (req, res , next) {
    var row = [[req.body.donater,req.body.amount,req.body.currency,req.body.streamer]];

        res.send({ message: "Donate accepted." });
    //res.send('hi ivan');


});

