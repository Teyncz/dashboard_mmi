import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'POST') {

        const { studentNumber } = req.body;

        try {
            const result = await prisma.tasks.findMany({
                where: {
                    userId: studentNumber,
                },
                select: {
                    id: true,
                    userId: true,
                    Color: true,
                    Date: true,
                    Hour: true,
                    Statut: true,
                    TaskInfo: true,
                },
                orderBy: {
                    Date: 'asc', 
                },
            });

            res.status(200).json({ result });

        } catch (error) {
            res.status(500).json({ message: "Error during adding the task", error: error.message });
        }

    } else {
        res.status(405).json({ message: "Method not allowed" });
    }
}