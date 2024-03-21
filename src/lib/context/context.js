
import { createContext, useContext, useEffect, useState } from "react";
import commerce from "../commerce";

const EcommerceContext = createContext();

export function ContextProvider({ children }) {
    // STATES
    const [isSearchOpened, setIsSearchOpened] = useState(false)
    const [isCartOpened, setIsCartOpened] = useState(false)
    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)
    const [cartItems, setCartItems] = useState({
        line_items: [],
        loading: true
    })



    useEffect(() => {
        const fetchCart = async () => {
            try {
                const cart = await commerce.cart.retrieve();
                setCartItems(cart);
            } catch (error) {
                console.error("Error fetching cart:", error);
            } finally {
                setCartItems((prevCart) => ({ ...prevCart, loading: false }));
            }
        };
        fetchCart();
    }, []);




    // FUNCTIONS

    const clearCartState = async () => await commerce.cart.refresh()

    const updateCart = (newCart) => {
        setCartItems((prevCart) => ({
            ...prevCart,
            ...newCart
        }));
    };




    const EcommerceContextValue = {
        clearCartState,
        isSearchOpened,
        setIsSearchOpened,
        isCartOpened,
        setIsCartOpened,
        isMobileNavOpen,
        setIsMobileNavOpen,
        cartItems,
        setCartItems,
        updateCart
    };

    return (
        <EcommerceContext.Provider value={EcommerceContextValue}>
            {children}
        </EcommerceContext.Provider>
    );
}

export function useEcommerceContext() {
    return useContext(EcommerceContext);
}
