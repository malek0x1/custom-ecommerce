
import { createContext, useContext, useEffect, useState } from "react";
import commerce from "../commerce";

const EcommerceContext = createContext();

export function ContextProvider({ children }) {
    // STATES
    const [isSearchOpened, setIsSearchOpened] = useState(false)
    const [isCartOpened, setIsCartOpened] = useState(false)
    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)
    const [categories, setCategories] = useState(
        {
            categories: [],
            loading: true
        }
    )
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


    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const categoriesData = await commerce.categories.list()
                setCategories({ categories: categoriesData.data, loading: false });
            } catch (error) {
                setCategories({ categories: [], loading: false });
                console.error("Error fetching Categories:", error);
            }
        };
        if (categories.categories.length == 0) {
            fetchCategories();
        }
    }, []);



    // FUNCTIONS

    const clearCartState = async () => {
        await commerce.cart.refresh();
        setCartItems({
            line_items: [],
            loading: true

        })
    }
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
        updateCart,
        categories,
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
