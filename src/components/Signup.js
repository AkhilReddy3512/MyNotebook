import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
const Signup = (props) => {
  const host = "http://localhost:5000";
    const [credentials, setCredentials] = useState({ name: "", email: "", phoneno: "", password: "" });
    let navigate = useNavigate();

    //Handling the Submit button
    const handleOnSubmit = async (e) => {
        e.preventDefault();
        //API Call
        const response = await fetch(`${host}/api/auth/createuser`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: credentials.name, phoneno: credentials.phoneno, email: credentials.email, password: credentials.password }),
        });
        const json = await response.json();
        console.log(json);
        if(json.success){
            //Redirecting to the home page by saving auth-token 
            localStorage.setItem("token", json.authtoken);
            navigate("/");
            props.showAlert("Account Created Successfully","success");
        }
        else{
          props.showAlert("Sorry a user with this email/phoneno already exists","warning");
        }
    }

    const handleOnChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }
  return (
    <div>
      <section className="container" style={{ "backgroundColor ": "#eee" }}>
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div className="card1 text-black" style={{ "borderRadius": "25px" }}>
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                      <p className="text-center h1 fw-bold mb-5 mx-1 ">Sign up</p>

                      <form className="mx-1 mx-md-4" onSubmit={handleOnSubmit}>

                        <div className="d-flex flex-row align-items-center mb-3">
                          <i className="fas fa-user fa-lg me-5 fa-fw "></i>
                          <div className="form-outline flex-fill mb-0 mx-2">
                            <input type="text" id="name" className="form-control" name="name" onChange={handleOnChange} placeholder='Your Name' minLength={3} required/>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-3">
                          <i className="fas fa-phone fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0 mx-2">
                            <input type="tel" id="phoneno" className="form-control" name="phoneno" onChange={handleOnChange} placeholder='Your Phone number' required/>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-3">
                          <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0 mx-2">
                            <input type="email" id="email" className="form-control" name="email" onChange={handleOnChange} placeholder='Your Email' required />
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-3">
                          <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0 mx-2">
                            <input type="password" id="password" className="form-control" name="password" placeholder='Password' onChange={handleOnChange} minLength={8} required />
                          </div>
                        </div>

                        <div className="form-check d-flex justify-content-center mb-4 mx-2">
                          <input className="form-check-input " type="checkbox" value="" id="form2Example3c" style={{ "position": "relative", "marginLeft": "-1.5rem" }} />
                          <label className="form-check-label mx-2" htmlFor="form2Example3">
                            I agree all statements in <Link to="https://www.zoho.com/en-in/terms.html">Terms of service</Link>
                          </label>
                        </div>


                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4 my-3">
                          <button type="button" disabled={credentials.name.length<3 || credentials.password.length<8} className="btn btn-dark btn-lg" onClick={handleOnSubmit}>Register</button>
                        </div>

                      </form>

                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                      <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                        className="img-fluid" alt="Signupimg" />

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Signup
