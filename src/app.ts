
import app from './server'

async function start(): Promise<void> {
    try {
        app.listen(5000, () => console.log('Servidor está ouvindo na porta 5000'));
    } catch (err) {
        console.log(err);
    }
}

start();
export = app;