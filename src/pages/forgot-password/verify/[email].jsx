import Layout from "@/components/Layout";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import TextField from "@/components/TextField";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem, FormMessage
} from "@/components/ui/form";
import { UPDATE_PASSWORD_PAGE_FIELDS } from "@/lib/data";
import Button from "@/components/Button";
import Spinner from "@/components/Spinner";
import { UPDATE_PASSWORD_SCHEMA } from "@/lib/YupSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const VerifyToken = () => {
    const router = useRouter()
    const [errorMessage, setErrorMessage] = useState("")
    const [isVerified, setIsVerfied] = useState(false)
    const [sentSuccessfully, setSentSuccessfully] = useState("")
    const [isLoading, setIsLoading] = useState(false)



    const form = useForm({
        resolver: zodResolver(UPDATE_PASSWORD_SCHEMA),
        defaultValues: {
            password: "",
            confirm_password: ""
        },
    });


    useEffect(() => {
        const handleToken = async () => {
            if (router.query.email && router.query.token) {
                setErrorMessage("")
                try {
                    const { email, token } = router.query
                    const verify = await axios.post("/api/forgot-password/verify-token", { email, token });
                    if (verify.data.validate) {
                        setIsVerfied(true)
                    }
                } catch (e) {
                    // console.log(e);
                    setErrorMessage("something went wrong")
                }

            }
        }
        handleToken()
    }, [router.query])

    const onSubmit = async (data) => {
        setIsLoading(true)
        setErrorMessage("")
        setSentSuccessfully("")
        const { email, token } = router.query
        const { password } = data
        try {
            const res = await axios.post("/api/forgot-password/update-password", {
                token, email, password
            })
            setSentSuccessfully("Password changed")
            router.push("/login")

        } catch (e) {
            console.log("Catched");
            setErrorMessage(e.response.data.error)
        }
        setIsLoading(false)

        // setSentSuccessfully("Password changed")
    }

    if (isVerified) {
        return (
            <Layout
                title="Forgot Password Verify"
                description="test"
            >
                <div
                    style={{ maxWidth: "500px", minHeight: "70vh" }}
                    className="container w-full px-4  flex justify-center items-center gap-6 flex-col">
                    <h2 className="uppercase text-2xl tracking-wide">Update Password</h2>
                    <p className="text-thin text-xs text-gray-500">Please enter your New Password:</p>


                    <Form {...form} className="">
                        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-3 w-full">
                            {UPDATE_PASSWORD_PAGE_FIELDS.map((fieldItem) => (
                                <FormField
                                    key={fieldItem.id}
                                    control={form.control}
                                    name={fieldItem.name}
                                    render={({ field }) => (
                                        <FormItem className="">
                                            <FormControl>
                                                <TextField
                                                    {...field}
                                                    placeholder={fieldItem?.placeholder}
                                                    type={fieldItem.type}
                                                />
                                            </FormControl>
                                            <FormDescription />
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            ))}
                            {sentSuccessfully && (
                                <p className="text-thin text-xs text-green-500">
                                    {sentSuccessfully}
                                </p>
                            )}
                            {errorMessage ? <p className="text-thin text-xs text-red-500">
                                {errorMessage}
                            </p> : <></>}
                            <Button disabled={isLoading} label={isLoading ? <Spinner color="white" /> : "Submit"} />
                        </form>
                    </Form>

                </div>
            </Layout>
        )
    } else {
        return <>
            <p>expired token</p>
        </>
    }
}

export default VerifyToken