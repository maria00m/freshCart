
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Product from '../Product/Product';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import MainSlider from '../MainSlider/MainSlider';
import CategoriesSlider from '../CategoriesSlider/CategoriesSlider';

export default function Home() {
  const [products, setproducts] = useState([]);
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    getProducts();
  }, []); // Add an empty dependency array here

  async function getProducts() {
    setisLoading(true);
    let { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/products");
    setproducts(data.data);
    setisLoading(false);
  }

  return (
    <>
    {isLoading ? (
      <LoadingScreen />
    ) : (
      <>
      
        <MainSlider />
        <CategoriesSlider />
        <div className='  '>
          <div className='flex  flex-wrap w-full  px-4 py-8 items-center gap-y-1'>
          {products.map((product, index) => (
            <Product product={product} key={index} />
          ))}
          </div>
         
      </div>
      </>
    )}
  </>
     
  );
}

