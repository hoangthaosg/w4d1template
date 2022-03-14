const express = require('express');
const router = express.Router();

var sql = require("mssql");

var sqlConfig = {
    user: 'sa',
    password: 'Hello123@',
    server: 'localhost',
    database: 'master',
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
      },
    options: { trustServerCertificate: true }
};

router.get('/', async (req, res) => {

    try {
        await sql.connect(sqlConfig)
        const result = await sql.query('select * from Account')
        console.log(result)
        res.render('account', { accountList: result.recordset });
    } catch (err) {
        console.error('err', err);
        res.send('error db')
    }
})

router.post('/', async (req, res) => {

    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`insert into Account(account_no, customer_name, account_type) values 
        ('${req.body.account_no}','${req.body.customer_name}','${req.body.account_type}')`)
        console.log(result);
        //res.redirect(301, "/account?insert=success");
        res.send({result: true})
    } catch (err) {
        console.error('err', err);
        res.send({result: false, error: err});
    }
})

module.exports = router;