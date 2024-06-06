import React from 'react'
import "./contactUs.css"
const ContactUs = () => {
  return (
    <>
    <div className="block" style={{ backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat'}}>
      <h1 style={{marginTop: "95px",fontSize: "80px",textTransform: "uppercase",fontWeight:"bold",color: "#f8f5f5e3",textShadow: "2px 2px 4px rgba(8, 139, 179, 0.636)"}}>Contact Us</h1>
      {/* <p style={{marginTop:"40px", fontSize: "2.3vw", fontWeight:"bold",color: "#1976d2",marginBottom:"15px"}}>Get in touch with us</p> */}
      <br></br><br></br><br></br>
      <p style={{fontSize: "1.8vw", color: "#f8f5f5e3",textShadow: "2px 2px 4px rgba(8, 139, 179, 0.636)"}}>If you have any questions or inquiries, feel free to contact us. We would be happy to assist you.</p>
      <br></br>
      {/* <p style={{fontSize: "1.8vw", color: "#0077B5",fontWeight:"600"}}>digicomplaints@gmail.com</p>
      <p style={{fontSize: "1.8vw", color: "#0077B5",fontWeight:"600"}}>+91-7008455543/9348383820</p> */}
      <div className="service-boxes" style={{padding:"30px"}}>
            <p className="services-text" style={{fontSize:"20px"}}>
              Mail us at:
              digicomplaints@gmail.com
            </p>
          </div>
          <div className="service-boxes" style={{padding:"30px"}}>
            <p className="services-text" style={{fontSize:"20px"}}>
              Call us at:
              +91-7084563758
            </p>
          </div>
      </div>
    </>
  )
}

export default ContactUs;