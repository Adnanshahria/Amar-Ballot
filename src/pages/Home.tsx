import EligibilityCard from '../components/EligibilityCard';
import AssistantAvatar from '../components/AssistantAvatar';
import QuickLinks from '../components/QuickLinks';
import EmergencyContacts from '../components/EmergencyContacts';

export default function Home() {
    return (
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
    );
}
