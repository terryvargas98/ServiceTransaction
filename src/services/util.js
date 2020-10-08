var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const fetch = require('node-fetch');


function get(url, method) {
    var Httpreq = new XMLHttpRequest(); // a new request
    Httpreq.open(method, url, false);
    Httpreq.send(null);
    return Httpreq.responseText;
}

exports.getBalance = function(param) {
    let account = "https://apigesbanc.herokuapp.com/api/v1/checkbalance/" + param;
    var balance = JSON.parse(get(account, "GET"));
    return balance;
}
exports.getCourses = function(param) {
    let account = "https://apigesbanc.herokuapp.com/api/v1/checkbalance/" + param;
    var balance = JSON.parse(get(account, "GET"));
    return balance;
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