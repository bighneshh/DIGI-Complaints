import React, { useRef } from "react";
import "./welcome.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FeedbackComponent from "../../components/feedback/feedback";
import AboutUs from "../../components/about/aboutus";
import Services from "../../components/service/service";
import ContactUs from "../../components/contact/contactUs";

const WelcomePage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState(null);

  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const section3Ref = useRef(null);
  const section4Ref = useRef(null);

  const scrollToSection = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const storedEmail = localStorage.getItem("emailUser");
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  function handleSignUpClick() {
    navigate("/signup");
  }

  const [isOpen, setIsOpen] = useState(false);
  const [isOpen1, setIsOpen1] = useState(false);

  const toggleDropdown = () => {
    if (email) navigate("/dashboard");
    setIsOpen(!isOpen);
  };
  const toggleDropdown1 = () => {
    setIsOpen1(!isOpen1);
  };
  console.log(email);
  return (
    <>
      <div className="main">
        <div className="background-image"></div>

        <div className="navbar">
          <div className="left">
            <img
              className="welcome-logo"
              src="/images/Digi Complaints-logos_white.png"
              alt="LOGO"
            />
          </div>
          <div className="right">
            <div className="login">
              <div className="dropdown">
                <motion.button
                  className="dropdown-toggle"
                  onClick={toggleDropdown}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  style={{
                    color: "black",
                    fontSize: "1rem",
                    padding: "0.5rem",
                  }}
                >
                  {email ? "Dashboard" : "Login"}

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                  >
                    <path d="M7 10l5 5 5-5z" />
                    <path d="M0 0h24v24H0z" fill="none" />
                  </svg>
                </motion.button>
                {!email && (
                  <AnimatePresence>
                    {isOpen && (
                      <motion.ul
                        className="dropdown-menu-home"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                      >
                        <motion.li
                          key="1"
                          className="menus"
                          onClick={() => {
                            navigate("/login/user");
                          }}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          User login
                        </motion.li>
                        <motion.li
                          key="2"
                          className="menus"
                          onClick={() => {
                            navigate("/login/hod");
                          }}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          HOD login
                        </motion.li>
                        <motion.li
                          key="3"
                          className="menus"
                          onClick={() => {
                            navigate("/login/principal");
                          }}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          Principal login
                        </motion.li>
                        <motion.li
                          key="4"
                          className="menus"
                          onClick={() => {
                            navigate("/login/pic");
                          }}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          PIC login
                        </motion.li>
                        <motion.li
                          key="4"
                          className="menus"
                          onClick={() => {
                            navigate("/login/vendor");
                          }}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          Vendor login
                        </motion.li>
                        <motion.li
                          key="5"
                          className="menus"
                          onClick={() => {
                            navigate("/login/admin");
                          }}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          Admin login
                        </motion.li>
                      </motion.ul>
                    )}
                  </AnimatePresence>
                )}
              </div>
            </div>

            <div className="menu-home">
              <div className="dropdown">
                <motion.button
                  className="dropdown-toggle"
                  onClick={toggleDropdown1}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                  >
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z" />
                  </svg>
                </motion.button>
                <motion.ul
                  className="dropdown-menu-home"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: isOpen1 ? 1 : 0, y: isOpen1 ? 0 : -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.li
                    whileHover={{ scale: 1.05 }}
                    onClick={() => scrollToSection(section1Ref)}
                  >
                    ABOUT US
                  </motion.li>
                  <motion.li
                    whileHover={{ scale: 1.05 }}
                    onClick={() => scrollToSection(section2Ref)}
                  >
                    SERVICES
                  </motion.li>
                  <motion.li
                    whileHover={{ scale: 1.05 }}
                    onClick={() => scrollToSection(section3Ref)}
                  >
                    CONTACT US
                  </motion.li>
                  <motion.li
                    whileHover={{ scale: 1.05 }}
                    onClick={() => scrollToSection(section4Ref)}
                  >
                    FEEDBACK
                  </motion.li>
                </motion.ul>
              </div>
            </div>
          </div>
        </div>
        <div className="wel">
          <div className="mright">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
            >
              <motion.div className="page1">
                COMPLAINTS TO <p className="c">CHEERS!</p>
              </motion.div>
              <motion.div className="page2">
                Your satisfaction, Our Mission
              </motion.div>
              <motion.hr
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1, repeat: Infinity, repeatDelay: 3 }}
              />

              <motion.div className="page3">
                Welcome to Digi Complaints
              </motion.div>
              <div className="page4">
                <motion.button className="getstarted" onClick={() => scrollToSection(section1Ref)}>
                  LEARN MORE
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                  >
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path d="M10 17l5-5-5-5v10z" />
                  </svg>
                </motion.button>
                <motion.button
                  className="getstarted"
                  onClick={handleSignUpClick}
                  whileHover={{ scale: 1.1 }}
                >
                  SIGNUP
                </motion.button>
              </div>
            </motion.div>
          </div>
          <div className="App">
            <motion.div
              className="mleft"
              initial={{ opacity: 0, rotateY: -90 }}
              animate={{ opacity: 1, rotateY: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              whileHover={{ rotateY: 10 }}
              whileTap={{ rotateY: -10 }}
              style={{ perspective: "1000px" }}
            >
    
            </motion.div>
          </div>
        </div>
      </div>
      <div ref={section1Ref}>
        <AboutUs />
      </div>
      <div ref={section2Ref}>
        <Services />
      </div>
      <div ref={section3Ref}>
        <ContactUs />
      </div>
      <div ref={section4Ref}>
        <FeedbackComponent/>
      </div>
    </>
  );
};

export default WelcomePage;
