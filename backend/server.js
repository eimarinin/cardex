import express, { json } from 'express';
import cors from 'cors';
import requestsRouter from './requests.js';
import offersRouter from './offers.js';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(json());

app.use('/api', requestsRouter);
app.use('/api', offersRouter);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
