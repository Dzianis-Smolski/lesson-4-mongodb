import {userReadDTO} from "../../../dto/users-read-dto";
import {PaginationMeta, PaginationResult} from "../../../../core/types/pagination";

export const mapToUserListPaginatedOutput = (
    items: userReadDTO[],
    meta: PaginationMeta
): PaginationResult<userReadDTO> => {
    return {
        ...meta,
        items
    };
}