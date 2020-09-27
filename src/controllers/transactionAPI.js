const transaction = require('../Models/transaction');
const transactionService = require('../services/transactionService');

/**
 * 
 * @request {account_id, amountToDeposit} req 
 * @response {account_id: 15478qw8wer, balance: 100} res
 * @param {operation: {0: deposit, 1: retirement}}
 */
exports.deposit = function(req, res) {
    const params = req.body;

    try {
        const data = transactionService.deposit(params);
        res.status(200).json({ account_id: data.account_id, balance: data.balance, operation: data.operation });
    } catch (error) {

        res.status(403).send({ message: error });
    }

}

/**
 * 
 * @request {account_id, amountToRetirement, balance} req 
 * @response {account_id: 15478qw8wer, balance: 110} res
 * @param {operation: {0: deposit, 1: retirement}} 
 */
exports.retirement = function(req, res) {
    const params = req.body;
    try {
        const data = transactionService.retirement(params);
        res.status(200).json({ account_id: data.account_id, balance: data.balance, operation: data.operation });
    } catch (error) {
        res.status(400).json({ message: error });
    }

}

exports.listTransaction = async function(req, res) {

    try {
        const myJson = await transactionService.listTranscationes(req.params.account_id);
        res.status(200).json(myJson);
    } catch (error) {
        res.status(400).json({ message: error });
    }
    res.end();

}

exports.LastTransaction = async function(req, res) {

    try {

        const Transactions = await transactionService.listTranscationes(req.params.account_id);

        const LastTransaction = Transactions.reduce((acum, el) => acum.Created > el.Created ? acum : el);

        res.status(200).json({ operation: LastTransaction.operation, amount: LastTransaction.amount, numberId: LastTransaction.account_id });

    } catch (err) {
        res.status(400).json({ message: err });

    }

}