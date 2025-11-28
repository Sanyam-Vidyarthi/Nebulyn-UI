import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ComponentCard from '../components/ComponentCard';
import Button from '../components/Button';
import ComponentModal from '../components/ComponentModal';
import Toast from '../components/Toast';
import Footer from '../components/Footer';
import { components } from '../data/components';
import { motion } from "motion/react";
import { ArrowRight, Sparkles, Zap, Layout, Code, Star } from 'lucide-react';
import { API_BASE_URL } from '../config/api';

const LandingPage = () => {
    const [selectedComponent, setSelectedComponent] = useState(null);
    const [showToast, setShowToast] = useState(false);

    const [featuredComponents, setFeaturedComponents] = useState([]);

    React.useEffect(() => {
        const fetchFeatured = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/api/components`);
                if (response.ok) {
                    const data = await response.json();
                    // Take first 3 or random 3
                    setFeaturedComponents(data.slice(0, 3));
                }
            } catch (error) {
                console.error('Error fetching featured components:', error);
            }
        };
        fetchFeatured();
    }, []);

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-primary)' }}>
            <Navbar />

            <main style={{ flex: 1 }}>
                {/* Hero Section */}
                <section style={{
                    padding: '14rem 0 12rem',
                    textAlign: 'center',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    {/* Dynamic Background Elements */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-gradient-to-r from-violet-600/20 via-fuchsia-600/20 to-cyan-600/20 blur-[120px] rounded-full opacity-50 animate-pulse" />
                        <div className="absolute top-[20%] left-[10%] w-[400px] h-[400px] bg-violet-900/10 blur-[100px] rounded-full mix-blend-screen animate-blob" />
                        <div className="absolute bottom-[10%] right-[10%] w-[500px] h-[500px] bg-pink-900/10 blur-[100px] rounded-full mix-blend-screen animate-blob" style={{ animationDelay: '2s' }} />
                    </div>

                    <div className="container relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8 hover:bg-white/10 transition-colors cursor-default shadow-lg shadow-violet-500/10">
                                <Sparkles size={14} className="text-amber-300" />
                                <span className="text-sm font-medium text-gray-300 tracking-wide">The Ultimate UI Kit v2.0</span>
                            </div>

                            <h1 className="text-gradient-primary animate-text-shimmer" style={{
                                fontSize: 'clamp(4rem, 9vw, 7.5rem)',
                                fontWeight: '800',
                                marginBottom: '2.5rem',
                                lineHeight: 1.05,
                                letterSpacing: '-0.04em',
                                textShadow: '0 20px 40px rgba(0,0,0,0.5)'
                            }}>
                                Crafted for<br />Perfectionists.
                            </h1>

                            <p style={{
                                color: 'var(--text-secondary)',
                                fontSize: '1.35rem',
                                maxWidth: '680px',
                                margin: '0 auto 4rem',
                                lineHeight: 1.6,
                                fontWeight: '300'
                            }}>
                                A curated collection of premium, copy-paste UI elements designed for modern web applications.
                            </p>

                            <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
                                <Link to="/marketplace">
                                    <Button variant="primary" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        Browse Components <ArrowRight size={18} />
                                    </Button>
                                </Link>
                                <Link to="/how-to-use">
                                    <Button variant="secondary" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}>
                                        View Documentation
                                    </Button>
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Features Section */}
                <section style={{ padding: '10rem 0', position: 'relative' }}>
                    <div className="container">
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2.5rem' }}>
                            {[
                                { icon: <Layout className="text-violet-400" size={32} />, title: 'Modern Aesthetics', desc: 'Glassmorphism, neon glows, and smooth gradients out of the box.' },
                                { icon: <Code className="text-pink-400" size={32} />, title: 'Copy & Paste', desc: 'Zero dependencies. Just copy the code and drop it into your project.' },
                                { icon: <Zap className="text-cyan-400" size={32} />, title: 'Dark Mode First', desc: 'Designed specifically for stunning dark mode interfaces.' }
                            ].map((feature, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.15, duration: 0.6 }}
                                    className="glass-panel group spotlight-card"
                                    onMouseMove={(e) => {
                                        const { currentTarget: target } = e;
                                        const rect = target.getBoundingClientRect();
                                        const x = e.clientX - rect.left;
                                        const y = e.clientY - rect.top;
                                        target.style.setProperty("--mouse-x", `${x}px`);
                                        target.style.setProperty("--mouse-y", `${y}px`);
                                    }}
                                    style={{
                                        padding: '3rem',
                                        borderRadius: '28px',
                                        border: '1px solid rgba(255,255,255,0.05)',
                                        background: 'linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0) 100%)'
                                    }}
                                >
                                    <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 border border-white/5 shadow-lg shadow-black/20">
                                        {feature.icon}
                                    </div>
                                    <h3 style={{ fontSize: '1.75rem', marginBottom: '1rem', color: 'white', fontWeight: '700', letterSpacing: '-0.02em' }}>{feature.title}</h3>
                                    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '1.1rem' }}>{feature.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Featured Components Section (Reduced to 3) */}
                <section style={{ padding: '8rem 0', position: 'relative' }}>
                    {/* Decorative Background */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-900/5 to-transparent pointer-events-none" />

                    <div className="container relative z-10">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: '5rem' }}>
                            <div>
                                <div className="flex items-center gap-2 mb-4 text-violet-400 font-medium uppercase tracking-wider text-sm">
                                    <Star size={16} fill="currentColor" /> Featured Collection
                                </div>
                                <h2 className="text-gradient" style={{ fontSize: '3.5rem', marginBottom: '1rem', fontWeight: '700', letterSpacing: '-0.03em' }}>Trending Now</h2>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '1.25rem', maxWidth: '500px' }}>Hand-picked components that are trending in the community.</p>
                            </div>
                            <Link to="/marketplace">
                                <Button variant="ghost" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.1rem' }}>
                                    View All Components <ArrowRight size={18} />
                                </Button>
                            </Link>
                        </div>

                        {/* Grid - Limited to 3 */}
                        <div className="grid-auto">
                            {featuredComponents.map((component, index) => (
                                <motion.div
                                    key={component.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <ComponentCard
                                        component={component}
                                        onClick={setSelectedComponent}
                                    />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section style={{ padding: '10rem 0', textAlign: 'center' }}>
                    <div className="container">
                        <div className="glass-panel relative overflow-hidden group" style={{
                            padding: '8rem 4rem',
                            borderRadius: '48px',
                            border: '1px solid rgba(255,255,255,0.1)'
                        }}>
                            <div className="absolute inset-0 bg-gradient-to-br from-violet-600/20 via-transparent to-pink-600/20 opacity-50 group-hover:opacity-70 transition-opacity duration-700" />
                            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />

                            <div className="relative z-10">
                                <h2 style={{ fontSize: '4rem', marginBottom: '1.5rem', fontWeight: '800', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
                                    Ready to build<br />something <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-pink-400">extraordinary?</span>
                                </h2>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '1.35rem', marginBottom: '3.5rem', maxWidth: '600px', margin: '0 auto 3.5rem' }}>
                                    Join thousands of developers creating stunning interfaces with our premium component library.
                                </p>
                                <Button variant="primary" style={{ padding: '1.25rem 3.5rem', fontSize: '1.2rem' }}>Get All Access</Button>
                            </div>
                        </div>
                    </div>
                </section>

            </main>

            <Footer />

            {/* Modals & Overlays */}
            {selectedComponent && (
                <ComponentModal
                    component={selectedComponent}
                    onClose={() => setSelectedComponent(null)}
                    onCopy={() => setShowToast(true)}
                />
            )}

            {showToast && (
                <Toast
                    message="Code copied to clipboard!"
                    onClose={() => setShowToast(false)}
                />
            )}
        </div>
    );
};

export default LandingPage;
