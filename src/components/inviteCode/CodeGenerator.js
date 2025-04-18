import React, { useState } from 'react';
import Modal from '../common/Modal';
import Button from '../common/Button';
import { generateInviteCode } from '../../services/codeService';

const CodeGenerator = ({ onClose, onSuccess }) => {
  const [userType, setUserType] = useState('FE');
  const [nickname, setNickname] = useState('');
  const [loading, setLoading] = useState(false);
  const [generatedCode, setGeneratedCode] = useState(null);
  
  const handleGenerateCode = async (e) => {
    e.preventDefault();
    if (!nickname.trim()) return;
    
    setLoading(true);
    try {
      const userId = `${userType}_${nickname}`;
      const code = await generateInviteCode(userId);
      setGeneratedCode(code);
      if (onSuccess) onSuccess(code);
    } catch (error) {
      console.error('Error generating code:', error);
      alert('코드 생성 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };
  
  const handleCopyCode = () => {
    navigator.clipboard.writeText(generatedCode);
    alert('코드가 클립보드에 복사되었습니다.');
  };
  
  return (
    <Modal title="새 초대 코드 생성" onClose={onClose}>
      {!generatedCode ? (
        <form onSubmit={handleGenerateCode} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-700 mb-1">직군</label>
            <div className="flex gap-2 bg-gray-50 p-2 rounded-md">
              {['FE', 'BE', 'AN'].map((type) => (
                <button
                  key={type}
                  type="button"
                  className={`px-3 py-1 rounded-md ${
                    userType === type 
                      ? 'bg-[#2ABBB6] text-white' 
                      : 'bg-gray-50 text-gray-700'
                  }`}
                  onClick={() => setUserType(type)}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-sm text-gray-700 mb-1">닉네임</label>
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="닉네임을 입력하세요"
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#2ABBB6]"
              required
            />
          </div>
          
          <Button 
            primary 
            type="submit" 
            className="w-full" 
            disabled={loading}
          >
            {loading ? '생성 중...' : '생성하기'}
          </Button>
        </form>
      ) : (
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">{userType}_{nickname}님의 초대 코드</h3>
            <div className="bg-gray-50 p-4 text-center rounded-md border border-gray-200">
              <span className="text-xl font-bold">{generatedCode}</span>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              이 코드는 48시간 동안 유효합니다.
            </p>
          </div>
          
          <div className="flex gap-2">
            <Button onClick={handleCopyCode} primary className="flex-1">
              코드 복사
            </Button>
            <Button 
              onClick={() => onSuccess(generatedCode)} 
              className="flex-1"
            >
              피드백 확인하기
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default CodeGenerator;
