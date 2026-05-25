import {Request, Response} from 'express';
import {HttpStatus} from "../../../core/types/http-statuses";
import {BlogQueryInput} from "../input/blog-query.input";
import {blogsService} from "../../application/blogs.service";
import {BlogSortField} from "../input/blog-sort-field";
import {SortDirection} from "../../../core/types/sort-direction";


export const getBlogList = async (req: Request, res: Response) => {
    // 1. Нормализуем query
    const queryInput: BlogQueryInput = {
        searchNameTerm: req.query.searchNameTerm as string ?? null,
        pageNumber: Number(req.query.pageNumber) || 1,
        pageSize: Number(req.query.pageSize) || 10,
        sortBy: (req.query.sortBy as BlogSortField) ?? BlogSortField.CreatedAt,
        sortDirection: (req.query.sortDirection as SortDirection) ?? SortDirection.Desc,
    };

    // 2. Передаём уже чистые данные в сервис
    const result = await blogsService.findMany(queryInput);

    // 3. Возвращаем ответ
    return res.status(200).send(result);
};
