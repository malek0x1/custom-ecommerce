import axios from "axios";
import commerce from "./commerce";
import { client } from "../lib/sanity";
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

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
        await axios.post(`${BASE_URL}/customers`, customerData, {
            headers: {
                'X-Authorization': process.env.NEXT_PUBLIC_CHEC_PUBLIC_API_KEY,
                'Content-Type': 'application/json',
            },
        });
        return true;
    } catch (error) {
        // console.log("createCustomerCommerceJs", error.response.data.error);
        return false
        // throw new Error('Error creating customer: ');
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

export const getPageBySlug = async (slug) => {
    try {
        const query = `*[_type == "page" && slug.current == $slug]`;
        const params = { slug };
        const matchingPage = await client.fetch(query, params);
        if (matchingPage.length > 0) {

            return matchingPage[0]
        }
        return null
    } catch (error) {
        console.error("Error checking user :", error);
        throw new Error("Failed to check user:");
    }
};



export const getAllPagesSlugs = async () => {
    try {
        const query = `*[_type == "page"]{slug,title}`;
        const matchingPage = await client.fetch(query);
        if (matchingPage.length > 0) {
            return matchingPage
        }
        return null
    } catch (error) {
        console.error("Error checking user :", error);
        return null
        // throw new Error("Failed to check user:");
    }
};


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

export const getSanityUserExternalIdByEmail = async (email) => {
    try {
        const query = `*[_type == "users" && email == $email]{email,firstname,lastname,street_address,city,zip_code,country}`;
        const params = { email };
        const matchingUsers = await client.fetch(query, params);
        if (matchingUsers.length > 0 && matchingUsers[0].email) {
            return matchingUsers[0]
        } else {
            return false;
        }
    } catch (error) {
        console.error("Error checking user :", error);
        throw new Error("Failed to check user:");
    }
};


export const fetchUserInfo = async (email) => {
    try {
        const query = `*[_type == "users" && email == $email]`;
        const params = { email };
        const matchingUsers = await client.fetch(query, params);
        console.log(matchingUsers);
        if (matchingUsers.length > 0) {
            return matchingUsers[0]
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


export const sendEmailBackend = async (msg, fromEmail = "onboarding@resend.dev", toEmail, subject) => {
    try {
        const response = await axios.post("https://api.resend.com/emails",
            {
                "from": 'onboarding@resend.dev',//fromEmail,
                "to": toEmail,
                "subject": subject,
                "html": msg
            },
            {
                headers: {
                    'Authorization': `Bearer ${process.env.NEXT_PUBLIC_RESEND_TOKEN}`,
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

export const sendEmailFrontEnd = async (msg, fromEmail = "onboarding@resend.dev", toEmail, subject) => {
    const emailObject = {
        msg,
        fromEmail,
        toEmail,
        subject
    }
    try {
        const sendMsg = await axios.post("/api/email/send", emailObject)
        return sendMsg.data
    } catch (e) {
        throw e
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
                _type: "users",
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

export const fetchShippingCountries = async (checkoutId) => {


    return commerce.services.localeListShippingCountries(checkoutId).then((response) => {
        if (response && response.countries) {
            return {
                countries: response.countries,
            }
        } else {
            console.log('Invalid response received while fetching shipping countries');
            return null
        }
    })
        .catch((error) => {
            console.error('Error fetching shipping countries:', error);
        });
}

// export const fetchShippingCountries = async (checkoutTokenId) => {

//     try {
//         const response = await axios.get(`${BASE_URL}/services/locale/${checkoutTokenId}`,
//             {
//                 headers: {
//                     'X-Authorization': process.env.NEXT_PUBLIC_CHEC_PUBLIC_API_KEY,
//                     'Content-Type': 'application/json',
//                 }
//             }

//         )
//         console.log(response);
//         if (response && response.countries) {
//             return response.countries
//         } else {
//             console.log('Invalid response received while fetching shipping countries');
//             return null
//         }

//     } catch (e) {
//         return null
//     }


// }

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





export const generateCustomerId = () => {
    return uuidv4();
};
export const getCommerceJsCustomerByExternalID = async (external_id) => {
    try {
        const res = await axios.get(`${BASE_URL}/customers?external_id=${external_id}`,
            {
                headers: {
                    'X-Authorization': process.env.NEXT_PUBLIC_CHEC_PUBLIC_API_KEY,
                    'Content-Type': 'application/json',
                }
            }

        )
        if (res && res.data) {
            const { data } = res
            if (data.data && data.data.length > 0) {
                return data.data[0].id
            }
        } else {
            return null
        }

    } catch (e) {
        console.log(e);
    }
}

export const getCommerceJsCustomerOrdersById = async (id) => {
    try {
        const res = await axios.get(`${BASE_URL}/customers/${id}/orders`,
            {
                headers: {
                    'X-Authorization': process.env.NEXT_PUBLIC_CHEC_PUBLIC_API_KEY,
                    'Content-Type': 'application/json',
                }
            }
        )
        if (res && res.data) {
            const { data } = res
            if (data.data && data.data.length > 0) {
                console.log(data.data);
                return data.data
            }
        } else {
            return null
        }

    } catch (e) {
        console.log("something went wrong while getCommerceJsCustomerOrdersById");
    }
}
export const updateCustomerCommerceJsInfo = async (id, data) => {
    try {
        const res = await axios.put(`${BASE_URL}/customers/${id}`, data,
            {
                headers: {
                    'X-Authorization': process.env.NEXT_PUBLIC_CHEC_PUBLIC_API_KEY,
                    'Content-Type': 'application/json',
                }
            }
        )
        if (res && res.data && res.data.id) {
            return true
        }
        else {
            return null
        }

    } catch (e) {
        console.log("something went wrong while updateCustomerCommerceJsInfo");
    }
}

export async function newsletterSubscribeEmail(email) {
    try {
        const response = await axios.post(`/api/email/newsletter`, {
            email
        });
        return response.data
    } catch (error) {
        console.error('Error:', error);
    }
}

export const getOrderByOrderId = async (id) => {
    try {
        const res = await axios.get(`${BASE_URL}/orders/${id}`,
            {
                headers: {
                    'X-Authorization': process.env.NEXT_PUBLIC_CHEC_PUBLIC_API_KEY,
                    'Content-Type': 'application/json',
                }
            }
        )
        if (res && res.data) {
            const { data } = res
            console.log(data);
            if (data && data.status) {
                return data
            }
        } else {
            return null
        }
    } catch (e) {
        console.log("something went wrong while getCommerceJsCustomerOrdersById");
    }
}

export const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {

    // const orderData = {
    //     line_items: checkoutToken.live.line_items,
    //     customer: { firstname: shippingData.firstName, lastname: shippingData.lastName, email: shippingData.email },
    //     shipping: { name: 'International', street: shippingData.address1, town_city: shippingData.city, county_state: shippingData.shippingSubdivision, postal_zip_code: shippingData.zip, country: shippingData.shippingCountry },
    //     fulfillment: { shipping_method: shippingData.shippingOption },
    //     payment: {
    //       gateway: 'stripe',
    //       stripe: {
    //         payment_method_id: paymentMethod.id,
    //       },
    //     },
    //   };

    //   onCaptureCheckout(checkoutToken.id, orderData);
    try {
        const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);

        return incomingOrder
        refreshCart();
    } catch (error) {
        console.log(error.data.error.message);
    }
};

export const checkDiscountCode = async (checkoutId, discount) => {
    try {
        const res = commerce.checkout.checkDiscount(checkoutId, {
            code: discount,
        })
        return res
    }
    catch (e) {
        return null
    }

}