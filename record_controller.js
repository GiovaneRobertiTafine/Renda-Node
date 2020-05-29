var express = require('express');
var router = express.Router();
var Record = require('./record');

router.post('/', (req, res) => {
    let r = new Record({
        name: req.body.name,
        value: req.body.value,
        type: req.body.type,
        charge: req.body.charge,
        month: req.body.month,
        categorie: req.body.categorie,
    });
    console.log(req.body);
    console.log(r);
    r.save((err, rec) => {
        if (err) res.status(500).send(err);
        else res.status(200).send(rec);
    });
});

router.get('/', (req, res) => {
    Record.find().exec((err, recs) => {
        if (err) res.status(500).send(err);
        else console.log(recs);
        res.status(200).send(recs);
    });
});

router.delete('/:id', (req, res) => {
    Record.deleteOne({ _id: req.params.id }, (err) => {
        if (err) res.status(500).send(err);
        else res.status(200).send({});
    });
});

router.patch('/:id', (req, res) => {
    Record.findById(req.params.id, (err, rec) => {
        console.log(rec.type);
        if (err) res.status(500).send(err);
        else if (!rec) res.status(404).send({});
        else {
            rec.name = req.body.name;
            rec.value = req.body.value;
            rec.type = req.body.type;
            (rec.charge = req.body.charge), (rec.month = req.body.month), (rec.categorie = req.body.categorie);
            rec.save((err, rec) => {
                if (err) res.status(500).send(err);
                else res.status(200).send(rec);
            });
        }
    });
});

module.exports = router;
