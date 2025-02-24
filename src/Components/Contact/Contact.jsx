import React, { useEffect } from 'react'
import './Contact.css'
import msg_icon from '../../assets/msg-icon.png'
import mail_icon from '../../assets/mail-icon.png'
import phone_icon from '../../assets/phone-icon.png'
import location_icon from '../../assets/location-icon.png'
import white_arrow from '../../assets/white-arrow.png'
import 'aos/dist/aos.css';
import Aos from "aos";
const Contact = () => {
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);
    const [result, setResult] = React.useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", "6cc6160f-955d-48e1-8444-38609c5628e4");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully");
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };



  return (
    <div className='contact'>
      <div className="contact-col">
        <h3 data-aos="fade-up">Send us a message <img src={msg_icon} alt="" /></h3>
        <p data-aos="fade-up">Feel free to reach out through contact form or find our contact info below. Your feedback, questions, and suggestions are important to us.
        </p>
        <ul data-aos="fade-up">
            <li><img src={mail_icon} alt=''/>sakshamshankyan7@gmail.com</li>
            <li><img src={phone_icon} alt=''/>8360132497</li>
            <li><img src={location_icon} alt=''/>GTB Nagar delhi</li>
        </ul>
      </div>
      <div className="contact-col" data-aos="fade-up">
        <form action="" onSubmit={onSubmit}>
            <label>Your name</label>
            <input type="text" name='name' placeholder='Enter your name' required />
            <label>Mobile number</label>
            <input type="text" name='phone' placeholder='Enter your mobile number'required/>
            <label >Write your messages here</label>
            <textarea name='message'  rows='6' placeholder='Enter your message' ></textarea>
            <button type='submit' className='btn dark-btn'>Submit Now <img src={white_arrow}></img></button>
        </form>
        <span>
          {result}
        </span>
      </div>
    </div>
  )
}

export default Contact
