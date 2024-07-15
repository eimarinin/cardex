import mysql from 'mysql';

// Создание подключения к базе данных
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'cardex',
    password: 'Cardex_2024',
    database: 'cardex'
});

// Подключение к базе данных
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to database');
});

// Функция для выполнения SQL запросов
export const query = (sql, params, callback) => {
    return connection.query(sql, params, callback);
};

// Экспорт объекта подключения (необязательно)
export default connection;