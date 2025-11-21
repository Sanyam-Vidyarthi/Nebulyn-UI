# Nebulyn UI - Premium UI/UX Marketplace

A premium marketplace for copy-paste React components with modern aesthetics including Glassmorphism, Neon effects, and futuristic designs.

## Features

- 🎨 Premium, ready-to-use React components
- 🤖 AI-powered chatbot assistant (powered by OpenAI)
- 💎 Modern design patterns (Glassmorphism, Neon, Liquid Glass)
- ⚡ Built with React, Vite, Tailwind CSS, and Framer Motion
- 🔐 Full authentication system
- 📦 MongoDB backend for component management

## Setup

### 1. Install Dependencies

Install both frontend and backend dependencies:

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd server
npm install
cd ..
```

### 2. Configure Environment Variables

The backend requires environment variables. Configure them in `server/.env`:

```bash
PORT=5000
MONGO_URI=mongodb://localhost:27017/ui-ux-marketplace
OPENAI_API_KEY=your-openai-api-key-here
```

**Getting an OpenAI API Key:**
1. Visit [OpenAI Platform](https://platform.openai.com/api-keys)
2. Sign in or create an account
3. Navigate to API Keys section
4. Create a new secret key
5. Copy and paste it as the `OPENAI_API_KEY` value

> **Note**: The chatbot will not work without a valid OpenAI API key.

### 3. Run the Application

Run both frontend and backend concurrently:

```bash
npm run dev
```

This will start:
- Frontend (Vite): http://localhost:5173
- Backend (Express): http://localhost:5000

To run servers separately:
```bash
npm run dev:client  # Frontend only
npm run dev:server  # Backend only
```

## Project Structure

```
.
├── src/                  # Frontend React application
│   ├── components/       # Reusable components
│   ├── pages/           # Page components
│   └── data/            # Component data
├── server/              # Backend Node.js/Express server
│   ├── controllers/     # API controllers
│   ├── models/          # MongoDB models
│   ├── routes/          # API routes
│   └── index.js         # Server entry point
└── public/              # Static assets
```

## Available Scripts

- `npm run dev` - Run both frontend and backend
- `npm run dev:client` - Run only frontend
- `npm run dev:server` - Run only backend
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Technologies

- **Frontend**: React 19, Vite, Tailwind CSS, Framer Motion
- **Backend**: Node.js, Express, MongoDB, OpenAI API
- **Authentication**: JWT, bcryptjs
