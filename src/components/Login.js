import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
const Login = (props) => {
    const host = "http://localhost:5000";
    const [credentials, setCredentials] = useState({ email: "", phoneno: "", password: "" });
    let navigate = useNavigate();

    //Handling the Submit button
    const handleOnSubmit = async (e) => {
        e.preventDefault();
        //API Call
        const response = await fetch(`${host}/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ phoneno: credentials.phoneno, email: credentials.email, password: credentials.password }),
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            //Redirecting to the home page by saving auth-token 
            localStorage.setItem("token", json.authtoken);
            props.showAlert("Logged In Successfully", "success")
            navigate("/");
        }
        else {
            props.showAlert("Invalid Credentials", "danger");
        }
    }

    const handleOnChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }
    return (
        <div className='container mt-1'>
            <h2 style={{ display: "flex", justifyContent: "center" }}><i>Sign In to continue to MyNotebook</i></h2>
            <section className="container mt-5">
                <div className="container-fluid h-custom">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-md-9 col-lg-6 col-xl-5">
                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                                className="img-fluid" alt="Notebook" />
                        </div>
                        <div className="col-md-8 col-lg-6 col-lg-4 offset-xl-1">
                            <form >
                                <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                                <p className="lead fw-normal mb-0 me-4 mx-2"><b>Sign in with</b></p>
                                    <Link className="btn btn-danger btn-floating mx-2" to="https://accounts.google.com/signin" target="_blank" role="button">
                                        <i className="fab fa-google"></i>
                                    </Link>
                                    <Link type="button" className="btn btn-primary btn-floating mx-2" to="https://www.facebook.com/login/" target="_blank" role="button" style={{ "backgroundColor": "#3b5998" }} >
                                        <i className="fab fa-facebook-f"></i>
                                    </Link>

                                    <Link type="button" className="btn btn-primary btn-floating mx-2" to="https://twitter.com/i/flow/login" target="_blank" role="button" style={{ "backgroundColor": "#00acee" }}>
                                        <i className="fab fa-twitter"></i>
                                    </Link>
                                    <Link type="button" className="btn btn-dark btn-floating mx-2" to="https://github.com/login" target="_blank" role="button">
                                        <i className="fab fa-github"></i>
                                    </Link>

                                    <Link type="button" className="btn btn-primary btn-floating mx-2" to="https://www.linkedin.com/login" target="_blank" role="button" style={{ "backgroundColor": "#0072b1" }}>
                                        <i className="fab fa-linkedin-in"></i>
                                    </Link>
                                </div>

                                <div className="divider align-items-center my-4">
                                    <p className="text-center fw-bold mb-0"><b>── OR ──</b></p>
                                </div>
                                <div className="form-outline mb-4">
                                    <input type="email" id="email" name="email" className="form-control form-control-lg"
                                        onChange={handleOnChange} value={credentials.email} placeholder="Enter email address" />
                                </div>
                                <div className="form-outline mb-4">
                                    <input type="tel" id="phoneno" name="phoneno" pattern="[789][0-9]{9}" className="form-control form-control-lg"
                                        onChange={handleOnChange} value={credentials.phoneno} placeholder="Enter phone no" />
                                </div>
                                <div className="form-outline mb-3">
                                    <input type="password" id="password" name='password' className="form-control form-control-lg"
                                        onChange={handleOnChange} value={credentials.password} placeholder="Enter password" />
                                </div>

                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="form-check mb-0">
                                        <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
                                        <label className="form-check-label" htmlFor="form2Example3">
                                            Remember me
                                        </label>
                                    </div>
                                    <Link to="https://accounts.google.com/signin" className="text-body">Forgot password?</Link>
                                </div>

                                <div className="text-center text-lg-start mt-4 pt-2">
                                    <button type="button" className="btn btn-dark btn-lg"
                                        style={{ 'paddingLeft': "2.5rem", "paddingRight": "2.5rem" }} onClick={handleOnSubmit} >Login</button>
                                    <p className="small fw-bold mt-2 pt-1 mb-0 my-1">Don't have an account?
                                        <br />
                                        <Link to="/signup"
                                            className="link-danger">Register Now
                                        </Link></p>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
                <div
                    className="container d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 my-3 bg-light">
                    <div className="text-black mb-3 mb-md-0">
                        Copyright © 2023. All rights reserved.
                    </div>
                    <div>
                        <Link to="https://www.facebook.com/login/" className="text-black mx-2" style={{ "color": "#3b5998" }}>
                            <i className="fab fa-facebook-f"></i>
                        </Link>
                        <Link to="https://twitter.com/i/flow/login" className="text-black mx-2" style={{ "color": "#00acee" }}>
                            <i className="fab fa-twitter"></i>
                        </Link>
                        <Link to="https://accounts.google.com/signin" className="text-red mx-2" style={{ "color": "#d9534f" }}>
                            <i className="fab fa-google"></i>
                        </Link>
                        <Link to="https://www.linkedin.com/login" className="text-black mx-2" style={{ "color": "#0072b1" }}>
                            <i className="fab fa-linkedin-in"></i>
                        </Link>
                        <Link to="https://github.com/login" className="text-dark mx-2" style={{ "color": "#000000" }}>
                            <i className="fab fa-github"></i>
                        </Link>
                        <Link to="https://www.instagram.com/accounts/login/" className="text-black mx-2" style={{ "color": "#C13584" }}>
                            <i className="fab fa-instagram"></i>
                        </Link>
                    </div>
                </div>
            </section>
        </div>

    )
}

export default Login
