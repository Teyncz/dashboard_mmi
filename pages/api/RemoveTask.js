import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method === 'POST') {

        const { id } = req.body;

        try {
            const result = await prisma.tasks.delete({
                where: {
                    id: id,
                },
            });

        res.status(200).json({ message: "Task successfully created", result });

    } catch (error) {
        res.status(500).json({ message: "Error during adding the task", error: error.message });
    }

} else {
    res.status(405).json({ message: "Method not allowed" });
}
}