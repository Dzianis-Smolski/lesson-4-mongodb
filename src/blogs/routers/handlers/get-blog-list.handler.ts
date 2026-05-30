import {Request, Response} from 'express';
import {BlogQueryInput} from "../input/blog-query.input";
import {blogsService} from "../../application/blogs.service";
import {matchedData} from "express-validator";
import {setDefaultSortAndPaginationIfNotExist} from "../../../core/helpers/set-default-sort-and-pagination";


export const getBlogListHandler = async (req: Request<{}, {}, {}, BlogQueryInput>, res: Response) => {
    const sanitizedQuery = matchedData<BlogQueryInput>(req, {
        locations: ['query'],
        includeOptionals: true,
    })

    const queryInput: BlogQueryInput = setDefaultSortAndPaginationIfNotExist(sanitizedQuery)

    const result = await blogsService.findMany(queryInput);

    return res.status(200).send(result);
};
