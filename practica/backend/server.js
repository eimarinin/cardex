const express = require('express');
const cors = require('cors');
const requestsRouter = require('./requests');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use('/api', requestsRouter);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
