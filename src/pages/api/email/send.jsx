import { sendEmailBackend } from "../../../lib/helpers";

export default async function handler(req, res) {
    if (req.method === 'POST' && req.body.toEmail && req.body.msg && req.body.fromEmail) {
        try {
            const { msg, fromEmail, toEmail, subject } = req.body;
            await sendEmailBackend(msg, fromEmail, toEmail, subject)
            return res.status(200).json({ status: "successs" })
        } catch (error) {
            console.error('Error generating token:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
    return res.status(400).json({ error: 'Email is required' });
}