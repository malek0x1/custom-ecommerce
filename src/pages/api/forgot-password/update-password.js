import { hashPassword, isValidEmail, updateUserPasswordByEmail, verifyForgotPwdToken } from "../../../lib/helpers";

export default async function handler(req, res) {
    if (req.method === 'POST' && req.body.email && req.body.token && req.body.password) {
        try {
            const { email, token, password } = req.body;
            if (!isValidEmail(email)) {
                return res.status(400).json({ error: 'Invalid email format' });
            }
            const tokenData = verifyForgotPwdToken(token, email);
            if (tokenData) {
                const encryptPwd = await hashPassword(password)
                const updatePwd = await updateUserPasswordByEmail(email, encryptPwd)
                return res.status(200).json({ data: updatePwd });
            } else {
                return res.status(400).json({ error: 'invalid token' });
            }

        } catch (error) {
            console.log(10);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
    return res.status(400).json({ error: 'Something Went Wrong' });
}

