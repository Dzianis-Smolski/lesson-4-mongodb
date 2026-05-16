import {WithId} from "mongodb";
import {BlogDBModel, BlogViewModel} from "../../types/blogs-types";


export const mapToBlogViewModel = (blog: WithId<BlogDBModel>) : BlogViewModel => {
    return {
        id: blog._id.toString(),
        name: blog.name,
        description: blog.description,
        websiteUrl: blog.websiteUrl,
        createdAt: blog.createdAt,
        isMembership: false,
    }
}