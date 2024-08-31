
import axios from "axios";

import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { CartContext } from "../../Contexts/CartContext";
import toast from "react-hot-toast";
import SearchBar from "../SearchBar/SearchBar";
import LoadingScreen from "../LoadingScreen/LoadingScreen"; // Fixed typo: LoadindScreen to LoadingScreen
import { useWishlist } from "../../Contexts/WishListContext";
import { addProductToCart } from "../../cartService";

export default function Products() {
  const { addProduct } = useContext(CartContext);
  const { addToWishlist } = useWishlist(); 
  const [searchTerm, setSearchTerm] = useState('');

  async function handleAddToCart(productId) {
    const resFlag = await addProduct(productId);
    if (resFlag) {
      toast.success('Product added to cart successfully');
  
      console.log(resFlag);
      
    } else {
      toast.error('Error adding product to cart');
    }
  }

  async function handleAddToWishlist(productId) {
    if (addToWishlist) {
      const resFlag = await addToWishlist(productId);
      if (resFlag) {
        toast.success('Product added to wishlist successfully');
      } else {
        toast.error('Error adding product to wishlist');
      }
    } else {
      console.error('addToWishlist function is not defined in WishlistContext');
    }
  }

  function getAllProducts() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/products');
  }

  const { data, isError, isLoading } = useQuery({
    queryKey: 'allProducts',
    queryFn: getAllProducts,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  if (isError) {
    return <h2>Error fetching products</h2>;
  }

  if (isLoading) {
    return <LoadingScreen />;
  }

  const filteredProducts = data.data.data.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container w-[90%] mx-auto pt-10">
      <div className="flex flex-col md:flex-row md:space-x-6 items-start pt-5">
    
      </div>

   
      <div className="pt-10">
        <SearchBar onSearch={setSearchTerm} />
      </div>

      <div className="grid md:grid-cols-3 lg:grid-cols-4 pt-5">
        {filteredProducts.map((product) => (
          <div key={product._id} className="product p-2">
            <div className="relative overflow-hidden group">
            
              <Link to={`/productDetails/${product._id}`}>
                <img src={product.imageCover} className="w-full" alt={product.title} />
                <h6 className="text-[#027d02]">{product.category.name}</h6>
                <h2>{product.title.split(' ').slice(0, 2).join(' ')}</h2>
                <div className="flex justify-between items-center">
                  <p>
                    <span className={product.priceAfterDiscount ? 'line-through text-purple-500' : ''}>
                      {product.price}
                    </span>
                    <span className="ml-1">{product.priceAfterDiscount}</span>
                  </p>
                  <p><i className="fa-solid fa-star text-[#027d02]"></i> {product.ratingsAverage}</p>
                </div>
              </Link>
             <div className="flex flex-col">
             <button 
                onClick={() => handleAddToWishlist(product._id)} 
                className="mt-2 p-2 rounded-lg bg-yellow-100 text-black hover:bg-yellow-100"
              >
                Add to Wishlist
              </button>
              <button 
                onClick={() => addProductToCart(product._id)} 
                className="mt-2 p-2 rounded-lg bg-[#027d02] text-white hover:bg-[#027d02]"
              >
                Add to Wishlist
              </button>
             </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
