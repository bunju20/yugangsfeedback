import React from 'react';

const FeedbackCard = ({ feedback }) => {
  const { transformedContent, timestamp } = feedback;
  
  // Format date
  const formatDate = (timestamp) => {
    if (!timestamp) return '';
    
    const date = timestamp instanceof Date ? timestamp : new Date(timestamp);
    return new Intl.DateTimeFormat('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-4 relative">
      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#2ABBB6] rounded-l"></div>
      <div className="pl-4 pr-4 pt-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-base font-semibold text-gray-800">
            익명의 피드백
          </h3>
          <span className="text-sm text-gray-500">
            {formatDate(timestamp)}
          </span>
        </div>
        
        <div className="bg-gray-50 p-3 rounded-md mb-3">
          <p className="text-gray-700">{transformedContent}</p>
        </div>
        
        <div className="text-right pb-3">
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-teal-50 text-[#2ABBB6]">
            AI 변환됨
          </span>
        </div>
      </div>
    </div>
  );
};

export default FeedbackCard;