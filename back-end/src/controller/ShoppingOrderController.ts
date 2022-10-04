import { Request, Response } from "express";
import { ShoppingOrderBusiness } from "../Business/ShoppingOrderBusinnes";
import { ICreateOrderDTO, IUpdateOrderDTO } from "../models/ShoppingOrder";

export class ShoppingOrderController {
  constructor(private shoppingOrderBusiness: ShoppingOrderBusiness) {}

  createList = async (req: Request, res: Response) => {
    try {
      const input: ICreateOrderDTO = {
        token: req.headers.authorization,
        userName: req.body.userName,
        deliveryDate: req.body.deliveryDate,
        listId: req.body.listId,
      };
      const response = await this.shoppingOrderBusiness.createOrder(input);
      res.status(201).send({ result: response });
    } catch (error) {
      res.status(error.code || 500).send(error.message || error.sqlMessage);
    }
  };

  getList = async (req: Request, res: Response) => {
    try {
      const token = req.headers.authorization;
      const response = await this.shoppingOrderBusiness.getOrder(token);
      res.status(201).send({ result: response });
    } catch (error) {
      res.status(error.code || 500).send(error.message || error.sqlMessage);
    }
  };

  updateList = async (req: Request, res: Response) => {
    try {
      const input: IUpdateOrderDTO = {
        token: req.headers.authorization,
        deliveryDate: req.body.deliveryDate,
        listId: req.body.listId,
      };
      const response = await this.shoppingOrderBusiness.updateOrder(input);
      res.status(201).send({ result: response });
    } catch (error) {
      res.status(error.code || 500).send(error.message || error.sqlMessage);
    }
  };
}