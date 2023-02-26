import { Request, Response } from "express";
const ExpressAdapter = (fn: Function) => async (req: Request, res: Response) => {
  const object = await fn(req, res);
  return res.json({data: object});
}

export default ExpressAdapter;