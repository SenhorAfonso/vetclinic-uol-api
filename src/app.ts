
console.clear()

import express from 'express';
import router from './routes/vetclinic'

const app = express();

app.use('/api/v1/vetclinic', router)

app.listen(5000, () => console.log('Servidor está ouvindo na porta 5000'));