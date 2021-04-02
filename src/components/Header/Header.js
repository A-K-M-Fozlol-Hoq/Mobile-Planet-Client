import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import './Header.css';
// import logo from '../../';


const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    return (
        <div>
            <div style={{ backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(https://i.ibb.co/f48KmX0/mobile-vendor-880x495.png)` }} className="header">
                <nav className="nav">
                    <div className="logo">
                        <img className="logo" src='https://i.ibb.co/TbH9NVh/logo.png' alt="" />
                    </div>
                    <div className="menu">
                        <Link className='menu-item' to="/home">Home</Link>
                        <Link className='menu-item' to="/order">Order</Link>
                        <Link className='menu-item' to="/admin">Admin</Link>
                        <Link className='menu-item' to="#">Delete</Link>
                        {
                            loggedInUser.name ?
                                <button onClick={() => setLoggedInUser({})}>Sign Out</button> :
                                <button><Link className='menu-item' to="/login">Sign In</Link></button>
                        }
                    </div>
                </nav>
                <div className="title-container">
                    <h1>Mobile Planet</h1>
                    <h4>Best Platform to</h4>
                    <h4>Buy and sell your phone</h4>
                </div>
            </div>

            <div className="cards">

            </div>
        </div>
    );
};

export default Header;