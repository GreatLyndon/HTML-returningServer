//Defines the HTML-returning routes
const express = require('express');
const router = express.Router();

//HTML-returning route
async function onViewWord(req, res) {
    const routeParams = req.params;
    const animal = routeParams.word;
    const query = {animal: animal.toLowerCase()};
    const result = await req.collection.findOne(query);
    const definition = result ? result.definition : 'NOT FOUND';
    const picture = result ? result.animal + '.jpg' : '';
    const placehoders = {
        animal: query.animal,
        definition: definition,
        picture: picture
    };
    res.render('word', placehoders);
};

router.get('/:word', onViewWord);

async function onViewIndex(req, res) {
    res.render('index', {layout: false});
};

router.get('/', onViewIndex);

module.exports = router;

