import { Request, Response } from "express";
import { prisma } from "../lib/db.js";

// 1. Menampilkan semua event
export const getEvents = async (req: Request, res: Response) => {

    try {

        const events = await prisma.event.findMany({
            include: {
                category: true,
                pembicara: true,
            },
        });

        res.status(200).json(events);

    } catch (error: any) {

        console.log(error);

        res.status(500).json({
            message: "Gagal mengambil data event",
            error: error.message,
        });
    }
};

// 2. Menambahkan event
export const createEvent = async (req: Request, res: Response) => {

    try {

        const { name, location, dateEvent, description, categoryId, pembicaraId,
        } = req.body;

        // validasi
        if ( !name || !location || !dateEvent || !categoryId || !pembicaraId
        ) {
            return res.status(400).json({
                message: "Semua field wajib diisi",
            });
        }

        const newEvent = await prisma.event.create({
            data: { name, location, dateEvent: new Date(dateEvent), description, categoryId: Number(categoryId), pembicaraId: Number(pembicaraId), createdAt: new Date(),
            },
        });

        res.status(201).json({
            message: "Event berhasil ditambahkan",
            event: newEvent,
        });

    } catch (error: any) {

        console.log(error);

        res.status(500).json({
            message: "Gagal menambahkan event",
            error: error.message,
        });
    }
};

// 3. Detail event
export const showEvent = async (req: Request, res: Response) => {

    try {

        const id = Number(req.params.id);

        const event = await prisma.event.findUnique({
            where: {
                id,
            },
            include: {
                category: true,
                pembicara: true,
            },
        });

        if (!event) {
            return res.status(404).json({
                message: "Event tidak ditemukan",
            });
        }

        res.status(200).json(event);

    } catch (error: any) {

        console.log(error);

        res.status(500).json({
            message: "Gagal mengambil detail event",
            error: error.message,
        });
    }
};

// 4. Update event
export const updateEvent = async (req: Request, res: Response) => {

    try {

        const id = Number(req.params.id);

        const { name, location, dateEvent, description, categoryId, pembicaraId,
        } = req.body;

        const event = await prisma.event.update({
            where: {
                id,
            },
            data: { name, location, dateEvent: new Date(dateEvent), description, categoryId: Number(categoryId), pembicaraId: Number(pembicaraId),
            },
        });

        res.status(200).json({
            message: "Event berhasil diupdate",
            event,
        });

    } catch (error: any) {

        console.log(error);

        res.status(500).json({
            message: "Gagal update event",
            error: error.message,
        });
    }
};

// 5. Hapus event
export const deleteEvent = async (req: Request, res: Response) => {

    try {

        const id = Number(req.params.id);

        await prisma.event.delete({
            where: {
                id,
            },
        });

        res.status(200).json({
            message: "Event berhasil dihapus",
        });

    } catch (error: any) {

        console.log(error);

        res.status(500).json({
            message: "Gagal menghapus event",
            error: error.message,
        });
    }
};