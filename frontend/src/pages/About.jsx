import React from 'react'
import { assets } from '../assets/assets'
const About = () => {
  return (
    <div>
    <div className='text-center text-3xl pt-10 text-gray-500 mb-12'>
      <p>
        About <span className='text-gray-500 font-medium text-3xl'>Us</span>
      </p>
    </div>
    <div className='my-19 flex flex-col md:flex-row gap-12 '>
      <img className='w-full md:max-w-[360px]' src={assets.nnm} alt='' />
      <div className='flex flex-col justify-center gap-6 md:w-2/4 text-sm text-black '>
        <p>Welcome to MinhGadget, your trusted destination for high-quality technology products and accessories. At MinhGadget, we understand how important it is to stay connected and equipped with the latest tech, whether for work, entertainment, or everyday convenience.</p>
        <p>MinhGadget is dedicated to delivering excellence in tech retail. We constantly update our product lineup, offering the newest gadgets and innovations to enhance your digital lifestyle. Whether you're upgrading your setup or searching for the perfect gift, MinhGadget is here to guide you through every choice.</p>
        <b className='text-black'>Our Vision</b>
        <p>Our vision at MinhGadget is to make technology more accessible and enjoyable for everyone. We strive to bridge the gap between people and the devices that simplify their lives, providing expert advice and reliable products to meet your needs, anytime and anywhere.</p>
      </div>
    </div>
    <div className='text-xl my-4 mt-12 mb-8 justify-center relative flex'>
      <p>WHY <span className='text-black font-semibold'>CHOOSE US</span></p>
    </div>
    <div className='flex flex-col md:flex-row justify-center items-center p-10 border rounded shadow gap-4 bg-primary text-white'>
      <div>
        <b>
        Efficiency:
        </b>
        <p>
        Fast and convenient product browsing, making it easy to find the perfect gadget for your needs.
        </p>
      </div>
      <div>
        <b>
        Convenience:
        </b>
        <p>
        Shop the latest tech products anytime, anywhere, with fast and reliable delivery.
        </p>
      </div>
      <div>
        <b>
        Personalization:
        </b>
        <p>
        Customized suggestions to help you discover the perfect gadgets for your lifestyle.
        </p>
      </div>
    </div>
  </div>
  )
}

export default About