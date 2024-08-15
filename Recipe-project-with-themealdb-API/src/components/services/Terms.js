import React from 'react';
import Navbar from '../navbar/Navbar';

const Terms = () => {
  return (
    <div>
      <Navbar />
      <style>
        {`
          .terms-container {
            padding: 20px;
            max-width: 800px;
            margin: 0 auto;
            font-family: Arial, sans-serif;
            line-height: 1.6;
            text-align: center;
            background-color: #fffaf0; /* Light orange background color for contrast */
            border-radius: 10px; /* Rounded corners for the box */
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* Subtle shadow for better visual appearance */
          }
          .terms-title {
            font-size: 2em;
            margin-bottom: 20px;
          }
          .terms-text {
            font-size: 1em;
            margin-top: 10px;
          }
          .terms-card {
            background-color: #fff5e1; /* Light orange color for the card */
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            padding: 20px;
            margin: 20px 0;
          }
          .terms-card-title {
            font-size: 1.5em;
            margin-top: 0;
          }
          .terms-card-text {
            font-size: 1em;
            margin-top: 10px;
          }
        `}
      </style>
      <div className="terms-container">
        <h2 className="terms-title">TERMS AND POLICIES</h2>
        <p className="terms-text">
          Welcome to our Recipe Sharing Platform. By using our service, you agree to the following terms and policies:
        </p>
        <div className="terms-card">
          <h3 className="terms-card-title">1. User Conduct</h3>
          <p className="terms-card-text">
            Users are expected to behave respectfully and responsibly. Any inappropriate behavior may result in a ban.
          </p>
        </div>
        <div className="terms-card">
          <h3 className="terms-card-title">2. Content Ownership</h3>
          <p className="terms-card-text">
            Users retain ownership of their content but grant us a license to display and distribute it on our platform.
          </p>
        </div>
        <div className="terms-card">
          <h3 className="terms-card-title">3. Privacy Policy</h3>
          <p className="terms-card-text">
            We value your privacy and will not share your personal information with third parties without your consent.
          </p>
        </div>
        <div className="terms-card">
          <h3 className="terms-card-title">4. Modifications to Terms</h3>
          <p className="terms-card-text">
            We reserve the right to modify these terms at any time. Users will be notified of any changes.
          </p>
        </div>
        <div className="terms-card">
          <h3 className="terms-card-title">5. Contact Information</h3>
          <p className="terms-card-text">
            If you have any questions or concerns, please contact us at support@recipes.com.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Terms;
