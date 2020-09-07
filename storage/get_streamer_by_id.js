const connection = require('../lib/database');
const createError = require('http-errors');
/**
 * Getting data for one specific streamer.
 * @param {string} streamer - streamer on which to receive data.
 * @returns {function} promise which will be executed after calling the main function and having one of 2 states at the output.
 */
function get_streamer_by_id(streamer){
    return new Promise((resolve, reject) => {
    const sql = "SELECT SUM(amount),currency,streamer FROM personal_streamer_donations WHERE streamer=? GROUP BY currency";
    const query = connection.query(sql, [streamer], (err, results) => {
        if (err) {
            reject(createError(err));
        }else {
            resolve(results);
        }
    });
});
}
module.exports =  {get_streamer_id:get_streamer_by_id};
