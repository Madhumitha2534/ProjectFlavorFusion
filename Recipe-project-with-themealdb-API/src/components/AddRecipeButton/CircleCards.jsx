import React from 'react';
import '@fortawesome/fontawesome-free/css/all.css';

const CircleCards = () => {
  const steps = [
    { icon: 'fa-pencil-alt', title: 'Step 1', descr: 'Register for the contest to participate and receive updates.' },
    { icon: 'fa-download', title: 'Step 2', descr: 'Download the contest form from our website.' },
    { icon: 'fa-check-circle', title: 'Step 3', descr: 'Attend the contest with a printed form and stand a chance to win exciting gifts!' },
  ];

  const styles = {
    container: {
      fontFamily: "'Exo 2', sans-serif",
      color: 'rgba(30, 30, 30)',
      background: 'rgba(245, 245, 245)',
      minHeight: '20vh',
      display: 'flex', // Use flexbox for container alignment
      flexDirection: 'column', // Stack children vertically
      alignItems: 'center',
      justifyContent: 'center',
      gap: '2rem',
      padding: '2rem',
    },
    h2: {
      textAlign: 'center',
      marginBottom: '2rem',
      fontSize: '2rem', // Adjust font size if needed
      fontWeight: 300, // Adjust font weight if needed
      color: '#333' // Adjust color if needed
    },
    ol: {
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'nowrap', // Prevent wrapping
      listStyle: 'none',
      padding: 0,
      margin: 0,
    },
    li: {
      width: '24rem', // Adjust width for the circles
      height: '24rem', // Adjust height for the circles
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '2rem',
      borderRadius: '50%',
      border: '3rem solid rgba(245, 245, 245)', // Grey border
      backgroundColor: '#f0f0f0', // Grey background
      boxSizing: 'border-box', // Include border in element's total width and height
      margin: '0 1rem', // Add margin between circles
    },
    icon: {
      fontSize: '3rem', // Increased icon size
      color: '#666', // Grey color for icon
    },
    title: {
      fontSize: '2rem',
      fontWeight: 500,
      margin: '1rem 0 0.5rem', // Adjusted margin
    },
    descr: {
      fontSize: '1rem',
      fontWeight: 300,
      textAlign: 'center', // Center description text
    },
  };

  const accentColors = ['#b8df4e', '#4cbccb', '#7197d3'];

  return (
    <div style={styles.container}>
      <h2 style={styles.h2}>Contest Steps</h2>
      <ol style={styles.ol}>
        {steps.map((step, index) => (
          <li key={index} style={{ ...styles.li, backgroundColor: accentColors[index % accentColors.length] }}>
            <div className="icon" style={styles.icon}>
              <i className={`fas ${step.icon}`}></i>
            </div>
            <div className="title" style={styles.title}>{step.title}</div>
            <div className="descr" style={styles.descr}>{step.descr}</div>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default CircleCards;
