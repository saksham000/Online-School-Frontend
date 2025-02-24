import React, { useEffect } from 'react'
import './About.css'
import s9 from '../../assets/students/s9.jpg'
import Aos from 'aos';
import 'aos/dist/aos.css';

const About = () => {
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);
  return (
    <div className='about'>
      <div className="about-left">
        <img data-aos="fade-down" src={s9} alt="" className='about-img' />
      </div>
      <div className="about-right">
        <h3 data-aos="fade-up">ABOUT UNIVERSITY</h3>
        <h2 data-aos="fade-up">Nurturing Tomorrow's Leaders Today</h2>
        <p data-aos="fade-up">Embark on a transformative education programs. Our cutting-edge 
            curriculum is designed to empower students with the knowledge,
            skills , and experiences needed to excel in the dynamic field of education
        </p >
        <p data-aos="fade-up">
            Whether a focus on innovation , hands-on learning , and personalized mentorship , 
            our programs prepare aspiring educators to make a meaningful impact in classrooms , schools , and communities.
        </p>
        <p data-aos="fade-up">
            Whether you aspire to become a teacher, administrator , counselor , or educational leader,
            our diverse range of programs offers the perfect pathway to achieve your goals and unlock your
            full potential in shaping the future of education.
        </p>
      </div>
    </div>
  )
}

export default About
