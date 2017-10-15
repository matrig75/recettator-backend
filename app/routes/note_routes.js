// routes/note_routes.js

var ObjectID = require('mongodb').ObjectID;
var myCollection = 'ingredients';

module.exports = function (app, db) {

    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS, PATCH');
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        if ('OPTIONS' == req.method) {
            res.send(200);
        } else {
            next();
        }
    });

    // Route pour GET pour tous ingrédients

    app.get('/ingredients', (req, res) => {
        db.collection(myCollection).find({}).toArray(function (err, ingredients) {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send(ingredients);
            }
        });
    });
    // Route pour GET un seul ingrédient

    app.get('/ingredients/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        db.collection(myCollection).findOne(details, (err, item) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send(item);
            }
        });
    });

    // Route pour POST
    app.post('/ingredients', (req, res) => {
        const ingredient = [{
            _id: req.body.isbn,
            title: req.body.title,
            marque: req.body.marque,
            type: req.body.type,
            prix: req.body.prix,
            date_achat: req.body.date_achat
        }];
        // db.collection(myCollection).insert(ingredient, (err, result) => {
        db.collection(myCollection).insertMany(ingredient, (err, result) => {
            if (err) {
                res.send({ 'error': err });
            } else {
                res.send(result.ops[0]);
            }
        });
    });

    // Route pour DELETE
    app.delete('/ingredients/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        db.collection(myCollection).remove(details, (err, item) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send('Ingredient ' + id + ' supprimé !');
            }
        });
    });

    // Route pour UPDATE
    app.put('/ingredients/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        const ingredient = {
            _id: req.body.isbn,
            title: req.body.title,
            marque: req.body.marque,
            type: req.body.type,
            prix: req.body.prix,
            date_achat: req.body.date_achat
        };
        db.collection(myCollection).update(details, ingredient, (err, result) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send(ingredient);
            }
        });
    });
};