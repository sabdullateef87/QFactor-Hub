import Joi from "joi"
import Category from "../domain/entities/category.entity"

export interface CreateCategoryDTO {
    name: string,
    description: string
}

export const createCategorySchema = Joi.object({
    name: Joi.string().max(100).required(),
    description: Joi.string().max(400).required()
})

export const mapCreateCategorytoCategory = (categoryDTO: CreateCategoryDTO): Category =>{
    const _category = new Category(categoryDTO.name, categoryDTO.description);
    return _category;
}