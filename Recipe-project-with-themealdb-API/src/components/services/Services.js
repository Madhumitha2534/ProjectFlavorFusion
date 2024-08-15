import React from 'react';
import Navbar from '../navbar/Navbar';

const Services = () => {
  return (
    <div>
        <Navbar />
        <div style={styles.container}>
          <h2 style={styles.title}>Our Services</h2>
          <p style={styles.text}>
            Share your favorite recipes with a community of food enthusiasts.
          </p>
          <p style={styles.text}>
            Get personalized recipe recommendations based on your preferences.
          </p>
          <p style={styles.text}>
            Discover cooking tips and tricks from experts to improve your culinary skills.
          </p>
          <p style={styles.text}>
            Engage with other users through comments, ratings, and discussions.
          </p>
          <p style={styles.text}>
            Save your favorite recipes and organize them into collections for easy access.
          </p>
        </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '30px',
    background: 'linear-gradient(135deg, #f5f7fa, #c3cfe2)',
    borderRadius: '15px',
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
    maxWidth: '800px',
    margin: '20px auto',
    transition: 'transform 0.3s, box-shadow 0.3s',
    cursor: 'pointer',
  },
  containerHover: {
    transform: 'scale(1.05)',
    boxShadow: '0 15px 25px rgba(0, 0, 0, 0.3)',
  },
  title: {
    fontSize: '2.5em',
    marginBottom: '20px',
    color: '#ffa500', // Orange color for "Our Services"
    textAlign: 'center',
    fontWeight: 'bold',
  },
  text: {
    fontSize: '1.2em',
    marginTop: '15px',
    color: '#333',
    lineHeight: '1.8',
    textAlign: 'justify',
  },
};

// Applying hover effects using React hooks
const useHover = () => {
  const [hovered, setHovered] = React.useState(false);

  const eventHandlers = React.useMemo(() => ({
    onMouseOver() {
      setHovered(true);
    },
    onMouseOut() {
      setHovered(false);
    },
  }), []);

  return [hovered, eventHandlers];
};

const HoverableContainer = (props) => {
  const [hovered, eventHandlers] = useHover();

  return (
    <div
      style={{ ...styles.container, ...(hovered && styles.containerHover) }}
      {...eventHandlers}
    >
      {props.children}
    </div>
  );
};

const ServicesWithHover = () => {
  return (
    <div>
        <Navbar />
        <HoverableContainer>
          <h2 style={styles.title}>Our Services</h2>
          <p style={styles.text}>
            Share your favorite recipes with a community of food enthusiasts.
          </p>
          <p style={styles.text}>
            Get personalized recipe recommendations based on your preferences.
          </p>
          <p style={styles.text}>
            Discover cooking tips and tricks from experts to improve your culinary skills.
          </p>
          <p style={styles.text}>
            Engage with other users through comments, ratings, and discussions.
          </p>
          <p style={styles.text}>
            Save your favorite recipes and organize them into collections for easy access.
          </p>
        </HoverableContainer>
    </div>
  );
};

export default ServicesWithHover;
