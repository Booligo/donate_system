const redis = require('redis');
var client = redis.createClient({
    port:6379,
    host:'127.0.0.1',
});

client.on('error', (err)=> {
    console.log('Error ' + err);
});

client.on('connect', ()=> {
    console.log('Connected to Redis');
});

/**
 * Сhecks for a key in our cache.
 * @param key - the key by which we store our specific data.
 * @param callback - this is the function that will be executed after calling the main function (check_key) and executing its code contents.
 * returns {function} callback(results),results = it's data(what we get as a result of the main function) that will be used in the callback.
 */
function check_key(key, callback) {
    client.exists(key, (err, reply) => {
        if (!err) {
            if (reply === 1) {
                console.log("Key exists");
            } else {
                console.log("Key does't exists");
            }
            callback(null, reply);
        } else {
            console.error(err);
            callback();
        }
    });
}

/**
 * Set key to hold the data.
 * @param key - the key by which we store our specific data.
 * @param hash - data that is stored according to our key, respectively.
 * @param callback - this is the function that will be executed after calling the main function (set_key) and executing its code contents.
 * returns {function} callback(results),results = it's data(what we get as a result of the main function) that will be used in the callback.
 */
function set_key(key, hash, callback) {
    client.set(key, JSON.stringify(hash), (err, reply)=> {
        if (err) {
            callback(err, null);
        } else {
            callback(null, reply)
        }
    });
}

/**
 * Get (return) data by key.
 * @param key - the key by which we store our specific data.
 * @param callback - this is the function that will be executed after calling the main function (get_key) and executing its code contents.
 * returns {function} callback(results),results = it's data(what we get as a result of the main function) that will be used in the callback.
 */
function get_key(key, callback) {
    // Прочтем записанное
    client.get(key, (err, result)=> {
        if (err) {
            callback(err, null);
        } else {
            callback(null, JSON.parse(result));
        }
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

