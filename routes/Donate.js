const express = require('express');
const router = express.Router();

let cache = {
};
router.get("/all_streamers", (req, res) => {
    let {page,size} = req.query;
    page = Number(page);
    size = Number(size);
    const start_index = (page - 1) *size ;
    const sql = `SELECT * FROM personal_streamer_donations LIMIT ${start_index},${size}`;
    if (cache.hasOwnProperty(sql)) {
        res.send(cache[sql]);
    }else {
        const query = connection.query(sql, (err, results) => {
            if (err) throw err;
            cache[sql] = results;
            res.send(results);
        });
    }

});
module.exports = router;
module.exports.cache = cache;