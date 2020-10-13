var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const fetch = require('node-fetch');
const jwt = require('jsonwebtoken');

const moment = require('moment');

exports.createToken = function(client) {
    let payload = {
        sub: client.account_id,
        iat: moment().unix(),
        exp: moment().add(14, "days").unix()
    }
    return jwt.sign(payload, `${process.env.TOKEN_KEY}`);
}
exports.validatedToken = function ensureToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader != 'undefined') {
        const bearerToken = bearerHeader.split(" ")[1];
        req.token = bearerToken;
        jwt.verify(req.token, `${process.env.KEY}`, (err, data) => {
            if (err) {
                res.status(403).json({ error: 'Unauthorized' });
            } else {
                res.json({
                    data: data
                });
                console.log('Access');
                next();
            }
        });
    } else {
        res.status(403).json({ error: 'Token not found' });
    }
}

function get(url, method) {
    var Httpreq = new XMLHttpRequest(); // a new request
    Httpreq.open(method, url, false);
    Httpreq.send(null);
    return Httpreq.responseText;
}
exports.getToken = async() => {
    try {
        const getToken = await fetch('https://gestion-logs-integracion2020.herokuapp.com/api/v2/jwt', {
            method: 'GET',
            headers: { "Content-Type": "application/json" }
        });
        return token = await getToken.json();
    } catch (error) {
        throw error;
    }
}

exports.getBalance = function(param) {
    let account = "https://apigesbanc.herokuapp.com/api/v1/checkbalance/" + param;
    var balance = JSON.parse(get(account, "GET"));
    return balance;
}

exports.log = async(params, token) => {
    try {
        const res = await fetch('https://gestion-logs-integracion2020.herokuapp.com/api/v2/log/add', {
            method: 'POST',
            headers: { "Content-Type": "application/json", "Authorization": "jwt " + token.token },
            body: JSON.stringify(params)
        });
        /* .then(response => response.json())
        .then(response => console.log(response)); */
        //console.log(await res.json());
        return await res.json();
    } catch (error) {
        throw error;
    }
}

exports.update = async(param, account_id) => {
    try {
        const rawResponse = await fetch('https://apigesbanc.herokuapp.com/api/v1/updateamount/' + account_id, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(param)
        });
        return content = await rawResponse.json();
    } catch (error) {
        throw error;
    }
}

exports.empty = function(amount, account_id) {
    return (amount.length != 0 && account_id.length != 0) ? true : false;
}