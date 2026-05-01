import React, { useContext, useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { StoreContext } from '../../Context/StoreContext'

const Navbar = ({ setShowLogin }) => {

  const [menu, setMenu] = useState("home");
  const [showSearch, setShowSearch] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const { getTotalCartAmount, token, setToken, searchQuery, setSearchQuery } = useContext(StoreContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setShowDropdown(false);
    navigate("/");
  }

  return (
    <div className='navbar'>
      <Link to='/'><img className='logo' src={assets.logo} alt="" /></Link>
      <ul className="navbar-menu">
        <Link to="/" onClick={() => setMenu("home")} className={`${menu === "home" ? "active" : ""}`}>home</Link>
        <a href='#explore-menu' onClick={() => setMenu("menu")} className={`${menu === "menu" ? "active" : ""}`}>menu</a>
        <a href='#app-download' onClick={() => setMenu("mob-app")} className={`${menu === "mob-app" ? "active" : ""}`}>mobile app</a>
        <a href='#footer' onClick={() => setMenu("contact")} className={`${menu === "contact" ? "active" : ""}`}>contact us</a>
      </ul>
      <div className="navbar-right">
        <div className="navbar-search-container">
          <img src={assets.search_icon} alt="" onClick={() => setShowSearch(!showSearch)} style={{ cursor: 'pointer' }} />
          {showSearch && (
            <input
              type="text"
              className="navbar-search-input"
              placeholder="Search food..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
          )}
        </div>
        <Link to='/cart' className='navbar-search-icon'>
          <img src={assets.basket_icon} alt="" />
          <div className={getTotalCartAmount() > 0 ? "dot" : ""}></div>
        </Link>
        {!token
          ? <button onClick={() => setShowLogin(true)}>sign in</button>
          : <div className='navbar-profile'>
            <img src={assets.profile_icon} alt="" className="navbar-profile-icon" onClick={() => setShowDropdown(!showDropdown)} />
            {showDropdown && (
              <ul className='navbar-profile-dropdown'>
                <li onClick={() => { navigate('/myorder'); setShowDropdown(false); }}>
                  <p>Orders</p>
                </li>
                <hr />
                <li onClick={logout}>
                  <p>Logout</p>
                </li>
              </ul>
            )}
          </div>
        }
      </div>
    </div>
  )
}

export default Navbar
