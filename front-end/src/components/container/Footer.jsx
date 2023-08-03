import React from 'react'
import {Link} from 'react-router-dom';

import { DataContext } from '../../context/DataContext';
import { useContext } from 'react';

function Footer() {
  const {testConnection} = useContext(DataContext);
  return (
    <div className='footer'>
        <span className = "footer-item">copyright © dev.himank, 2023</span>
        <Link to = '/Terms' className = "footer-item footer-link">Terms of condition</Link>
        <Link to = '/Privacy' className = "footer-item footer-link">Privacy Policy</Link>
        <Link to = '/About' className = "footer-item footer-link">About us</Link>
        <Link to = 'https://github.com/himank670429' className = "footer-item footer-link">GitHub</Link>
        <Link to = 'https://www.linkedin.com/in/himank-singh-65b411249/' className = "footer-item footer-link">LinkedIn</Link>
        <span onClick={testConnection} className='footer-item footer-link'>test</span>
    </div>
  )
}

export default Footer