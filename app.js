const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const categorie_controller = require('./categorie_controller');
const record_controller = require('./record_controller');

const app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
    extended: true
}));

app.use(cors());

mongoose.connect('mongodb://localhost:27017/http_app', { useNewUrlParser: true, useUnifiedTopology: true });

app.use('/categories', categorie_controller);
app.use('/records', record_controller);

app.listen(3000);

