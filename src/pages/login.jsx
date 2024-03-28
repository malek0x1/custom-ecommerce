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
import { LOGIN_PAGE_FIELDS } from "@/lib/data";
import Button from "@/components/Button";
import { LOGIN_SCHEMA } from "../lib/YupSchemas";
import { useState } from "react";
import Spinner from "@/components/Spinner";
import { useRouter } from "next/router";
import { signIn } from 'next-auth/react';
import Link from "next/link";

const Login = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const router = useRouter()
    const form = useForm({
        resolver: zodResolver(LOGIN_SCHEMA),
        defaultValues: {
            email: "",
            password: ''
        },
    });
    const onSubmit = async (data) => {
        setIsLoading(true)
        try {

            const result = await signIn("login", {
                email: data.email,
                password: data.password,
                redirect: false
            });
            if (!result.error) {
                setIsLoading(false)
                setErrorMessage("")
                router.push("/")
                return
            } else {
                setErrorMessage("Incorrect email or password.")
                setIsLoading(false)
            }
        }
        catch (e) {
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
                <h2 className="uppercase text-2xl tracking-wide">Login</h2>
                <p className="text-thin text-xs text-gray-500">Please enter your e-mail and password:</p>
                <Form {...form} className="">
                    <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-3 w-full">
                        {LOGIN_PAGE_FIELDS.map((fieldItem) => (
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
                        {errorMessage ? <p className="text-thin text-xs text-red-500">
                            {errorMessage}
                        </p> : <></>}
                        <Button disabled={isLoading} label={isLoading ? <Spinner color="white" /> : "Submit"} />
                    </form>
                </Form>
                <Link href="/sign-up">
                    <p className="text-thin text-gray-500 text-xs underline">Dont have an account? Create one</p>
                </Link>
                <Link href="/forgot-password">
                    <p className="text-thin text-gray-500 text-xs underline">Forgot your password?</p>
                </Link>
            </div>
        </Layout>
    )
}

export default Login