const connection = require('../routes/db');
const createError = require('http-errors');
function get_id(streamer,callback){
    const sql = "SELECT SUM(amount),currency,streamer FROM personal_streamer_donations WHERE streamer=? GROUP BY currency";
    const query = connection.query(sql, streamer, (err, results) => {
        if (err) {
            callback(createError(err),null);
        }else
            callback(null,results);
    });
}
module.exports.get_id = get_id;
