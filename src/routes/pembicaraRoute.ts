import express from "express";

import { getPembicaras, createPembicara, getPembicara, updatePembicara, deletePembicara } from "../controllers/pembicaraControllers.js";

const router = express.Router();

// menampilkan semua data pembicara
router.get("/", getPembicaras);

// menambahkan data pembicara
router.post("/", createPembicara);

// menampilkan detail pembicara berdasarkan id
router.get("/:id", getPembicara);

// mengupdate data pembicara berdasarkan id
router.put("/:id", updatePembicara);

// menghapus data pembicara berdasarkan id
router.delete("/:id", deletePembicara);

export default router;