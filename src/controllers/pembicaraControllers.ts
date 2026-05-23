import { Request, Response } from "express";
import { prisma } from "../lib/db.js";

// 1. Menampilkan semua pembicara
export const getPembicaras = async (req: Request, res: Response) => {

    try {

        const pembicaras = await prisma.pembicara.findMany();

        res.status(200).json(pembicaras);

    } catch (error: any) {

        console.log(error);

        res.status(500).json({
            message: "Gagal mengambil data pembicara",
            error: error.message,
        });
    }
};

// 2. Menambahkan pembicara
export const createPembicara = async (req: Request, res: Response) => {

    try {

        const { name, role, image } = req.body;

        // validasi
        if (!name || !role || !image) {
            return res.status(400).json({
                message: "Name, Role, dan Image harus diisi",
            });
        }

        const newPembicara = await prisma.pembicara.create({
            data: { name, role, image,
                createdAt: new Date(),
            },
        });

        res.status(201).json({
            message: "Pembicara berhasil ditambahkan",
            pembicara: newPembicara,
        });

    } catch (error: any) {

        console.log(error);

        res.status(500).json({
            message: "Gagal menambahkan pembicara",
            error: error.message,
        });
    }
};

// 3. Detail pembicara
export const getPembicara = async (req: Request, res: Response) => {

    try {

        const id = Number(req.params.id);

        const pembicara = await prisma.pembicara.findUnique({
            where: {
                id,
            },
        });

        if (!pembicara) {
            return res.status(404).json({
                message: "Pembicara tidak ditemukan",
            });
        }

        res.status(200).json(pembicara);

    } catch (error: any) {

        console.log(error);

        res.status(500).json({
            message: "Gagal mengambil detail pembicara",
            error: error.message,
        });
    }
};

// 4. Update pembicara
export const updatePembicara = async (req: Request, res: Response) => {

    try {

        const id = Number(req.params.id);

        const { name, role, image } = req.body;

        const pembicara = await prisma.pembicara.update({
            where: {
                id,
            },
            data: { name, role, image,
            },
        });

        res.status(200).json({
            message: "Pembicara berhasil diupdate",
            pembicara,
        });

    } catch (error: any) {

        console.log(error);

        res.status(500).json({
            message: "Gagal update pembicara",
            error: error.message,
        });
    }
};

// 5. Hapus pembicara
export const deletePembicara = async (req: Request, res: Response) => {

    try {

        const id = Number(req.params.id);

        await prisma.pembicara.delete({
            where: {
                id,
            },
        });

        res.status(200).json({
            message: "Pembicara berhasil dihapus",
        });

    } catch (error: any) {

        console.log(error);

        res.status(500).json({
            message: "Gagal menghapus pembicara",
            error: error.message,
        });
    }
};