const Transaction = require('../Models/transaction');
const errors = require('../config/errors');
const util = require('../services/util');

exports.deposit = async function(params) {
    try {
        if (!util.empty(params.account_id, params.amount)) { throw errors.errorFormat('BAD_REQUEST'); }

        const transaction = new Transaction({
            account_id: params.account_id,
            amount: params.amount,
            operation: 0,
            movement: 'DEPOSIT',
            Created: new Date()
        });
        transaction.save();

        var balance = util.getBalance(params.account_id);

        const balanceActual = parseFloat(balance.amount) + parseFloat(transaction.amount);
        let accountUpdated = await util.update(params, params.account_id);

        const response = { account_id: transaction.account_id, balance: transaction.amount, operation: transaction.operation };
        return response;
    } catch (error) {
        throw error;
    }
}

exports.retirement = async function(params) {
    try {
        if (!util.empty(params.account_id, params.amount)) { throw errors.errorFormat('BAD_REQUEST') }
        var account = util.getBalance(params.account_id);
        if (!this.isAmountRetirementMinorBalance(parseInt(params.amount), parseInt(account.amount))) { throw errors.errorFormat('INSUFFICIENT_BALANCE'); }

        const transaction = new Transaction({
            account_id: params.account_id,
            amount: params.amount,
            operation: 1,
            movement: 'RETIREMENT',
            Created: new Date()
        });
        transaction.save();

        const balanceActual = parseInt(account.amount) - parseInt(transaction.amount);
        let accountUpdated = await util.update({ amount: transaction.amount, operacion: transaction.operation }, params.account_id);

        const response = { account_id: transaction.account_id, balance: balanceActual, operation: 1 };
        return response;
    } catch (error) {
        throw error.message;
    }
}


exports.listTranscationes = async function(account_id) {
    try {
        const arreglo = await Transaction.find({ account_id: account_id }).exec();
        return arreglo;
    } catch (error) {
        throw error.message;
    }
}

exports.isAmountRetirementMinorBalance = function(amount, balance) {
    return amount <= balance ? true : false;
}