
import { createContext, useContext, useState } from "react";
import commerce from "../commerce";

const EcommerceContext = createContext();

export function ContextProvider({ children }) {
    // STATES
    const [isSearchOpened, setIsSearchOpened] = useState(false)
    const [isCartOpened, setIsCartOpened] = useState(false)
    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)
    const [cartItems, setCartItems] = useState({
        line_items: [],
        loading: false
    })

    // FUNCTIONS

    const clearCartState = async () => await commerce.cart.refresh()

    const updateCart = async (newCart) => {
        await setCartItems(newCart)
    }

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
