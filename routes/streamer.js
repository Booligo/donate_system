
const express = require('express');
const router = express.Router();

router.get("/all_streamers/:id", (req, res) => {

    const sql = "SELECT SUM(amount),currency,streamer FROM personal_streamer_donations WHERE streamer=? GROUP BY currency";
    const streamer = [req.params.id];
    const query = connection.query(sql, streamer, (err, results) => {
        if (err) throw err;
        res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
});

module.exports = router;