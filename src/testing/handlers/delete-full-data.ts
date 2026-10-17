import {Request, Response} from 'express';
import {postRepository} from "../../posts/repositories/posts.repository";
import {blogRepository} from "../../blogs/repositories/blogs.repository";
import {HttpStatus} from "../../core/types/http-statuses";
import {userRepository} from "../../user/infrastructure/user.repository";


export const deleteFullData = async (req: Request, res: Response) => {
    await postRepository.deletePostList()
    await blogRepository.deleteBlogList()
    await userRepository.deleteUserList()

    res.sendStatus(HttpStatus.NoContent_204)
}