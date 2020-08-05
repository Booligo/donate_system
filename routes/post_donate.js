const express = require('express');
const router = express.Router();
const post_values = require('../Functions/get_values');
const our_values = require('../Functions/get_values');
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
            post_values.insert_values( req.body.donater, req.body.amount, req.body.currency, req.body.streamer,(err, data) => {
                if (err) {
                    res.status(500);
                    res.send(err);
                } else {
                    res.send(data);
                }
            });
    });

module.exports = router;