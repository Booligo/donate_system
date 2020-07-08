var express = require('express');
var router = express.Router();
router.post('/', function (req, res , next) {
    var name = req.body.nickName;
    var sum = req.body.summa;
    var txt = req.body.txt;
    res.send("Наш благодеятель " + name + `заданатил ${sum} rub ` + "И пожелал: "+ txt );
});

module.exports = router;