import React, { useState } from 'react';
import Button from '../common/Button';
import Toggle from '../common/Toggle';

// 모킹 AI 변환 함수
const mockTransformWithAI = async (text) => {
  await new Promise(resolve => setTimeout(resolve, 1500));
  return `AI 변환 버전: ${text} (더 건설적이고 긍정적인 표현으로 변환되었습니다)`;
};

const FeedbackForm = ({ onSubmit }) => {
  const [originalContent, setOriginalContent] = useState('');
  const [transformedContent, setTransformedContent] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleContentChange = (e) => {
    setOriginalContent(e.target.value);
    // Reset transformed content when original changes
    setTransformedContent('');
  };
  
  const handleTransformClick = async () => {
    if (!originalContent.trim()) return;
    
    setIsLoading(true);
    try {
      const transformed = await mockTransformWithAI(originalContent);
      setTransformedContent(transformed);
    } catch (error) {
      console.error('Error transforming feedback:', error);
      alert('피드백 변환 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!originalContent.trim()) return;
    
    onSubmit({
      originalContent,
      transformedContent: transformedContent || originalContent,
      isAnonymous
    });
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          피드백 내용
        </label>
        <textarea
          value={originalContent}
          onChange={handleContentChange}
          placeholder="피드백을 작성해주세요..."
          className="w-full p-3 bg-gray-50 border border-gray-200 rounded-md min-h-[120px] focus:outline-none focus:ring-1 focus:ring-[#2ABBB6]"
          required
        />
        {originalContent.trim() && !transformedContent && (
          <div className="mt-2 text-right">
            <button
              type="button"
              onClick={handleTransformClick}
              className="text-sm text-[#2ABBB6] hover:underline"
              disabled={isLoading}
            >
              {isLoading ? '변환 중...' : 'AI로 변환하기'}
            </button>
          </div>
        )}
      </div>
      
      {transformedContent && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            AI 변환 결과
          </label>
          <div className="w-full p-3 bg-gray-50 border border-gray-200 rounded-md min-h-[80px]">
            {transformedContent}
          </div>
        </div>
      )}
      
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <Toggle
            checked={isAnonymous}
            onChange={() => setIsAnonymous(!isAnonymous)}
          />
          <span className="ml-2 text-gray-600 text-sm">익명으로 보내기</span>
        </div>
        
        <Button primary type="submit">피드백 전송</Button>
      </div>
    </form>
  );
};

export default FeedbackForm;