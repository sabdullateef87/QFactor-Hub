import { Request, Response, NextFunction } from "express"

export const f1 = (req: Request, res: Response, next: NextFunction) => {
  console.log(req.body);
  next();
}
