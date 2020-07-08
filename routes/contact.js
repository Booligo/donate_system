var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET users listing. */
function getFileData(path, options) {
    return new Promise(function (resolve, reject) {
        fs.readFile(path, options, (err, data) => {
            if (err) {
                return  reject(err);
            } else {
                return resolve(data);
            }
        });
    });
}

router.get('/nnn', async function (req, res, next) {
    console.log(1);
    await getFileData('./Data/contacts.json', 'utf8')
        .then(data => {
            console.log(2);
            res.send(JSON.parse(data));
        })
        .catch(err => {
            res.send('smth going wrong');
        });
    console.log(3);
});


//  res.send(obj);

//});


module.exports = router;
