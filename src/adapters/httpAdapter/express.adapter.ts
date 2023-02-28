import { Request, Response } from "express";
const ExpressAdapter = (fn: Function) => async (req: Request, res: Response) => {
  const object = await fn(req, res);
  return res.json({ _data_: object });
}

export default ExpressAdapter;
