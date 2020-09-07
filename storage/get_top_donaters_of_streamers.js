const connection = require('../lib/database');
const createError = require('http-errors');
/**
 * Getting data for one specific streamer.
 * @param {integer} page - page number the user wants to see.
 * @param {integer} size - the amount of streamers the user wants to see.
 * @param {string} streamer - streamer on which to receive data.
 * @returns {function} promise which will be executed after calling the main function and having one of 2 states at the output.
 */
function get_top_donaters_by_id(page, size, streamer){
    const start_index = (page - 1) * size;
    return new Promise((resolve, reject) => {
        const sql = `SELECT donater,SUM(amount),currency,streamer FROM personal_streamer_donations WHERE streamer=? GROUP BY donater,currency LIMIT ${start_index},${size}`;
        const query = connection.query(sql, streamer, (err, results) => {
            if (err) {
                reject(createError(err));
            } else {
                resolve(results);
            }
        });
    });
}
module.exports =  {get_top_donaters:get_top_donaters_by_id};