import { signOut } from "next-auth/react";
import { useEffect } from "react"
import commerce from "../lib/commerce"
import { useRouter } from "next/router";

const Logout = () => {

    const router = useRouter()
    useEffect(() => {
        const handleSignOut = async () => {
            try {
                await signOut({
                    redirect: false
                });
                await commerce.customer.logout();
                router.push("/")
            } catch (error) {
                console.error('Error signing out:', error);
            }
        };
        handleSignOut()

    }, [])

    return <></>
}

export default Logout