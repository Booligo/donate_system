const mysql = require("mysql2");
const fs = require("fs");
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "donate",
    password: "lkzliona230501"
});
connection.connect(function(err){
    if (err) {
        return console.error("Ошибка: " + err.message);
    }
    else{
        console.log("Подключение к серверу MySQL успешно установлено");
    }
});

var j=0;

function getRandomList(file,url,i,separator) {
    let finallyArray=[];
    let finalList =[];
    let list = fs.readFileSync(file,url);
    let helpArr = list.split(/\r?\n/).filter(function(x){return x}).map(function(x){return x.split(separator)});

        helpArr.forEach(function (element) {
            finallyArray.push(element[i]);
        });
            for(let i=0;i<Math.floor(Math.random() * 15); i++){
                let randomItems =[];
                randomItems.push(finallyArray[Math.floor(Math.random() *finallyArray.length)]);
                console.log(randomItems);
            }
}
function str1() {
    let listDonaters=[];
    let supArray=[];
    const stray= "Stray228";
    let listStreamers=[];
    let donater = fs.readFileSync("Книга2.txt", "utf8");
    let helpDonater = donater.split(/\r?\n/).filter(function(x){return x}).map(function(x){return x.split(" ")});
    helpDonater.forEach(function (element) {
        listDonaters.push(element[0]);
    });

    let streamer = fs.readFileSync("Книга1.csv", "utf8");
    let helpStreamer=  streamer.split(/\r?\n/).filter(function(x){return x}).map(function(x){return x.split(";")});
    helpStreamer.forEach(function (element){
        listStreamers.push(element[1]);
    });



    supArray.push(listDonaters[Math.floor(Math.random() * 200)], Math.floor(Math.random() * 1000 + 50), "RUB", listStreamers[Math.floor(Math.random() * 100)]);
    let subarray = []; //массив в который будет выведен результат.
    for (let i = 0; i <Math.ceil(supArray.length/4); i++){
        subarray[i] = supArray.slice((i*4), (i*4) + 4);
    }

     const sql = `INSERT donates(donater, amount, currency, streamer) VALUES ?`;
       connection.query(sql, [subarray],function (err, results) {
            if (err) console.log(err);
            console.log(results);


    });
}
let n=0;
while ( n < 1000){

        str1();
    }
    n++;
}

//getRandomList("Книга2.txt","utf8",0," ");



/*

const sql = `INSERT INTO donates(donater,amount, currency, streamer ) VALUES ?`;

connection.query(sql, [users], function(err, results) {
    if(err) console.log(err);
    console.log(results);
});

let a = [];
let n=0;
    for (let j = 0; j < 25; j++) {
        for (let k = 0; k < 50; k++) {
            a.push(ddd[k], Math.floor(Math.random() * 1000), 'RUB', sss[j]);
            const sql = `INSERT donates(donater, amount, currency, streamer) VALUES ?`;
            connection.query(sql, [a],function (err, results) {
                if (err) console.log(err);
                console.log(results);

            });
        }
    }

*/

/*let subarray = []; //массив в который будет выведен результат.
for (let i = 0; i <Math.ceil(a.length/4); i++){
    subarray[i] = a.slice((i*4), (i*4) + 4);
}

 */
//console.log(subarray);


//const sql = `INSERT donates(donater, amount, currency, streamer) VALUES ?`;



connection.end();