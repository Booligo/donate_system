const createError = require('http-errors');
const clearing_storage = require('./delete_cache');
const connection = require('../lib/database');




/**
 * Add donate into database donates.
 * @param {string} donater - nickname of the person who donated money.
 * @param {string} amount - the amount that а person has donated to the streamer.
 * @param {string} currency - the currency that the man donated.
 * @param {string}streamer - this is the person (streamer) who was donated.
 * @param {function} callback - this is the function that will be executed after calling the main function (get_streamer_by_id) and executing its code contents
 * returns {function} callback(results), results = it's data that will be used in the callback.
 */

function add_donate_into_db(donater, amount, currency, streamer, callback){
    const values = [[donater,amount,currency,streamer]];
    const sql = "INSERT INTO donates(donater,amount,currency,streamer) VALUES ?";
    const query = connection.query(sql, [values], (err, results) => {
        if (err) {
            callback(createError(err),null);
        }else {
            clearing_storage.delete_cache();
            callback(null, results);
        }
        });
}
module.exports.add_donate_into_db = add_donate_into_db;

