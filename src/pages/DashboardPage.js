import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/layout/Header';
import PageContainer from '../components/layout/PageContainer';
import FeedbackList from '../components/feedback/FeedbackList';
import AISummary from '../components/dashboard/AISummary';
import Button from '../components/common/Button';
import { getInviteCodeInfo } from '../services/codeService';
import { getFeedbacksByCode } from '../services/feedbackService';

const DashboardPage = () => {
  const { codeId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState('');
  const [feedbacks, setFeedbacks] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch code info
        const codeInfo = await getInviteCodeInfo(codeId);
        if (!codeInfo) {
          setError('유효하지 않은 초대 코드입니다.');
          return;
        }
        
        setUserId(codeInfo.userId);
        
        // Fetch feedbacks
        const feedbackList = await getFeedbacksByCode(codeId);
        setFeedbacks(feedbackList);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('데이터를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [codeId]);
  
  const handleCopyCode = () => {
    navigator.clipboard.writeText(codeId);
    alert('초대 코드가 클립보드에 복사되었습니다.');
  };
  
  const handleCreateNewCode = () => {
    // Extract user type and nickname from userId (e.g., FE_분주)
    const [userType, nickname] = userId.split('_');
    navigate('/', { state: { showCodeGenerator: true, userType, nickname } });
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
      <div className="bg-gray-50 min-h-screen">
        <div className="border-b border-gray-200 bg-white">
          <div className="max-w-5xl mx-auto px-4 py-3 flex justify-between items-center">
            <h1 className="text-lg font-semibold text-gray-800">
              {userId}님의 피드백
            </h1>
            <div className="text-sm text-gray-600">
              초대 코드: <span className="font-medium">{codeId}</span>
            </div>
          </div>
        </div>
        
        <PageContainer>
          <AISummary feedbacks={feedbacks} />
          
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              받은 피드백
            </h2>
            
            {feedbacks.length > 0 ? (
              <FeedbackList feedbacks={feedbacks} />
            ) : (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
                <p className="text-gray-500">아직 받은 피드백이 없습니다.</p>
                <p className="text-sm text-gray-500 mt-2">
                  초대 코드를 공유하여 피드백을 받아보세요.
                </p>
              </div>
            )}
          </div>
          
          <div className="mt-8 flex gap-4">
            <Button primary onClick={handleCreateNewCode}>
              새 초대 코드 생성
            </Button>
            <Button onClick={handleCopyCode}>
              코드 복사하기
            </Button>
          </div>
        </PageContainer>
      </div>
    </>
  );
};

export default DashboardPage;
