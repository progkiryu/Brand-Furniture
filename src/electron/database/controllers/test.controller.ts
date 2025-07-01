import express from "express";
import { TestModel } from "../models/test.model.js";

// export const getTests = () => TestModel.find();
// export const getTestById = (id: string) => TestModel.findById(id);
// export const getTestByName = (name: string) => TestModel.findOne({ name });
// export const createTest = (values: Record<string, any>) =>
//   new TestModel(values).save().then((test) => test.toObject());
// export const deleteTestById = (id: string) =>
//   TestModel.findOneAndDelete({ _id: id });
// export const updateTestById = (id: string, values: Record<string, any>) =>
//   TestModel.findByIdAndUpdate(id, values);

export const registerTest = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { name, desc } = req.body;

    if (!name || !desc) {
      res.sendStatus(400);
      return;
    }

    const existingTest = await TestModel.findById(req.body.id);
    if (existingTest) {
      res.sendStatus(400);
      return;
    }

    const test = await TestModel.create(req.body);

    res.status(200).json(test).end();
    return;
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
    return;
  }
};
