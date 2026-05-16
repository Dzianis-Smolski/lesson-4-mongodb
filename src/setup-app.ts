import express, { Express } from 'express';
import {PATHS} from "./core/paths/paths";
import {blogsRouter} from "./blogs/routers/blogs.router";
import {postsRouter} from "./posts/routers/post.router";
import {testingRouter} from "./testing/routers/testing.router";

export const setupApp = (app: Express) => {
    app.use(express.json());

    app.use(PATHS.BLOGS_PATH, blogsRouter);
    app.use(PATHS.POSTS_PATH, postsRouter);
    app.use(PATHS.TESTING_PATH, testingRouter);

    return app;
}