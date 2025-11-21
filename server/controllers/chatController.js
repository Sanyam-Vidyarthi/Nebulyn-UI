import OpenAI from 'openai';

// Lazy initialization function to ensure env vars are loaded
function getOpenAIClient() {
    // eslint-disable-next-line no-undef
    if (!process.env.OPENAI_API_KEY) {
        throw new Error('OPENAI_API_KEY is not configured in environment variables');
    }

    // Configure for OpenRouter instead of OpenAI
    // eslint-disable-next-line no-undef
    return new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
        baseURL: 'https://openrouter.ai/api/v1',
    });
}

export const chat = async (req, res) => {
    try {
        const { message, history } = req.body;

        // Check if API key is configured
        // eslint-disable-next-line no-undef
        if (!process.env.OPENAI_API_KEY) {
            return res.status(500).json({
                message: 'API key is not configured. Please add OPENAI_API_KEY to your .env file.',
                error: 'MISSING_API_KEY'
            });
        }

        const systemPrompt = `You are the AI assistant for "Nebulyn UI", a premium UI/UX marketplace.
        
        Your goal is to help users navigate the website, find components, and answer questions about the platform.
        
        Website Structure:
        - /: Landing Page (Hero, Features, Featured Components)
        - /how-to-use: Documentation on how to use the components.
        - /login: Login/Register page.
        
        Key Features:
        - Premium, copy-paste React components.
        - Glassmorphism, Neon, and Modern aesthetics.
        - Built with Tailwind CSS and Framer Motion.
        
        Tone: Professional, helpful, concise, and slightly futuristic/premium.
        
        If a user asks for a specific component, guide them to the "Explore" section or suggest they search for it.
        If a user asks how to install, refer them to the /how-to-use page.
        `;

        const messages = [
            { role: 'system', content: systemPrompt },
            ...(history || []),
            { role: 'user', content: message }
        ];

        // Get OpenRouter client (lazy initialization)
        const openai = getOpenAIClient();

        const completion = await openai.chat.completions.create({
            messages: messages,
            model: 'deepseek/deepseek-chat',  // Using DeepSeek model via OpenRouter
        });

        const response = completion.choices[0].message.content;

        res.json({ response });
    } catch (error) {
        console.error('OpenRouter API Error:', error.response ? error.response.data : error.message);
        res.status(500).json({
            message: 'Failed to get response from AI.',
            error: error.message
        });
    }
};
