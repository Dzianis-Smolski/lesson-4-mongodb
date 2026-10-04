import {SortQueryFilterType} from "../../core/types/sort-query-filter-type";

export const usersQueryRepository = {
    async findMany() {

    },
    async findAllUsers(
        sortQueryDto: SortQueryFilterType,
    )
        // : Promise<IPagination<IUserView[]>>
    {
        const {
            pageNumber,
            pageSize,
            sortDirection,
            searchLoginTerm,
            searchEmailTerm
        } = sortQueryDto;
//
//         const loginAndEmailFilter = {};
//
//         const totalCount = await db
//         .getCollections()
//         .usersCollection.countDocuments(loginAndEmailFilter);
//
//         const users = await db
//         .getCollections()
//         .usersCollection.find(loginAndEmailFilter)
//         .sort({ [sortBy]: sortDirection })
//         .skip((pageNumber - 1) * pageSize)
//         .limit(pageSize)
//         .toArray();
//
//         return {
//             pagesCount: Math.ceil(totalCount / pageSize),
//             page: pageNumber,
//             pageSize: pageSize,
//             totalCount,
//             items: users.map((u) => this._getInView(u)),
//         };
    },
//     async findById(id: string): Promise<IUserView | null> {
//         const user = await db
//         .getCollections()
//         .usersCollection.findOne({ _id: new ObjectId(id) });
//         return user ? this._getInView(user) : null;
//     },
//     _getInView(user: WithId<IUserDB>): IUserView {
//         return {
//             id: user._id.toString(),
//             login: user.login,
//             email: user.email,
//             createdAt: user.createdAt.toISOString(),
//         };
//     },
//     _checkObjectId(id: string): boolean {
//         return ObjectId.isValid(id);
//     },
};