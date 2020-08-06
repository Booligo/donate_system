const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const router = express.Router();

const indexDb = require('./routes/database');
const donateRouter = require('./routes/route_post_send_donate');
const streamerRouter = require('./routes/route_get_streamer_by_id');
const streamersRouter = require('./routes/route_get_streamers');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/', donateRouter);
app.use('/', streamerRouter);
app.use('/', streamersRouter);

app.listen(3000, () => {
    console.log("Server is running on port 3000.");
});

module.exports = app;