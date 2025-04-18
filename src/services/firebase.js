// src/services/firebase.js를 다음과 같이 수정
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// import { getAnalytics } from 'firebase/analytics';

// 개발 모드용 임시 구성
const firebaseConfig = {
  apiKey: "temp-api-key",
  authDomain: "temp-domain.firebaseapp.com",
  projectId: "temp-project",
  storageBucket: "temp-bucket.appspot.com",
  messagingSenderId: "000000000000",
  appId: "temp-app-id",
  measurementId: "temp-measurement-id"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// const analytics = getAnalytics(app);  // 개발 중에는 주석 처리

// export { app, db, analytics };
export { app, db };

// 임시 데이터 (Firebase 연결 없이 테스트)
export const mockData = {
  feedbacks: [
    {
      id: "1",
      transformedContent: "발표 중에 목소리가 더 크면 좋겠어요. 내용은 명확하고 슬라이드도 잘 구성되어 있었습니다.",
      timestamp: new Date(),
      isAnonymous: true
    },
    {
      id: "2",
      transformedContent: "코드 리뷰 시간에 다른 크루들의 의견도 더 물어보면 좋겠어요. 당신의 코드 구현 능력은 뛰어납니다.",
      timestamp: new Date(Date.now() - 86400000), // 1일 전
      isAnonymous: true
    }
  ]
};