// routes/note_routes.js

var ObjectID = require('mongodb').ObjectID;
var myCollection = 'ingredients';

module.exports = function (app, db) {

    // Route pour GET

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
        const note = { text: req.body.body, title: req.body.title };
        db.collection(myCollection).insert(note, (err, result) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
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
                res.send('Note ' + id + ' deleted!');
            }
        });
    });

    // Route pour UPDATE
  app.put('/ingredients/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    const note = { text: req.body.body, title: req.body.title };
    db.collection(myCollection).update(details, note, (err, result) => {
      if (err) {
          res.send({'error':'An error has occurred'});
      } else {
          res.send(note);
      } 
    });
  });
};