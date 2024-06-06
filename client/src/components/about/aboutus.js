import React from 'react'
import "./aboutus.css";
// import backgroundImage from '../about/landingBack.jpeg';
// import bgImage1 from "../about/th.jpg"
// import bgImage2 from "../about/th (2).jpg"
const AbouUs = () => {
  return (
    <>
    <div className="total_about_container" >
       
   
    <div style={{width:"100%",padding:"35px",textAlign:"center"}}>
     <h1 className="about_main_heading">About Us</h1>
     </div>

      <div className="about_container">
      <div className="side-box">
      {/* <div style={{width:"100%",height:"200px"}}>
      <img style={{ borderRadius: "10px"}} src={bgImage1} width="100%" height="100%" alt="about1 img"/>
      </div> */}
      <p className="about_header">MISSION</p>
      <p  className="about_text">
     
Our mission is to cultivate a culture of transparency, accountability, and continuous improvement within the community. Through Digi-Complaints , we strive to provide a platform where every member feels empowered to voice their concerns, knowing that they will be heard and addressed with fairness and diligence. We are committed to fostering an environment where open communication leads to positive change and a stronger sense of unity.

      </p>
      </div>
      <div className="side-box">
      
      {/* <div style={{ width:"100%",height:"200px"}}>
        <img style={{ borderRadius: "10px"}} alt= "about2 img" src={bgImage2} width="100%" height="100%"/>
      </div> */}
      <p className="about_header">VISION</p>
      <p className="about_text">
Our vision is to become the gold standard in complaint management within the higher education sector. We envision a future where our application serves as a model for other institutions, showcasing the power of technology in facilitating constructive dialogue and problem-solving. By embracing innovation and responsiveness, we aim to create a campus environment that thrives on mutual respect, collaboration, and continuous feedback, ultimately enriching the college experience for all.

      </p>
      </div>
      </div>
      </div>
    </>
  )
}

export default AbouUs;
