import 'dotenv/config';
import express from 'express';
import { setupApp } from './setup-app';
import { SETTINGS } from './core/settings/settings';
import {runWriteDB, userWriteCollection} from './db/mongo.write.db';
import {runReadDB} from "./db/mongo.read.db";
import {startUserChangeStream} from "./db/change-streams/start-user-change-stream";

const bootstrap = async () => {
    const app = express();

    setupApp(app);

    const PORT = SETTINGS.PORT;

    await Promise.all([
        runWriteDB(SETTINGS.MONGO_URL),
        runReadDB(SETTINGS.MONGO_URL)
    ])

    startUserChangeStream(userWriteCollection)

    app.listen(PORT, () => {
        console.log(`Example app listening on port ${PORT}`);
    });
    return app;
};

bootstrap();
