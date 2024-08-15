import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import { FaMapMarkerAlt, FaClock, FaCalendarAlt, FaCalendarDay } from 'react-icons/fa';
import c1 from '../../assets/comp1.jpg';
import c2 from '../../assets/c2.jpg';
import c3 from '../../assets/comp3.jpg';
import ConfirmationModal from './ConfirmationModal'; // Import the modal component

const RecipeContestPage = () => {
  const [registered, setRegistered] = useState({});
  const [timeLeft, setTimeLeft] = useState({});
  const [selectedContest, setSelectedContest] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleRegister = (contest) => {
    if (registered[contest.title]) {
      alert('You are already registered for this contest.');
      return;
    }
    setSelectedContest(contest);
    setIsModalOpen(true);
  };
  
  

  const confirmRegistration = () => {
    if (selectedContest) {
      setRegistered((prev) => ({
        ...prev,
        [selectedContest.title]: true,
      }));
      setIsModalOpen(false);
    }
  };
  

  const rejectRegistration = () => {
    setSelectedContest(null);
    setIsModalOpen(false);
  };

  const handleUnregister = (contest) => {
    const confirmUnregister = window.confirm("Are you sure you want to unregister?");
    if (confirmUnregister) {
      setRegistered(prev => ({ ...prev, [contest.title]: false }));
    }
  };

  const handleDownloadPdf = (contest, index) => {
    if (registered[contest.title]) {
      navigate('/form', { state: { contestIndex: index, contestName: contest.title } });
    } else {
      alert('You need to register first to download the PDF.');
    }
  };
  
  

  const cardData = [
    {
      title: "SUMMER CONTEST",
      text: "Dive into summer with our exciting contest! Showcase your best seasonal recipes featuring vibrant produce, refreshing flavors, and creative techniques. From crisp salads and cooling beverages to light, no-cook dishes, this is your chance to shine and win amazing prizes.",
      img: c1,
      venue: "Green Park Pavilion",
      time: "10:00 AM",
      date: "August 15, 2024",
      deadline: "2024-08-10T23:59:59"
    },
    {
      title: "FIRELESS COOKING CHALLENGE",
      text: "Get creative without the heat! This challenge focuses on dishes that require no cooking. Perfect for showcasing your raw ingredients, fresh flavors, and inventive techniques. Impress the judges with your best no-cook recipes!",
      img: c2,
      venue: "Downtown Community Center",
      time: "11:00 AM",
      date: "August 22, 2024",
      deadline: "2024-08-17T23:59:59"
    },
    {
      title: "COOK WITH COMALI",
      text: "Join us for an exciting event where you cook alongside renowned chefs from Comali. Learn new techniques, get inspired, and compete in this hands-on cooking challenge. Perfect for all skill levels and an opportunity to enhance your culinary skills!",
      img: c3,
      venue: "City Culinary Institute",
      time: "1:00 PM",
      date: "August 29, 2024",
      deadline: "2024-08-24T23:59:59"
    }
  ];

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const updatedTimeLeft = {};

      cardData.forEach((card, index) => {
        const deadline = new Date(card.deadline);
        const timeRemaining = deadline - now;

        if (timeRemaining <= 0) {
          updatedTimeLeft[index] = { days: 0, hours: 0, minutes: 0, seconds: 0 };
        } else {
          const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
          const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
          updatedTimeLeft[index] = { days, hours, minutes, seconds };
        }
      });

      setTimeLeft(updatedTimeLeft);
    };

    updateTimer(); // Initial call to set the timer immediately
    const timerInterval = setInterval(updateTimer, 1000); // Update timer every second

    return () => clearInterval(timerInterval); // Cleanup interval on component unmount
  }, [cardData]);

  return (
    <>
      <GlobalStyle />
      <Main>
        <Header>Join the Contest!</Header>
        <Cards>
          {cardData.map((card, index) => (
            <CardsItem key={index}>
              <Card>
                <CardImage>
                  <img src={card.img} alt={card.title} />
                </CardImage>
                <CardContent>
                  <CardTitle>{card.title}</CardTitle>
                  <CardText>{card.text}</CardText>
                  <Details>
                    <DetailItem>
                      <FaMapMarkerAlt />
                      <DetailText>{card.venue}</DetailText>
                    </DetailItem>
                    <DetailItem>
                      <FaClock />
                      <DetailText>{card.time}</DetailText>
                    </DetailItem>
                    <DetailItem>
                      <FaCalendarAlt />
                      <DetailText>{card.date}</DetailText>
                    </DetailItem>
                    <DetailItem>
                      <FaCalendarDay />
                      <DetailText>Deadline: {card.deadline.split('T')[0]}</DetailText>
                    </DetailItem>
                  </Details>
                  {timeLeft[index] && (
                    <TimerButton>
                      {`${timeLeft[index].days}d ${timeLeft[index].hours}h ${timeLeft[index].minutes}m ${timeLeft[index].seconds}s`}
                    </TimerButton>
                  )}
                  {registered[card.title] ? (
                    <>
                      <RegisteredText>Registered</RegisteredText>
                      <UnregisterButton onClick={() => handleUnregister(card)}>
                        Unregister
                      </UnregisterButton>
                      <DownloadButton onClick={() => handleDownloadPdf(card, index)}>
  Download PDF
</DownloadButton>

                    </>
                  ) : (
                    <RegisterButton onClick={() => handleRegister(card)}>
                      Register Now
                    </RegisterButton>
                  )}
                </CardContent>
              </Card>
            </CardsItem>
          ))}
        </Cards>
        <ConfirmationModal
          isOpen={isModalOpen}
          onConfirm={confirmRegistration}
          onReject={rejectRegistration}
        />
      </Main>
    </>
  );
};

export default RecipeContestPage;

const GlobalStyle = createGlobalStyle`
  body {
    font-family: monospace;
    background: #eee;
  }

  html {
    font-size: 15px;
  }
`;

const Main = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  color: #ff6f00; /* Bright orange */
  font-size: 2.5rem;
  font-weight: 600;
`;

const Cards = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  list-style: none;
  margin: 0;
  padding: 0;
`;

const CardsItem = styled.li`
  display: flex;
  padding: 1rem;
  align-items: flex-start; /* Align items to start for consistent height */
`;

const Card = styled.div`
  background-color: white;
  border-radius: 0.25rem;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding-left: 30px;
  background: repeating-linear-gradient(#0000 0 calc(1.2rem - 1px), #66afe1 0 1.2rem) right bottom / 100% 100%, linear-gradient(red 0 0) 30px 0 / 2px 100% #fff;
  background-repeat: no-repeat;
  line-height: 1.2rem;
  -webkit-mask: radial-gradient(circle .8rem at 2px 50%, #0000 98%, #000) 0 0 / 100% 2.4rem;
  filter: drop-shadow(0 0 5px rgba(0, 0, 0, 0.25));
`;

const CardImage = styled.div`
  height: 200px; /* Consistent height for all images */
  padding: 1.2rem 1.2rem 0;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &:before,
  &:after {
    content: "";
    position: absolute;
    width: 20px;
    left: 60%;
    top: 0;
    height: 45px;
    background: #e6e6e6b8;
    transform: rotate(45deg);
  }

  &:after {
    transform: rotate(-45deg);
    top: auto;
    bottom: -22px;
    left: 40%;
  }
`;

const CardContent = styled.div`
  padding: 1.2rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const CardTitle = styled.h3`
  margin: 0;
  font-size: 1.5rem;
  color: #ff6f00; /* Bright orange */
`;

const CardText = styled.p`
  font-size: 1rem;
  margin: 1rem 0;
  color: #333;
`;

const Details = styled.div`
  font-size: 0.9rem;
  color: #666;
  margin: 1rem 0;
`;

const DetailItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const DetailText = styled.span`
  margin-left: 0.5rem;
`;

const TimerButton = styled.div`
  background: #ff6f00; /* Bright orange */
  border: none;
  border-radius: 0.25rem;
  color: white;
  cursor: pointer;
  font-size: 1rem;
  margin: 1rem 0;
  padding: 0.5rem 1rem;
`;

const RegisterButton = styled.button`
  background: #28a745; /* Green */
  border: none;
  border-radius: 0.25rem;
  color: white;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 1rem;
  padding: 0.5rem 1rem;
`;

const UnregisterButton = styled.button`
  background: #d32f2f; /* Red */
  border: none;
  border-radius: 0.25rem;
  color: white;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 1rem;
  padding: 0.5rem 1rem;
`;

const DownloadButton = styled.button`
  background: #1976d2; /* Blue */
  border: none;
  border-radius: 0.25rem;
  color: white;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 1rem;
  padding: 0.5rem 1rem;
`;

const RegisteredText = styled.p`
  color: #007bff; /* Blue */
  font-size: 1rem;
  margin-top: 1rem;
`;
