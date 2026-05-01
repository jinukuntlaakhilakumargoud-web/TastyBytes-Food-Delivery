import { createContext, useEffect, useState } from "react";
import { food_list, menu_list } from "../assets/assets";
import axios from "axios";
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

    const url = "http://localhost:4000";
    const [token, setToken] = useState("");
    const [cartItems, setCartItems] = useState({});
    const [searchQuery, setSearchQuery] = useState("");

    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
        }
        else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        }
        if (token) {
            await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } });
        }
    }

    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
        if (token) {
            await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } });
        }
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = food_list.find((product) => product.food_id === Number(item));
                if (itemInfo) {
                    totalAmount += itemInfo.food_price * cartItems[item];
                }
            }
        }
        return totalAmount;
    }

    const loadCartData = async (tkn) => {
        const response = await axios.post(url + "/api/cart/get", {}, { headers: { token: tkn } });
        if (response.data.success) {
            setCartItems(response.data.cartData);
        }
    }

    useEffect(() => {
        async function loadData() {
            const savedToken = localStorage.getItem("token");
            if (savedToken) {
                setToken(savedToken);
                await loadCartData(savedToken);
            }
        }
        loadData();
    }, [])

    const contextValue = {
        url,
        food_list,
        menu_list,
        cartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        token,
        setToken,
        searchQuery,
        setSearchQuery,
        loadCartData
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )

}

export default StoreContextProvider;