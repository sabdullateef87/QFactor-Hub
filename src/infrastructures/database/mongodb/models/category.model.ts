import mongoose, { Schema, model } from "mongoose";
import { ICategory } from "../../../../domain/interfaces/category.interface";

export const categorySchema = new mongoose.Schema<ICategory>({
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    createdAt: { type: Date, default: Date.now()}
}, { timestamps: true })

const CategoryModel = mongoose.model<ICategory>("Category", categorySchema);
export default CategoryModel;