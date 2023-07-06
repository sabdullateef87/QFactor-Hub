import { isElement } from "lodash";
import Category from "../../../../domain/entities/category.entity";
import ICategoryRepo from "../../../../domain/repositories/category.repository";
import CategoryModel from "../models/category.model";
import BadRequestException from "../../../../exceptions/BadRequestException";
import { Http2ServerResponse } from "http2";
import { HttpResponseCode, Status } from "../../../../utils/constants";
import BaseResponse from "../../../../dtos/response.dto";
import BaseException from "../../../../exceptions/BaseException";

export class CategoryMongoRepo implements ICategoryRepo {
    async createCategory(input: Category): Promise<Category> {
        const isExist = await CategoryModel.findOne({ name: input.name });
        console.log(isExist);
        if (isExist) throw new BaseException(`Category with name ${input.name} already exist.`, HttpResponseCode.DUPLICATE_RECORD, Status.FAILURE);
        const newCategory = new CategoryModel(input);
        await newCategory.save();
        return newCategory;

    }
    findCategoryByName(name: string): Promise<Category> {
        throw new Error("Method not implemented.");
    }
    getAllCategories(): Promise<Category[]> {
        throw new Error("Method not implemented.");
    }
    deleteCategory(name: string): Promise<Category> {
        throw new Error("Method not implemented.");
    }

}