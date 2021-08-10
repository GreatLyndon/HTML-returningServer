//Defines the JSON-returning routes
const express = require('express');
const router = express.Router();
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public');
    },
    filename: function(req, file, cb) {
        cb(null, req.body.animal + '.jpg');
    }
});

const upload = multer({storage: storage});


//JSON-returning route
async function onLookup(req, res) {
    const routeParams = req.params;
    const word = routeParams.word;
    const query = {animal: word.toLowerCase()};
    const result = await req.collection.findOne(query);
    const response = {
        animal: word,
        definition: result ? result.definition : 'NOT FOUND'
    };
    res.json(response);
}

router.get('/lookup/:word', onLookup);

async function addAnimal(req, res) {
    const body = req.body;
    const doc = {
        animal: body.animal,
        definition: body.definition
    }
    const result = await req.collection.insertOne(doc);
    res.send('addddddd');
}

router.post('/add', upload.single('picture'), addAnimal);

router.get('/favicon.ico', (req, res) => res.status(204));

module.exports = router;