var express = require('express');
var bodyParser = require('body-parser');
var cookieSession = require('cookie-session');
var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(cookieSession({
    name: 'session',
    secret: 'random_string_goes_here',
    maxAge: 1 * 60 * 60 * 1000
}));

var port = process.env.PORT || 9999;
var router = express.Router();

router.get('/login', function (req, res) {
    var userName = req.query.userName;
    var password = req.query.password;
    if (userName === 'edo' && password === 'edo') {
        req.session.user = 'token';
        res.send('BTPN - Login Success');
    }else{
        res.status(401);
        res.send('BTPN - Unknown Credential');
    }

});
router.get('/whoAmI', function (req, res) {
    if (req.session.user === 'token') {
        res.json(
            {
                responseStatus: {
                    responseCode: "00",
                    responseDesc: "SUCCESS"
                },
                requestId: "62c62124a08049bda7e6e06889ff5ad5",
                data: {
                    userName: "joe",
                    name: "Joe",
                    authenticatedMethod: "DB",
                    services: [
                        {
                            serviceCode: "GET_ROLE",
                            url: "/getRole"
                        },
                        {
                            serviceCode: "GET_USER",
                            url: "/getUser"
                        },
                        {
                            serviceCode: "SEARCH_USER",
                            url: "/searchUser"
                        },
                        {
                            serviceCode: "SAVE_ROLE",
                            url: "/saveRole"
                        },
                        {
                            serviceCode: "SEARCH_ROLE",
                            url: "/searchRole"
                        }
                    ],
                    menus: [
                        {
                            menuCode: "ROLE",
                            label: "Role",
                            url: "#Role"
                        },
                        {
                            menuCode: "USER",
                            label: "User",
                            url: "#User"
                        }
                    ]
                }
            }
        )
    } else {
        res.status(401);
        res.send('BTPN - Unknown Credential');
    }
});
app.use('/api', router);

app.listen(port);
console.log('Magic happens on port ' + port);
