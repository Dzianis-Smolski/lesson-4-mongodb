import {Request, Response} from 'express';
import {HttpStatus} from "../../../core/types/http-statuses";
import {postsService} from "../../../posts/application/posts.service";

export const getPostsOfBlog = async (req: Request<{blogId: string} >, res: Response) => {
    const id: string = req.params.blogId;
    const postListOfBlog =  await postsService.findMany(id)

    return res.status(HttpStatus.Ok).send(postListOfBlog);
}