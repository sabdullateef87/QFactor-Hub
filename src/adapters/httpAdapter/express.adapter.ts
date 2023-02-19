import { Request, Response } from "express";
const ExpressAdapter = (fn: Function) => async (req: Request, res: Response) => {
  const object = await fn(req.params, req.body, req.headers);
  return res.json(object);
}

export default ExpressAdapter;