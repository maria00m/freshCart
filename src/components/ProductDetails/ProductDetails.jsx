import axios from 'axios'
import React, {  useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import RatingStars from '../ratingStars/RatingStars'
import LoadingScreen from '../LoadingScreen/LoadingScreen'
import ProductImageSlider from '../ProductImageSlider/ProductImageSlider'
import RelatedProducts from '../RelatedProducts/RelatedProducts'
import { addProductToCart } from '../../cartService'

export default function ProductDetails() {
let { id } =useParams()
const [isLoading, setisLoading] = useState(true)
const [productDetails, setproductDetails] = useState(null);
const [relatedProducts, setRelatedProducts] = useState([]);

var settings = {
    dots: true,
    infinite: true,
    speed: 200,
    slidesToShow: 1,
    slidesToScroll: 1
  };
useEffect(()=>{
   getProductDetails()
}, [id])

async function getProductDetails() {
    setisLoading(true)
    let {data}= await axios.get("https://ecommerce.routemisr.com/api/v1/products/"+ id);
    setproductDetails(data.data);
getRelatedProducts(data.data?.category._id)
   
    setisLoading(false)
    
    
}

async function getRelatedProducts(categoryId) {
    let {data}= await axios.get("https://ecommerce.routemisr.com/api/v1/products", {
       params:{
        "category": categoryId
       }
    });
  setRelatedProducts(data.data);
    

}
// if (!productDetails) {
//     return <div>Loading...</div>; // You can replace this with a spinner or loading component
//   }
  return (
   <>
   
   {
    isLoading ? <LoadingScreen/>
    :
    <main class="my-8">
        <div class="container mx-auto px-6">
            <div class="md:flex md:items-center ">
                <div class="w-full  md:w-5/12 lg:h-96">
                    
                    {/* <img class="h-full mx-auto rounded-md object-contain " src={productDetails?.imageCover} alt="Nike Air"/> */}
                  <ProductImageSlider images={productDetails?.images}/>
              
                </div>
                <div class="w-full max-w-lg mx-auto mt-5 md:ml-8 md:mt-0 md:w-9/12">
                    <h3 class="text-gray-700 uppercase text-lg">{productDetails?.title}</h3>
                    <span class="text-gray-500 mt-3">${productDetails?.price}</span>
                    <hr class="my-3"/>
                    {/* <div class="mt-2">
                        <label class="text-gray-700 text-sm" for="count">Count:</label>
                        <div class="flex items-center mt-1">
                            <button class="text-gray-500 focus:outline-none focus:text-gray-600">
                                <svg class="h-5 w-5" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            </button>
                            <span class="text-gray-700 text-lg mx-2">20</span>
                            <button class="text-gray-500 focus:outline-none focus:text-gray-600">
                                <svg class="h-5 w-5" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            </button>
                        </div>
                    </div> */}
                    {/* <div class="mt-3">
                        <label class="text-gray-700 text-sm" for="count">Color:</label>
                        <div class="flex items-center mt-1">
                            <button class="h-5 w-5 rounded-full bg-blue-600 border-2 border-blue-200 mr-2 focus:outline-none"></button>
                            <button class="h-5 w-5 rounded-full bg-teal-600 mr-2 focus:outline-none"></button>
                            <button class="h-5 w-5 rounded-full bg-pink-600 mr-2 focus:outline-none"></button>
                        </div>
                    </div> */}
                    <div class="mt-3">
                        <label class="text-gray-700 text-sm" for="count">Description:</label>
                        <h3>{productDetails?.description}</h3>
                    </div>
                     <div class="mt-3">
                        <label class="text-gray-700 text-sm" for="count">Rating:</label>
<RatingStars rating={productDetails?.ratingsAverage ?? 0}/>
                    </div>
                    <div class="mt-3">
                        <label class="text-gray-700 text-sm" for="count">Category:</label>
                        <h3>{productDetails?.category.name}</h3>
                    </div>
                    <div class="mt-3">
                        <label class="text-gray-700 text-sm" for="count">SubCategory:</label>
                        <h3>{productDetails?.subcategory[0].name}</h3>
                    </div>
                    <div class="mt-3">
                        <label class="text-gray-700 text-sm" for="count">Brands:</label>
                        <h3>{productDetails?.brand.name}</h3>
                    </div>
                    <div class="flex items-center mt-6">
                        <button class="px-8 py-2 bg-indigo-600 text-white text-sm font-medium rounded hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500">Order Now</button>
                        <button onClick={()=> {    addProductToCart(productDetails._id )    }} class="mx-2 text-gray-600 border rounded-md p-2 hover:bg-gray-200 focus:outline-none">
                            <svg class="h-5 w-5" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                        </button>
                    </div>
                </div>
            </div>
          
              
<RelatedProducts  products={relatedProducts}/>


            </div>
        
    </main>
   }




   
   </>
  )
}
