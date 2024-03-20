import { z } from "zod";

export const LOGIN_SCHEMA = z.object({
    email: z.string().email('Invalid email format').min(1, 'Email is required'),
    password: z.string().min(8, 'Password must be at least 8 characters long'),
});
export const SIGNUP_SCHEMA = z.object({
    firstname: z.string().min(1, 'First Name is required'),
    lastname: z.string().min(1, 'Last Name is required'),
    email: z.string().email('Invalid email format').min(1, 'Email is required'),
    password: z.string().min(8, 'Password must be at least 8 characters long'),
});
