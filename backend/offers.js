import { Router } from 'express';
import { query } from './db/connection.js';

const router = Router();

// Получение всех запросов
router.get('/offers', (req, res) => {
    query('SELECT * FROM offers', (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
});

// Добавление нового запроса
router.post('/offers', (req, res) => {
    const { device, quantity, comment } = req.body;
    const sql = 'INSERT INTO offers (device, quantity, comment) VALUES (?, ?, ?)';
    query(sql, [device, quantity, comment], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(201).send('Request added');
    });
});

// Удаление запроса по id
router.delete('/offers/:id', (req, res) => {
    const requestId = req.params.id;
    const sql = 'DELETE FROM offers WHERE id = ?';
    query(sql, [requestId], (err, result) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).send('Internal Server Error');
        }
        if (result.affectedRows === 0) {
            return res.status(404).send('Request not found');
        }
        res.status(200).json();
    });
});
export default router;

// Обновление запроса по id
router.put('/offers/:id', (req, res) => {
    const requestId = req.params.id;
    const { device, quantity, comment } = req.body;
    const sql = 'UPDATE offers SET device = ?, quantity = ?, comment = ? WHERE id = ?';
    query(sql, [device, quantity, comment, requestId], (err, result) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).send('Internal Server Error');
        }
        if (result.affectedRows === 0) {
            return res.status(404).send('Request not found');
        }
        res.status(200).json();
    });
});
