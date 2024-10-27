import jwt from 'jsonwebtoken'

export default function handler(req, res) {
    if (req.method === 'POST') {
        const { token } = req.body
        const secret = process.env.JWT_SECRET

        if (!secret) {
            res.status(500).json({ message: 'JWT secret not defined' })
            return;
        }

        try {
            const decoded =  jwt.verify(token, secret)
            res.status(200).json({user: decoded})
        } catch (error) {
            res.status(401).json({ message: 'Invalid token' })
        }
    }
    else {
        res.status(405).json({ message: 'Method not allowed' })
    }
}
