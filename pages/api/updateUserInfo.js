import bcrypt from 'bcryptjs'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { id, email, fname, lname, color, tp } = req.body;


        const updatedUser = await prisma.user.update({
            where: {
                id: id,
            },
            data: {
                email: email,
                color: color,
                fname: fname,
                lname: lname,
                tp: tp,
            },
        });

        res.status(200).json({ message: "User info uptdated successfully" });


    } else {

        res.status(405).json({ message: "Method not allowed" });

    }
}