import React, { useState } from 'react'
import RatingStars from '../ratingStars/RatingStars'
import { Link } from 'react-router-dom';
import { addProductToCart } from '../../cartService';
import { useWishlist } from '../../Contexts/WishListContext';
import { toast } from 'react-toastify';
export default function Product({product}) {
  
  const { addToWishlist } = useWishlist();
  const [currentWishlistId, setCurrentWishlistId] = useState(0);
  const [wishlistLoading, setWishlistLoading] = useState(false);
  async function handleAddToWishlist(productId) {
    setWishlistLoading(true);
    setCurrentWishlistId(productId)
    if (addToWishlist) {
      const resFlag = await addToWishlist(productId);
      if (resFlag) {
        toast.success('Product added to wishlist successfully');
        setWishlistLoading(false)
      } else {
        toast.error('Error adding product to wishlist');
        setWishlistLoading(false)

      }
    } else {
      console.error('addToWishlist function is not defined in WishlistContext');
    }
  }


  return (
    <>
  

    
  
  <div className='   w-full sm:w-1/3 md:w-1/4 lg:w-1/6 p-4'>
  <Link to={"/productDetails/"+ product._id}>
    <img className="rounded-t-lg p-8" src={product.imageCover} alt="product image"/>
      </Link>
    <div className="px-5 pb-5">
      <Link to={"/productDetails"}>
       
        <h3 className="text-gray-900 font-semibold text-xl tracking-tight dark:text-white line-clamp-1">{product.title}</h3>
<p className='line-clamp-3'>{product.description}</p>



      </Link>

<div className='flex justify-between'>
<RatingStars rating={product.ratingsAverage} />
  
<span className="text-xl font-bold text-gray-900 dark:text-white">{product.price}$</span>

</div>
      <div className='flex flex-col gap-2'>
       {/* <button 
              onClick={() => handleAddToWishlist(product._id)} 
              className="mt-2 p-2 rounded-lg bg-pink-400 text-white hover:bg-pink-500"
            >
              Add to Wishlist
            </button> */}
     <button
                    disabled={
                      wishlistLoading && currentWishlistId == product.id
                    }
                    onClick={() => handleAddToWishlist(product._id)}
                    className="disabled:bg-gray-400 mt-2 p-2 rounded-lg bg-lime-200 text-black hover:bg-lime-200 w-full"
                  >
                    {wishlistLoading && currentWishlistId == product.id ? (
                      <i className="fa-solid fa-spinner fa-spin-pulse"></i>
                    ) : (
                      "Add to Wishlist"
                    )}
                  </button>
        <button onClick={()=>addProductToCart(product._id)}
        

          className="text-white bg-[#027d02] hover:bg-green-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add
          to cart</button>
       </div>
    </div>
</div>


   
   


    
    </>
  )
}
