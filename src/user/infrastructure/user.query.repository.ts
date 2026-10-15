import {userReadCollection} from "../../db/mongo.read.db";
import {userReadDTO} from "../dto/users-read-dto";
import {SortQueryFilterType} from "../../core/types/sort-query-filter-type";

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

        const items: userReadDTO[] = await userReadCollection
        .find(filter)
        .sort({ [sortBy]: sortDirection })
        .skip(skip)
        .limit(pageSize)
        .toArray();

        const totalCount = await userReadCollection.countDocuments(filter);

        return { items, totalCount };
    },
};