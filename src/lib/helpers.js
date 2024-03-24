import axios from "axios";
import commerce from "./commerce";
import { client } from "../lib/sanity";
import bcrypt from 'bcryptjs';

const BASE_URL = 'https://api.chec.io/v1';

/*
1- create customer -> SignUp Page -> store the email in localstorage 
2- get Token from email (which is stored in localstorage if not loggedin)
3- login commerce.customer.getToken(token)

-- END --
on Logout commerce.customer.logout() + remove email from localstorage

*/

// 1- Function to create a customer
export async function createCustomerCommerceJs(customerData) {

    // const customerData = {
    //     email: 'email@gmail.com',
    //     phone: '+1 987 654 3210',
    //     firstname: 'Leslie',
    //     lastname: 'Lawless',
    //     external_id: 'MY_CRM_USER_123',
    //   };

    try {
        const response = await axios.post(`${BASE_URL}/customers`, customerData, {
            headers: {
                'X-Authorization': process.env.NEXT_PUBLIC_CHEC_PUBLIC_API_KEY,
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.log(error.response.data.error.message);
        throw new Error('Error creating customer: ');
    }
}


// 2- get Token from email
export async function getUserToken(email) {
    try {
        const response = await axios.post(
            'https://api.chec.io/v1/customers/issue-token',
            {
                email,
                base_url: 'https://mystore.com/login/:token:',
            },
            {
                headers: {
                    'X-Authorization': process.env.NEXT_PUBLIC_CHEC_PUBLIC_API_KEY,
                    'Content-Type': 'application/json',
                },
            }
        );
        return response.data.token; // Assuming the JWT is returned in the response data
    } catch (error) {
        console.error('Error getting user token:', error);
        return null;
    }
}



export async function handLoginByToken(token) {
    // 3- Log In
    commerce.customer.getToken(token).then((jwt) => console.log(jwt));
}


export async function handleCommerceJsLoggIn(email) {
    const token = await getUserToken(email)
    await handLoginByToken(token)
}



export const getInitialVariants = (product) => {
    /*
    Function to get Initial Variants, it select first variant item for each variant type 
    output example:
    {Color:{name:"red"} , Size:{name:"16GB"}}
    */

    let variantsData = {}

    product.variant_groups.forEach(variant => {
        variantsData = { ...variantsData, [variant.name]: { ...variant.options[0], variantGroupId: variant.id } }
    })
    return variantsData
}

export const handleChosenVariants = (chosenVariants) => {
    /*
    Function to format variants to add them to cart 
    output example:
    vrnt group id ex for Color, and variantId for red for example color->red, size->16gb
    {"vrntGrpA_ID":"variantId","vrntGrpX_ID":"variantId"}
  */

    let allChosenVariants = {}

    Object.keys(chosenVariants).forEach(item => {
        const vrnt = chosenVariants[item]
        allChosenVariants = { ...allChosenVariants, [vrnt.variantGroupId]: vrnt.id }
    })
    return allChosenVariants
}

// SANITY


export const isEmailAlreadyExist = async (email) => {
    try {
        const query = `*[_type == "users" && email == $email]`;
        const params = { email };
        const matchingUsers = await client.fetch(query, params);
        if (matchingUsers.length > 0) {
            return true
        } else {
            return false;
        }
    } catch (error) {
        console.error("Error checking user :", error);
        throw new Error("Failed to check user:");
    }
};

export const checkUserCredentials = async (email, password) => {
    try {
        const query = `*[_type == "users" && email == $email]`;
        const params = { email };
        const matchingUsers = await client.fetch(query, params);
        if (matchingUsers.length > 0) {
            const passwordsMatch = await bcrypt.compare(password, matchingUsers[0].password);
            if (passwordsMatch) {
                // Passwords match, user authenticated
                return true
            } else {
                // Passwords don't match, authentication failed
                // throw new Error('Invalid email or password');
                return false
            }
        } else {
            return false;
        }
    } catch (error) {
        console.error("Error checking user credentials:", error);
        throw new Error("Failed to check user credentials");
    }
};

export const getSanitySchema = async (schema) => {
    try {
        const query = `*[_type == $schema]`;
        const params = { schema };
        const matchingUsers = await client.fetch(query, params);
        return matchingUsers
    } catch (error) {
        console.error("Error Fetching schema:", error);
    }
};


export const hashPassword = async (password) => {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
};
export const createUserSanity = async (userData) => {
    try {
        const response = await client.create({ _type: "users", ...userData });
        return response;
    } catch (error) {
        console.error("Error submitting user data:", error);
        throw new Error("Failed to submit user data");
    }
};

export const verifyForgotPwdToken = (token, email) => {
    const jwt = require("jsonwebtoken")
    try {
        const decoded = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_TOKEN);
        if (decoded.email === email) {
            return true; // Token is valid
        }
        // res.status(200).json({ status: "false" })
        return false; // Token is not associated with the provided email
    } catch (error) {
        return false; // Token is invalid or expired
    }
}



export const generateForgotPwdToken = (email, sign) => {
    const jwt = require("jsonwebtoken")
    return jwt.sign({ email: email }, process.env.NEXT_PUBLIC_JWT_TOKEN, { expiresIn: '1h' })
}


export const sendEmail = async (msg, email, subject) => {
    try {
        const response = await axios.post("https://api.resend.com/emails",
            {
                "from": "onboarding@resend.dev",
                "to": email,
                "subject": subject,
                "html": msg
            },
            {
                headers: {
                    'Authorization': 'Bearer re_iDTyQ3fT_ANvyNJyLrLYXzJ6iAqokndKD',
                    'Content-Type': 'application/json'
                }
            }
        )
        return response
    }
    catch (err) {
        console.log(err);
    }
}


export const addCustomerAddress = async (cid, data) => {
    const url = `https://api.chec.io/v1/customers/${cid}/addresses`;

    // const data = {
    //   name: 'Johnny Doe',
    //   street: '123 Fake St',
    //   street_2: 'Floor 2',
    //   town_city: 'San Francisco',
    //   county_state: 'CA',
    //   postal_zip_code: '94103',
    //   country: 'US',
    //   default_billing: true,
    //   default_shipping: false
    // };

    const headers = {
        'X-Authorization': process.env.NEXT_PUBLIC_CHEC_PUBLIC_API_KEY,
        'Content-Type': 'application/json'
    };

    try {
        const response = await axios.post(url, data, { headers });
        console.log('Address created:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error creating address:', error);
        throw error;
    }
};
export const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}



export const updateUserPasswordByEmail = async (email, password) => {
    try {
        const existingUser = await fetchUserInfo(email);

        if (existingUser) {
            const updatedUser = { ...existingUser, password: password };
            const response = await client.createOrReplace({
                _id: existingUser._id,
                _type: "user",
                ...updatedUser,
            });

            return response;
        }
        else {
            console.error("User not found");
            throw new Error("User not found");
        }
    } catch (error) {
        console.error("Error updating user password:", error);
        throw new Error("Failed to update user password");
    }
};



export const BodyScrollControl = (action) => {
    if (action == "lock") {
        // document.body.style.overflow = "hidden";
    } else {
        // document.body.style.overflow = "auto";
    }
};



// SOME USEFULL SNIPPETS


// const handleAuth = async () => {
//     // 1- create new customer
//     const customer = await createCustomer(customerData);
//     // 2- get Token
//     const token = await getUserToken(customerData.email)
//     // 3- Log In
//     commerce.customer.getToken(token).then((jwt) => console.log(jwt));
//   }
//   const handleLogOut = async () => {
//     await commerce.customer.logout()
//   }



// const handleADdress = async () => {
//     const data = {
//       name: 'Johnny Doe',
//       street: '123 Fake St',
//       street_2: 'Floor 2',
//       town_city: 'San Francisco',
//       county_state: 'CA',
//       postal_zip_code: '94103',
//       country: 'US',
//       default_billing: true,
//       default_shipping: false
//     };
//     const cid = await commerce.customer.id()
//     addCustomerAddress(cid, data)
//   }


/*

CHECKOUT;
1- generateToken from Cart
2-fetch countries
3- fetch cities for countries

*/

export const generateCheckoutToken = async (cartId) => {
    try {
        const data = await commerce.checkout.generateToken(cartId, { type: 'cart' });
        return data
    } catch (error) {
        console.log(error);
        return null
    }
}

// export const fetchShippingCountries = async (checkoutTokenId) => {
//     commerce.services.localeListShippingCountries(checkoutTokenId)
//         .then((response) => {
//             if (response && response.countries) {
//                 return {
//                     countries: response.countries,
//                 }
//             } else {
//                 console.log('Invalid response received while fetching shipping countries');
//                 return null
//             }
//         })
//         .catch((error) => {
//             console.error('Error fetching shipping countries:', error);
//         });
// }

export const fetchShippingCountries = async (checkoutTokenId) => {
    return commerce.services.localeListShippingCountries(checkoutTokenId)
        .then((response) => {
            if (response && response.countries) {
                return response.countries
            } else {
                console.log('Invalid response received while fetching shipping countries');
                return null
            }
        });
}

export const fetchSubdivisions = (countryCode) => {
    return commerce.services.localeListSubdivisions(countryCode).then((subdivisions) => {
        if (subdivisions && subdivisions.subdivisions) {
            return subdivisions.subdivisions
        } else {
            return null
        }
    }).catch((error) => {
        return null
    });
};
export const fetchShippingOptions = (checkoutTokenId, country, stateProvince = null) => {
    return commerce.checkout.getShippingOptions(checkoutTokenId,
        {
            country: country,
            region: stateProvince
        }).then((options) => {
            // Pre-select the first available method
            if (options && options.length > 0) {
                return options
            } else {
                return null
            }
        }).catch((error) => {
            console.log('There was an error fetching the shipping methods', error);
        });
};


// export const handleCaptureCheckout = (cart, formData) => {
//     const orderData = {
//         line_items: cart.line_items,
//         customer: {
//             firstname: formData.firstName,
//             lastname: formData.lastName,
//             email: formData.email
//         },
//         shipping: {
//             name: formData.shippingName,
//             street: formData.shippingStreet,
//             town_city: formData.shippingCity,
//             county_state: formData.shippingStateProvince,
//             postal_zip_code: formData.shippingPostalZipCode,
//             country: formData.shippingCountry,
//         },
//         fulfillment: {
//             shipping_method: formData.shippingOption.id
//         },
//         payment: {
//             gateway: "test_gateway",
//             card: {
//                 number: formData.cardNum,
//                 expiry_month: formData.expMonth,
//                 expiry_year: formData.expYear,
//                 cvc: formData.ccv,
//                 postal_zip_code: formData.shippingPostalZipCode
//             }
//         }
//     };
//     // this.props.onCaptureCheckout(cart.checkoutToken.id, orderData);
//     // this.props.history.push('/confirmation');
// };

// // ------------------


