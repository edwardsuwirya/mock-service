var express = require('express');
var bodyParser = require('body-parser');
var cookieSession = require('client-sessions');
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cookieSession({
    cookieName: 'bsession',
    secret: 'random_string_goes_here',
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 60 * 1000,
}));

var port = process.env.PORT || 9999;
var router = express.Router();

router.get('/login', function (req, res) {
    req.bsession.user = 'token';
    res.send('ssss');
});
router.get('/whoAmI', function (req, res) {
    if (req.bsession.user === 'token') {
        res.json({ message: 'hooray! welcome to our api!' });
    } else {
        res.json({ message: 'Whoooppsss' })
    }
});

app.use('/api', router);

app.listen(port);
console.log('Magic happens on port ' + port); 