import Button from "@/components/Button"
import Layout from "@/components/Layout"
import TextField from "@/components/TextField"
import { CHECKOUT_PAGE_FIELDS } from "@/lib/data"
import { useEffect, useState } from "react"
import { useEcommerceContext } from "@/lib/context/context"
import { generateCheckoutToken } from "@/lib/helpers"
import commerce from '../../lib/commerce'
const Checkout = () => {
    const { cartItems } = useEcommerceContext()
    const [countries, setCountries] = useState({})
    const [checkoutData, setCheckoutData] = useState({})

    const [chosenCountry, setChosenCountry] = useState("")
    const [countryStates, setCountryStates] = useState({})
    const [shippingOptions, setShippingOptions] = useState([])
    const [chosenCountryState, setChosenCountryState] = useState("")
    const [chosenShippingOption, setChosenShippingOption] = useState("")

    useEffect(() => {
        if (cartItems.id) {
            const handleCheckout = async () => {
                console.log(1);
                try {
                    console.log(2);
                    const res = await generateCheckoutToken(cartItems.id)
                    setCheckoutData(res)
                    console.log(res);
                    console.log(3);
                    if (res && res.id) {
                        // TODO: make it function with error handling
                        commerce.services.localeListShippingCountries(res.id).then((response) => {
                            console.log(response);
                            setCountries(response.countries)
                        });

                    }


                } catch (error) {
                    console.log(error);
                }

            }
            handleCheckout()
        }
    }, [cartItems])

    useEffect(() => {
        const handleStates = () => {
            if (chosenCountry) {
                commerce.services.localeListSubdivisions(chosenCountry).then((response) => {
                    setCountryStates(response.subdivisions)
                });

            }

        }
        handleStates()
    }, [chosenCountry])


    useEffect(() => {
        const handleShippingOptions = () => {
            if (chosenCountryState && checkoutData.id) {
                commerce.checkout.getShippingOptions(checkoutData.id, {
                    country: chosenCountry,
                    region: chosenCountryState,
                }).then((response) => {
                    console.log(response);
                    setShippingOptions(response)
                });

            }

        }
        handleShippingOptions()
    }, [chosenCountryState])


    return (
        <Layout
            title="test"
            description="test"
        >
            <div
                style={{ maxWidth: "500px", minHeight: "70vh" }}
                className="container w-full px-4  flex justify-center items-center gap-3 flex-col">
                {CHECKOUT_PAGE_FIELDS.map(field =>
                    <TextField
                        key={field.id}
                        required={field.required}
                        placeholder={field?.placeholder}
                        type={field.type}
                    />
                )}



                <select
                    onChange={(e) => { setChosenCountry(e.target.value) }}
                    className="p-2.5 w-full" name="country">
                    <option value="">-- Choose Country --</option>
                    {Object.keys(countries).length > 0 && Object.keys(countries).map(cntry => (
                        <option key={cntry} value={cntry}>{countries[cntry]}</option>
                    ))}
                </select>

                <select
                    onChange={(e) => { setChosenCountryState(e.target.value) }}
                    className="p-2.5 w-full" name="state">
                    <option value="">-- Choose State --</option>

                    {Object.keys(countryStates).length > 0 && Object.keys(countryStates).map(countryStateItem => (
                        <option key={countryStateItem} value={countryStateItem}>{countryStates[countryStateItem]}</option>
                    ))}
                </select>

                <select
                    onChange={(e) => { setChosenShippingOption(e.target.value) }}
                    className="p-2.5 w-full" name="country">
                    {shippingOptions.map(item => (
                        <option key={item.id} value={item.id}>
                            <div className="flex items-center justify-between gap-10 p-2 w-full">
                                <p className="hidden">
                                    {item.description}
                                </p>
                                <p>
                                    {item.price.formatted_with_symbol}
                                </p>
                            </div>
                        </option>

                    ))}
                </select>

                <Button label="Submit" className="w-full" />

            </div>

        </Layout>
    )
}

export default Checkout