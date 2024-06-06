import React from 'react';
import "./service.css"

const Services = () => {
  return (
    <>
      <div className="total_service_container" style={{ backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
        <div style={{ width:"100%", padding:"25px", marginBottom:"5px", textAlign:"center" }}>
          <p className="services_main_heading"> Our Services</p>
        </div>
        <div className="service-container">
          <div className="service-boxes">
            <p className="services-text">
              Here, we believe in fostering an environment where students, faculty, and staff can thrive and succeed. We understand that open communication is essential for maintaining a positive and supportive community. That's why we've developed this Complaint Management Application as a tool to streamline the process of addressing concerns and feedback.
            </p>
          </div>
          <div className="service-boxes">
            <p className="services-text">
              Our mission is simple, to provide a platform where members of our college community can voice their concerns, suggestions, and feedback in a secure and confidential manner. We are committed to ensuring that every voice is heard and that every issue is addressed promptly and effectively.
            </p>
          </div>
          <div className="service-boxes">
            <p className="services-text">
              With our user-friendly interface, submitting a complaint is quick and easy. Whether it's regarding facilities, academics, campus life, or any other aspect of college experience, your feedback matters to us.
            </p>
          </div>
          {/* <div className="service-boxes">
            <p className="services-text">
              Our dedicated team of administrators and staff members work tirelessly to review and resolve complaints in a fair and transparent manner. We value accountability and strive to uphold the highest standards of integrity and professionalism in all our interactions.
            </p>
          </div>
          <div className="service-boxes">
            <p className="services-text">
              Thank you for choosing to be a part of this digital community. Together, we can make a difference and create a campus environment where everyone feels heard, valued, and supported.
            </p>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Services;