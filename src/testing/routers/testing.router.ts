import {Router} from "express";
import {deleteFullData} from "../handlers/delete-full-data";

export const testingRouter = Router();

testingRouter.delete('/all-data', deleteFullData)