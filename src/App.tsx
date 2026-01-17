import Header from './components/Header';
import EligibilityCard from './components/EligibilityCard';
import AssistantAvatar from './components/AssistantAvatar';
import QuickLinks from './components/QuickLinks';
import EmergencyContacts from './components/EmergencyContacts';
import './index.css';

function App() {
  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Background Image */}
      <div className="bg-nirbachon"></div>

      {/* Green Overlay */}
      <div className="green-overlay"></div>

      {/* Base gradient background */}
      <div className="fixed inset-0 -z-2 bg-gradient-to-br from-green-50/80 via-white/90 to-green-100/80"></div>

      <Header />

      {/* Main Content - Full Width */}
      <main className="flex-1 w-full px-4 sm:px-8 lg:px-16 py-8 relative">


        {/* Hero Grid - Stretched */}
        <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-12 items-start">
          {/* Left Column - Eligibility Card */}
          <div className="lg:col-span-1">
            <EligibilityCard />
          </div>

          {/* Center Column - Assistant Avatar */}
          <div className="lg:col-span-1 flex justify-center">
            <AssistantAvatar />
          </div>

          {/* Right Column - Quick Links */}
          <div className="lg:col-span-1">
            <QuickLinks />
          </div>
        </div>

        {/* Emergency Contacts - Part of main content */}
        <div className="mt-8">
          <EmergencyContacts />
        </div>
      </main>
    </div>
  );
}

export default App;
