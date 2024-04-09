import { FORGOT_PASSWORD_PAGE_FIELDS } from '@/lib/data';
import TextField from '../TextField';
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from '../ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FORGOT_PASSWORD_SCHEMA } from '@/lib/YupSchemas';
import { useState } from 'react';
import { CircleArrowRight } from 'lucide-react';
import Spinner from '../Spinner';
import { newsletterSubscribeEmail } from '@/lib/helpers';

const NewsLetterForm = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [successMessage, setSuccessMessage] = useState("");

    const form = useForm({
        resolver: zodResolver(FORGOT_PASSWORD_SCHEMA),
        defaultValues: {
            email: "",
        },
    });

    const onSubmit = async (data) => {
        const { email } = data
        setIsLoading(true)
        setSuccessMessage("")
        setErrorMessage("")
        try {
            const res = await newsletterSubscribeEmail(email);
            console.log(res);
            setSuccessMessage("Form Submitted Successfully")
        } catch (e) {

            setErrorMessage("Something Went Wrong")
            console.log(e);
        }

        setIsLoading(false)

    }
    return (
        <div
            style={{
                maxWidth: "600px"
            }}
            className="flex py-4 m-auto justify-center w-full flex-col gap-3">
            <p className='text-center text-md mb-2'>Join Our Newsletter</p>
            <div className="flex w-full relative" style={{ height: "3rem" }}>

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
                        <div className={`absolute right-3 top-3 ${isLoading ? "cursor-not-allowed" : "cursor-pointer"}`} >
                            <button disabled={isLoading} type='submit'>
                                {isLoading ? <Spinner color="black" /> : <CircleArrowRight size={20} />}
                            </button>
                        </div>
                        {/* <Button disabled={isLoading} label={isLoading ? <Spinner color="white" /> : "Submit"} /> */}
                    </form>
                </Form>
            </div>
            {successMessage && <p className="text-xs text-green-500">Form submitted successfully!</p>}
            {errorMessage ? <p className="text-thin text-xs text-red-500">{errorMessage}</p> : <></>}

        </div>
    )
}

export default NewsLetterForm