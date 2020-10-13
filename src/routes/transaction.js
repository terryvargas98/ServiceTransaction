const { Router } = require('express');
const router = Router();
const transactionAPI = require('../controllers/transactionAPI');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const fetch = require('node-fetch');
const { json } = require('body-parser');


router.post('/deposit', transactionAPI.deposit);
router.post('/retirement', transactionAPI.retirement);
router.get('/List/:account_id', transactionAPI.listTransaction);
router.get('/LastTransaction/:account_id', transactionAPI.LastTransaction);
router.get('/ListCourses', function(req, res) {
    let account = "http://192.168.99.100/api/courses";
    var balance = JSON.parse(get(account, "GET"));
    var objecto = JSON.stringify(balance)
    console.log(objecto);
})
router.get('/registrarMatricula', function(req, res) {
    res.render('resgister');
})
router.post('/registrar', async function(req, res) {

    var param = {
        curso: req.body.curso,
        alumno: req.body.alumno,
    }

    const rawResponse = await fetch('http://192.168.99.100/api/matricula/register', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(param)
    });
    res.render('resgister');
});


function get(url, method) {
    var Httpreq = new XMLHttpRequest(); // a new request
    Httpreq.open(method, url, false);
    Httpreq.send(null);
    return Httpreq.responseText;
}
module.exports = router;