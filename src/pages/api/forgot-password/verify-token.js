import { verifyForgotPwdToken } from "../../../lib/helpers";

export default async function handler(req, res) {
    if (req.method === 'GET' && req.query.email && req.query.token) {
        try {
            const { email, token } = req.query
            const tokenData = await verifyForgotPwdToken(token, email);
            return res.status(200).json({ validate: tokenData });

        } catch (error) {
            console.error('Error generating token:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
    return res.status(400).json({ error: 'Email is required' });
}

