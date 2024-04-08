import { z } from "zod";

export const LOGIN_SCHEMA = z.object({
    email: z.string().email('Invalid email format').min(1, 'Email is required'),
    password: z.string().min(8, 'Password must be at least 8 characters long'),
});

export const UPDATE_PASSWORD_SCHEMA = z.object({
    password: z.string().min(8, 'Password must be at least 8 characters long'),
    confirm_password: z.string().min(8, 'Password must be at least 8 characters long'),
}).refine((data) => data.password === data.confirm_password, {
    message: "Passwords don't match",
    path: ["confirm_password"],
});



export const SIGNUP_SCHEMA = z.object({
    firstname: z.string().min(1, 'First Name is required'),
    lastname: z.string().min(1, 'Last Name is required'),
    email: z.string().email('Invalid email format').min(1, 'Email is required'),
    password: z.string().min(8, 'Password must be at least 8 characters long'),
});


export const CONTACT_SCHEMA = z.object({
    firstname: z.string().min(1, 'First Name is required'),
    lastname: z.string().min(1, 'Last Name is required'),
    email: z.string().email('Invalid email format').min(1, 'Email is required'),
    message: z.string().min(8, 'Message must be at least 8 characters long'),
});

export const FORGOT_PASSWORD_SCHEMA = z.object({
    email: z.string().email('Invalid email format').min(1, 'Email is required'),
});

export const NewsLetter_SCHEMA = z.object({
    email: z.string().email('Invalid email format').min(1, 'Email is required'),
});