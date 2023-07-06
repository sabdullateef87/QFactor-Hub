import { ICategory } from "../interfaces/category.interface";
import BaseEntity from "./base.entity";

export default class Category extends BaseEntity implements ICategory  {
    name: string;
    description: string;

    constructor(name: string, description: string, createdAt?: Date, updatedAt?:Date){
        super(createdAt, updatedAt);
        this.name = name;
        this.description = description;
    }
}