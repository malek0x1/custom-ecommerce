import { sendEmail } from "../../../lib/helpers";

export default async function handler(req, res) {
    if (req.method === 'POST' && req.body.email && req.body.token) {
        try {
            const { email, msg } = req.body;
            await sendEmail(msg, email, "Reset Password")
            return res.status(200).json({ status: "successs" })
        } catch (error) {
            console.error('Error generating token:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
    return res.status(400).json({ error: 'Email is required' });
}

