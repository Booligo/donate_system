const createError = require('http-errors');
const connection = require('../lib/database');
const cache =  require('../lib/cache');
/**
 * Getting a list of streamers.
 * @param {integer} page - page number the user wants to see.
 * @param {integer} size - the amount of streamers the user wants to see.
 * @returns {function} promise which will be executed after calling the main function and having one of 2 states at the output.
 */
function get_list_of_streamers(page, size) {
    const start_index = (page - 1) * size;
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM personal_streamer_donations LIMIT ${start_index},${size}`;
        cache.check_by_key(sql).then((res) => {
            if (res === 1) {
                cache.get_by_key(sql).then((data) => {
                    resolve(data);
                }).catch((err) => {
                    reject(createError(err));
                });
            } else {
                const query = connection.query(sql, (err, results) => {
                    if (err) {
                        reject(createError(err));
                    } else {
                        cache.set_by_key(sql, results).then((reply) => {
                            resolve(results)
                        }).catch((err) => {
                            reject(createError(err));
                        });
                    }
                });
            }
        });
    });
}
module.exports = {get_streamers:get_list_of_streamers};
