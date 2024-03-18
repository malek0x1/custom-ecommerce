import Button from "@/components/Button"
import Layout from "@/components/Layout"
import TextField from "@/components/TextField"
import { SIGN_UP_FIELDS } from "../lib/data"

const Signup = () => {
    return (
        <Layout
            title="test"
            description="test"
        >
            <div
                style={{ maxWidth: "500px" }}
                className="container w-full px-4 my-10 flex justify-center items-center gap-6 flex-col">
                <h2 className="uppercase text-2xl spaec tracking-wide">Signup</h2>
                <p className="text-thin text-xs text-gray-500">Please enter your e-mail and password:</p>
                <div className="grid gap-3 w-full">
                    {SIGN_UP_FIELDS.map(field => (
                        <TextField {...field} />
                    ))}
                    <Button type="submit" label="Submit" />
                </div>
                <p className="text-thin text-gray-500 text-xs underline">Dont have an account? Create one</p>
            </div>
        </Layout>
    )
}

export default Signup