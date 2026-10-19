import {Request, Response} from 'express';
import {postRepository} from "../../posts/repositories/posts.repository";
import {blogRepository} from "../../blogs/repositories/blogs.repository";
import {userRepository} from "../../user/infrastructure/user.repository";
import {HttpStatus} from "../../core/types/http-statuses";

export const deleteFullData = async (req: Request, res: Response) => {
    await postRepository.deletePostList()
    await blogRepository.deleteBlogList()
    await userRepository.deleteUserList()

    res.sendStatus(HttpStatus.NoContent_204)
}