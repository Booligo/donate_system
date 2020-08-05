const createError = require('http-errors');
const connection = require('../routes/db');
let cache = {};
function get_list_of_streamers(page,size,callback){
    const start_index = (page - 1) *size ;
    const sql = `SELECT * FROM personal_streamer_donations LIMIT ${start_index},${size}`;
    if (cache.hasOwnProperty(sql)) {
        callback(null,cache[sql]);
    }else {
        const query = connection.query(sql, (err, results) => {
            if (err) {
                callback(createError(err),null);
            }else
                cache[sql] = results;
            callback(null,results);
        });
    }
}
module.exports.get_list_of_streamers = get_list_of_streamers;
module.exports.cache = cache;