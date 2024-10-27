import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method === 'POST') {

        const { studentNumber, color, date, taskInfo, hour } = req.body;

        try {
            const result = await prisma.tasks.create({
                data: {
                    userId: studentNumber,
                    Color: color,
                    Date: new Date(date),
                    TaskInfo: taskInfo,
                    Hour: hour
                },
            });

            res.status(200).json({ message: "Task successfully created", result });

        } catch (error) {
            if (error.message.includes('Record to delete does not exist')) {
                return res.status(400).json({ message: 'Task already deleted or does not exist' });
            }
            else {
                res.status(500).json({ message: 'Error during task deletion', error: error.message });

            }
        }

    } else {
        res.status(405).json({ message: "Method not allowed" });
    }
}