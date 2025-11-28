import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage.jsx';
import HowToUse from './pages/HowToUse.jsx';
import LoginPage from './pages/LoginPage.jsx';
import MarketplacePage from './pages/MarketplacePage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import PricingPage from './pages/PricingPage.jsx';
import Chatbot from './components/Chatbot.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { WalletProvider } from './context/WalletContext.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

import ScrollToTop from './components/ScrollToTop.jsx';

function App() {
  return (
    <AuthProvider>
      <WalletProvider>
        <Router>
          <ScrollToTop />
          <Chatbot />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/marketplace" element={<MarketplacePage />} />
            <Route path="/how-to-use" element={<HowToUse />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </WalletProvider>
    </AuthProvider>
  );
}

export default App;
