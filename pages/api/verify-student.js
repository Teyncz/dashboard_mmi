import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'POST') {


    }
    else {
        res.status(405).json({ message: 'Method not allowed' })
    }
}
