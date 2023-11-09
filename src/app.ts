
console.clear()

import express from 'express';
import router from './routes/vetclinic'
import connectDB from './db/connect'
import dotenv from 'dotenv'

const app = express();

app.use(express.json())
app.use('/api/v1/vetclinic', router);

async function start(): Promise<void> {
    try {
        dotenv.config()
        await connectDB(process.env.MONGO_URL!);
        app.listen(5000, () => console.log('Servidor está ouvindo na porta 5000'));
    } catch (err) {
        console.log(err);
    }
}

start();