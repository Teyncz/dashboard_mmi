import bcrypt from 'bcryptjs'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { id, currentPassword, newPassword } = req.body;

        const salt = bcrypt.genSaltSync(10);
        const hashedNewPassword = bcrypt.hashSync(newPassword, salt);


            const verifyPassword = await prisma.user.findUnique({
                where: {
                    id: id,
                },
                select: {
                    password: true,
                }
            })

            if (verifyPassword && bcrypt.compareSync(currentPassword, verifyPassword.password)) {

                if (currentPassword != newPassword) {

                    const updatedPassword = await prisma.user.update({
                        where: {
                            id: id,
                        },
                        data: {
                            password: hashedNewPassword,
                        },
                    });
    
                    res.status(200).json({ message: "User password uptdated successfully" });

                }else{
                    res.status(302).json({ message: "Current password and new password are identical" });

                }
                

            } else if (!bcrypt.compareSync(currentPassword, verifyPassword.password)) {

                res.status(301).json({ message: "Wrong password !" });

            }



    } else {

        res.status(405).json({ message: "Method not allowed" });

    }
}