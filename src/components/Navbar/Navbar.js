import React, { useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';

const Navbar = () => {

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    return (
        <div className="d-flex justify-content-between p-3">
            <div className="navLogo">
                <h3>Ride & Route</h3>
            </div>
            <div className="d-flex flex-row bd-highlight mb-3 navItems">
                <Link to="/"><button className="loginBtn btn btn-info">Home</button></Link>
                <Link><button className="loginBtn btn btn-info">Destination</button></Link>
                { loggedInUser.email ? 
                <button className="loginBtn btn btn-info">{loggedInUser.email}</button> :
                 <Link to="/login"><button className="loginBtn btn btn-warning">Login</button></Link> }
            </div>
            
        </div>
    );
};

export default Navbar;