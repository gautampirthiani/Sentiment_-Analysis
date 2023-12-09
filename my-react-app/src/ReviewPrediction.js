import React, { useState } from 'react';
import './ReviewPrediction.css'; // You can create a CSS file for styling

const ReviewPrediction = () => {
  const [reviewText, setReviewText] = useState('');
  const [predictedSentiment, setPredictedSentiment] = useState(null);
  const [error, setError] = useState(null);

  const handleReviewSubmit = async () => {
    try {
      const response = await fetch('http://localhost:8000/predict/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: reviewText }),
      });

      if (response.ok) {
        const result = await response.json();
        setPredictedSentiment(result.sentiment);
        setError(null);
      } else {
        throw new Error('Failed to fetch prediction');
      }
    } catch (err) {
      console.error(err.message);
      setError(err.message);
    }
  };

  return (
    <div className="review-prediction-container">
      <div className="review-prediction-header">
        <h1>Review Prediction</h1>
      </div>
      <div className="review-input-container">
        <textarea
          placeholder="Enter your review..."
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
        />
        <button onClick={handleReviewSubmit}>Predict</button>
      </div>
      {predictedSentiment !== null && (
        <div className="prediction-result">
          <p>Predicted Sentiment: {predictedSentiment}</p>
        </div>
      )}
      {error && (
        <div className="error-message">
          <p>Error: {error}</p>
        </div>
      )}
    </div>
  );
};

export default ReviewPrediction;
