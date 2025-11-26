import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import ComponentCard from '../components/ComponentCard';
import ComponentModal from '../components/ComponentModal';
import Toast from '../components/Toast';
import Footer from '../components/Footer';
import { components as initialComponents } from '../data/components'; // Fallback data

import { motion } from "motion/react";
import { Search, Filter, Sparkles, Grid, List, Zap, Layers, Loader2 } from 'lucide-react';

const MarketplacePage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedComponent, setSelectedComponent] = useState(null);
    const [showToast, setShowToast] = useState(false);
    const [viewMode, setViewMode] = useState('grid');
    const [components, setComponents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchComponents();
    }, []);

    const fetchComponents = async () => {
        try {
            setLoading(true);
            const response = await fetch('http://localhost:5000/api/components');
            const data = await response.json();

            if (Array.isArray(data)) {
                setComponents(data);
            } else if (data.success) {
                setComponents(data.data);
            } else {
                // Fallback to local data if API fails but returns valid JSON
                console.warn('API returned unexpected format', data);
                setComponents(initialComponents);
            }
        } catch (error) {
            console.error('Error fetching components:', error);
            // Fallback on error
            setComponents(initialComponents);
        } finally {
            setLoading(false);
        }
    };

    const categories = ['All', ...new Set(components.map(c => c.category))];

    const filteredComponents = components.filter(component => {
        const matchesSearch = component.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            component.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || component.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="min-h-screen bg-[#030303] text-white font-sans selection:bg-violet-500/30">
            <Navbar />

            <main className="relative pt-32 pb-20 px-6">
                {/* Ambient Background */}
                <div className="fixed inset-0 pointer-events-none overflow-hidden">
                    <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-violet-900/10 rounded-full blur-[120px]" />
                    <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-fuchsia-900/10 rounded-full blur-[120px]" />
                </div>

                <div className="container mx-auto max-w-7xl relative z-10">
                    {/* Hero Section */}
                    <div className="flex flex-col items-center text-center mb-20">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="max-w-3xl"
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md shadow-lg shadow-violet-500/5">
                                <Sparkles size={14} className="text-amber-300" />
                                <span className="text-xs font-medium text-gray-300 tracking-wide uppercase">Premium Library</span>
                            </div>

                            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
                                <span className="block text-white">Build Faster with</span>
                                <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-white bg-clip-text text-transparent">
                                    Premium Components
                                </span>
                            </h1>

                            <p className="text-lg md:text-xl text-gray-400 leading-relaxed max-w-2xl mx-auto">
                                A curated collection of copy-paste React components.
                                <span className="text-gray-300 font-medium"> Beautifully designed, fully responsive, and ready for production.</span>
                            </p>
                        </motion.div>
                    </div>

                    {/* Search & Filter Section */}
                    <div className="mb-16 max-w-4xl mx-auto">
                        <div className="flex flex-col gap-8">
                            {/* Search Bar */}
                            <div className="relative group">
                                <div className="absolute inset-0 bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <div className="relative bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl shadow-black/50 flex items-center overflow-hidden transition-all group-focus-within:border-violet-500/50 group-focus-within:ring-1 group-focus-within:ring-violet-500/20">
                                    <div className="pl-6 text-gray-500 group-focus-within:text-violet-400 transition-colors">
                                        <Search size={24} />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Search components (e.g. 'Button', 'Card', 'Navbar')..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full bg-transparent border-none text-lg text-white placeholder:text-gray-600 px-6 py-5 focus:outline-none focus:ring-0"
                                    />
                                    <div className="pr-6 hidden md:block">
                                        <div className="px-2 py-1 rounded bg-white/5 border border-white/5 text-xs text-gray-500 font-mono">
                                            CTRL + K
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Filters & View Toggle */}
                            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                                {/* Categories */}
                                <div className="flex flex-wrap justify-center md:justify-start gap-2">
                                    {categories.map(category => (
                                        <button
                                            key={category}
                                            onClick={() => setSelectedCategory(category)}
                                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${selectedCategory === category
                                                ? 'bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.3)] scale-105'
                                                : 'bg-white/5 text-gray-400 border-white/5 hover:bg-white/10 hover:text-white hover:border-white/20'
                                                }`}
                                        >
                                            {category}
                                        </button>
                                    ))}
                                </div>

                                {/* View Toggle */}
                                <div className="flex items-center gap-1 p-1 rounded-lg bg-white/5 border border-white/5">
                                    <button
                                        onClick={() => setViewMode('grid')}
                                        className={`p-2 rounded-md transition-all ${viewMode === 'grid' ? 'bg-white/10 text-white shadow-sm' : 'text-gray-500 hover:text-white'}`}
                                        title="Grid View"
                                    >
                                        <Grid size={18} />
                                    </button>
                                    <button
                                        onClick={() => setViewMode('list')}
                                        className={`p-2 rounded-md transition-all ${viewMode === 'list' ? 'bg-white/10 text-white shadow-sm' : 'text-gray-500 hover:text-white'}`}
                                        title="List View"
                                    >
                                        <List size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Components Grid */}
                    {filteredComponents.length > 0 ? (
                        <motion.div
                            layout
                            className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1 max-w-4xl mx-auto'}`}
                        >
                            {filteredComponents.map((component, index) => (
                                <motion.div
                                    key={component._id || component.id}
                                    layout
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                >
                                    <ComponentCard
                                        component={component}
                                        onClick={setSelectedComponent}
                                        viewMode={viewMode}
                                    />
                                </motion.div>
                            ))}
                        </motion.div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-32 text-center">
                            <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-6 animate-pulse">
                                <Layers size={40} className="text-gray-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">No components found</h3>
                            <p className="text-gray-400 max-w-md">
                                We couldn't find anything matching "{searchTerm}". Try searching for something else or change the category.
                            </p>
                            <button
                                onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }}
                                className="mt-8 px-6 py-3 bg-white text-black rounded-full font-medium hover:bg-gray-200 transition-colors"
                            >
                                Clear Filters
                            </button>
                        </div>
                    )}
                </div>
            </main>

            <Footer />

            {/* Modals */}
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

export default MarketplacePage;
