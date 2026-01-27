// Hugging Face Inference API Service for Prerona (Gemma 2B)

const HF_API_URL = import.meta.env.VITE_HF_API_URL || 'https://api-inference.huggingface.co/models/google/gemma-2b-it';
const HF_API_KEY = import.meta.env.VITE_HF_API_KEY || '';

export interface ChatMessage {
    role: 'user' | 'assistant';
    content: string;
}

export async function sendMessageToAI(messages: ChatMessage[]): Promise<string> {
    if (!HF_API_KEY) {
        console.warn('Hugging Face API key not set. Using mock response.');
        return getMockResponse(messages[messages.length - 1]?.content || '');
    }

    try {
        // Format conversation for Gemma 2B IT
        const prompt = formatPromptForGemma(messages);

        const response = await fetch(HF_API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${HF_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                inputs: prompt,
                parameters: {
                    max_new_tokens: 512,
                    temperature: 0.7,
                    top_p: 0.9,
                    do_sample: true,
                    return_full_text: false,
                },
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('HF API Error:', errorText);
            throw new Error(`API Error: ${response.status}`);
        }

        const data = await response.json();

        // Handle different response formats
        if (Array.isArray(data) && data[0]?.generated_text) {
            return data[0].generated_text.trim();
        } else if (data.generated_text) {
            return data.generated_text.trim();
        } else {
            return 'I apologize, I could not process your request. Please try again.';
        }
    } catch (error) {
        console.error('Error calling AI:', error);
        return getMockResponse(messages[messages.length - 1]?.content || '');
    }
}

function formatPromptForGemma(messages: ChatMessage[]): string {
    const systemPrompt = `You are Prerona, a helpful AI assistant for Amar Ballot - a voter information app in Bangladesh. 
You help citizens with:
- Understanding voting procedures
- Finding their vote centers
- Learning about candidates
- Voter registration (NID)
- Election rules and eligibility
Keep responses concise, friendly, and in simple language. You can respond in both English and Bengali.`;

    let prompt = `<start_of_turn>system\n${systemPrompt}<end_of_turn>\n`;

    for (const msg of messages) {
        if (msg.role === 'user') {
            prompt += `<start_of_turn>user\n${msg.content}<end_of_turn>\n`;
        } else {
            prompt += `<start_of_turn>model\n${msg.content}<end_of_turn>\n`;
        }
    }

    prompt += '<start_of_turn>model\n';
    return prompt;
}

function getMockResponse(userMessage: string): string {
    const lowerMsg = userMessage.toLowerCase();

    if (lowerMsg.includes('vote center') || lowerMsg.includes('polling')) {
        return 'To find your vote center, go to the "Find Your Vote Center" page and enter your NID number and date of birth. I will help you locate the nearest polling station! 🗳️';
    }
    if (lowerMsg.includes('nid') || lowerMsg.includes('registration')) {
        return 'To get a National ID (NID), you need to be 18 years old. Visit your local Election Commission office with your birth certificate and other documents. Would you like me to guide you through the process?';
    }
    if (lowerMsg.includes('candidate') || lowerMsg.includes('who is running')) {
        return 'You can view all candidates in your area on the "Candidate List" page. Select your Division, District, and Area to see the available candidates and their details.';
    }
    if (lowerMsg.includes('hello') || lowerMsg.includes('hi') || lowerMsg.includes('হ্যালো')) {
        return 'Hello! 👋 I am Prerona, your voting assistant. I can help you with finding your vote center, learning about candidates, or understanding the voting process. How can I help you today?';
    }
    if (lowerMsg.includes('eligible') || lowerMsg.includes('can i vote')) {
        return 'To be eligible to vote in Bangladesh, you must: 1) Be a Bangladeshi citizen, 2) Be at least 18 years old, and 3) Have a valid National ID (NID). Do you meet these criteria?';
    }

    return 'I am Prerona, your voting assistant! I can help you with vote center locations, candidate information, voter registration, and election rules. What would you like to know?';
}
