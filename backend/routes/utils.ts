import { NextFunction, Request, Response } from "express";

export const asyncWraper = (fn: any) => (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  fn(req, res, next).catch(next);
};

type errorNames = "CONTENT NOT FOUND";
export class CustomError extends Error {
  statusCode: number;

  constructor(name: errorNames, message: string, statusCode: number) {
    super(message);
    this.name = name;
    this.statusCode = statusCode;
  }
}
