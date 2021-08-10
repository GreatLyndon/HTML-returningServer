/* 
#### Server-side rendering ###
Starts the server
Sets the template engine
Serves the public/ directory
*/
const express = require('express');
const { MongoClient } = require("mongodb");
const exphbs = require('express-handlebars');
const api = require('./routes/api.js');
const views = require('./routes/views.js');

const app = express();
const hbs = exphbs.create();
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('public'));
const client = new MongoClient('mongodb://127.0.0.1:27017/myapp');
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

async function startServer() {
    async function setCollection(req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        await client.connect();
        const db = client.db('myapp');
        const collection = db.collection('animal');
        req.collection = collection;
        res.on('finish', async function() {
            await client.close();
        });
        next();
    }
    app.use(setCollection);
    app.use(api);
    app.use(views);
    await app.listen(3000);
    console.log('Listening on port 3000');
}

startServer();
