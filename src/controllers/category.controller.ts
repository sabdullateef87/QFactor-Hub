import { CreateCategoryDTO, createCategorySchema } from "../dtos/category.dto";
import BaseException from "../exceptions/BaseException";
import CategoryService from "../services/category.service";
import { HttpResponseCode, Status } from "../utils/constants";

export default class CategoryController {
    constructor(private readonly categoryService: CategoryService) {
        this.createCategoryController = this.createCategoryController.bind(this);
    }
    async createCategoryController(req: Request, res: Response) {

        try {
            const isValid = createCategorySchema.validate(req.body);
            if (isValid.error) {
                const errorMessage = isValid.error.message;
                return new BaseException(errorMessage, HttpResponseCode.BAD_REQUEST, Status.FAILURE);
            }
            const body = req.body as unknown as CreateCategoryDTO;
            return this.categoryService.createCategory(body);
        } catch (error) {
            return new BaseException("Iternal server occured", HttpResponseCode.INTERNAL_SERVER_ERROR, Status.FAILURE);
        }
        
    }
}