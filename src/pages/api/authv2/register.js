import { createCustomerCommerceJs, createUserSanity, getCommerceJsCustomerByExternalID, hashPassword, isEmailAlreadyExist } from "../../../lib/helpers";


export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed', message: 'Only POST requests are allowed' });
    }

    const { email, password, firstname, lastname } = req.body;

    // Validate input data
    if (!email || !password || !firstname || !lastname) {
        return res.status(400).json({ error: 'Bad Request', message: 'All fields are required' });
    }

    try {
        // in sanity
        const isEmailExist = await isEmailAlreadyExist(email);
        if (isEmailExist) {
            return res.status(409).json({ error: 'Conflict', message: 'Email is already associated with an existing account' });
        }

        const commerceJsData = {
            email: email,
            firstname: firstname,
            lastname: lastname,
            external_id: email,
        };

        const encryptPwd = await hashPassword(password)

        // in commercejs# if its already exist means it have externalid which is the email from checkout
        const isCustomerAlreadyExist = await getCommerceJsCustomerByExternalID(email)

        try {
            if (!isCustomerAlreadyExist) {
                await createCustomerCommerceJs(commerceJsData)
            }

            await createUserSanity({ email, firstname, lastname, password: encryptPwd, external_id: email })
        }
        catch (e) {
            res.status(500).json({ error: 'Internal Server Error', message: "Something went wrong" });
        }
        res.status(200).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Internal Server Error', message: 'Failed to register user' });
    }
}