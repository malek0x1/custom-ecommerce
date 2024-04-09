import Button from "@/components/Button"
import Layout from "@/components/Layout"
import TextField from "@/components/TextField"
import { CHECKOUT_PAGE_FIELDS, MANUAL_GATEWAY } from "@/lib/data"
import { useEffect, useState } from "react"
import { useEcommerceContext } from "@/lib/context/context"
import { checkDiscountCode, fetchShippingCountries, fetchShippingOptions, fetchSubdivisions, generateCheckoutToken, getSanityUserExternalIdByEmail, updateCustomerCommerceJsInfo } from "@/lib/helpers"
import SelectSkeleton from "@/components/Pages/Checkout/SelectSkeleton"
import OrderSummary from "@/components/OrderSummary"
import Radio from "@/components/Radio"
import Spinner from "@/components/Spinner"
import commerce from "../../lib/commerce"
import { useRouter } from "next/router"
import { useSession } from "next-auth/react"

const Checkout = () => {
    const { cartItems, clearCartState } = useEcommerceContext()
    const session = useSession()
    const router = useRouter()
    const [checkoutData, setCheckoutData] = useState({})
    const [isFormSubmitLoading, setIsFormSubmitLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [isDiscountLoading, setIsDiscountLoading] = useState(false)
    const [discountStatusMessage, setDiscountStatusMessage] = useState({
        status: "",
        message: ''
    })
    const [formData, setFormData] = useState({
        chosenCountry: "",
        chosenCountryState: "",
        chosenShippingOption: "",
        chosenGateway: "",
        discount: "",

    })
    const [isLoading, setIsLoading] = useState({
        countries: true,
        states: true,
        shipping: true
    })
    const [countries, setCountries] = useState({})
    const [countryStates, setCountryStates] = useState({})
    const [shippingOptions, setShippingOptions] = useState([])
    const [isHaveDiscount, setIsHaveDiscount] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (cartItems.id) {
                    const res = await generateCheckoutToken(cartItems.id)
                    setCheckoutData(res)
                    if (res && res.id) {
                        const countriesData = await fetchShippingCountries(res.id)
                        if (countriesData && countriesData.countries && Object.keys(countriesData.countries).length > 0) {
                            setCountries(countriesData.countries)
                        }
                        setIsLoading(prev => ({ ...prev, countries: false }))
                    }
                }
            } catch (error) {
                console.error('Error fetching checkout data:', error);
            }
        }
        fetchData();
    }, [cartItems])

    useEffect(() => {
        const fetchStates = async () => {
            if (formData.chosenCountry) {
                const subdivisions = await fetchSubdivisions(formData.chosenCountry)
                setCountryStates(subdivisions || {})
                setIsLoading(prev => ({ ...prev, states: false }))
            }
        }
        fetchStates();
    }, [formData.chosenCountry])

    useEffect(() => {
        const fetchShipping = async () => {
            if (formData.chosenCountryState && checkoutData.id) {
                const options = await fetchShippingOptions(checkoutData.id, formData.chosenCountry, formData.chosenCountryState)
                setShippingOptions(options || [])
                setIsLoading(prev => ({ ...prev, shipping: false }))
            }
        }
        fetchShipping();
    }, [formData.chosenCountryState, checkoutData.id])

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsFormSubmitLoading(true)
        const payment = {
            payment: {
                gateway: 'test_gateway',
                card: {
                    number: '4242424242424242',
                    expiry_month: '02',
                    expiry_year: '24',
                    cvc: '123',
                    postal_zip_code: '94107',
                }
            }
        }



        try {
            const orderResponse = await commerce.checkout.capture(checkoutData.id, {
                line_items: checkoutData.line_items,
                customer: {
                    firstname: formData.firstname,
                    lastname: formData.lastname,
                    email: formData.email,
                    external_id: formData.email
                },
                shipping: {
                    name: `${formData.firstname} ${formData.lastname}`,
                    street: formData.street_address,
                    town_city: formData.city,
                    county_state: formData.chosenCountryState,
                    postal_zip_code: formData.zip,
                    country: formData.chosenCountry
                },
                fulfillment: {
                    shipping_method: formData.chosenShippingOption
                },
                billing: {
                    name: 'John Doe',
                    street: '234 Fake St',
                    town_city: 'San Francisco',
                    county_state: 'US-CA',
                    postal_zip_code: '94103',
                    country: 'US'
                },
                ...payment,
            })

            // 
            try {
                const res = await updateCustomerCommerceJsInfo(orderResponse.customer.id, { external_id: formData.email })
                if (res) {
                    await clearCartState()
                    router.push(`/order-confirmation/${orderResponse.id}`);
                } else {
                    setErrorMessage("Something went wrong updating user info")
                }
                return
            } catch (e) {
                console.log(e);
            }






        } catch (e) {
            setErrorMessage("Something went wrong")
        }





        setIsFormSubmitLoading(false)


        return




    }

    const handleDiscount = async () => {
        try {
            const res = await checkDiscountCode(checkoutData.id, formData.discount);

            setCheckoutData(res);
            setIsDiscountLoading(false);
            setDiscountStatusMessage({ status: "success", message: "Discount Code Applied" })
        } catch (e) {
            setIsDiscountLoading(false);
            setDiscountStatusMessage({ status: "error", message: "Wrong Discount Code" })
        }
    };

    useEffect(() => {
        let timeoutId;

        const handleDiscountWithDebounce = async () => {
            if (isHaveDiscount && formData.discount && formData.discount.length > 2) {
                setIsDiscountLoading(true);
                clearTimeout(timeoutId); // Clear any existing timeout

                timeoutId = setTimeout(() => {
                    handleDiscount();
                }, 700);
            } else {
                setIsDiscountLoading(false)
            }
        };

        handleDiscountWithDebounce();

        return () => clearTimeout(timeoutId);
    }, [formData.discount]);

    // prefill form
    useEffect(() => {
        const handlePrefillForm = async () => {
            if (session.status == "authenticated") {
                const { email } = session.data.user
                const getSanityUser = await getSanityUserExternalIdByEmail(email)
                const fieldsStructure = {
                    firstname: getSanityUser.firstname || "",
                    lastname: getSanityUser.lastname || "",
                    street_address: getSanityUser.street_address || "",
                    city: getSanityUser.city || "",
                    zip: getSanityUser.zip_code || "",
                    email
                }
                setFormData({ ...formData, ...fieldsStructure });

            }
        }
        handlePrefillForm()

    }, [session.status])


    return (
        <Layout
            title="Checkout"
            description="Complete your purchase"
            isFooter={false}
            isHeader={false}
        >
            <form onSubmit={handleSubmit} className="container mb-10">
                <div className="flex flex-col sm:flex-row sm:gap-14 justify-between sm:flex">

                    <div className="grid gap-3 flex-1 order-2 sm:py-10 sm:order-1">
                        {CHECKOUT_PAGE_FIELDS.map(field =>
                            <TextField
                                onChange={handleInputChange}
                                key={field.id}
                                value={formData[field.name]}
                                name={field.name}
                                required={field.required}
                                placeholder={field?.placeholder}
                                type={field.type}
                            />
                        )}
                        {isHaveDiscount ? (
                            <div className="" >
                                <div className="relative">

                                    <TextField
                                        onChange={handleInputChange}
                                        name='discount'
                                        placeholder="Discount"
                                        type="text"
                                    />
                                    {isDiscountLoading && <div className="absolute right-3 top-3">
                                        <Spinner color="black" />
                                    </div>
                                    }
                                </div>
                                {discountStatusMessage.status == "success" ?
                                    <p className="text-xs text-green-500 mt-2">{discountStatusMessage.message}</p> :
                                    <p className="text-xs text-red-500 mt-2">{discountStatusMessage.message}</p>
                                }
                            </div>
                        ) :
                            <p
                                onClick={() => setIsHaveDiscount(true)}
                                className="text-xs w-fit underline">have discount code?</p>
                        }

                        {isLoading.countries && Object.keys(countries).length == 0 ? (
                            <SelectSkeleton />
                        ) :
                            (
                                <>
                                    <p className="text-xs">Country</p>
                                    <select
                                        onChange={handleInputChange}
                                        value={formData.chosenCountry}
                                        name="chosenCountry"
                                        className="p-2.5 w-full"
                                    >
                                        <option value="">-- Choose Country --</option>

                                        {Object.keys(countries).map(cntry => (
                                            <option key={cntry} value={cntry}>{countries[cntry]}</option>
                                        ))}
                                    </select>
                                </>

                            )
                        }
                        {
                            formData.chosenCountry ?
                                isLoading.states ? (<SelectSkeleton />) :
                                    (
                                        <>
                                            <p className="text-xs">State</p>
                                            <select
                                                onChange={handleInputChange}
                                                value={formData.chosenCountryState}
                                                name="chosenCountryState"
                                                className="p-2.5 w-full"
                                            >
                                                <option value="">-- Choose State --</option>
                                                {Object.keys(countryStates).map(countryStateItem => (
                                                    <option key={countryStateItem} value={countryStateItem}>{countryStates[countryStateItem]}</option>
                                                ))}
                                            </select>
                                        </>
                                    )
                                : <></>
                        }


                        {
                            formData.chosenCountryState ?
                                isLoading.shipping
                                    ? (<SelectSkeleton />) :
                                    (
                                        <>

                                            <p className="text-xs">Shipping Options</p>
                                            <select
                                                onChange={handleInputChange}
                                                value={formData.chosenShippingOption}
                                                name="chosenShippingOption"
                                                className="p-2.5 w-full"
                                            >
                                                <option value="">-- Choose Shipping Option --</option>
                                                {shippingOptions.map(item => (
                                                    <option key={item.id} value={item.id}>
                                                        {item.price.formatted_with_symbol}
                                                    </option>
                                                ))}
                                            </select>
                                        </>
                                    )
                                : <></>
                        }
                        <p className="text-xs">Payment Options</p>
                        <Radio name="chosenGateway" gateways={MANUAL_GATEWAY} setFormData={setFormData} />
                        {errorMessage && (
                            <p>{errorMessage}</p>
                        )}
                        <Button
                            disabled={!formData.chosenCountry || !formData.chosenCountryState || !formData.chosenShippingOption || !formData.chosenGateway}
                            label={isFormSubmitLoading ? <Spinner color="white" /> : "Submit"}
                            className="w-full"
                        />
                    </div>

                    <div className="flex-1 order-1 sm:order-2 py-10 px-4 sm:bg-gray-50">
                        <OrderSummary
                            discount={checkoutData.discount && checkoutData.discount.length === 0 ? null : checkoutData.discount}
                            cartItems={checkoutData.line_items}
                            chosenShippingOption={formData.chosenShippingOption}
                            checkoutData={checkoutData}
                            allShippingOptions={shippingOptions}
                        />
                    </div>
                </div>

            </form>
        </Layout>
    )
}

export default Checkout
