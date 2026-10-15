import {SortQueryFilterType} from "../../core/types/sort-query-filter-type";
import {usersQueryRepository} from "../infrastructure/user.query.repository";


export const userQueryService = {
   async findUsers(sortQueryDto: SortQueryFilterType) {
       return usersQueryRepository.findUsers(sortQueryDto)
   }
}