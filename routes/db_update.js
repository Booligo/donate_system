const express = require('express');
const router = express.Router();
const Joi = require('joi');


const validator = require('express-joi-validation').createValidator({});
const schemas = Joi.object({
    donater: Joi.string(),
    amount: Joi.number(),
    currency: Joi.string(),
    streamer: Joi.string()
});

function del(){
    for(var key in cache){
        delete cache[key];
    }
}
router.post(
    "/donate",
    validator.query(schemas),
    (req, res) => {
        const form = [[req.body.donater, req.body.amount, req.body.currency, req.body.streamer]];
        const sql = "INSERT INTO donates(donater,amount,currency,streamer) VALUES ?";
        const query = connection.query(sql, [form], (err, results) => {
            if (err) throw err;
            del();
            res.send(results);
        });
    });

module.exports = router;