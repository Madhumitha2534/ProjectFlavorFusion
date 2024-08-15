import React, { useState } from 'react';
import Navbar from '../navbar/Navbar';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How do I create a new recipe?",
      answer: "To create a new recipe, go to the 'Submit Recipe' page, fill in the details of your recipe, and click 'Submit'.",
      image: "https://via.placeholder.com/100x100/FF5733/FFFFFF?text=Create" // Replace with your image URL
    },
    {
      question: "Can I edit my recipe after submitting?",
      answer: "Yes, you can edit your recipe by navigating to your profile and selecting 'My Recipes'. Choose the recipe you want to edit and make your changes.",
      image: "https://via.placeholder.com/100x100/33FF57/FFFFFF?text=Edit" // Replace with your image URL
    },
    {
      question: "How can I search for recipes?",
      answer: "You can search for recipes using the search bar on the 'Explore' page. You can filter by ingredients, cuisine, or recipe name.",
      image: "https://via.placeholder.com/100x100/3357FF/FFFFFF?text=Search" // Replace with your image URL
    },
    {
      question: "How do I contact support?",
      answer: "To contact support, go to the 'Contact Us' page and fill out the contact form. Our support team will get back to you as soon as possible.",
      image: "https://via.placeholder.com/100x100/FF33A1/FFFFFF?text=Contact" // Replace with your image URL
    }
    // Add more FAQs as needed
  ];

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div>
      <Navbar />
      <section style={styles.section}>
        <div style={styles.container}>
          <h1 style={styles.title}>Frequently Asked Questions</h1>
          <div style={styles.faqList}>
            {faqs.map((faq, index) => (
              <div key={index} style={styles.faqItem}>
                <div
                  onClick={() => handleToggle(index)}
                  style={styles.questionContainer}
                >
                  <img src={faq.image} alt={faq.question} style={styles.image} />
                  <div style={styles.question}>
                    {faq.question}
                    <span style={styles.toggleIcon}>
                      {openIndex === index ? '−' : '+'}
                    </span>
                  </div>
                </div>
                {openIndex === index && <p style={styles.answer}>{faq.answer}</p>}
              </div>
            ))}
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
    backgroundColor: '#f0f8ff', // Light AliceBlue color
    padding: '2rem',
  },
  container: {
    width: '100%',
    maxWidth: '900px',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    padding: '2rem',
    textAlign: 'center',
    boxSizing: 'border-box',
  },
  title: {
    fontSize: '2.5rem',
    marginBottom: '1.5rem',
    color: '#333',
    fontWeight: 'bold',
  },
  faqList: {
    textAlign: 'left',
  },
  faqItem: {
    marginBottom: '1.5rem',
  },
  questionContainer: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    backgroundColor: '#ffe4b5', // Light Moccasin color
    borderRadius: '8px',
    padding: '0.5rem',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  question: {
    fontSize: '1.5rem',
    color: '#555',
    marginLeft: '1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  answer: {
    fontSize: '1.2rem',
    color: '#666',
    paddingLeft: '3rem',
    marginTop: '0.5rem',
  },
  toggleIcon: {
    fontSize: '1.5rem',
    color: '#555',
  },
  image: {
    width: '80px',
    height: '80px',
    borderRadius: '8px',
  },
  '@media (max-width: 768px)': {
    container: {
      padding: '1rem',
    },
    title: {
      fontSize: '2rem',
    },
    question: {
      fontSize: '1.3rem',
    },
    answer: {
      fontSize: '1rem',
    },
  },
  '@media (max-width: 480px)': {
    title: {
      fontSize: '1.5rem',
    },
    question: {
      fontSize: '1.2rem',
    },
    answer: {
      fontSize: '0.9rem',
    },
  },
};

export default FAQ;
