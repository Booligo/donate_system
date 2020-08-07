const createError = require('http-errors');
const connection = require('../lib/database');
const get_cache =  require('../lib/cache');

/**
 * Getting a list of streamers.
 * @param {integer} page - page number the user wants to see.
 * @param {integer} size - the amount of streamers the user wants to see.
 * @param {function} callback - this is the function that will be executed after calling the main function (get_streamer_by_id) and executing its code contents.
 * returns {function} callback(results),results = it's data that will be used in the callback.
 */

function get_list_of_streamers(page,size,callback){
    const start_index = (page - 1) *size ;
    const sql = `SELECT * FROM personal_streamer_donations LIMIT ${start_index},${size}`;
    if (get_cache.cache.hasOwnProperty(sql)) {
        callback(null,get_cache.cache[sql]);
    }else {
        const query = connection.query(sql, (err, results) => {
            if (err) {
                callback(createError(err),null);
            }else
                get_cache.cache[sql] = results;
            callback(null,results);
        });
    }
}

module.exports.get_list_of_streamers = get_list_of_streamers;
