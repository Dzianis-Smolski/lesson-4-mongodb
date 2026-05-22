import { Collection, WithId } from "mongodb";
import {PaginationResult} from "../types/pagination";

export async function paginate<T extends Document>(
    collection: Collection<T>,
    filter: any,
    page: number,
    pageSize: number,
    sortBy: string = "createdAt",
    sortDirection: "asc" | "desc" = "desc"
): Promise<PaginationResult<WithId<T>>> {

    const totalCount = await collection.countDocuments(filter);

    const items = await collection
    .find(filter)
    .sort({ [sortBy]: sortDirection === "asc" ? 1 : -1 })
    .skip((page - 1) * pageSize)
    .limit(pageSize)
    .toArray();

    return {
        pagesCount: Math.ceil(totalCount / pageSize),
        page,
        pageSize,
        totalCount,
        items
    };
}
