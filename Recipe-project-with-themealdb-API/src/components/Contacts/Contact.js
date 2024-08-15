import React, { useRef } from 'react';
import Navbar from '../../components/navbar/Navbar.jsx';  // Adjust the import path as necessary

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    // Add email sending logic here
  };

  return (
    <div>
      <Navbar /> {/* Add Navbar component here */}
      <section style={styles.section}>
        <div style={styles.container}>
          
          {/* Image Side */}
          <div style={styles.imageWrapper}>
            <img 
              src="https://st2.depositphotos.com/3889193/7173/i/450/depositphotos_71738921-stock-photo-online-cooking-app-with-kitchen.jpg" // Image URL
              alt="Contact Us"
              style={styles.image}
            />
          </div>
          
          {/* Contact Form Side */}
          <div style={styles.formWrapper}>
            <h2 style={styles.title}>Contact Us</h2>
            <form ref={form} onSubmit={sendEmail} style={styles.form}>
              <input
                type="text"
                placeholder="Full Name"
                name="user_name"
                required
                style={styles.input}
              />
              <input
                type="email"
                placeholder="Email"
                name="user_email"
                required
                style={styles.input}
              />
              <input
                type="text"
                placeholder="Subject"
                name="subject"
                required
                style={styles.input}
              />
              <textarea
                name="message"
                cols="30"
                rows="10"
                placeholder="Your Message"
                required
                style={styles.textarea}
              ></textarea>
              <button type="submit" style={styles.button}>
                Send Message
              </button>
            </form>
          </div>
          
        </div>
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
    width: '100%',
    maxWidth: '900px',
    display: 'flex',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
    borderRadius: '16px',
    backgroundColor: '#fff',
    overflow: 'hidden',
    transition: 'all 0.3s ease',
  },
  imageWrapper: {
    flex: '1 1 50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '16px 0 0 16px',
  },
  formWrapper: {
    flex: '1 1 50%',
    padding: '2rem',
  },
  title: {
    textAlign: 'center',
    marginBottom: '2rem',
    color: '#333',
    fontSize: '2rem',
    fontFamily: "'Dancing Script', cursive",
    letterSpacing: '1.5px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  input: {
    width: '100%',
    padding: '0.75rem',
    border: '1px solid #ddd',
    borderRadius: '8px',
    fontSize: '1rem',
    fontFamily: "'Open Sans', sans-serif",
    transition: 'border-color 0.3s ease',
  },
  textarea: {
    width: '100%',
    padding: '0.75rem',
    border: '1px solid #ddd',
    borderRadius: '8px',
    fontSize: '1rem',
    fontFamily: "'Open Sans', sans-serif",
    resize: 'none',
    transition: 'border-color 0.3s ease',
  },
  button: {
    padding: '0.75rem',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    backgroundColor: '#007bff',
    color: '#fff',
    fontSize: '1rem',
    fontFamily: "'Open Sans', sans-serif",
    transition: 'background-color 0.3s ease',
  },
};

export default Contact;
