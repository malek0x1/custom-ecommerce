import Button from "@/components/Button"
import Layout from "@/components/Layout"
import commerce from "../lib/commerce"
const AboutUs = () => {
    const handleLoggout = async () => {
        await commerce.customer.logout()
    }
    return (
        <Layout
            title="About Us"
            description=""
        >
            <div className="container">
                <Button
                    onClick={handleLoggout}
                    label="Click To LogOut from Commercejs" />
            </div>

        </Layout>
    )
}

export default AboutUs