import { useNavigate } from 'react-router-dom';
import preronaImg from '../assets/prerona.png';

export default function AssistantAvatar() {
    const navigate = useNavigate();

    const handleChatClick = () => {
        navigate('/chat');
    };

    return (
        <div className="flex flex-col items-center">
            <p className="text-gray-600 mb-2 text-lg">
                <span className="italic text-2xl">Hello,</span> I'm Prerona
            </p>

            <div className="bg-gradient-to-b from-green-100 to-green-200 rounded-xl p-3 border-4 border-green-500 shadow-lg">
                <img
                    src={preronaImg}
                    alt="Prerona - Your voting assistant"
                    className="w-44 h-52 object-cover rounded-lg"
                />
            </div>

            <p className="text-center text-gray-600 text-sm mt-3">
                I will help you to become<br />
                <span className="font-semibold">a responsible voter</span>
            </p>

            <button
                onClick={handleChatClick}
                className="mt-2 text-green-700 hover:text-green-800 font-medium underline underline-offset-2 transition-colors hover:scale-105"
            >
                Click Here
            </button>
        </div>
    );
}
