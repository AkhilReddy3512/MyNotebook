import React from 'react'
import logo from "./akhil.jpg"
import { Link } from 'react-router-dom'

const About = () => {

  return (
    <div className='about-us' style={{ marginTop: "40px" }}>
      <div className="about my-3 mx-4" style={{ width: "1130px", maxWidth: "85%", margin: "0 auto", display: 'flex', alignItems: "center", justifyContent: "space-around" }} >
        <img src={logo} alt="King" style={{ width: "345px", height: "auto", borderRadius: "90%" }} />
        <div className='text mx-5' style={{ width: "540px", textAlign: 'center' }}>
          <h2 style={{ fontSize: "60px", fontWeight: "400", marginBottom: "10px"}}>About Me</h2>
          <h3 style={{ fontWeight: "350", marginBottom: "10px" , color:"	#1434A4"}}>MERN Stack Developer</h3>
          <p style={{ lineHeight: "25px", letterSpacing: "1px", textAlign: 'justify' }}> Hello, I'm currently pursuing my undergraduate degree in Computer Science and Engineering with a specialization in AIML at Vasavi College of Engineering, Hyderabad.</p>
          <p style={{ lineHeight: "25px", letterSpacing: "1px", textAlign: 'justify' }}> Enthusiastic and self-motivated individual looking for a challenging position in a reputable organization to expand and utilize my skills. Passionate about implementing and launching new projects and eager to learn new technologies and methodologies.</p>
        </div>
      </div>
      <div className="container mx-3" style={{ position:"relative", top:"7px", left:"30px"}}>
      <span className="container mx-3"style={{ position:"relative", bottom:"7px" }}> <b> <i>  For more details Contact Me</i></b></span>
          <br />
          <Link type="button" className="btn btn-dark btn-floating mx-2" to="https://github.com/AkhilReddy3512" target="_blank" role="button">GitHub
            <i className="fab fa-github mx-2"></i>
          </Link>
          <Link type="button" className="btn btn-primary btn-floating mx-2" to="https://www.linkedin.com/in/akhileswar-reddy-pearlscorpio/" target="_blank" role="button" style={{ "backgroundColor": "#0072b1" }}>LinkedIn
            <i className="fab fa-linkedin-in mx-2"></i>
          </Link>
          <br />
          <i class="fa-solid fa-envelope  my-4"> akhilreddy3512@gmail.com</i>
          
      </div>
    </div>
  )
}

export default About
