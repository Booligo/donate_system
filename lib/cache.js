const redis = require('redis');
const config = require("../config").configuration;
const client = redis.createClient(config.redis_config);
client.on('error', (err)=> {
    console.log('Error ' + err);
});
client.on('connect', ()=> {
    console.log('Connected to Redis');
});
/**
 * Сhecks for a key in our cache.
 * @param key - the key by which we store our specific data.
 * @returns {function} promise which will be executed after calling the main function and having one of 2 states at the output.
 */
function check_key(key) {
    return new Promise((resolve, reject) => {
        client.exists(key, (err, reply) => {
            if (!err) {
                if (reply === 1) {
                    console.log("Key exists");
                } else {
                    console.log("Key does't exists");
                }
                resolve(reply);
            } else {
                console.error(err);
                resolve();
            }
        });
    });
}
/**
 * Set key to hold the data.
 * @param key - the key by which we store our specific data.
 * @param hash - data that is stored according to our key, respectively.
 * @returns {function} promise which will be executed after calling the main function and having one of 2 states at the output.
 */
function set_key(key, hash) {
    return new Promise((resolve, reject) => {
        client.set(key, JSON.stringify(hash), (err, reply) => {
            if (err) {
                reject(err);
            } else {
                resolve(reply)
            }
        });
    });
}
/**
 * Get (return) data by key.
 * @param key - the key by which we store our specific data.
 * @returns {function} promise which will be executed after calling the main function and having one of 2 states at the output.
 */
function get_key(key) {
    return new Promise((resolve, reject) => {
        // Прочтем записанное
        client.get(key, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(JSON.parse(result));
            }
        });
    });
}
/**
 * Deletes all keys in our cache.
 * returns empty cache.
 */
function del_cache_keys() {
    client.keys('*', (err, keys) => {
        if (err) {
            return console.error(err);
        } else {
            for (let i = 0; i < keys.length; i++) {
                client.del(keys[i]);
            }
        }
    });
}
module.exports = {
    get_by_key:get_key,
    check_by_key:check_key,
    set_by_key:set_key,
    del_cache:del_cache_keys};

