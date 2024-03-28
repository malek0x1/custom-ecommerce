import { generateForgotPwdToken, isValidEmail } from "../../../lib/helpers";

export default async function handler(req, res) {
    if (req.method === 'POST' && req.body.email) {
        try {
            const { email } = req.body;
            if (!isValidEmail(email)) {
                return res.status(400).json({ error: 'Invalid email format' });
            }
            const tokenData = generateForgotPwdToken(email);
            return res.status(200).json({ token: tokenData });
        } catch (error) {
            console.error('Error generating token:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
    return res.status(400).json({ error: 'Email is required' });
}

