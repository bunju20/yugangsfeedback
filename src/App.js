import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import FeedbackPage from './pages/FeedbackPage';
import DashboardPage from './pages/DashboardPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/feedback/:codeId" element={<FeedbackPage />} />
        <Route path="/dashboard/:codeId" element={<DashboardPage />} />
      </Routes>
    </Router>
  );
}

export default App;