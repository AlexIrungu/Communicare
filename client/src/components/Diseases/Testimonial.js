import React from 'react';
import { Link } from 'react-router-dom';
import './testimonial.css';

const Testimonial = () => {
  const testimonialData = [
    {
      image: 'https://images.unsplash.com/photo-1583195764036-6dc248ac07d9?ixid=Mnw5MTMyMXwwfDF8c2VhcmNofDE2fHxtYW58ZW58MHx8fHwxNjI2NDUyMDM1&ixlib=rb-1.2.1&h=1200',
      name: 'John Doe',
      occupation: 'USA',
      testimonial:
        'I cant begin to express the profound impact Communicare has had on my life. Being diagnosed with a communicable disease was overwhelming, and I felt lost and scared. Thats when I discovered Communicares website, and it became my lifeline.I am forever grateful for this incredible charity and the positive impact it continues to have on my life.',
    },
    {
      image: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixid=Mnw5MTMyMXwwfDF8c2VhcmNofDIzfHxtYW58ZW58MHx8fHwxNjI2NDUyMDM1&ixlib=rb-1.2.1&h=1200',
      name: 'Jane Smith',
      occupation: 'KENYA',
      testimonial:
        'When I first stumbled upon the communicable disease charitys website, I had no idea how much it would impact my life. As someone who had personally battled with a communicable disease, I was searching for support, information, and a sense of community. The charitys website became my sanctuary.',
    },
    {
      image: 'https://images.unsplash.com/photo-1530423470967-45b90dca3a4f?ixid=Mnw5MTMyMXwwfDF8c2VhcmNofDd8fGxhZHl8ZW58MHx8fHwxNjgyODUwMjQ3&ixlib=rb-4.0.3&h=200',
      name: 'Lisa Yu',
      occupation: 'China',
      testimonial:
        'Communicare has been an absolute game-changer for me. As someone affected by a communicable disease, I was desperately seeking support and information. This incredible charitys website provided everything I needed and more. The wealth of resources and user-friendly layout made it easy to find relevant information about my condition. ',
    },
  ];

  return (
    <div className="testimonial-container">
      <header className="testimonial-navbar">
        <img
          alt="logo"
          src="https://content.energage.com/company-images/SE45259/SE45259_logo_orig.png"
          className="testimonial-logo"
        />
        <span className="testimonial-text1">
          Testimonials
        </span>
        <div className="testimonial-btn-group">
          <Link to="/login" className="button">
            Log Out
          </Link>
        </div>
      </header>
      <div className="testimonial-content">
        <h1 className="testimonial-title">Client Testimonials</h1>
        <div className="testimonial-grid">
          {/* Testimonial cards */}
          {testimonialData.map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <img
                src={testimonial.image}
                alt={`Testimonial ${index + 1}`}
                className="testimonial-image"
              />
              <h2 className="testimonial-name">{testimonial.name}</h2>
              <p className="testimonial-occupation">{testimonial.occupation}</p>
              <p className="testimonial-text">{testimonial.testimonial}</p>
            </div>
          ))}

          {/* Testimonial video cards */}
          <div className="testimonial-video-card">
            <video src="https://www.youtube.com/watch?v=IKyck2crT_c&pp=ygUiY29tbXVuaWNhYmxlIGRpc2Vhc2VzIHRlc3RpbW9uaWFscw%3D%3D" autoPlay controls />
          </div>
          <div className="testimonial-video-card">
            <video src="https://www.youtube.com/watch?v=Xox5yPNt4wo&pp=ygUiY29tbXVuaWNhYmxlIGRpc2Vhc2VzIHRlc3RpbW9uaWFscw%3D%3D" autoPlay controls />
          </div>
          <div className="testimonial-video-card">
            <video src="https://www.youtube.com/watch?v=SaLMDIz60qM&pp=ygUiY29tbXVuaWNhYmxlIGRpc2Vhc2VzIHRlc3RpbW9uaWFscw%3D%3D" autoPlay controls />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;