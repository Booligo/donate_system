const get_cache =  require('../lib/cache');
/**
 * Clearing the cache.
 * This function is needed in order to clear the cache, since when the donation is poured out, our data in the cache is no longer relevant and we must delete it.
 * Cache - our temporary storage server(input).
 * returns {object}  empty cache
 */
function delele_cache(){
    for(var key in get_cache.cache){
        delete get_cache.cache[key];
    }
}
module.exports.delete_cache = delele_cache;