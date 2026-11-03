import express, { Express } from 'express';
import {PATHS} from "./core/paths/paths";
import {blogsRouter} from "./blogs/routers/blogs.router";
import {postsRouter} from "./posts/routers/post.router";
import {testingRouter} from "./testing/routers/testing.router";
import {userRouter} from "./user/api/routers/user.router";
import {authRouter} from "./auth/router/auth.router";

export const setupApp = (app: Express) => {
    app.use(express.json());

    app.use(PATHS.AUTH_PATH, authRouter);
    app.use(PATHS.BLOGS_PATH, blogsRouter);
    app.use(PATHS.POSTS_PATH, postsRouter);
    app.use(PATHS.TESTING_PATH, testingRouter);
    app.use(PATHS.USER_PATH, userRouter);

    return app;
}