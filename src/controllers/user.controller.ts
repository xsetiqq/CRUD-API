import * as e from "express";

export const getAllUsers = (req: e.Request, res: e.Response): e.Response => {
  return res.status(200).json([]);
};

export const getUserById = (req: e.Request, res: e.Response): e.Response => {
  return res.status(200).json({});
};

export const createUser = (req: e.Request, res: e.Response): e.Response => {
  return res.status(201).json({});
};
