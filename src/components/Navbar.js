import React, { useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from "./mnb.png"

const NavBar = () => {
    let location = useLocation();
    let navigate = useNavigate();
    useEffect(() => { }, [location]);
    const handleLogout = ()=>{
        localStorage.removeItem("token");
        navigate("/login");
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark ">
                <a className="navbar-brand" href="/">
                    <img src={logo} alt="MyNotebook" width="30" height="24"/>
                </a>
                <Link className="navbar-brand" to="/"><b>MyNotebook</b></Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className={`nav-item ${location.pathname === "/" ? "active" : ""}`}>
                            <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
                        </li>
                        <li className={`nav-item ${location.pathname === "/about" ? "active" : ""}`}>
                            <Link className="nav-link" to="/about">About Us</Link>
                        </li>
                    </ul>
                    {!localStorage.getItem("token")?<form className="form-inline my-2 my-lg-0">
                    <Link className="btn btn-success mx-2" to="/login" role="button">SIGNIN</Link>
                    <Link className="btn btn-danger" to="/signup" role="button">SIGN UP</Link>
                    </form>:<button onClick={handleLogout} className="btn btn-danger">SIGN OUT</button>}
                </div>
            </nav>
        </div>
    )
}
export default NavBar
