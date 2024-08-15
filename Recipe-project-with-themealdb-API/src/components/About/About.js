import React from 'react';
import { useSpring, animated } from '@react-spring/web';
import Navbar from '../navbar/Navbar.jsx'; // Adjust the import path as necessary

const About = () => {
  const fadeIn = useSpring({
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: { duration: 1000 },
  });

  const slideInLeft = useSpring({
    from: { opacity: 0, transform: 'translateX(-100px)' },
    to: { opacity: 1, transform: 'translateX(0)' },
    config: { duration: 1000 },
  });

  const rotateIn = useSpring({
    from: { opacity: 0, transform: 'rotateY(-180deg)' },
    to: { opacity: 1, transform: 'rotateY(0deg)' },
    config: { duration: 1000 },
  });

  return (
    <div>
      <Navbar /> {/* Add Navbar component here */}
      <section style={styles.section}>
        <animated.div style={{ ...styles.container, ...fadeIn }}>
          {/* Image Side */}
          <animated.div style={{ ...styles.imageWrapper, ...slideInLeft }}>
            <animated.img 
              src="https://img.freepik.com/premium-photo/plate-desserts-table_777078-52267.jpg" // Replace with your image URL
              alt="Cooking"
              style={{ ...styles.image, ...rotateIn }}
            />
          </animated.div>
          
          {/* Content Side */}
          <div style={styles.contentWrapper}>
            <h1 style={styles.title}>About Us</h1>
            <p style={styles.text}>
              Welcome to our Recipe Sharing App! We are passionate about food and love to share our culinary adventures with the world. Our mission is to bring together a community of food enthusiasts to discover, share, and enjoy delicious recipes from around the globe.
            </p>
            <h2 style={styles.subtitle}>Our Mission</h2>
            <p style={styles.text}>
              Whether you are a seasoned chef or just starting out in the kitchen, our app is designed to inspire and help you create amazing meals. Join us on this gastronomic journey and share your own recipes with our community!
            </p>
            <h2 style={styles.subtitle}>Join Our Community</h2>
            <p style={styles.text}>
              We believe in the power of shared culinary experiences. By joining our community, you can connect with like-minded food enthusiasts, learn new recipes, and even share your own culinary creations. Let's cook and grow together!
            </p>
          </div>
        </animated.div>
      </section>
    </div>
  );
};

const styles = {
  section: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#FFF5E1',
    padding: '2rem',
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    maxWidth: '1200px',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    transition: 'all 0.3s ease',
  },
  imageWrapper: {
    flex: '1 1 40%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1rem',
  },
  image: {
    width: '100%',
    height: 'auto',
    maxWidth: '400px',
    maxHeight: '600px',
    objectFit: 'cover',
    borderRadius: '16px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  },
  contentWrapper: {
    flex: '1 1 60%',
    padding: '2rem',
    textAlign: 'center',
  },
  title: {
    fontSize: '3rem',
    marginBottom: '1.5rem',
    color: '#333',
    fontFamily: "'Dancing Script', cursive",
    letterSpacing: '2px',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)',
  },
  subtitle: {
    fontSize: '2.5rem',
    marginBottom: '1rem',
    color: '#555',
    fontFamily: "'Dancing Script', cursive",
    letterSpacing: '1.5px',
    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)',
  },
  text: {
    fontSize: '1.2rem',
    lineHeight: '1.8',
    color: '#666',
    marginBottom: '1.5rem',
    fontFamily: "'Open Sans', sans-serif",
    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)',
  },
};

export default About;
