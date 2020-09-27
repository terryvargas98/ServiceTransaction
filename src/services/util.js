const fetch = require('node-fetch');
const { json, response, urlencoded } = require('express');


exports.update = function(account_id, amount, operation) {

    const body = {
        operacion: operation,
        amount: amount
    }

    fetch('https://apigesbanc.herokuapp.com/api/v1/updateamount/' + account_id, {
            method: 'put',
            body: JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' },
        })
        .then(res => res.text())
        .then(json => console.log(json));


}