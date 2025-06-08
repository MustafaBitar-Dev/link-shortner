import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import 'antd/dist/reset.css';
import './App.css';
import SignupPage from './pages/Signup';
import LoginPage from './pages/Login';
import Dashboard from './pages/Dashboard';
import TopBar from './components/TopBar';
import LinkInfoPage from './pages/LinkInfo';

function App() {
  return (
    
    <Router>
      <TopBar />
      <Routes>
        
        <Route path="/" element={<Home />} />

        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />

        <Route path="/dashboard" element={<Dashboard />}/>
        <Route path="/info/:linkId" element={<LinkInfoPage />} />
      </Routes>
    </Router>
  );
}

export default App;
