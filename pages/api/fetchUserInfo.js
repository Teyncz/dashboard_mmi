import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { studentNumber } = req.body;

        try {
            const color = await prisma.user.findUnique({
                where: {
                  studentNumber: studentNumber
                },
                select: {
                  email: true,
                  color: true, 
                  fname: true,
                  lname: true,
                  pp: true,
                  tp: true,
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