import { NextFunction, Request, Response } from "express";
import { client } from "../services";
import { ObjectId } from "mongodb";

export class TodoController {
  async getTodos(req: Request, res: Response, nextFunction: NextFunction) {
    const todos = await client.db("tutorial").collection("todolist").find().toArray();
    res.status(200).send(todos);
  }

  async postTodos(req: Request, res: Response, nextFunction: NextFunction) {
    const createData = await client.db("tutorial").collection("todolist").insertOne(req.body);
    res.status(200).send(`Created todo with id: ${createData.insertedId}`);
  }

  async putTodos(req: Request, res: Response, nextFunction: NextFunction) {
    const updateData = await client.db("tutorial").collection("todolist").replaceOne(
      { _id: new ObjectId(req.params.id) },
      req.body
    );

    if (!updateData.acknowledged || updateData.modifiedCount === 0) {
      res.status(400).send("Todo with given id does not exist");
    } else {
      res.status(200).send("Todo updated");
    }
  }

  async deleteTodos(req: Request, res: Response, nextFunction: NextFunction) {
    const deleteData = await client.db("tutorial").collection("todolist").deleteOne(
      { _id: new ObjectId(req.params.id) }
    );

    if (!deleteData.acknowledged || deleteData.deletedCount === 0) {
      res.status(400).send("Todo with given id does not exist");
    } else {
      res.status(200).send("Todo updated");
    }
  }
}
