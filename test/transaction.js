// mocha -t 100000 test/retirementTest.js --grep xx

const expect = require('chai').expect;
const chai = require('chai');
const chaiHttp = require('chai-http');
const transactionService = require('../src/services/transactionService');
const util = require('../src/services/util');

describe('Deposit', () => {
    it('Should deposit ok', async () => {
        let params = { account_id: 98787656789876, amount: 20, operation: 0 };
        let balanceBeforeDeposit = util.getBalance(params.account_id);
        let amountToDeposit = params.amount;
        const res = await transactionService.deposit(params);
        let balanceAfterDeposit = util.getBalance(params.account_id);

        expect(res).to.have.property("account_id");
        expect(res).to.have.property("balance");
        expect(res).to.have.property("operation");
        expect(parseFloat(balanceAfterDeposit.amount)).to.equal(parseFloat(amountToDeposit) + parseFloat(balanceBeforeDeposit.amount));
    });

    /* it('Should deposit failed by account_id not found', () => {
        let params = {
            account_id: 6,
            amount: 20
        };

        const res = transactionService.deposit(params);
        expect(res).to.have.status(500);
        //expect(res).to.have.property("message");
    }) */
})

describe('Retirement', () => {
    it('Should retirement ok', async () => {
        let params = { account_id: 98787656789876, amount: 1000, operation: 1 };
        let balanceBeforeRetirement = util.getBalance(params.account_id);
        let amountToRetirement = params.amount;

        const res = await transactionService.retirement(params);
        let balanceAfterRetirement = util.getBalance(params.account_id);

        expect(res).to.have.property("account_id");
        expect(res).to.have.property("balance");
        expect(res).to.have.property("operation");
        expect(parseFloat(balanceAfterRetirement.amount)).to.equal(parseFloat(balanceBeforeRetirement.amount) - parseFloat(amountToRetirement));
    });

    /* it('Should retirement failed by insufficient balance', async () => {
        let params = { account_id: 98787656789876, amount: 500000 };

        const res = await transactionService.retirement(params);
        console.log("response in test: ",res);

        //expect(res).to.have.status(400);
        expect(res).to.have.property("message");
    }); */

    /* it('/retirement', async(done) => {
        let params = { account_id: 98787656789876, amount: 500000 };
        chai.request(app)
            .post('/retirement')
    }) */
})