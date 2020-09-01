const connection = require('../lib/database');
const createError = require('http-errors');
/**
 * Getting data for one specific streamer.
 * @param {integer} page - page number the user wants to see.
 * @param {integer} size - the amount of streamers the user wants to see.
 * @param {string} streamer - streamer on which to receive data.
 * @param {function} callback - this is the function that will be executed after calling the main function (get_streamer_by_id) and executing its code contents.
 * returns {function} callback(results), results = it's data(what we get as a result of the main function) that will be used in the callback.
 */
function get_top_donaters_by_id(page, size, streamer, callback){
    const start_index = (page - 1) *size ;
    const sql = `SELECT donater,SUM(amount),currency,streamer FROM personal_streamer_donations WHERE streamer=? GROUP BY donater,currency LIMIT ${start_index},${size}`;
    const query = connection.query(sql, streamer, (err, results) => {
        if (err) {
            callback(createError(err),null);
        }else {
            callback(null, results);
        }
    });
}
module.exports =  {get_top_donaters:get_top_donaters_by_id};