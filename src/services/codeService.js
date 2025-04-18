// src/services/codeService.js를 다음과 같이 수정
// 임시 개발용 코드

export const generateInviteCode = async (userId) => {
  // 임시 코드 생성
  const code = Math.random().toString(36).substring(2, 8).toUpperCase();
  console.log(`코드 생성됨: ${code} (${userId})`);
  return code;
};

export const verifyInviteCode = async (code) => {
  // 개발 모드에서는 모든 코드 허용
  return { valid: true, userId: "FE_분주" };
};

export const getInviteCodeInfo = async (code) => {
  // 개발용 임시 데이터 반환
  return {
    userId: "FE_분주",
    createdAt: new Date(),
    expiryDate: new Date(Date.now() + 48 * 3600 * 1000),
    isActive: true,
    code
  };
};

export const getUserCodes = async (userId) => {
  // 개발용 임시 데이터 반환
  return [
    {
      code: "XYZ123",
      userId,
      createdAt: new Date(),
      expiryDate: new Date(Date.now() + 48 * 3600 * 1000),
      isActive: true
    }
  ];
};

// src/services/feedbackService.js에도 임시 구현 필요
// src/services/aiService.js에도 임시 구현 필요