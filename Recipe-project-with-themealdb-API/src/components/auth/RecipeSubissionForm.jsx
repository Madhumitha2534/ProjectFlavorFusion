import React, { useState } from 'react';
import styled from 'styled-components';
import jsPDF from 'jspdf';
import logo from '../../assets/logo1.png';
import { useNavigate, useLocation } from 'react-router-dom';

// Dummy data for cardData
const cardData = [
  {
    venue: "Green Park Pavilion",
    date: "August 15, 2024",
    time: "10:00 AM",
  },
  {
    venue: "Downtown Community Center",
    date: "August 22, 2024",
    time: "11:00 AM",
  },
  {
    venue: "City Culinary Institute",
    date: "August 29, 2024",
    time: "1:00 PM",
  }
];

const RecipeContestApplication = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    participantName: '',
    address: '',
    phoneNumber: '',
    recipeName: '',
    recipeDescription: '',
  });
  const contestIndex = location.state?.contestIndex;
  const contestName = location.state?.contestName; // Get the contest name from location

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Proceed with registration
      const registerResponse = await fetch('http://localhost:8080/api/registrations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contestName: contestName,
          participantName: formData.participantName,
          phoneNumber: formData.phoneNumber,
          address: formData.address,
          recipeName: formData.recipeName,
          recipeDescription: formData.recipeDescription,
        }),
      });

      if (!registerResponse.ok) {
        const errorMessage = await registerResponse.text();
        throw new Error(errorMessage);
      }

      // Generate PDF if registration is successful
      const doc = new jsPDF();
      const img = new Image();
      img.src = logo;

      img.onload = () => {
        doc.addImage(img, 'JPEG', 10, 10, 50, 30);
        doc.setFontSize(18);
        doc.setFont('helvetica', 'bold');
        doc.text('FlavorFusion Recipe Contest', 70, 25);

        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        doc.text('Important Instructions:', 10, 50);

        if (contestIndex !== undefined && cardData[contestIndex]) {
          const contest = cardData[contestIndex];
          doc.setFontSize(10);
          doc.text(`1. Venue: ${contest.venue}`, 10, 60);
          doc.text(`2. Date & Time: ${contest.date} at ${contest.time}`, 10, 70);
          doc.text('3. Be punctual. Arrive at least 15 minutes early.', 10, 80);
          doc.text('4. Bring this printed form with you. It is required for entry.', 10, 90);
          doc.text('5. Follow all contest rules and guidelines as provided.', 10, 100);
        } else {
          doc.text('1. Venue: [Contest Venue Address]', 10, 60);
          doc.text('2. Date & Time: [Contest Date & Time]', 10, 70);
        }

        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.text('Participant Details:', 10, 120);
        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        doc.text(`Name: ${formData.participantName}`, 10, 140);
        doc.text(`Address: ${formData.address}`, 10, 150);
        doc.text(`Phone Number: ${formData.phoneNumber}`, 10, 160);

        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.text('Recipe Details:', 10, 180);
        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        doc.text(`Recipe Name: ${formData.recipeName}`, 10, 200);

        const splitDescription = doc.splitTextToSize(formData.recipeDescription, 180);
        doc.text(splitDescription, 10, 210);

        doc.save('contest-registration.pdf');

        navigate('/form');
      };

      img.onerror = (err) => {
        console.error('Error loading the logo image:', err);
      };

    } catch (error) {
      console.error('Error submitting registration:', error);
      alert(error.message || 'An error occurred. Please try again.');
    }
  };

  const handleBackToHome = () => {
    navigate('/home');
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Label>Contest Name:</Label>
        <Input type="text" value={contestName} readOnly /> {/* Display contest name */}
        
        <Label>Participant Name:</Label>
        <Input type="text" name="participantName" value={formData.participantName} onChange={handleChange} required />

        <Label>Address:</Label>
        <Input type="text" name="address" value={formData.address} onChange={handleChange} required />

        <Label>Phone Number:</Label>
        <Input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />

        <Label>Recipe Name:</Label>
        <Input type="text" name="recipeName" value={formData.recipeName} onChange={handleChange} required />

        <Label>Recipe Description:</Label>
        <TextArea name="recipeDescription" value={formData.recipeDescription} onChange={handleChange} required />

        <ButtonContainer>
          <SubmitButton type="submit">Generate PDF</SubmitButton>
          <BackButton type="button" onClick={handleBackToHome}>Back to Home</BackButton>
        </ButtonContainer>
      </Form>
    </Container>
  );
};

// Styled components
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f4f4f4;
`;

const Form = styled.form`
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 600px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  margin-bottom: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  min-height: 100px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SubmitButton = styled.button`
  display: block;
  width: 48%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const BackButton = styled.button`
  display: block;
  width: 48%;
  padding: 10px;
  background-color: #6c757d;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #5a6268;
  }
`;

export default RecipeContestApplication;
