import { verifyForgotPwdToken } from "../../../lib/helpers";

export default async function handler(req, res) {
    if (req.method === 'POST' && req.body.email && req.body.token) {
        try {
            const { email, token } = req.body
            const tokenData = verifyForgotPwdToken(token, email);
            return res.status(200).json({ validate: tokenData });

        } catch (error) {
            console.error('Error generating token:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
    console.log(req.body.email);
    return res.status(400).json({ error: 'Email is required' });
}

