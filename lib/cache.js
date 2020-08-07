class Cache {
    constructor(cache) {
        this.cache = cache;
    }
    get_cache(){
        return this.cache;
    }
    delete_cache(){
            for(var key in this.cache){
                delete this.cache[key];
            }
    }
    has_propety(sql){
        this.cache.hasOwnProperty(sql);
    }
}

const cache = new Cache({});

module.exports = cache;
