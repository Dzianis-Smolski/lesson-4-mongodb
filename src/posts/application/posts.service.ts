import {blogRepository} from "../../blogs/repositories/blogs.repository";
import {postRepository} from "../repositories/posts.repository";
import {mapToPostViewModel} from "../routers/mapers/map-to-post-view-mode.util";
import {BlogDBModel} from "../../blogs/types/blogs-types";
import {PostCreateUpdateDTO} from "../types/posts-types";
import {WithId} from "mongodb";

export const postsService = {
    async findMany(id: string) {
        const posts = await postRepository.findPostsByBlogId(id);

        return posts.map(post => {
            return mapToPostViewModel(post);
        });
    },

    async findById(id: string) {
        return await blogRepository.findById(id);
    },

    async create(blogId: string, blogDbById: WithId<BlogDBModel>, body: PostCreateUpdateDTO) {
        const newPost = {
            title: body.title,
            shortDescription: body.shortDescription,
            content: body.content,
            blogId: blogId,
            blogName: blogDbById.name,
            createdAt: new Date(),
        }
        const post   = await postRepository.createPost(newPost);

        return mapToPostViewModel(post);
    },

    async update() {

    },

    async delete(id: string) {

    },
}