import React, { useEffect, useState } from 'react';
import { analyzeFeedbacks } from '../../services/aiService';

const AISummary = ({ feedbacks }) => {
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState(null);
  
  useEffect(() => {
    const generateSummary = async () => {
      if (feedbacks.length < 2) {
        // Don't generate summary for less than 2 feedbacks
        return;
      }
      
      setLoading(true);
      try {
        const analysisResult = await analyzeFeedbacks(feedbacks);
        setSummary(analysisResult);
      } catch (error) {
        console.error('Error analyzing feedbacks:', error);
      } finally {
        setLoading(false);
      }
    };
    
    generateSummary();
  }, [feedbacks]);
  
  if (feedbacks.length < 2) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <h2 className="text-base font-semibold text-gray-800 mb-2">
          AI 피드백 분석
        </h2>
        <p className="text-gray-600 text-sm">
          피드백이 2개 이상 모이면 AI가 자동으로 분석하여 표시합니다.
        </p>
      </div>
    );
  }
  
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <h2 className="text-base font-semibold text-gray-800 mb-2">
          AI 피드백 분석
        </h2>
        <p className="text-gray-600 text-sm">분석 중...</p>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 relative overflow-hidden">
      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#2ABBB6] rounded-l"></div>
      <div className="pl-2">
        <h2 className="text-base font-semibold text-gray-800 mb-2">
          AI 피드백 분석
        </h2>
        
        {summary ? (
          <div className="space-y-2">
            {summary.strengths && (
              <p className="text-gray-700 text-sm">
                <span className="font-medium">주요 강점:</span> {summary.strengths}
              </p>
            )}
            
            {summary.improvements && (
              <p className="text-gray-700 text-sm">
                <span className="font-medium">개선 영역:</span> {summary.improvements}
              </p>
            )}
          </div>
        ) : (
          <p className="text-gray-600 text-sm">
            현재까지 받은 피드백: {feedbacks.length}개
          </p>
        )}
      </div>
    </div>
  );
};

export default AISummary;
