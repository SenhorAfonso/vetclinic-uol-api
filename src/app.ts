
console.clear()

import express from 'express';
import router from './routes/vetclinic'
import connectDB from './db/connect'
require('dotenv').config()

const app = express();

app.use('/api/v1/vetclinic', router);

async function start(): Promise<void> {
    try {
        const connectionURL = process.env.MONGO_URL!;
        const conn = await connectDB(connectionURL);
        app.listen(5000, () => console.log('Servidor está ouvindo na porta 5000'));
    } catch (err) {
        console.log(err);
    }
}

start();