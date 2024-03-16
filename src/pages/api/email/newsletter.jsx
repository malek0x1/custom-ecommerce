// pages/api/email.js
import axios from 'axios';

export default async function handler(req, res) {
    const { email } = req.query;
    const url = `https://xyz.us10.list-manage.com/subscribe/post-json?u=${process.env.NEXT_PUBLIC_MAILCHIMP_NEWSLETTER_KEY}&id=075ee30bea&f_id=00b3aee5f0&EMAIL=${encodeURIComponent(email)}&c=__jp2`;

    try {
        const response = await axios.get(url);
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
