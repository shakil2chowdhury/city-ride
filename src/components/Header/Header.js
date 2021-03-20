import { Button } from '@material-ui/core';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import logo from '../../assets/Urban Riders.png'
import "./Header.css"

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    return (
        <header className="container">
            <img src={logo} alt="" srcset="" />
            <nav>
                <Link to="/">Home</Link>
                <Link to="/destination">Destination</Link>
                <Link to="/blog">Blog</Link>
                <Link to="/contact">Contact</Link>
                <Link to="/login"><Button variant="contained" color="primary">
                    {loggedInUser.email ? "Logout" : "Login"}
                </Button>
                </Link>
            </nav>
        </header>
    );
};

export default Header;