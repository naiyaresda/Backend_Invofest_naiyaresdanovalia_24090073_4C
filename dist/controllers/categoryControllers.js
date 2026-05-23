import { prisma } from "../lib/db";
// 1. Menampilkan semua category
export const getCategories = async (req, res) => {
    try {
        const categories = await prisma.category.findMany();
        res.status(200).json(categories);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Gagal mengambil data category",
            error: error.message,
        });
    }
};
// 2. Menambahkan category
export const createCategory = async (req, res) => {
    try {
        const { name } = req.body;
        // validasi
        if (!name) {
            return res.status(400).json({
                message: "Name harus diisi",
            });
        }
        const newCategory = await prisma.category.create({
            data: {
                name,
                createdAt: new Date(),
            },
        });
        res.status(201).json({
            message: "Category berhasil ditambahkan",
            category: newCategory,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Gagal menambahkan category",
            error: error.message,
        });
    }
};
// 3. Detail category
export const getCategory = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const category = await prisma.category.findUnique({
            where: {
                id,
            },
        });
        if (!category) {
            return res.status(404).json({
                message: "Category tidak ditemukan",
            });
        }
        res.status(200).json(category);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Gagal mengambil detail category",
            error: error.message,
        });
    }
};
// 4. Update category
export const updateCategory = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const { name } = req.body;
        const category = await prisma.category.update({
            where: {
                id,
            },
            data: {
                name,
            },
        });
        res.status(200).json({
            message: "Category berhasil diupdate",
            category,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Gagal update category",
            error: error.message,
        });
    }
};
// 5. Hapus category
export const deleteCategory = async (req, res) => {
    try {
        const id = Number(req.params.id);
        await prisma.category.delete({
            where: {
                id,
            },
        });
        res.status(200).json({
            message: "Category berhasil dihapus",
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Gagal menghapus category",
            error: error.message,
        });
    }
};
