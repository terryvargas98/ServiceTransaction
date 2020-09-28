const transactionService = require('../services/transactionService');

/**
 * 
 * @request {account_id, amountToDeposit} req 
 * @response {account_id: 15478qw8wer, balance: 100} res
 * @param {operation: {0: deposit, 1: retirement}}
 */
exports.deposit = async function(req, res) {
    const params = req.body;
    try {
        const data = await transactionService.deposit(params);
        res.status(200).json(data);
    } catch (error) {
        res.status(403).send(error);
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
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json(error);
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
        res.status(400).json(error);
    }
}