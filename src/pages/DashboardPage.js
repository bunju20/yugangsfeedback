import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/layout/Header';
import PageContainer from '../components/layout/PageContainer';
import FeedbackList from '../components/feedback/FeedbackList';
import AISummary from '../components/dashboard/AISummary';
import Button from '../components/common/Button';

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
        // 로딩 시뮬레이션
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // 모의 데이터
        setUserId("FE_분주");
        
        // 모의 피드백 데이터
        setFeedbacks([
          {
            id: "1",
            transformedContent: "발표 중에 목소리가 더 크면 좋겠어요. 내용은 명확하고 슬라이드도 잘 구성되어 있었습니다.",
            timestamp: new Date(),
          },
          {
            id: "2",
            transformedContent: "코드 리뷰 시간에 다른 크루들의 의견도 더 물어보면 좋겠어요. 당신의 코드 구현 능력은 뛰어납니다.",
            timestamp: new Date(Date.now() - 86400000), // 1일 전
          },
          {
            id: "3",
            transformedContent: "페어 프로그래밍 시 의사소통이 명확합니다. 가끔은 페어의 의견을 좀 더 기다려주면 좋을 것 같아요.",
            timestamp: new Date(Date.now() - 86400000 * 2), // 2일 전
          }
        ]);
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('데이터를 불러오는 중 오류가 발생했습니다.');
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
    navigate('/');
    // 메인 페이지로 이동하며 코드 생성 모달을 바로 표시할 방법을 찾아볼 수 있음
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