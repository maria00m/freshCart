// import axios from "axios";
// import { createContext } from "react";

// export const cartContext = createContext();

// export default function CartContextProvider(props) {
//   const token = localStorage.getItem("token");

//   const headers = {
//     Authorization: `Bearer ${token}`, // Assuming the API requires a Bearer token
//   };

//   // Get logged-in user cart
//   function getLogedUserCart() {
//     return axios
//       .get("https://ecommerce.routemisr.com/api/v1/cart", { headers })
//       .then((response) => response)
//       .catch((error) => {
//         console.error("Error fetching cart:", error);
//         throw error;
//       });
//   }

//   // Add product to cart
//   function addProductToCart(productId) {
//     return axios
//       .post(
//         "https://ecommerce.routemisr.com/api/v1/cart",
//         { productId },
//         { headers }
//       )
//       .then((response) => response)
//       .catch((error) => {
//         console.error("Error adding product to cart:", error);
//         throw error;
//       });
//   }

//   // Update product in cart
//   function updateProductToCart(productId, count) {
//     return axios
//       .put(
//         `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
//         { count },
//         { headers }
//       )
//       .then((response) => response)
//       .catch((error) => {
//         console.error("Error updating product in cart:", error);
//         throw error;
//       });
//   }

//   // Delete product from cart
//   function deleteProductFromCart(productId) {
//     return axios
//       .delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, { headers })
//       .then((response) => response)
//       .catch((error) => {
//         console.error("Error deleting product from cart:", error);
//         throw error;
//       });
//   }

//   // Clear cart
//   function deleteCart() {
//     return axios
//       .delete("https://ecommerce.routemisr.com/api/v1/cart", { headers })
//       .then((response) => response)
//       .catch((error) => {
//         console.error("Error clearing cart:", error);
//         throw error;
//       });
//   }

//   return (
//     <cartContext.Provider
//       value={{
//         getLogedUserCart,
//         addProductToCart,
//         updateProductToCart,
//         deleteProductFromCart,
//         deleteCart,
//       }}
//     >
//       {props.children}
//     </cartContext.Provider>
//   );
// }
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

export const CartContext = createContext();

export default function CartContextProvider({ children }) {
    const [allProducts, setAllProducts] = useState(null);
    const [totalCartPrice, setTotalCartPrice] = useState(0);
    const [numOfCartItems, setNumOfCartItems] = useState(0);
    const [cartId, setCartId] = useState(null);

    function clearUi() {
        setAllProducts(null);
        setTotalCartPrice(0);
        setNumOfCartItems(0);
        setCartId(null);
    }

    let headers = {
        token: localStorage.getItem('token'),
    };

    async function addProduct(productId) {
        try {
            await axios.post('https://ecommerce.routemisr.com/api/v1/cart', {
                productId: productId
            }, {
                headers,
            });
            await getUserCart();
            return true;
        } catch (error) {
            console.error('Error adding product to cart:', error);
            return false;
        }
    }

    async function getUserCart() {
        try {
            const res = await axios.get('https://ecommerce.routemisr.com/api/v1/cart', { headers });
            setNumOfCartItems(res.data.numOfCartItems);
            setAllProducts(res.data.data.products);
            setTotalCartPrice(res.data.data.totalCartPrice);
            setCartId(res.data.data._id);
        } catch (error) {
            console.error('Error fetching user cart:', error);
        }
    }

    async function updateCount(productId, newCount) {
        try {
            const res = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
                count: newCount,
            }, { headers });
            setNumOfCartItems(res.data.numOfCartItems);
            setAllProducts(res.data.data.products);
            setTotalCartPrice(res.data.data.totalCartPrice);
        } catch (error) {
            console.error('Error updating product count:', error);
        }
    }

    async function deleteProduct(pId) {
        try {
            const res = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${pId}`, { headers });
            setNumOfCartItems(res.data.numOfCartItems);
            setAllProducts(res.data.data.products);
            setTotalCartPrice(res.data.data.totalCartPrice);
            return true;
        } catch (error) {
            console.error('Error deleting product:', error);
            return false;
        }
    }

    async function clearCart() {
        try {
            await axios.delete('https://ecommerce.routemisr.com/api/v1/cart', { headers });
            clearUi();
            return true;
        } catch (error) {
            console.error('Error clearing cart:', error);
            return false;
        }
    }

    useEffect(() => {
        getUserCart();
    }, []);

    return (
        <CartContext.Provider value={{
            addProduct,
            allProducts,
            totalCartPrice,
            numOfCartItems,
            getUserCart,
            updateCount,
            deleteProduct,
            cartId,
            clearUi,
            clearCart,
        }}>
            {children}
        </CartContext.Provider>
    );
}
