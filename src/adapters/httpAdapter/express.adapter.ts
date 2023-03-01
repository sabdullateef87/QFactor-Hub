import { Request, Response } from "express";
import MWResponse from '../../dtos/response.dto';
import BaseException from "../../exceptions/BaseException";
const ExpressAdapter = (fn: Function) => async (req: Request, res: Response) => {
  const object = await fn(req, res);
  if (object instanceof MWResponse) {
    const code = object.httpCode;
    return res.status(code).json(object);
  } else if (object instanceof BaseException) {
    const httpErrorCode = object.httpCode;
    return res.status(httpErrorCode).json(object);
  } else {
    return res.json(object);
  }

}

export default ExpressAdapter;
