import axios from "axios";
import { Bounce, toast } from "react-toastify";


export async function addProductToCart(productId ){
  
    let{data}= await axios.post("https://ecommerce.routemisr.com/api/v1/cart", {
      "productId": productId,
    }, {
      headers:{
        token:localStorage.getItem("token")
      }
    })
console.log(data);


    toast.success(data.message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
      });
    }
// import axios from "axios";
// import { Bounce, toast } from "react-toastify";

// export async function addProductToCart(productId) {
//   try {
//     let { data } = await axios.post(
//       "https://ecommerce.routemisr.com/api/v1/cart",
//       {
//         productId: productId,
//       },
//       {
//         headers: {
//           token: localStorage.getItem("token"),
//         },
//       }
//     );
//     console.log(data);
//     toast.success("🦄 Product added to cart successfully!", {
//       position: "top-right",
//       autoClose: 5000,
//       hideProgressBar: false,
//       closeOnClick: true,
//       pauseOnHover: true,
//       draggable: true,
//       progress: undefined,
//       theme: "light",
//       transition: Bounce,
//     });
//   } catch (error) {
//     console.error("Error adding product to cart:", error);
//     toast.error("Failed to add product to cart. Please try again.", {
//       position: "top-right",
//       autoClose: 5000,
//       hideProgressBar: false,
//       closeOnClick: true,
//       pauseOnHover: true,
//       draggable: true,
//       progress: undefined,
//       theme: "light",
//       transition: Bounce,
//     });
//   }
// }
