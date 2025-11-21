import React from 'react';
import Navbar from '../components/Navbar';
import { Copy, Terminal, FileCode, CheckCircle, ChevronRight, Sparkles, Zap, Code2, Box } from 'lucide-react';
import { motion } from "motion/react";

const HowToUse = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1]
            }
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white font-['Outfit'] selection:bg-violet-500/30 overflow-x-hidden">
            {/* Background Ambience */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-violet-900/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-pink-900/20 rounded-full blur-[120px]" />
                <div className="absolute top-[20%] right-[20%] w-[20%] h-[20%] bg-blue-900/10 rounded-full blur-[100px]" />
            </div>

            <Navbar />

            <main className="relative container mx-auto px-6 py-24 max-w-6xl">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                    className="space-y-24"
                >
                    {/* Header */}
                    <motion.div variants={itemVariants} className="text-center space-y-8 relative">
                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] bg-gradient-to-r from-violet-500/20 via-fuchsia-500/20 to-cyan-500/20 blur-[80px] -z-10 rounded-full opacity-50" />

                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-xl shadow-violet-500/5 mb-6 group hover:border-white/20 transition-colors">
                            <Sparkles size={14} className="text-amber-300 group-hover:animate-pulse" />
                            <span className="text-xs font-medium text-gray-300 tracking-wide uppercase">Quick Start Guide</span>
                        </div>

                        <h1 className="text-6xl md:text-8xl font-bold tracking-tight leading-tight">
                            <span className="block text-white drop-shadow-sm">Integration</span>
                            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-white bg-clip-text text-transparent drop-shadow-lg">
                                Made Simple
                            </span>
                        </h1>

                        <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed font-light">
                            Elevate your workflow with our premium components.
                            <span className="block mt-1">Four simple steps to visual excellence.</span>
                        </p>
                    </motion.div>

                    {/* Steps Grid */}
                    <div className="grid gap-12 relative">
                        {/* Connecting Line */}
                        <div className="absolute left-[2.25rem] top-12 bottom-12 w-0.5 bg-gradient-to-b from-violet-500/50 via-fuchsia-500/20 to-transparent hidden md:block" />

                        {/* Step 1: Prerequisites */}
                        <StepCard
                            number="01"
                            title="Prerequisites"
                            description="Ensure your environment is ready for modern web development."
                            icon={<CheckCircle className="text-blue-400" size={28} />}
                            gradient="from-blue-500/20 to-cyan-500/20"
                            borderColor="group-hover:border-blue-500/30"
                            variants={itemVariants}
                        >
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                                {['React v18+', 'Tailwind CSS v3+', 'Vite / Next.js'].map((req) => (
                                    <div key={req} className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors group/item">
                                        <div className="w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.5)] group-hover/item:scale-125 transition-transform" />
                                        <span className="text-sm font-medium text-gray-300">{req}</span>
                                    </div>
                                ))}
                            </div>
                        </StepCard>

                        {/* Step 2: Dependencies */}
                        <StepCard
                            number="02"
                            title="Install Dependencies"
                            description="Get the power of motion and icons in your project."
                            icon={<Terminal className="text-violet-400" size={28} />}
                            gradient="from-violet-500/20 to-fuchsia-500/20"
                            borderColor="group-hover:border-violet-500/30"
                            variants={itemVariants}
                        >
                            <div className="mt-6">
                                <CodeBlock
                                    code="npm install framer-motion lucide-react clsx tailwind-merge"
                                    language="bash"
                                />
                            </div>
                        </StepCard>

                        {/* Step 3: Configuration */}
                        <StepCard
                            number="03"
                            title="Configure Tailwind"
                            description="Update your config to scan for styles in the right places."
                            icon={<FileCode className="text-cyan-400" size={28} />}
                            gradient="from-cyan-500/20 to-teal-500/20"
                            borderColor="group-hover:border-cyan-500/30"
                            variants={itemVariants}
                        >
                            <div className="mt-6">
                                <CodeBlock
                                    code={`export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}`}
                                    language="javascript"
                                    filename="tailwind.config.js"
                                />
                            </div>
                        </StepCard>

                        {/* Step 4: Implementation */}
                        <StepCard
                            number="04"
                            title="Copy & Paste"
                            description="The final step to bringing your UI to life."
                            icon={<Zap className="text-pink-400" size={28} />}
                            gradient="from-pink-500/20 to-rose-500/20"
                            borderColor="group-hover:border-pink-500/30"
                            variants={itemVariants}
                        >
                            <div className="space-y-6 mt-2">
                                <div className="space-y-3">
                                    {[
                                        'Browse marketplace & select component',
                                        'Click "Get Code" to copy source',
                                        'Create component file in your project',
                                        'Import and use in your app'
                                    ].map((step, i) => (
                                        <div key={i} className="flex items-center gap-4 text-gray-400 group/list">
                                            <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center text-xs font-mono border border-white/10 group-hover/list:border-pink-500/50 group-hover/list:bg-pink-500/10 group-hover/list:text-pink-400 transition-all">
                                                {i + 1}
                                            </div>
                                            <span className="group-hover/list:text-gray-300 transition-colors">{step}</span>
                                        </div>
                                    ))}
                                </div>

                                <CodeBlock
                                    code={`import ComponentName from './components/ComponentName';

function App() {
  return (
    <div className="p-8">
      <ComponentName />
    </div>
  );
}`}
                                    language="jsx"
                                    filename="App.jsx"
                                />
                            </div>
                        </StepCard>
                    </div>

                    {/* Footer CTA */}
                    <motion.div variants={itemVariants} className="text-center pt-12 pb-20">
                        <a href="/" className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-black font-bold overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.5)]">
                            <span className="relative z-10">Start Browsing</span>
                            <ChevronRight size={20} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                            <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-white opacity-0 group-hover:opacity-100 transition-opacity" />
                        </a>
                    </motion.div>
                </motion.div>
            </main>
        </div>
    );
};

const StepCard = ({ number, title, description, icon, gradient, borderColor, children, variants }) => (
    <motion.section variants={variants} className="relative group md:pl-24">
        {/* Timeline Dot */}
        <div className="absolute left-[2.25rem] top-12 -translate-x-1/2 hidden md:flex items-center justify-center w-8 h-8 rounded-full bg-[#050505] border border-white/10 z-10 group-hover:border-white/30 transition-colors shadow-[0_0_0_4px_#050505]">
            <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${gradient} opacity-50 group-hover:opacity-100 transition-opacity`} />
        </div>

        <div className={`relative bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/5 rounded-3xl p-8 md:p-10 overflow-hidden transition-all duration-500 hover:border-white/10 ${borderColor} group-hover:shadow-[0_0_50px_-20px_rgba(120,119,198,0.1)]`}>
            {/* Background Gradient */}
            <div className={`absolute -right-20 -top-20 w-64 h-64 bg-gradient-to-br ${gradient} blur-[80px] opacity-0 group-hover:opacity-20 transition-opacity duration-700`} />

            {/* Watermark Number */}
            <div className="absolute right-4 top-4 text-[120px] font-bold leading-none text-white/[0.02] select-none pointer-events-none font-['Outfit'] tracking-tighter">
                {number}
            </div>

            <div className="relative z-10">
                <div className="flex flex-col gap-6">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 shadow-inner group-hover:scale-110 transition-transform duration-500">
                            {icon}
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-white">{title}</h2>
                            <p className="text-gray-400 mt-1 max-w-md">{description}</p>
                        </div>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    </motion.section>
);

const CodeBlock = ({ code, filename }) => (
    <div className="relative rounded-xl overflow-hidden border border-white/10 bg-[#0d0d0d] shadow-2xl group/code">
        {filename && (
            <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/5">
                <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/50" />
                        <div className="w-2.5 h-2.5 rounded-full bg-amber-500/20 border border-amber-500/50" />
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/50" />
                    </div>
                    <span className="ml-2 text-xs text-gray-500 font-mono">{filename}</span>
                </div>
            </div>
        )}
        {!filename && (
            <div className="absolute top-3 left-4 flex gap-1.5 z-10">
                <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
            </div>
        )}

        <div className={`p-5 overflow-x-auto ${!filename ? 'pt-10' : ''}`}>
            <pre className="font-mono text-sm leading-relaxed text-gray-300">
                <code>{code}</code>
            </pre>
        </div>

        <button
            onClick={() => navigator.clipboard.writeText(code)}
            className="absolute top-3 right-3 p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white opacity-0 group-hover/code:opacity-100 transition-all duration-300 border border-white/5"
            title="Copy code"
        >
            <Copy size={16} />
        </button>
    </div>
);

export default HowToUse;
