const connection = require('../lib/database');
const createError = require('http-errors');
/**
 * Getting data for one specific streamer.
 * @param {string} streamer - streamer on which to receive data.
 * @param {function} callback - this is the function that will be executed after calling the main function (get_streamer_by_id) and executing its code contents.
 * returns {function} callback(results), results = it's data(what we get as a result of the main function) that will be used in the callback.
 */
function get_streamer_by_id(streamer, callback){
    const sql = "SELECT SUM(amount),currency,streamer FROM personal_streamer_donations WHERE streamer=? GROUP BY currency";
    const query = connection.query(sql, streamer, (err, results) => {
        if (err) {
            callback(createError(err),null);
        }else
            callback(null,results);
    });
}
module.exports.get_streamer_dy_id = get_streamer_by_id;
