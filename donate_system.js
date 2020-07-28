const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Joi = require('joi');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const redis = require('redis');
const validator = require('express-joi-validation').createValidator({});
const router = express.Router();
//const indexDb = require('./routes/db');
//const donateRouter = require('./routes/Donate');
//const streamer = require('./routes/streamer');
//const db_update = require('./routes/db_update');


const mysql = require("mysql2");
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "donate",
    password: "forever16"
});

connection.connect(function (err) {
    if (err) {
        return console.error("Ошибка: " + err.message);
    } else {
        console.log("Подключение к серверу MySQL успешно установлено");
    }
});



const schemas = Joi.object({
    donater: Joi.string(),
    amount: Joi.number(),
    currency: Joi.string(),
    streamer: Joi.string()
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
//app.use('/all_streamers', donateRouter);
//app.use('/all_streamers/:id', streamer);
//app.use('/donate', db_update);
function create_cache() {
    let cache = {};
    return cache;
}
function get_list_of_streamers(sql,res,callback){
    const sql = `SELECT * FROM personal_streamer_donations LIMIT ${start_index},${size}`;
    if (create_cache().hasOwnProperty(sql)) {
        callback(create_cache()[sql]);
    }else {
        const query = connection.query(sql, (err, results) => {
            if (err) throw err;
            create_cache()[sql] = results;
            callback(results);
        });
    }
}



app.get("/all_streamers", (req, res) => {
    let {page,size} = req.query;
    page = Number(page);
    size = Number(size);
    const start_index = (page - 1) *size ;
    get_list_of_streamers(sql,res,(data) =>{
        res.send(data);
    });
});

function del(){
    for(var key in cache){
        delete cache[key];
    }
}

function get_id(streamer,callback){
    const sql = "SELECT SUM(amount),currency,streamer FROM personal_streamer_donations WHERE streamer=? GROUP BY currency";
    const query = connection.query(sql, streamer, (err, results) => {
        if (err) throw err;
          callback(results);

    });
}

app.get("/all_streamers/:id", (req, res) => {

    const streamer = [req.params.id];
    get_id(streamer,(data) =>{
        //if (err) throw err;
        res.send(data);
    });

 //   const query = connection.query(sql, streamer, (err, results) => {
   //     if (err) throw err;
      //  res.send(results);
        //return results;


   // });
});

function post_db(values,callback){
    const sql = "INSERT INTO donates(donater,amount,currency,streamer) VALUES ?";
    const query = connection.query(sql, values, (err, results) => {
        if (err) throw err;
        del();
        callback(results);
    });
}

    app.post(
        "/donate",
        validator.query(schemas),
        (req, res) => {
            const form = [[req.body.donater, req.body.amount, req.body.currency, req.body.streamer]];
            post_db([form],(data) =>{
                res.send(data);
            });
        });

    app.get("/", (req, res) => {
        res.json({message: "Welcome to bezkoder application."});
        console.log('hello');
    });


app.listen(3000, () => {
    console.log("Server is running on port 3000.");
});

module.exports = app;