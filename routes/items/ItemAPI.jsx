var fs = require('fs');
var bodyParserJSON = require('body-parser').json({extended: true, limit: '10mb'});

var Item = require('./Item');

module.exports = {
    create: create,
    find: find,
    get: get,
    remove: remove,
    update: update
};

function create(router) {
    router.post('/api/items', bodyParserJSON, (req, res) => {
        var itemImages = req.body.item.images;
        itemImages.forEach((image) => {
            image.base64 = image.base64.replace(/^data:image\/(jpeg|png);base64,/, "");
            fs.writeFile(`public/images/${image.name}`, image.base64, 'base64', (err) => {
                console.log(err);
            });
        });

        req.body.item.images = itemImages.map((image) => {
            return `http://localhost:3000/images/${image.name}`;
        });

        req.body.item.cover = `http://localhost:3000/images/${req.body.item.cover}`;

        Item.create(req.body.item, (err, newItem) => {
            res.json(newItem);
        });
    });
}

function find(router) {
    router.get('/api/item/:_id', (req, res) => {
        Item.findOne({_id: req.params._id}, (err, item) => {
            res.json(item);
        });
    });
}

function get(router) {
    router.get('/api/items', (req, res) => {
        Item.find({}, (err, items) => {
            res.json(items);
        }).sort({ updatedAt: -1 });
    });
}

function remove(router) {
    router.delete('/api/item/:_id', (req, res) => {
        Item.remove({ _id: req.params._id }, (err, status) => {
            res.json(status);
        });
    });
}

function update(router) {
    router.put('/api/item/:_id', bodyParserJSON, (req, res) => {
        Item.update({_id: req.params._id}, req.body.item, (err, status) => {
            req.body.item.updatedAt = new Date();
            res.json(req.body.item);
        });
    });
}
