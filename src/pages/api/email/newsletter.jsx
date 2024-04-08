import axios from 'axios';

const subscribeWithEmail = async (email) => {
    const formData = new FormData();
    formData.append('EMAIL', email);

    try {
        const response = await axios.post(
            'https://gmail.us22.list-manage.com/subscribe/post',
            formData,
            {
                params: {
                    u: 'bddf00306119e5a8acc2fafdb',
                    id: 'f4770769df',
                    f_id: '0037c6e1f0'
                },
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        );

        console.log('Subscription successful:', response);
        // Handle success here
    } catch (error) {
        console.error('Subscription failed:', error);
        // Handle error here
    }
};
export default async function handler(req, res) {
    const { email } = req.body;
    const url = `https://gmail.us22.list-manage.com/subscribe/post?u=${process.env.NEXT_PUBLIC_MAILCHIMP_NEWSLETTER_KEY}&amp;id=f4770769df&amp;f_id=0037c6e1f0`
    try {
        const response = await subscribeWithEmail(email)
        console.log(response);
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}