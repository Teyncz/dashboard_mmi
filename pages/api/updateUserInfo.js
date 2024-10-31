import bcrypt from 'bcryptjs'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
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