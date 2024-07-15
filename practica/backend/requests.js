const express = require('express');
const db = require('./db/connection');

const router = express.Router();

// Получение всех запросов
router.get('/requests', (req, res) => {
    db.query('SELECT * FROM requests', (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
});

// Добавление нового запроса
router.post('/requests', (req, res) => {
    const { dealer, client, date, stage, status, comment } = req.body;
    const sql = 'INSERT INTO requests (dealer, client, date, stage, status, comment) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(sql, [dealer, client, date, stage, status, comment], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(201).send('Request added');
    });
});

// Удаление запроса по id
router.delete('/requests/:id', (req, res) => {
    const requestId = req.params.id;
    const sql = 'DELETE FROM requests WHERE id = ?';
    db.query(sql, [requestId], (err, result) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).send('Internal Server Error');
        }
        if (result.affectedRows === 0) {
            return res.status(404).send('Request not found');
        }
        res.status(200).json({ message: `Request with id ${requestId} deleted` });
    });
});
module.exports = router;
