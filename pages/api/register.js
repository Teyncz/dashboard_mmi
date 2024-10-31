import bcrypt from 'bcryptjs'
import { PrismaClient } from '@prisma/client'
import { select } from '@nextui-org/react';

const prisma = new PrismaClient()

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { email, password, studentNumber } = req.body;

        const user = await prisma.user.findFirst({
            where: { studentNumber },
        });


        if (user) {

            res.status(410).json({ message: "Student number already used" });

        }

        else {

            try {

                const fetchStudent = await prisma.students.findUnique({
                    where: {
                        studentNumber: studentNumber,  
                    },
                    select: {
                        firstName: true,
                        lastName: true,
                        groupTp: true
                    }
                });

                const salt = bcrypt.genSaltSync(10);
                const hashedPassword = bcrypt.hashSync(password, salt);

                try {
                    const newUser = await prisma.user.create({
                        data: {
                            email,
                            password: hashedPassword,
                            studentNumber,
                            fname: fetchStudent.firstName,
                            lname: fetchStudent.lastName,
                            tp: fetchStudent.groupTp,
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

            } catch (error) {
                res.status(400).json({ error: error.message })
            }
        }
    } else {

        res.status(405).json({ message: "Method not allowed" });

    }
}
