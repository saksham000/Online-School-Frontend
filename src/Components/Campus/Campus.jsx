import React, { useEffect } from 'react'
import './Campus.css'
import s4 from '../../assets/students/s4.jpg'
import s5 from '../../assets/students/s5.jpg'
import s6 from '../../assets/students/s6.jpg'
import s7 from '../../assets/students/s7.jpg'
import white_arrow from '../../assets/white-arrow.png'
import 'aos/dist/aos.css';
import Aos from "aos";
const Campus = () => {
    useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);
  return (
    <div className='campus'>
      <div className="gallery">
        <img data-aos="fade-up" className='h-50' src={s4} alt="" />
        <img data-aos="fade-up" className='h-50' src={s5} alt="" />
        <img data-aos="fade-up" className='h-50' src={s6} alt="" />
        <img data-aos="fade-up" className='h-50' src={s7} alt="" />
      </div>
      <button data-aos="fade-up" className='btn dark-btn'>See more here <img src={white_arrow} alt=''/></button>
    </div>
  )
}

export default Campus
