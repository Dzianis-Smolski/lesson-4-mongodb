import 'dotenv/config';
import express from 'express';
import { setupApp } from './setup-app';
import { SETTINGS } from './core/settings/settings';
import { runWriteDB } from './db/mongo.write.db';

const bootstrap = async () => {
    const app = express();

    setupApp(app);

    const PORT = SETTINGS.PORT;

    await runWriteDB(SETTINGS.MONGO_URL)

    app.listen(PORT, () => {
        console.log(`Example app listening on port ${PORT}`);
    });
    return app;
};

bootstrap();
