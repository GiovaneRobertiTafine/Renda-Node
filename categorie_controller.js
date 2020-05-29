var express = require('express');
var router = express.Router();
var Categorie = require('./categorie');
var Record = require('./record');

router.post('/', function (req, res) {
    console.log(req.body);
    let c = new Categorie({ name: req.body.name });
    console.log(c);
    c.save((err, cat) => {
        if (err) {
            res.status(500).send(err);
            console.log(err);
        } else res.status(200).send(cat);
    });
});

router.get('/', function (req, res) {
    Categorie.find().exec((err, cats) => {
        if (err) res.status(500).send(err);
        else res.status(200).send(cats);
    });
});

router.delete('/:id', async (req, res) => {
    try {
        let id = req.params.id;
        console.log(id);
        let records = await Record.find({ categorie: id }).exec();
        if (records.length > 0) {
            res.status(400).send({
                msg: 'Could not remove this department. You may have to fix its dependencies before.',
            });
        } else {
            console.log(id);
            await Categorie.deleteOne({ _id: id });
            res.status(200).send({});
        }
    } catch (err) {
        res.status(500).send({ msg: 'Internal error.', error: err });
    }
});

router.patch('/:id', (req, res) => {
    Categorie.findById(req.params.id, (err, cat) => {
        if (err) res.status(500).send(err);
        else if (!cat) res.status(404).send({});
        else {
            cat.name = req.body.name;
            cat.save()
                .then((c) => res.status(200).send(c))
                .catch((e) => res.status(500).send(e));
        }
    });
});

module.exports = router;
