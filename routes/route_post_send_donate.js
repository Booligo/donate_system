const express = require('express');
const router = express.Router();
const send_donate = require('../storage/add_donate_into_db');
const validator = require('express-joi-validation').createValidator({});
const Joi = require('joi');

const schemas = Joi.object({
    donater: Joi.string(),
    amount: Joi.number(),
    currency: Joi.string(),
    streamer: Joi.string()
});

router.post(
    '/donate',
    validator.query(schemas),
    (req, res) => {
         const {donater,amount,currency,streamer}= req.body;
            send_donate.add_donate_into_db(donater, amount, currency, streamer,(err, data) => {
                if (err) {
                    res.status(500);
                    res.send(err);
                } else {
                    res.send(data);
                }
            });
    });

module.exports = router;