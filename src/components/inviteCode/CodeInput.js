import React, { useState } from 'react';
import Button from '../common/Button';

const CodeInput = ({ onSubmit }) => {
  const [code, setCode] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (code.trim()) {
      onSubmit(code.trim());
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="초대 코드를 입력하세요"
        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#2ABBB6]"
        required
      />
      <Button primary type="submit">입장</Button>
    </form>
  );
};

export default CodeInput;
