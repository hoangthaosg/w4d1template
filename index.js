const express = require('express');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'pug');

app.get('/', function (req, res) {
    res.render('index');
});

app.use('/account', require('./router/account.router'));

app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

const port = 3000;

app.listen(port, () => {
    console.log('Your Server is running on 3000');
})