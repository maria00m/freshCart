import axios from "axios";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import LoadingScreen from "../LoadingScreen/LoadingScreen";

export default function CategoriesSlider() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setLoading] = useState(false);

  function getCategories() {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/categories") // Added quotes to URL
      .then(({ data }) => {
        setCategories(data.data);
        setLoading(true); // Loading should be set to true when data is fetched
      });
  }

  useEffect(() => {
    getCategories();
  }, []); // Added dependency array to useEffect to prevent infinite calls

  // const settings = {
  //   dots: false,
  //   infinite: true,
  //   speed: 1500,
  //   slidesToShow: 8,
  //   slidesToScroll: 3,
  //   autoplay: true,
  // };
  let settings = {
    dots: false,
    infinite: true,
    speed: 1500,
    slidesToShow: 8,
    slidesToScroll: 3,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1200, 
        settings: {
          slidesToShow: 6,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 992, 
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 768, 
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 576, 
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };
  if (!isLoading) {
    return <LoadingScreen />; // Display loading screen while fetching data
  }

  return (
    <div className="py-5">
      <h2 className="py-4 text-gray-900 font-light text-xl">
        Shop popular Categories
      </h2>
      <Slider {...settings}>
        {categories.map((category, index) => (
          <div key={index}>
            <img
              className="w-full h-[200px]"
              src={category.image}
              alt={category.name}
            />
            <h2 className="font-light mt-2">{category.name}</h2>
          </div>
        ))}
      </Slider>
    </div>
  );
}
