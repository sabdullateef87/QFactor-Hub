import { ICategory } from "../interfaces/category.interface";

export default class Category implements ICategory {
    name: string;
    description: string;
    constructor(name: string, description: string){
        this.name = name;
        this.description = description;
    }
}