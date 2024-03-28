import Layout from "@/components/Layout";
import TextField from "@/components/TextField";
import { useForm } from "react-hook-form";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem, FormMessage
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FORGOT_PASSWORD_PAGE_FIELDS } from "@/lib/data";
import Button from "@/components/Button";
import { FORGOT_PASSWORD_SCHEMA } from "../../lib/YupSchemas";
import { useState } from "react";
import Spinner from "@/components/Spinner";
import { useRouter } from "next/router";
import axios from "axios";
import { sendEmailFrontEnd } from "@/lib/helpers";

const ForgotPassword = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [isSubmitted, setIsSubmitted] = useState(false);
    const router = useRouter()
    const form = useForm({
        resolver: zodResolver(FORGOT_PASSWORD_SCHEMA),
        defaultValues: {
            email: "",
        },
    });
    const onSubmit = async (data) => {
        setIsLoading(true)
        setErrorMessage("")
        try {
            const token = await axios.post("/api/forgot-password/generate-token", { email: data.email });
            if (token.data && token.data.token) {
                const emailObject = {
                    msg: `<p>${process.env.NEXT_PUBLIC_BASE_URL}forgot-password/verify/${data.email}?token=${token.data.token}</p>`,
                    fromEmail: data.email,
                    toEmail: process.env.NEXT_PUBLIC_CUSTOMER_EMAIL,
                    subject: "Forgot Password"
                }
                const sendMsg = await sendEmailFrontEnd(emailObject.msg, emailObject.fromEmail, emailObject.toEmail, emailObject.subject)
                setIsSubmitted(true)
            }
        } catch (e) {
            setErrorMessage(e.response.data.error)
            console.log(e);
        }
        setIsLoading(false)
    }
    return (
        <Layout
            title="test"
            description="test"
        >
            <div
                style={{ maxWidth: "500px", minHeight: "70vh" }}
                className="container w-full px-4  flex justify-center items-center gap-6 flex-col">
                <h2 className="uppercase text-2xl tracking-wide">Forgot password</h2>
                <p className="text-thin text-xs text-gray-500">Please enter your e-mail:</p>
                <Form {...form} className="">
                    <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-3 w-full">
                        {FORGOT_PASSWORD_PAGE_FIELDS.map((fieldItem) => (
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
                        {isSubmitted && <p className="text-xs text-green-500">Form submitted successfully!</p>}
                        {errorMessage ? <p className="text-thin text-xs text-red-500">
                            {errorMessage}
                        </p> : <></>}
                        <Button disabled={isLoading} label={isLoading ? <Spinner color="white" /> : "Submit"} />
                    </form>
                </Form>
            </div>
        </Layout>
    )
}

export default ForgotPassword