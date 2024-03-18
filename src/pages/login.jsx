import Button from "@/components/Button"
import Layout from "@/components/Layout"
import TextField from "@/components/TextField"

const Login = () => {
    return (
        <Layout
            title="test"
            description="test"
        >
            <div
                style={{ maxWidth: "500px", minHeight: "60vh" }}
                className="container w-full px-4  flex justify-center items-center gap-6 flex-col">
                <h2 className="uppercase text-2xl spaec tracking-wide">Login</h2>
                <p className="text-thin text-xs text-gray-500">Please enter your e-mail and password:</p>
                <div className="grid gap-3 w-full">
                    <TextField />
                    <TextField />
                    <Button label="Submit" />
                </div>
                <p className="text-thin text-gray-500 text-xs underline">Dont have an account? Create one</p>
            </div>
        </Layout>
    )
}

export default Login