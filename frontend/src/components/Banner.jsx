import React from 'react'
import { assets } from '../assets/assets';
import { useState } from 'react';
const Banner = () => {
    const images = [
        assets.about_img,
        assets.bin_icon,
        assets.dropdown_icon,
      ];
    
      const [currentIndex, setCurrentIndex] = useState(0);
    
      const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      };
    
      const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
      };
  return (
    <div className="relative h-screen bg-cover bg-center bg-no-repeat transition-all duration-700 ease-in-out"
    style={{ backgroundImage: `url(${images[currentIndex]})` }}>
      
        <div
          className="absolute inset-0 bg-white/10 sm:bg-white/25 sm:from-white/80 sm:to-white/20 bg-gradient-to-r ltr:sm:bg-gradient-to-r rtl:sm:bg-gradient-to-l"
        ></div>
      
        <div
          className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8"
        >
          <div className="max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
            <h1 className="text-3xl font-extrabold sm:text-5xl">
              Let us find your
      
              <strong className="block font-extrabold text-primary"> Forever Home. </strong>
            </h1>
      
            <p className="mt-4 max-w-lg sm:text-xl/relaxed ml-6">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt illo tenetur fuga ducimus
              numquam ea!
            </p>
      
            <div className="mt-8 flex flex-wrap gap-4 text-center">
              <a
                href="#"
                className="ml-12 block w-full rounded-sm bg-primary px-12 py-3 text-sm font-medium text-white shadow-sm hover:bg-rose-700 focus:ring-3 focus:outline-hidden sm:w-auto"
              >
                Get Started
              </a>
      
              <a
                href="#"
                className="block w-full rounded-sm bg-white px-12 py-3 text-sm font-medium text-primary shadow-sm hover:text-white hover:bg-rose-700 focus:ring-3 focus:outline-hidden sm:w-auto"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
        {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2   left-4 transform -translate-y-1/2 bg-primary text-white p-4 rounded-full shadow-lg hover:bg-gray-700"
      >
        ‹
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-primary text-white p-4 rounded-full shadow-lg hover:bg-gray-700"
      >
        ›
      </button>
      </div>
  )
}

export default Banner