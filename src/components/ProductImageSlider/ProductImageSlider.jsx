import React from 'react'
import Slider from "react-slick";
export default function ProductImageSlider({images}) {


  var settings = {
    dots: true,
    infinite: true,
    speed: 200,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  return (
<>
<Slider {...settings}>
     {images.map((img)=>{
return <img className='w-full mx-auto rounded-md object-contain h-96' src={img} alt="Nike Air"/>

     })}
    </Slider>


</>
  )
}
