const connection = require('./db');
const createError = require('http-errors');
function get_id(streamer,callback){
    const sql = "SELECT SUM(amount),currency,streamer FROM personal_streamer_donations WHERE streamer=? GROUP BY currency";
    const query = connection.query(sql, streamer, (err, results) => {
        if (err) {
            callback(createError(err));
        }else
            callback(null,results);
    });
}
exports.get_id = get_id();