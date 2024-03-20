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
import { SIGN_UP_FIELDS } from "@/lib/data";
import Button from "@/components/Button";
import { SIGNUP_SCHEMA } from "../lib/YupSchemas";
import { useState } from "react";
import Spinner from "@/components/Spinner";
import { createCustomerCommerceJs, createUserSanity, hashPassword } from "@/lib/helpers";

const Login = () => {
    const [isLoading, setIsLoading] = useState(false)
    const form = useForm({
        resolver: zodResolver(SIGNUP_SCHEMA),
        defaultValues: {
            firstname: "",
            lastname: "",
            email: "",
            password: ""
        },
    });
    const onSubmit = async (data) => {
        setIsLoading(true)
        const encryptPwd = await hashPassword(data.password)
        // TODO: to check if already signed up
        const commerceJsData = {
            email: data.email,
            firstname: data.firstname,
            lastname: data.lastname,
        };
        try {
            // TODO: to make it from backend to hide the api keys cause its editor
            createCustomerCommerceJs(commerceJsData).then(async (i) => {
                await createUserSanity({ ...data, password: encryptPwd })
            }).finally(() => {
                setIsLoading(false)
            })
        }
        catch (e) {
            // TODO: something went wrong toast
            console.log(e);
        }
    }
    return (
        <Layout
            title="test"
            description="test"
        >
            <div
                style={{ maxWidth: "500px", minHeight: "70vh" }}
                className="container w-full px-4  flex justify-center items-center gap-6 flex-col">
                <h2 className="uppercase text-2xl tracking-wide">SIGNUP</h2>
                <p className="text-thin text-xs text-gray-500">Please fill the fields below:</p>
                <Form {...form} className="">
                    <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-3 w-full">
                        {SIGN_UP_FIELDS.map((fieldItem) => (
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
                        <Button disabled={isLoading} label={isLoading ? <Spinner color="white" /> : "Submit"} />
                    </form>
                </Form>
                <p className="text-thin text-gray-500 text-xs underline">Dont have an account? Create one</p>
            </div>
        </Layout>
    )
}

export default Login