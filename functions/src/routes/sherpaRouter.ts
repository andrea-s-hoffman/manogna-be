import express from "express";
import { getClient } from "../db";
import Job from "../models/jobData";
import { ObjectId } from "mongodb";
import UserData from "../models/UserData";

const sherpaRouter = express.Router();

const errorResponse = (error: any, res: any) => {
  console.error("FAIL", error);
  res.status(500).json({ message: "Internal Server Error" });
};

sherpaRouter.get("/:accountId", async (req, res) => {
  const accountId: string = req.params.accountId;
  try {
    const client = await getClient();
    const jobs = await client
      .db()
      .collection<Job>("Jobs")
      .find({ accountId })
      .toArray();
    console.log(jobs);
    if (jobs.length > 0) {
      res.status(200).json(jobs);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    errorResponse(error, res);
  }
});

sherpaRouter.put("/:id", async (req, res) => {
  const _id: ObjectId = new ObjectId(req.params.id);
  const job: Job = req.body;
  delete job._id;
  try {
    const job: Job = req.body;
    const client = await getClient();
    const result = await client
      .db()
      .collection<Job>("Jobs")
      .replaceOne({ _id }, job);
    if (result.modifiedCount > 0) {
      res.status(200).json(job);
    } else {
      res.status(404).json("not found");
    }
  } catch (err) {
    errorResponse(err, res);
  }
});

sherpaRouter.post("/", async (req, res) => {
  try {
    const job: Job = req.body;
    const client = await getClient();
    await client.db().collection<Job>("Jobs").insertOne(job);
    res.status(201).json(job);
  } catch (err) {
    errorResponse(err, res);
  }
});

sherpaRouter.delete("/jobs/:id", async (req, res) => {
  try {
    const _id: ObjectId = new ObjectId(req.params.id);

    const client = await getClient();
    const result = await client.db().collection<Job>("Jobs").deleteOne({ _id });
    if (result.deletedCount) {
      res.status(204);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (err) {
    errorResponse(err, res);
  }
});

//User Data handling:

sherpaRouter.get("/users/:uid", async (req, res) => {
  const uid: string = req.params.uid;
  try {
    const client = await getClient();
    const userData = await client
      .db()
      .collection<UserData>("UserData")
      .findOne({ uid });
    console.log(userData);
    if (userData) {
      res.status(200).json(userData);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    errorResponse(error, res);
  }
});

sherpaRouter.post("/users", async (req, res) => {
  try {
    const data: UserData = req.body;
    const client = await getClient();
    await client.db().collection<UserData>("UserData").insertOne(data);
    res.status(201).json(data);
  } catch (err) {
    errorResponse(err, res);
  }
});

sherpaRouter.put("/users/:id", async (req, res) => {
  try {
    const data: UserData = req.body;
    const _id: ObjectId = new ObjectId(req.params.id);
    delete data._id;
    const client = await getClient();
    await client
      .db()
      .collection<UserData>("UserData")
      .replaceOne({ _id }, data);
    res.status(200).json(data);
  } catch (err) {
    errorResponse(err, res);
  }
});

sherpaRouter.delete("/users/:id", async (req, res) => {
  try {
    const _id: ObjectId = new ObjectId(req.params.id);

    const client = await getClient();
    const result = await client
      .db()
      .collection<UserData>("UserData")
      .deleteOne({ _id });
    if (result.deletedCount) {
      res.status(204);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (err) {
    errorResponse(err, res);
  }
});

export default sherpaRouter;
