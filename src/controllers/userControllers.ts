import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient() as any;

// 1. Menampilkan semua user
export const getUsers = async (
    req: Request, 
    res: Response
) => {

    const users = await prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            foto: true
        }
    });
    res.status(200).json(users);
};

// 2. Menampilkan user berdasarkan id
export const getUserById = async (
    req: Request,
    res: Response
) => {

    const { id } = req.params;

    const user = await prisma.user.findUnique({
        where: {
            id: parseInt(Array.isArray(id) ? id[0] : id)
        },
        select: {
            id: true,
            name: true,
            email: true,
            foto: true
        }
    });

    if (!user) {
        return res.status(404)
            .json({ message: "User tidak ditemukan" });
    }
    res.status(200).json(user);
};

// 3. Menambahkan user
export const createUser = async (
    req: Request,
    res: Response
) => {

    const { name, email, foto, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400)
            .json({ message: "Name, email, dan password harus diisi" });
    }

    const existingUser = await prisma.user.findUnique({
        where: {
            email
        }
    });

    if (existingUser) {
        return res.status(400)
            .json({ message: "Email sudah digunakan" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({  
        data: {
            name,
            email,
            foto,
            password: hashedPassword
        }
    });

    res.status(201).json({
        message: "User berhasil ditambahkan",
        user: newUser
    });
};

// 4. Mengupdate user
export const updateUser = async (
    req: Request,
    res: Response
) => {

    const { id } = req.params;
    const userId = parseInt(Array.isArray(id) ? id[0] : id);

    const { name, email, foto, password } = req.body;

    const existingUser = await prisma.user.findUnique({
        where: {
            id: userId
        }
    });

    if (!existingUser) {
        return res.status(404)
        .json({ message: "User tidak ditemukan" });
    }

    const updatedUser = await prisma.user.update({
        where: {
            id: userId
        },
        data: {
            name,
            email,
            foto,
            password
        }
    });

    res.status(200).json({
        message: "User berhasil diupdate",
        user: updatedUser
    });
};

// 5. Menghapus user
export const deleteUser = async (
    req: Request,
    res: Response
) => {

    const { id } = req.params;
    const userId = parseInt(Array.isArray(id) ? id[0] : id);

    const existingUser = await prisma.user.findUnique({
        where: {
            id: userId
        }
    });

    if (!existingUser) {
        return res.status(404)
            .json({ message: "User tidak ditemukan" });
    }

    await prisma.user.delete({
        where: {
            id: userId
        }
    });

    res.status(200).json({
        message: "User berhasil dihapus"
    });
};
