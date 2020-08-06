const createError = require('http-errors');
const caches = require('./get_list_of_streamers');
const connection = require('../routes/db');

/**
 * Clearing the cache.
 * This function is needed in order to clear the cache, since when the donation is poured out, our data in the cache is no longer relevant and we must delete it.
 * @param {string} cache - our temporary storage server(input).
 * @returns {string} empty cache
 */
function delele_cache(){
    for(var key in caches.cache){
        delete caches.cache[key];
    }
}

/**
 * Add donate into database donates.
 * @param {string} donater - nickname of the person who donated money.
 * @param {string} amount - the amount that а person has donated to the streamer.
 * @param {string} currency - the currency that the man donated.
 * @param {string}streamer - this is the person (streamer) who was donated.
 * @param {function} callback - this is the function that will be executed after calling the main function (add_donate_into_db) and executing the content of the code.
 * @returns {function} callback
 */

function add_donate_into_db(donater, amount, currency, streamer, callback){
    const values = [[donater,amount,currency,streamer]];
    const sql = "INSERT INTO donates(donater,amount,currency,streamer) VALUES ?";
    const query = connection.query(sql, [values], (err, results) => {
        if (err) {
            callback(createError(err),null);
        }else {
            delele_cache();
            callback(null, results);
        }
        });
}
module.exports.add_donate_into_db = add_donate_into_db;

