import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AdminContestSubmissions() {
    const [submissions, setSubmissions] = useState([]);

    useEffect(() => {
        fetchSubmissions();
    }, []);

    const fetchSubmissions = () => {
        axios.get('http://localhost:8080/api/registrations/all')
            .then(response => {
                setSubmissions(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the submissions!", error);
            });
    };

    const deleteSubmission = (id) => {
        axios.delete(`http://localhost:8080/api/registrations/${id}`)
            .then(response => {
                fetchSubmissions(); // Refresh the list after deletion
            })
            .catch(error => {
                console.error("There was an error deleting the submission!", error);
            });
    };

    const tableStyle = {
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: '20px',
    };

    const thTdStyle = {
        border: '1px solid #ddd',
        padding: '8px',
        textAlign: 'left',
    };

    const thStyle = {
        ...thTdStyle,
        backgroundColor: '#f2f2f2',
        fontWeight: 'bold',
    };

    const trStyle = {
        backgroundColor: '#f9f9f9',
    };

    const trHoverStyle = {
        backgroundColor: '#f1f1f1',
    };

    const headerStyle = {
        textAlign: 'center',
        color: '#333',
        marginBottom: '20px',
    };

    const buttonStyle = {
        backgroundColor: '#ff4d4d',
        color: 'white',
        border: 'none',
        padding: '5px 10px',
        cursor: 'pointer',
        borderRadius: '4px',
        transition: 'background-color 0.3s ease',
    };

    const buttonHoverStyle = {
        backgroundColor: '#ff1a1a',
    };

    const buttonFocusStyle = {
        outline: '2px solid #ff1a1a',
    };

    return (
        <div>
            <h1 style={headerStyle}>Admin Contest Submissions</h1>
            <table style={tableStyle}>
                <thead>
                    <tr>
                        <th style={thStyle}>ID</th>
                        <th style={thStyle}>Contest Name</th>
                        <th style={thStyle}>Participant Name</th>
                        <th style={thStyle}>Address</th>
                        <th style={thStyle}>Phone Number</th>
                        <th style={thStyle}>Recipe Name</th>
                        <th style={thStyle}>Recipe Description</th>
                        <th style={thStyle}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {submissions.map((submission, index) => (
                        <tr
                            key={submission.id}
                            style={index % 2 === 0 ? trStyle : null}
                            onMouseOver={(e) => e.currentTarget.style.backgroundColor = trHoverStyle.backgroundColor}
                            onMouseOut={(e) => e.currentTarget.style.backgroundColor = index % 2 === 0 ? trStyle.backgroundColor : null}
                        >
                            <td style={thTdStyle}>{submission.id}</td>
                            <td style={thTdStyle}>{submission.contestName}</td>
                            <td style={thTdStyle}>{submission.participantName}</td>
                            <td style={thTdStyle}>{submission.address}</td>
                            <td style={thTdStyle}>{submission.phoneNumber}</td>
                            <td style={thTdStyle}>{submission.recipeName}</td>
                            <td style={thTdStyle}>{submission.recipeDescription}</td>
                            <td style={thTdStyle}>
                                <button
                                    style={buttonStyle}
                                    onMouseOver={(e) => e.target.style.backgroundColor = buttonHoverStyle.backgroundColor}
                                    onMouseOut={(e) => e.target.style.backgroundColor = buttonStyle.backgroundColor}
                                    onFocus={(e) => e.target.style.outline = buttonFocusStyle.outline}
                                    onBlur={(e) => e.target.style.outline = 'none'}
                                    onClick={() => deleteSubmission(submission.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default AdminContestSubmissions;
