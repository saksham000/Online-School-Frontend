import React, { useEffect } from 'react';
import './Hero.css';
import dark_arrow from '../../assets/dark-arrow.png';
import Aos from 'aos';
import 'aos/dist/aos.css';
import bg1 from '../../assets/bg1.jpg'
import bg2 from '../../assets/bg2.jpg'
import bg3 from '../../assets/bg3.jpg'
import bg4 from '../../assets/bg4.jpg'
import bg5 from '../../assets/bg5.jpg'

// Import Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

// Import your image (use the same one multiple times)
// import heroImage from '../../assets/your-image.jpg';

const Hero = () => {
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  return (
    <div className='hero container'>
      {/* Swiper for background images */}
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
        className="hero-swiper rounded-3xl h-96 max-w-3xl"
      >
        {/* Repeat the same image multiple times */}
        <SwiperSlide>
          <img src={bg1} alt="Hero Slide" className="hero-image" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={bg2} alt="Hero Slide" className="hero-image" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={bg3} alt="Hero Slide" className="hero-image" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={bg4} alt="Hero Slide" className="hero-image" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={bg5} alt="Hero Slide" className="hero-image" />
        </SwiperSlide>
      </Swiper>

      {/* Static text overlay */}
      <div className="hero-text ml-9">
        <h1 data-aos="fade-up" className='text-4xl mb-3'>We ensure better education for a better world</h1>
        <p data-aos="fade-up">
          Our cutting-edge curriculum is designed to empower students with the knowledge, skills, and experiences needed to excel in the dynamic field of education.
        </p>
        <button data-aos="fade-up" className='btn gap-2'>
          Explore more <img src={dark_arrow} alt="" />
        </button>
      </div>
    </div>
  );
};

export default Hero;
