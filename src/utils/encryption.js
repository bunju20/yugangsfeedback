// 피드백 원본 내용 암호화를 위한 유틸리티 함수입니다.
// 실제 프로젝트에서는 적절한 암호화 키 관리가 필요합니다.

// 간단한 암호화 함수 (Web Crypto API 사용)
export const encryptContent = async (content) => {
  try {
    // 실제 암호화 구현 (보안이 중요한 경우)
    /*
    // 암호화 키 생성 또는 가져오기
    const keyMaterial = await window.crypto.subtle.importKey(
      'raw',
      new TextEncoder().encode(process.env.REACT_APP_ENCRYPTION_KEY),
      { name: 'PBKDF2' },
      false,
      ['deriveBits', 'deriveKey']
    );
    
    // 암호화 키 생성
    const key = await window.crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt: new TextEncoder().encode('salt'),
        iterations: 100000,
        hash: 'SHA-256'
      },
      keyMaterial,
      { name: 'AES-GCM', length: 256 },
      false,
      ['encrypt']
    );
    
    // 초기화 벡터 생성
    const iv = window.crypto.getRandomValues(new Uint8Array(12));
    
    // 데이터 암호화
    const encrypted = await window.crypto.subtle.encrypt(
      {
        name: 'AES-GCM',
        iv
      },
      key,
      new TextEncoder().encode(content)
    );
    
    // 암호화된 데이터와 IV 직렬화
    const encryptedArray = new Uint8Array(encrypted);
    const result = new Uint8Array(iv.length + encryptedArray.length);
    result.set(iv);
    result.set(encryptedArray, iv.length);
    
    // Base64로 인코딩하여 문자열로 변환
    return btoa(String.fromCharCode.apply(null, result));
    */
    
    // 개발용 간단 암호화 (Base64 인코딩만 적용)
    // 실제 구현에서는 이 방법을 사용하지 마세요!
    return btoa(content);
  } catch (error) {
    console.error('Error encrypting content:', error);
    // 암호화에 실패하면 원본 반환 (테스트용)
    return content;
  }
};
