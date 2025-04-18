import React from 'react';

const PageContainer = ({ children }) => {
  return (
    <main className="max-w-5xl mx-auto p-4">
      {children}
    </main>
  );
};

export default PageContainer;