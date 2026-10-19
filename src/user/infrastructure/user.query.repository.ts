import {userReadDTO} from "../dto/users-read-dto";
import {SortQueryFilterType} from "../../core/types/sort-query-filter-type";
import {userWriteCollection} from "../../db/mongo.write.db";

export const usersQueryRepository = {
    async findUsers(sortQueryDto: SortQueryFilterType): Promise<{ items: userReadDTO[]; totalCount: number }> {
        const {
            sortBy,
            pageNumber,
            pageSize,
            sortDirection,
            searchLoginTerm,
            searchEmailTerm
        } = sortQueryDto;

        const skip = (pageNumber - 1) * pageSize;
        const filter: any = {};

        if (searchLoginTerm) {
            filter.login = { $regex: searchLoginTerm, $options: 'i' };
        }
        if (searchEmailTerm) {
            filter.email = { $regex: searchEmailTerm, $options: 'i' };
        }

        const documents = await userWriteCollection
            .find(filter)
            .sort({ [sortBy]: sortDirection })
            .skip(skip)
            .limit(pageSize)
            .toArray();

        const items: userReadDTO[] = documents.map((document) => ({
            id: document._id.toString(),
            login: document.login,
            email: document.email,
            createdAt: document.createdAt,
        }));

        const totalCount = await userWriteCollection.countDocuments(filter);

        return { items, totalCount };
    }
};