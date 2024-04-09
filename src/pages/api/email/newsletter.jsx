import axios from 'axios';

const subscribeWithEmail = async (email) => {
    const url = `https://xyz.us10.list-manage.com/subscribe/post-json?u=${process.env.NEXT_PUBLIC_MAILCHIMP_NEWSLETTER_KEY}&id=f4770769df&f_id=0037c6e1f0&EMAIL=${encodeURIComponent(email)}&c=__jp2`;
    try {
        await axios.get(url);
        return true
    } catch (error) {
        throw new Error("Error while subscribing")
    }
};

export default async function handler(req, res) {
    const { email } = req.body;
    try {
        const response = await subscribeWithEmail(email)
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}