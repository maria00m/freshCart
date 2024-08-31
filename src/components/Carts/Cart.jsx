














// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// // import { Bounce, toast } from 'react-toastify';
// import CartProduct from '../CartProduct/CartProduct';

// export default function Cart() {
// const [cart, setCart] = useState(null)
//   useEffect(() => {
//     getUserCart();
//   }, []);

//   async function getUserCart() {
//     try {
//       let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/cart', {
//         headers: {
//           token: localStorage.getItem('token')
//         }
//       });
//       console.log(data);
//       setCart(data)
//     } catch (error) {
//       console.error('Error fetching cart data', error);
//     }
//   }

//   return (
//     <>
//       <div className="  ">
//         <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
//         <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
//           <div className="rounded-lg md:w-2/3">
//             {cart?.data.products.map((product , index)=>{
// return(<>
// <CartProduct key={index} product={product} setCart={setCart}/>
// </>)
//             })}

//           </div>

//           <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
//             <div className="mb-2 flex justify-between">
//               <p className="text-gray-700">Subtotal</p>
//               <p className="text-gray-700">${cart?.data.totalCartPrice}</p>
//             </div>
//             <div className="flex justify-between">
//               <p className="text-gray-700">Shipping</p>
//               <p className="text-gray-700">$0</p>
//             </div>
//             <hr className="my-4" />
//             <div className="flex justify-between">
//               <p className="text-lg font-bold">Total</p>
//               <div>
//                 <p className="mb-1 text-lg font-bold">${cart?.data.totalCartPrice}</p>
//                 <p className="text-sm text-gray-700">including VAT</p>
//               </div>
//             </div>
//             <button className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">
//               Check out
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }















import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CartProduct from '../CartProduct/CartProduct';
import { Link } from 'react-router-dom';

export default function Cart() {
  const [cart, setCart] = useState(null);

  useEffect(() => {
    getUserCart();
  }, []);

  async function getUserCart() {
    try {
      const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/cart', {
        headers: {
          token: localStorage.getItem('token')
        }
      });
      console.log(data);
      setCart(data);
      console.log(cart);
      
    } catch (error) {
      console.error('Error fetching cart data', error);
    }
  }

  return (
    <div className="container">
      <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
      <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
        <div className="rounded-lg md:w-2/3">
          {cart?.data.products.map((product, index) => (
            <CartProduct key={index} product={product} setCart={setCart} />
          ))}
        </div>

        <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
          <div className="mb-2 flex justify-between">
            <p className="text-gray-700">Subtotal</p>
            <p className="text-gray-700">${cart?.data.totalCartPrice}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-700">Shipping</p>
            <p className="text-gray-700">$0</p>
          </div>
          <hr className="my-4" />
          <div className="flex justify-between">
            <p className="text-lg font-bold">Total</p>
            <div>
              <p className="mb-1 text-lg font-bold">${cart?.data.totalCartPrice}</p>
              <p className="text-sm text-gray-700">including VAT</p>
            </div>
          </div>
          {/* <button className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">
            Check out

          </button> */}
          <Link                to={"/shippingaddress/" + cart?.cartId}
                className="bg-green-600 disabled:bg-gray-400 px-4 py-2  rounded-lg text-white mt-2 "
              >
                Check Out
              </Link>
        </div>
      </div>
    </div>
  );
}















