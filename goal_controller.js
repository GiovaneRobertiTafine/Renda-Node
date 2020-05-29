var express = require('express');
var router = express.Router();
var Goal = require('./goal');

router.post('/', (req, res) => {
    let g = new Goal({
        name: req.body.name,
        value: req.body.value,
        priority: req.body.priority,
    });
    console.log(req.body);
    g.save((err, rec) => {
        if (err) res.status(500).send(err);
        else res.status(200).send(rec);
    });
});

router.get('/', (req, res) => {
    Goal.find()
        .sort({ priority: 1 })
        .exec((err, recs) => {
            if (err) res.status(500).send(err);
            else console.log(recs);
            res.status(200).send(recs);
        });
});

router.delete('/:id', (req, res) => {
    Goal.deleteOne({ _id: req.params.id }, (err) => {
        if (err) res.status(500).send(err);
        else res.status(200).send({});
    });
});

router.patch('/:id', (req, res) => {
    Goal.findById(req.params.id, (err, rec) => {
        if (err) res.status(500).send(err);
        else if (!rec) res.status(404).send({});
        else {
            rec.name = req.body.name;
            rec.value = req.body.value;
            rec.save((err, rec) => {
                if (err) res.status(500).send(err);
                else res.status(200).send(rec);
            });
        }
    });
});

router.patch('/', (req, res) => {
    var goalsRef = req.body;

    Goal.find((err, rec) => {
        console.log(rec);
        rec.map((value, i) => {
            var verify = goalsRef.findIndex((g) => g._id === value._id.toString());
            if (verify >= 0) {
                rec[i].priority = goalsRef[verify].priority;
            }
            rec[i].save((err, rec) => {
                if (err) {
                    res.status(500).send(err);
                }
            });
        });

        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send({});
        }
    });
});

module.exports = router;
