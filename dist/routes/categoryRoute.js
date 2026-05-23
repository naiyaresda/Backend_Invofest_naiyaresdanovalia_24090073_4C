import express from "express";
import { getCategories, createCategory, getCategory, updateCategory, deleteCategory } from "../controllers/categoryControllers";
const router = express.Router();
// menampilkan semua category
router.get("/", getCategories);
// menambahkan category
router.post("/", createCategory);
// menampilkan detail category berdasarkan id
router.get("/:id", getCategory);
// mengupdate category berdasarkan id
router.put("/:id", updateCategory);
// menghapus category berdasarkan id
router.delete("/:id", deleteCategory);
export default router;
