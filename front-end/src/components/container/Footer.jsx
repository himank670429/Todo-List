import React from 'react'
import {Link} from 'react-router-dom';
function Footer() {
  return (
    <div className='footer'>
        <span className = "footer-item">copyright © dev.himank, 2023</span>
        <Link to = '/Terms' className = "footer-item footer-link">Terms of condition</Link>
        <Link to = '/Privacy' className = "footer-item footer-link">Privacy Policy</Link>
        <Link to = '/About' className = "footer-item footer-link">About us</Link>
        <Link to = 'https://github.com/himank670429' className = "footer-item footer-link">GitHub</Link>
        <Link to = 'https://www.linkedin.com/in/himank-singh-65b411249/' className = "footer-item footer-link">LinkedIn</Link>
        <Link to = 'https://www.instagram.com/dev.himank/' className = 'footer-item footer-link'>Instagram</Link>
    </div>
  )
}

export default Footer