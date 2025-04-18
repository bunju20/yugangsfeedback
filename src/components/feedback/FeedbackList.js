import React from 'react';
import FeedbackCard from './FeedbackCard';

const FeedbackList = ({ feedbacks }) => {
  // Sort feedbacks by timestamp (newest first)
  const sortedFeedbacks = [...feedbacks].sort((a, b) => {
    const dateA = a.timestamp?.toDate?.() || new Date(a.timestamp);
    const dateB = b.timestamp?.toDate?.() || new Date(b.timestamp);
    return dateB - dateA;
  });
  
  return (
    <div className="space-y-4">
      {sortedFeedbacks.map((feedback) => (
        <FeedbackCard 
          key={feedback.id} 
          feedback={feedback} 
        />
      ))}
    </div>
  );
};

export default FeedbackList;
