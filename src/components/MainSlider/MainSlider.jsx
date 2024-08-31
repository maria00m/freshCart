import React from "react";
import Slider from "react-slick";
import mainSlider from "../../assets/images/images/slider-image-3.jpeg";
import fixedImg from "../../assets/images/images/slider-image-2.jpeg";
import secondSlider from "../../assets/images/images/grocery-banner-2.jpeg";
import thirdSlider from "../../assets/images/images/grocery-banner.png";

export default function MainSlider() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
  };

  return (
    <div className="row flex">
      <div className="w-full md:w-3/4 px-1">
        <Slider className="overflow-y-hidden" {...settings}>
          <div>
            <img className="w-full h-[400px]" src={mainSlider} alt="Main slider" />
          </div>
          <div>
            <img className="w-full h-[400px]" src={secondSlider} alt="Second slider" />
          </div>
          <div>
            <img className="w-full h-[400px]" src={thirdSlider} alt="Third slider" />
          </div>
        </Slider>
      </div>
      <div className="w-1/2 md:w-1/4">
        <div className="flex flex-row md:flex-col">
          <img src={thirdSlider} className="w-full h-[200px]" alt="Third slider side image" />
          <img src={fixedImg} className="w-full h-[200px]" alt="Fixed image" />
        </div>
      </div>
    </div>
  );
}
