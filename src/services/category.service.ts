import { Http2ServerResponse } from "http2";
import Category from "../domain/entities/category.entity";
import ICategoryRepo from "../domain/repositories/category.repository";
import { CreateCategoryDTO, mapCreateCategorytoCategory } from "../dtos/category.dto";
import BaseException from "../exceptions/BaseException";
import { HttpResponseCode, Status } from "../utils/constants";

export default class CategoryService {
    constructor(private readonly categoryRepo: ICategoryRepo) { }
    async createCategory(input: CreateCategoryDTO): Promise<Category | any> {
        try {
            return await this.categoryRepo.createCategory(mapCreateCategorytoCategory(input));
        } catch (error) {
            if (error instanceof BaseException) {
                return new BaseException(error.message, error.httpCode, error.status);
            }
            return new BaseException("Internal Server Exception", HttpResponseCode.INTERNAL_SERVER_ERROR, Status.FAILURE);
        }
    }
}