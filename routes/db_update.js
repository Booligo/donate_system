const createError = require('http-errors');
const cache = require('./cache');
const connection = require('./db');
function del(){
    for(var key in cache){
        delete cache[key];
    }
}

function update_db(values,callback){
    const sql = "INSERT INTO donates(donater,amount,currency,streamer) VALUES ?";
    const query = connection.query(sql, values, (err, results) => {
        if (err) {
            callback(createError(err));
        }else
            del();
        callback(null,results);
    });
}
exports.update_db = update_db();