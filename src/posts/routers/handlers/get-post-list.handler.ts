import {Request, Response} from 'express';
import {postRepository} from "../../repositories/posts.repository";
import {mapToPostViewModel} from "../mapers/map-to-post-view-mode.util";
import {HttpStatus} from "../../../core/types/http-statuses";


export const getPostList = async (req: Request, res: Response) => {

    try {
    const postList = await postRepository.findAll()
    const postViewModel = postList.map(mapToPostViewModel)

    res.status(HttpStatus.Ok).send(postViewModel)
    } catch (error) {
        res.sendStatus(HttpStatus.BadRequest)
    }
}