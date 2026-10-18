import {Request, Response} from 'express';
import {postRepository} from "../../posts/repositories/posts.repository";
import {blogRepository} from "../../blogs/repositories/blogs.repository";
import {userRepository} from "../../user/infrastructure/user.repository";
import {HttpStatus} from "../../core/types/http-statuses";
import {usersQueryRepository} from "../../user/infrastructure/user.query.repository";

export const deleteFullData = async (req: Request, res: Response) => {
    await postRepository.deletePostList()
    await blogRepository.deleteBlogList()
    await userRepository.deleteUserList()
    await usersQueryRepository.clearUserReadModel()

    res.sendStatus(HttpStatus.NoContent_204)
}