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

const getAll = async () => {
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query('select * from Account')
        console.log(result)
        return result.recordset;
    } catch (err) {
        console.error('err', err);
    }
    return [];
}

const insert = async (account) => {

    const {accountNo, customerName, accountType} = account;

    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`insert into Account(account_no, customer_name, account_type) values 
        ('${accountNo}','${customerName}','${accountType}')`)
        console.log(result);
        return true;
    } catch (err) {
        console.error('err', err);
    }
    return false;
}

const reset = async () => {
    try {
        await sql.connect(sqlConfig)
        const deleted = await sql.query(`delete from Account`)
        console.log(deleted);
        const rs1 = await sql.query(`insert into Account(account_no, customer_name, account_type) values 
        ('01-000-0001','Pete Mike','Savings')`);
        console.log(rs1);
        const rs2 = await sql.query(`insert into Account(account_no, customer_name, account_type) values 
        ('01-000-0002','Paul Marien','Checking')`);
        console.log(rs2);
        return true;
    } catch (err) {
        console.error('err', err);
    }
    return false;
}

module.exports = {getAll, insert, reset}