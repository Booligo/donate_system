const express = require('express');
const router = express.Router();
const update_db = require('./db_update')
const validator = require('express-joi-validation').createValidator({});
const Joi = require('joi');

const schemas = Joi.object({
    donater: Joi.string(),
    amount: Joi.number(),
    currency: Joi.string(),
    streamer: Joi.string()
});

router.post(
    "/donate",
    validator.query(schemas),
    (req, res) => {
        const form = [[req.body.donater, req.body.amount, req.body.currency, req.body.streamer]];
        update_db([form],(err,data) =>{
            if(err){
                res.status(500);
                res.send(err);
            }else {
                res.send(data);
            }
        });
    });

module.exports = router;