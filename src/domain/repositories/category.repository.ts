import Category from "../entities/category.entity";

export default interface ICategoryRepo {
    createCategory(input: Category): Promise<Category>;
    findCategoryByName(name: string): Promise<Category>;
    getAllCategories(): Promise<Category[]>;
    deleteCategory(name: string): Promise<Category>;
}