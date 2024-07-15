const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'cardex',
    password: 'Cardex_2024',
    database: 'cardex'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL database');
});

module.exports = db;
