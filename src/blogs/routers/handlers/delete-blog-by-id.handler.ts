import {Request, Response} from 'express'
import {blogRepository} from "../../repositories/blogs.repository";
import {HttpStatus} from "../../../core/types/http-statuses";


export const deleteBlogById = async (req: Request<{id: string}>, res: Response) => {
    const id = req.params.id

    const isDeleted = await blogRepository.deleteBlogById(id);

    return isDeleted ? res.sendStatus(HttpStatus.NoContent)
        : res.sendStatus(HttpStatus.NotFound)
}