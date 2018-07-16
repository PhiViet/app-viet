const router = require('express').Router();
router.post('/addUserToListOnline', addUserToListOnline);
module.exports = router;

function addUserToListOnline(req, res, next) {
    body = {
        name: req.body.name
    }
    var user = new Online(body);

    user.save()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            next(err);
        })
}