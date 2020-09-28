const Transaction = require('../Models/transaction');
const errors = require('../config/errors');
const transaction = require('../Models/transaction');
const { json, response, urlencoded } = require('express');
const config = require('mongoose-schema-jsonschema/config');
const { array_jsonSchema } = require('mongoose-schema-jsonschema/lib/types');
const { get } = require('../routes/transaction');
const mongoose = require('mongoose-schema-jsonschema')();
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const fetch = require('node-fetch');
const util = require('../services/util');

exports.deposit = function(params) {
    if (!this.empty(params.account_id, params.amount)) { throw errors.errorFormat('BAD_REQUEST'); }

    const transaction = new Transaction({
        account_id: params.account_id,
        amount: params.amount,
        operation: 0,
        movement: 'DEPOSIT',
        Created: new Date()
    });

    transaction.save();

    var balance = GetBalance(params.account_id);


    util.update(params.account_id, params.amount, 0);

    const BalanceActual = parseInt(balance.amount) + parseInt(transaction.amount);


    const response = { account_id: transaction.account_id, balance: BalanceActual, operation: transaction.operation };
    return response;


}

exports.retirement = function(params) {
    var balanceGetUrl = GetBalance(params.account_id);
    try {

        if (!this.empty(params.account_id, params.amount)) { throw errors.errorFormat('BAD_REQUEST') }

        if (!this.isAmountRetirementMinorBalance(params.amount, parseInt(balanceGetUrl.amount))) { throw { message: 'insufficient balance' } }

        const transaction = new Transaction({
            account_id: params.account_id,
            amount: params.amount,
            operation: 1,
            movement: 'RETIREMENT',
            Created: new Date()
        });
        transaction.save();

        util.update(params.account_id, params.amount, 1);

        const BalanceActual = parseInt(balanceGetUrl.amount) - parseInt(transaction.amount);


        const response = { account_id: transaction.account_id, balance: BalanceActual, operation: transaction.operation };
        return response;
    } catch (error) {
        throw error.message;
    }
}

exports.isAmountRetirementMinorBalance = function(amount, balance) {
    return amount <= balance ? true : false;
}

exports.empty = function(amount, account_id) {
    return (amount.length != 0 && account_id.length != 0) ? true : false;
}

exports.listTranscationes = async function(account_id) {
    try {

        const arreglo = await transaction.find({ account_id: account_id }).exec();

        return arreglo;

    } catch (error) {
        throw error.message;
    }

}


function Get(url) {
    try {
        var Httpreq = new XMLHttpRequest(); // a new request
        Httpreq.open("GET", url, false);
        Httpreq.send(null);
        return Httpreq.responseText;
    } catch (error) {
        throw error.message;
    }
}

function GetBalance(param) {
    try {
        let account = "https://apigesbanc.herokuapp.com/api/v1/checkbalance/" + param;
        var balance = JSON.parse(Get(account));
        return balance;
    } catch (err) {
        throw err.message;
    }
}