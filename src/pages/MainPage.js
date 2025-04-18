import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/layout/Header';
import PageContainer from '../components/layout/PageContainer';
import CodeInput from '../components/inviteCode/CodeInput';
import CodeGenerator from '../components/inviteCode/CodeGenerator';

const MainPage = () => {
  const navigate = useNavigate();
  const [showCodeGenerator, setShowCodeGenerator] = useState(false);
  
  const handleCodeSubmit = async (code) => {
    // 실제 검증 대신 가상 데이터 사용
    console.log("코드 입력됨:", code);
    navigate(`/feedback/${code}`);
  };
  
  return (
    <>
      <Header />
      <PageContainer>
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-800 mb-2">
            건설적인 피드백으로 함께 성장하기
          </h1>
          <p className="text-slate-600">
            우아한테크코스의 유연성 강화 스터디를 위한 익명 피드백 플랫폼입니다.
          </p>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <CodeInput onSubmit={handleCodeSubmit} />
          <div className="mt-2 flex justify-end">
            <button
              onClick={() => setShowCodeGenerator(true)}
              className="text-[#2ABBB6] font-semibold hover:text-opacity-80"
            >
              코드 생성하기
            </button>
          </div>
        </div>
        
        {showCodeGenerator && (
          <CodeGenerator 
            onClose={() => setShowCodeGenerator(false)}
            onSuccess={(code) => navigate(`/dashboard/${code}`)}
          />
        )}
      </PageContainer>
    </>
  );
};

export default MainPage;