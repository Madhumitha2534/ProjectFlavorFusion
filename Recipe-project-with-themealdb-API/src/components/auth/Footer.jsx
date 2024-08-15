import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.css';  // Import Font Awesome CSS

const Footer = () => {
  const location = useLocation();

  // Exclude footer on admin-related pages
  const showFooter = !location.pathname.startsWith('/admin');

  const [iconColors, setIconColors] = useState({
    instagram: '#5b1408',
    facebook: '#5b1408',
    twitter: '#5b1408',
    linkedin: '#5b1408',
  });

  const footerStyle = {
    backgroundColor: '#f8f3f0',  // Light skin color
    padding: '20px 0',
    width: '100%',
    position: 'relative',
    bottom: 0,
    marginTop: 'auto',
    color: '#5b1408',  // Brown text color
    textAlign: 'center',
  };

  const containerStyle = {
    maxWidth: '1170px',
    margin: 'auto',
    padding: '0 15px'
  };

  const rowStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    textAlign: 'left',
  };

  const footerColStyle = {
    flex: '1',
    padding: '0 15px',
    minWidth: '200px',
    marginBottom: '20px',
  };

  const footerLinkStyle = {
    color: '#b5651d',  // Lighter brown color for links
    textDecoration: 'none',
    display: 'block',
    marginBottom: '10px',
    transition: 'color 0.3s',
  };

  const socialLinkStyle = (icon) => ({
    height: '40px',
    width: '40px',
    backgroundColor: '#fff',  // White background for social icons
    margin: '0 10px',
    textAlign: 'center',
    lineHeight: '40px',
    borderRadius: '50%',
    color: iconColors[icon],  // Dynamic color based on state
    transition: 'all 0.3s ease',
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    textDecoration: 'none',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',  // Default shadow
  });

  const socialContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
  };

  const handleMouseOver = (e) => {
    e.target.style.color = '#5b1408';  // Darker brown on hover
    e.target.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';  // Highlight on hover
  };

  const handleMouseOut = (e) => {
    e.target.style.color = '#b5651d';  // Revert to lighter brown on mouse out
    e.target.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';  // Revert to default shadow
  };

  const handleIconClick = (icon) => {
    const newColor = '#ffa07a';  // Light salmon color on click
    setIconColors((prevColors) => ({
      ...prevColors,
      [icon]: prevColors[icon] === '#5b1408' ? newColor : '#5b1408',
    }));
  };

  if (!showFooter) {
    return null; // Don't render the footer on admin pages
  }

  return (
    <footer style={footerStyle}>
      <div style={containerStyle}>
        <div style={rowStyle}>
          <div style={footerColStyle}>
            <h4 style={{ fontSize: '18px', marginBottom: '20px' }}>Company</h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li><a href="/about" style={footerLinkStyle} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>About Us</a></li>
              <li><a href="/services" style={footerLinkStyle} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>Our Services</a></li>
              <li><a href="/terms" style={footerLinkStyle} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>Terms and Conditions</a></li>
              <li><a href="/privacy" style={footerLinkStyle} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>Privacy Policy</a></li>
            </ul>
          </div>
          <div style={footerColStyle}>
            <h4 style={{ fontSize: '18px', marginBottom: '20px' }}>Get Help</h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li><a href="/faq" style={footerLinkStyle} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>FAQ</a></li>
              <li><a href="/contact" style={footerLinkStyle} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>Contact Us</a></li>
            </ul>
          </div>
          <div style={footerColStyle}>
            <h4 style={{ fontSize: '18px', marginBottom: '20px' }}>Follow Us</h4>
            <div style={socialContainerStyle}>
              <a href="https://www.instagram.com/madhumitha_pachaiyappan_?igsh=Mm90YmIwOGt0Z25t"
                target="_blank"
                rel="noopener noreferrer"
                style={socialLinkStyle('instagram')}
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
                onClick={() => handleIconClick('instagram')}
                aria-label="Instagram"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a
                href="https://www.facebook.com/your_facebook_page"
                target="_blank"
                rel="noopener noreferrer"
                style={socialLinkStyle('facebook')}
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
                onClick={() => handleIconClick('facebook')}
                aria-label="Facebook"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a
                href="https://twitter.com/your_twitter_username"
                target="_blank"
                rel="noopener noreferrer"
                style={socialLinkStyle('twitter')}
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
                onClick={() => handleIconClick('twitter')}
                aria-label="Twitter"
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a
                href="https://www.linkedin.com/in/your_linkedin_profile"
                target="_blank"
                rel="noopener noreferrer"
                style={socialLinkStyle('linkedin')}
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
                onClick={() => handleIconClick('linkedin')}
                aria-label="LinkedIn"
              >
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
