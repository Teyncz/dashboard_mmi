import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default function handler(req, res) {
    if (req.method === 'POST') {


    }
    else {
        res.status(405).json({ message: 'Method not allowed' })
    }
}
