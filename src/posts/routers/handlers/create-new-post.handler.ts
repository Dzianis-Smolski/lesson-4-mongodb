import {Request, Response} from 'express';
import {PostCreateUpdateDTO, PostViewModel} from "../../types/posts-types";
import {postRepository} from "../../repositories/posts.repository";
import {mapToPostViewModel} from "../mapers/map-to-post-view-mode.util";
import {HttpStatus} from "../../../core/types/http-statuses";
import {blogRepository} from "../../../blogs/repositories/blogs.repository";

export const createNewPost = async ( req: Request<{},{}, PostCreateUpdateDTO>, res: Response) => {
    const blogDbById = await blogRepository.findById(req.body.blogId)

    if(blogDbById){
        const newPost = {
            title: req.body.title,
            shortDescription: req.body.shortDescription,
            content: req.body.content,
            blogId: req.body.blogId,
            blogName: blogDbById.name,
            createdAt: new Date(),
        }
        const post = await postRepository.createPost(newPost);

        return res.status(HttpStatus.Created).send(mapToPostViewModel(post));
    }

    return res.status(HttpStatus.NotFound).send('the inputModel has incorrect values');
}