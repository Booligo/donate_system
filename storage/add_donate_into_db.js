const createError = require('http-errors');
const cache= require('../lib/cache');
const connection = require('../lib/database');
/**
 * Add donate into database donates.
 * @param {string} donater - nickname of the person who donated money.
 * @param {integer} amount - the amount that а person has donated to the streamer.
 * @param {string} currency - the currency that the man donated.
 * @param {string}streamer - this is the person (streamer) who was donated.
 * @param {string}message - this is donater's appeal  to streamer
 * @returns {function} promise which will be executed after calling the main function and having one of 2 states at the output.
 */
function add_donate_into_db(donater, amount, currency, streamer,message){
    const values = [[donater,amount,currency,streamer]];
    return new Promise((resolve, reject)=>{
        const sql = "INSERT INTO donates(donater,amount,currency,streamer) VALUES ?";
        const query = connection.query(sql, [values], (err, results) => {
            if (err) {
                reject(createError(err));
            } else {
                io.emit('broadcast',{
                        donater: donater,
                        amount: amount,
                        currency: currency,
                        message :message },
                    console.log("message sent"));
                cache.del_cache();
                resolve(results);
            }
        });
    })
}
module.exports = {donate:add_donate_into_db};


