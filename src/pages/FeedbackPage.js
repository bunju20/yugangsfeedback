import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/layout/Header';
import PageContainer from '../components/layout/PageContainer';
import FeedbackForm from '../components/feedback/FeedbackForm';

const FeedbackPage = () => {
  const { codeId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [recipient, setRecipient] = useState(null);
  
  useEffect(() => {
    // 모킹 데이터로 대체
    const fetchData = async () => {
      try {
        // 로딩 시뮬레이션
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // 모의 데이터
        if (codeId) {
          setRecipient(`FE_분주`);
          setLoading(false);
        } else {
          setError('유효하지 않은 초대 코드입니다.');
          setLoading(false);
        }
      } catch (err) {
        console.error('Error:', err);
        setError('데이터를 불러오는 중 오류가 발생했습니다.');
        setLoading(false);
      }
    };
    
    fetchData();
  }, [codeId]);
  
  const handleFeedbackSubmit = async (data) => {
    try {
      // 모의 제출 처리
      console.log('피드백 제출:', data);
      alert('피드백이 성공적으로 제출되었습니다.');
      navigate('/');
    } catch (err) {
      console.error('Error:', err);
      alert('피드백 제출 중 오류가 발생했습니다.');
    }
  };
  
  if (loading) {
    return (
      <>
        <Header />
        <PageContainer>
          <div className="text-center py-8">
            <p>로딩 중...</p>
          </div>
        </PageContainer>
      </>
    );
  }
  
  if (error) {
    return (
      <>
        <Header />
        <PageContainer>
          <div className="text-center py-8">
            <p className="text-red-500">{error}</p>
            <button
              onClick={() => navigate('/')}
              className="mt-4 text-[#2ABBB6] hover:underline"
            >
              메인으로 돌아가기
            </button>
          </div>
        </PageContainer>
      </>
    );
  }
  
  return (
    <>
      <Header />
      <PageContainer>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-[#2ABBB6] text-white px-4 py-3">
            <h1 className="text-lg font-semibold">
              {recipient}님에게 피드백 작성
            </h1>
          </div>
          
          <div className="p-4">
            <p className="text-gray-600 mb-4">
              솔직하고 건설적인 피드백을 작성해주세요. 
              AI가 자동으로 피드백을 전달하기 좋게 변환합니다.
            </p>
            
            <FeedbackForm onSubmit={handleFeedbackSubmit} />
          </div>
        </div>
      </PageContainer>
    </>
  );
};

export default FeedbackPage;