import React from 'react'
import { assets } from '../assets/assets';
import { useState } from 'react';
const Banner = () => {
    const images = [
        assets.banner0,
        assets.banner1,
        assets.banner2,
        assets.banner3,
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
          className="absolute inset-0 bg-white/25 from-white/80 to-white/20 bg-gradient-to-r ltr:bg-gradient-to-r rtl:bg-gradient-to-l"
        ></div>
      
        <div
          className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8"
        >
          <div className="max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
            <h1 className="text-3xl font-extrabold sm:text-5xl">
              Let us find your best
      
              <strong className="block font-extrabold text-primary"> Devices. </strong>
            </h1>
      
            <p className="mt-4 max-w-lg sm:text-xl/relaxed ml-6">
            Our products are of very good quality, widely used in the market and we are a leading reputable product distributor.
            </p>
      
            <div className="mt-8 flex flex-wrap gap-4 text-center">
              <a
                href="/products"
                className="ml-12 block w-full rounded-sm bg-primary px-12 py-3 text-sm font-medium text-white shadow-sm hover:bg-rose-700 focus:ring-3 focus:outline-hidden sm:w-auto"
              >
                Get Started
              </a>
      
              <a
                href="/about"
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