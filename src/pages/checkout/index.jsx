import Button from "@/components/Button"
import Layout from "@/components/Layout"
import TextField from "@/components/TextField"
import { CHECKOUT_PAGE_FIELDS, MANUAL_GATEWAY } from "@/lib/data"
import { useEffect, useState } from "react"
import { useEcommerceContext } from "@/lib/context/context"
import { checkDiscountCode, fetchShippingCountries, fetchShippingOptions, fetchSubdivisions, generateCheckoutToken } from "@/lib/helpers"
import SelectSkeleton from "@/components/Pages/Checkout/SelectSkeleton"
import OrderSummary from "@/components/OrderSummary"
import Radio from "@/components/Radio"
import Spinner from "@/components/Spinner"
import { useRouter } from "next/router"
import commerce from "../../lib/commerce"

const Checkout = () => {
    const { cartItems, clearCartState } = useEcommerceContext()
    const router = useRouter()
    const [checkoutData, setCheckoutData] = useState({})
    const [isFormSubmitLoading, setIsFormSubmitLoading] = useState(false)
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
        discount: ""
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
                        setCountries(countriesData || {})
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
    // checkoutData);
    // checkoutData.currency.code -> USD
    // checkoutData.gateways[]
    // checkoutData.line_items
    // checkoutData.total.formatted_with_symbol

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsFormSubmitLoading(true)
        await clearCartState()
        router.push("/order-confirmation")
    }

    const handleDiscount = async () => {
        try {
            const res = await checkDiscountCode(checkoutData.id, formData.discount);

            setCheckoutData(res);
            setIsDiscountLoading(false);
            setDiscountStatusMessage({ status: "success", message: "Discount Code Applied" })
        } catch (e) {
            console.log("NO");
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
            }
        };

        handleDiscountWithDebounce();

        return () => clearTimeout(timeoutId);
    }, [formData.discount]);
    return (
        <Layout
            title="Checkout"
            description="Complete your purchase"
            isFooter={false}
            isHeader={false}
        >
            <form onSubmit={handleSubmit} className="container grid gap-3 mx-auto max-w-md px-4 py-8">
                <OrderSummary
                    discount={checkoutData.discount && checkoutData.discount.length === 0 ? null : checkoutData.discount}
                    cartItems={checkoutData.line_items}
                    chosenShippingOption={formData.chosenShippingOption}
                    checkoutData={checkoutData}
                    allShippingOptions={shippingOptions}
                />
                {CHECKOUT_PAGE_FIELDS.map(field =>
                    <TextField
                        onChange={handleInputChange}
                        key={field.id}
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
                        className="text-xs underline">have discount code?</p>
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

                <Button
                    disabled={!formData.chosenCountry || !formData.chosenCountryState || !formData.chosenShippingOption || !formData.chosenGateway}
                    label={isFormSubmitLoading ? <Spinner color="white" /> : "Submit"}
                    className="w-full" />

            </form>
        </Layout>
    )
}

export default Checkout
