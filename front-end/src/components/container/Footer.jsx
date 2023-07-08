import React from 'react'
import {Link} from 'react-router-dom';
function Footer() {
  return (
    <div className='footer'>
        <span className = "footer-item">copyright © dev.himank, 2023</span>
        <Link className = "footer-item footer-link">Terms of service</Link>
        <Link className = "footer-item footer-link">Privacy Policy</Link>
        <Link className = "footer-item footer-link">Contact</Link>
        <Link className = "footer-item footer-link">About us</Link>
        <Link className = "footer-item footer-link">GitHub</Link>
        <Link className = "footer-item footer-link">LinkedIn</Link>
    </div>
  )
}

export default Footer