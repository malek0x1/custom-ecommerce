import Button from "@/components/Button"
import Layout from "@/components/Layout"
import TextField from "@/components/TextField"
import { CHECKOUT_PAGE_FIELDS, MANUAL_GATEWAY } from "@/lib/data"
import { useEffect, useState } from "react"
import { useEcommerceContext } from "@/lib/context/context"
import { fetchShippingCountries, fetchShippingOptions, fetchSubdivisions, generateCheckoutToken } from "@/lib/helpers"
import SelectSkeleton from "@/components/Pages/Checkout/SelectSkeleton"
import ProductsSummary from "@/components/ProductsSummary"
import Radio from "@/components/Radio"

const Checkout = () => {
    const { cartItems } = useEcommerceContext()
    const [checkoutData, setCheckoutData] = useState({})
    const [chosenGateway, setChosenGateway] = useState(null)
    const [formData, setFormData] = useState({
        chosenCountry: "",
        chosenCountryState: "",
        chosenShippingOption: ""
    })
    const [isLoading, setIsLoading] = useState({
        countries: true,
        states: true,
        shipping: true
    })
    const [countries, setCountries] = useState({})
    const [countryStates, setCountryStates] = useState({})
    const [shippingOptions, setShippingOptions] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (cartItems.id) {
                    const res = await generateCheckoutToken(cartItems.id)
                    console.log(res);
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
    // console.log(checkoutData);
    // checkoutData.currency.code -> USD
    // checkoutData.discount[]
    // checkoutData.gateways[]
    // checkoutData.line_items
    // checkoutData.total.formatted_with_symbol
    return (
        <Layout
            title="Checkout"
            description="Complete your purchase"
            isFooter={false}
            isHeader={false}
        >
            <div className="container grid gap-3 mx-auto max-w-md px-4 py-8">
                <ProductsSummary
                    chosenShippingOption={formData.chosenShippingOption}
                    checkoutData={checkoutData}
                    allShippingOptions={shippingOptions}
                />
                {CHECKOUT_PAGE_FIELDS.map(field =>
                    <TextField
                        key={field.id}
                        required={field.required}
                        placeholder={field?.placeholder}
                        type={field.type}
                    />
                )}
                {isLoading.countries && Object.keys(countries).length == 0 ? (
                    <SelectSkeleton />
                ) :
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
                }
                {
                    formData.chosenCountry ?
                        isLoading.states ? (<SelectSkeleton />) :
                            (<select
                                onChange={handleInputChange}
                                value={formData.chosenCountryState}
                                name="chosenCountryState"
                                className="p-2.5 w-full"
                            >
                                <option value="">-- Choose State --</option>
                                {Object.keys(countryStates).map(countryStateItem => (
                                    <option key={countryStateItem} value={countryStateItem}>{countryStates[countryStateItem]}</option>
                                ))}
                            </select>)
                        : <></>
                }
                {
                    formData.chosenCountryState ?
                        isLoading.shipping
                            ? (<SelectSkeleton />) :
                            (
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
                            )
                        : <></>
                }

                <Radio chosenGateway={chosenGateway} gateways={MANUAL_GATEWAY} setChosenGateway={setChosenGateway} />

                <Button
                    disabled={!formData.chosenCountry || !formData.chosenCountryState || !formData.chosenShippingOption || !chosenGateway}
                    label="Submit" className="w-full" />

            </div>
        </Layout>
    )
}

export default Checkout
