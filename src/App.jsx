import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage.jsx';
import HowToUse from './pages/HowToUse.jsx';
import LoginPage from './pages/LoginPage.jsx';
import MarketplacePage from './pages/MarketplacePage.jsx';
import Chatbot from './components/Chatbot.jsx';

function App() {
  return (
    <Router>
      <Chatbot />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/marketplace" element={<MarketplacePage />} />
        <Route path="/how-to-use" element={<HowToUse />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
