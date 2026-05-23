import express from "express";

import { getEvents, createEvent, showEvent, updateEvent, deleteEvent } from "../controllers/eventControllers.js";

const router = express.Router();

// menampilkan semua data event
router.get("/", getEvents);

// menambahkan data event
router.post("/", createEvent);

// menampilkan detail event berdasarkan id
router.get("/:id", showEvent);

// mengupdate data event berdasarkan id
router.put("/:id", updateEvent);

// menghapus data event berdasarkan id
router.delete("/:id", deleteEvent);

export default router;