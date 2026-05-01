import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
            <h1 className="footer-logo">TastyBytes.</h1>
            <p>TastyBytes is your go-to food delivery platform, bringing delicious meals right to your doorstep. We partner with the best local restaurants to offer a wide variety of cuisines, ensuring fresh and quality food every time you order.</p>
            <div className="footer-social-icons">
                <img src={assets.facebook_icon} alt="" />
                <img src={assets.twitter_icon} alt="" />
                <a href="https://www.linkedin.com/in/jinukuntla-akhil-kumar-3a4b99247" target="_blank" rel="noopener noreferrer"><img src={assets.linkedin_icon} alt="" /></a>
            </div>
        </div>
        <div className="footer-content-center">
            <h2>COMPANY</h2>
            <ul>
                <li>Home</li>
                <li>About us</li>
                <li>Delivery</li>
                <li>Privacy policy</li>
            </ul>
        </div>
        <div className="footer-content-right">
            <h2>GET IN TOUCH</h2>
            <ul>
                <li>+91 6304767198</li>
                <li>jinukuntlaakhilakumargoud@gmail.com</li>
            </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">Copyright 2024 © TastyBytes.com - All Right Reserved.</p>
    </div>
  )
}

export default Footer
