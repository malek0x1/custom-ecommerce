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
import { CONTACT_PAGE_FIELDS } from "@/lib/data";
import Button from "@/components/Button";
import { CONTACT_SCHEMA } from "../lib/YupSchemas";
import { useState } from "react";
import Spinner from "@/components/Spinner";
import { useRouter } from "next/router";
import { Textarea } from "@/components/ui/textarea";
import { sendEmailFrontEnd } from "@/lib/helpers";

const Login = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [sentSuccessfully, setSentSuccessfully] = useState("")
    const router = useRouter()
    const form = useForm({
        resolver: zodResolver(CONTACT_SCHEMA),
        defaultValues: {
            firstname: "",
            lastname: "",
            email: "",
            message: ""
        },
    });
    const onSubmit = async (data) => {
        setIsLoading(true)
        setSentSuccessfully("")
        setErrorMessage("")
        const emailObject = {
            msg: `<p>${data.message}</p>`,
            fromEmail: data.email,
            toEmail: process.env.NEXT_PUBLIC_CUSTOMER_EMAIL,
            subject: "From Contact Us"
        }
        try {
            const sendMsg = await sendEmailFrontEnd(emailObject.msg, emailObject.fromEmail, emailObject.toEmail, emailObject.subject)
            // console.log(sendMsg);
            setSentSuccessfully("Message Sent Successfully")
        }
        catch (e) {
            console.log(e);
            setErrorMessage("Something Went Wrong")
        }
        setIsLoading(false)
    }
    return (
        <Layout
            title="Contact Us"
            description="test"
        >
            <div
                style={{ maxWidth: "500px", minHeight: "70vh" }}
                className="container w-full px-4  flex justify-center items-center gap-6 flex-col">
                <h2 className="uppercase text-2xl tracking-wide">Contact Us</h2>
                <p className="text-thin text-xs text-gray-500">Please enter your e-mail and password:</p>
                <Form {...form} className="">
                    <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-3 w-full">
                        {CONTACT_PAGE_FIELDS.map((fieldItem) => (
                            <FormField
                                key={fieldItem.id}
                                control={form.control}
                                name={fieldItem.name}
                                render={({ field }) => (
                                    <FormItem className="">
                                        <FormControl>
                                            {fieldItem.type == "textarea" ?
                                                <Textarea
                                                    {...field}
                                                    className="w-full rounded-none border-black py-2"
                                                    placeholder={fieldItem?.placeholder}
                                                    type={fieldItem.type}
                                                />
                                                : (
                                                    <TextField
                                                        {...field}
                                                        placeholder={fieldItem?.placeholder}
                                                        type={fieldItem.type}
                                                    />
                                                )}
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
}

export default Login