const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Joi = require('joi');
const validator = require('express-joi-validation').createValidator({});
const router = express.Router();
//const indexDb = require('./routes/db');
//const donateRouter = require('./routes/Donate');

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

app.get("/", (req, res) => {
    res.json({message: "Welcome to bezkoder application."});
});

app.get("/all_streamers", (req, res) => {
    let {page,limit} = req.query;
    const num = Number(page);
    const gap = Number(limit);
    const sql = `SELECT * FROM personal_streamer_donations LIMIT ${(num-1)*gap},${gap}`;
    const query = connection.query(sql, (err, results) => {
        if (err) throw err;
        res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });

});


app.get("/all_streamers/:id", (req, res) => {

    const sql = "SELECT SUM(amount),currency,streamer FROM personal_streamer_donations WHERE streamer=? GROUP BY currency";
    const streamer = [req.params.id];
    const query = connection.query(sql, streamer, (err, results) => {
        if (err) throw err;
        res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
});


app.post(
    "/donate",
    validator.query(schemas),
    (req, res) => {
        const form = [[req.body.donater, req.body.amount, req.body.currency, req.body.streamer]];
        const sql = "INSERT INTO donates(donater,amount,currency,streamer) VALUES ?";
        const query = connection.query(sql, [form], (err, results) => {
            if (err) throw err;
            res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
        });
    });


app.listen(3000, () => {
    console.log("Server is running on port 3000.");
});
