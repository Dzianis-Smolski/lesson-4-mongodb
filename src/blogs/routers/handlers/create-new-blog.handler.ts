import {Request, Response} from 'express';
import {BlogCreateUpdateDTO, BlogViewModel} from "../../types/blogs-types";
import {blogRepository} from "../../repositories/blogs.repository";
import {mapToBlogViewModel} from "../mapers/map-to-blog-view-mode.util";
import {HttpStatus} from "../../../core/types/http-statuses";

export const createNewBlog = async ( req: Request<{},{}, BlogCreateUpdateDTO>, res: Response) => {
    const newBlog = {
        name: req.body.name,
        description: req.body.description,
        websiteUrl: req.body.websiteUrl,
        createdAt: new Date(),
        isMembership: true
    }
    const blog = await blogRepository.createBlog(newBlog);

    return res.status(HttpStatus.Created).send(mapToBlogViewModel(blog));
}