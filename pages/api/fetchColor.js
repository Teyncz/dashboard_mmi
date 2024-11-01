import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'POST') {
        const { studentNumber } = req.body;

        try {
            const color = await prisma.user.findUnique({
                where: {
                  studentNumber: studentNumber
                },
                select: {
                  color: true  
                }
              });

            if (color.length === 0) {
                return res.status(404).json({ message: "No grades found for this student" });
            }

            res.status(200).json(color);

        } catch (error) {
            console.error('Error fetching student grades:', error);
            res.status(500).json({ message: "Error fetching student grades", error: error.message });
        }
    } else {
        res.status(405).json({ message: "Method not allowed" });
    }
}