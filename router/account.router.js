const express = require('express');
const router = express.Router();

const accountDAO = require('../service/account.srv');


router.get('/reset', async (req, res) => {
    const rs = await accountDAO.reset();
    res.send({rs});
})

router.get('/', async (req, res) => {
    const accountList = await accountDAO.getAll();
    res.render('account', { accountList });
})

router.post('/', async (req, res) => {

    const inserted = await accountDAO.insert({
        accountNo: req.body.account_no,
        customerName: req.body.customer_name,
        accountType: req.body.account_type,
    });

    if (inserted) {
        res.send({result: true})
    } else {
        res.send({result: false, error: 'Cannot insert account'});
    }
    
})

module.exports = router;