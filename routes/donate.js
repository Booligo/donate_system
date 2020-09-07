const express = require('express');
const router = express.Router();
const {donate} = require('../storage/add_donate_into_db');
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
        const {donater, amount, currency, streamer} = req.body;
        donate(donater, amount, currency, streamer).then(( data) => {
            res.send(data);
        }).catch((err) => {
            res.status(500);
            res.send(err);
        });
    });
module.exports = router;