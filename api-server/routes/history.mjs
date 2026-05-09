import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

// Get all history records
router.get("/", async (req, res) => {
  let collection = await db.collection("history");
  let results = await collection.find({})
    .sort({ exploredAt: -1 })
    .limit(50)
    .toArray();
  res.send(results).status(200);
});

// Add a new history record
router.post("/", async (req, res) => {
  let collection = await db.collection("history");
  let newDocument = req.body;
  newDocument.exploredAt = new Date();
  let result = await collection.insertOne(newDocument);
  res.send(result).status(204);
});

// Delete a history record
router.delete("/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };
  const collection = db.collection("history");
  let result = await collection.deleteOne(query);
  res.send(result).status(200);
});

export default router;