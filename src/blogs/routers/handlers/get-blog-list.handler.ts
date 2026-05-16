import {Request, Response} from 'express';
import {blogRepository} from "../../repositories/blogs.repository";
import {mapToBlogViewModel} from "../mapers/map-to-blog-view-mode.util";
import {HttpStatus} from "../../../core/types/http-statuses";


export const getBlogList = async (req: Request, res: Response) => {

    try {
    const blogList = await blogRepository.findAll()
    const blogViewModel = blogList.map(mapToBlogViewModel)

    res.status(HttpStatus.Ok).send(blogViewModel)
    } catch (error) {
        res.sendStatus(HttpStatus.BadRequest)
    }
}