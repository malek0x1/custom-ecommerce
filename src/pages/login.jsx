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
import { LOGIN_SCHEMA } from "../lib/YupSchemas"
import { checkUserCredentials } from "@/lib/helpers";
import { useState } from "react";
import Spinner from "@/components/Spinner";

const Login = () => {
    const [isLoading, setIsLoading] = useState(false)
    const form = useForm({
        resolver: zodResolver(LOGIN_SCHEMA),
        defaultValues: {
            email: "",
            password: ''
        },
    });
    const onSubmit = async (data) => {
        try {
            setIsLoading(true)
            const check = await checkUserCredentials(data.email, data.password)
            console.log(check);
            setIsLoading(false)
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
                                                required={fieldItem.required}
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