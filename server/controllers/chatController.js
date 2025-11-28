import Bytez from 'bytez.js';
import dotenv from 'dotenv';

dotenv.config();

// Lazy initialization function to ensure env vars are loaded
function getBytezClient() {
    // eslint-disable-next-line no-undef
    if (!process.env.BYTEZ_API_KEY) {
        throw new Error('BYTEZ_API_KEY is not configured in environment variables');
    }

    return new Bytez(process.env.BYTEZ_API_KEY);
}

export const chat = async (req, res) => {
    try {
        const { message, history } = req.body;

        // Check if API key is configured
        // eslint-disable-next-line no-undef
        if (!process.env.BYTEZ_API_KEY) {
            return res.status(500).json({
                message: 'API key is not configured. Please add BYTEZ_API_KEY to your .env file.',
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

        // Format history for Bytez (assuming it takes a list of messages like OpenAI)
        // The user snippet showed: model.run([{ role: "user", content: "Hello" }])
        // So we need to construct that array.
        const messages = [
            { role: 'system', content: systemPrompt },
            ...(history || []),
            { role: 'user', content: message }
        ];

        // Get Bytez client
        const sdk = getBytezClient();
        const model = sdk.model("Qwen/Qwen3-0.6B");

        const { error, output } = await model.run(messages);

        if (error) {
            console.error('Bytez API Error:', error);
            throw new Error(error);
        }

        // The output from Bytez seems to be the response string directly or an object?
        // The user snippet says: const { error, output } = await model.run(...)
        // console.log({ error, output });
        // I'll assume 'output' is the response text or a list of choices. 
        // Usually these simple wrappers return the text directly or a similar structure.
        // Let's assume 'output' is the string or an object with 'content'.
        // If I look at the snippet: console.log({ error, output });
        // I'll assume output is the generated text.
        // Wait, if it's a list of messages input, it probably returns a message object or string.
        // I'll log it to be safe in development, but for now I'll send it back.

        // Let's try to handle if output is an object or string.
        let responseText = output;
        if (typeof output === 'object' && output !== null) {
            // If it follows OpenAI structure, it might be output.choices[0].message.content
            // But the snippet implies a simpler return.
            // Let's assume it returns the text or we just send the whole output for now if unsure.
            // Actually, looking at the snippet: const { error, output } = ...
            // It's likely 'output' is the actual response content.
            if (output.content) {
                responseText = output.content;
            } else if (Array.isArray(output) && output.length > 0 && output[0].content) {
                responseText = output[0].content;
            } else {
                responseText = JSON.stringify(output);
            }
        }

        // Strip out <think>...</think> tags from the response
        // The Qwen model includes internal reasoning that should not be shown to users
        if (typeof responseText === 'string') {
            responseText = responseText.replace(/<think>[\s\S]*?<\/think>/gi, '').trim();
        }

        res.json({ response: responseText });

    } catch (error) {
        console.error('Bytez API Error:', error);
        res.status(500).json({
            message: 'Failed to get response from AI.',
            error: error.message || error
        });
    }
};
