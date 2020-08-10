class Cache {
    constructor(cache) {
        this.cache = cache;
    }
    get_cache(){
        return this.cache;
    }
    delete_cache(){
            for(let key in this.cache){
                if(this.cache.hasOwnProperty(key)) {
                    delete this.cache[key];
                }
            }
    }
    has_cache(sql){
        this.cache.hasOwnProperty(sql);
    }
}

const cache = new Cache({});

module.exports = cache;
