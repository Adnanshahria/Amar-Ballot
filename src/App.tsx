import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import VoteCenter from './pages/VoteCenter';
import CandidateList from './pages/CandidateList';
import SignUp from './pages/SignUp';
import Status from './pages/Status';
import VideoTutorials from './pages/VideoTutorials';
import AboutUs from './pages/AboutUs';
import Services from './pages/Services';
import ContactUs from './pages/ContactUs';
import Chat from './pages/Chat';
import Placeholder from './pages/Placeholder';
import NavigationMap from './components/NavigationMap';
import './index.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col relative">
        {/* Background Image */}
        <div className="bg-nirbachon"></div>

        {/* Green Overlay */}
        <div className="green-overlay"></div>

        {/* Base gradient background */}
        <div className="fixed inset-0 -z-2 bg-gradient-to-br from-green-50/80 via-white/90 to-green-100/80"></div>

        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/vote-center" element={<VoteCenter />} />
          <Route path="/candidate-list" element={<CandidateList />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/status" element={<Status />} />
          <Route path="/video-tutorials" element={<VideoTutorials />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="*" element={<Placeholder />} />
        </Routes>

        {/* Navigation Map Floating Button */}
        <NavigationMap />
      </div>
    </Router>
  );
}

export default App;
