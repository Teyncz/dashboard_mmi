import bcrypt from 'bcryptjs'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { email, password, studentNumber } = req.body;

        const user = await prisma.user.findFirst({
            where: { studentNumber },
        });

        if (user) {

            res.status(410).json({ message: "Student number already used" });

        } else {

            const salt = bcrypt.genSaltSync(10);
            const hashedPassword = bcrypt.hashSync(password, salt);

            try {
                const newUser = await prisma.user.create({
                    data: {
                        email,
                        password: hashedPassword,
                        studentNumber,
                    },
                });
                res.status(201).json(newUser);
            } catch (error) {
                if (error.code === 'P2002' && error.meta.target.includes('email')) {
                    res.status(409).json({ message: "email already used" })
                }
                else {
                    res.status(500).json({ message: "User creation failed", error: error.message });
                }
            }
        }
    } else {

        res.status(405).json({ message: "Method not allowed" });

    }
}