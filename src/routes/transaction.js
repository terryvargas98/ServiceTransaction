const { Router } = require('express');
const router = Router();
const transactionAPI = require('../controllers/transactionAPI');

router.post('/deposit', transactionAPI.deposit);
router.post('/retirement', transactionAPI.retirement);
router.get('/List/:account_id', transactionAPI.listTransaction);
module.exports = router;