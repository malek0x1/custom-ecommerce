import { signOut } from "next-auth/react";
import { useEffect } from "react"
import commerce from "../lib/commerce"
import { useRouter } from "next/router";
import { useEcommerceContext } from "@/lib/context/context";
import Spinner from "@/components/Spinner";

const Logout = () => {

    const router = useRouter()
    const { clearCartState } = useEcommerceContext()
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

    return <div>
        <div className="w-full h-screen flex items-center justify-center">
            <Spinner color="black" />
        </div>
    </div>
}

export default Logout