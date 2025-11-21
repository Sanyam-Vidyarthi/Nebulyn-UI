import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import ComponentCard from '../components/ComponentCard';
import ComponentModal from '../components/ComponentModal';
import Toast from '../components/Toast';
import Footer from '../components/Footer';
import { components } from '../data/components';
import { motion } from "motion/react";
import { Search, Filter, Sparkles, Grid, List } from 'lucide-react';

const MarketplacePage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedComponent, setSelectedComponent] = useState(null);
    const [showToast, setShowToast] = useState(false);
    const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

    const categories = ['All', ...new Set(components.map(c => c.category))];

    const filteredComponents = components.filter(component => {
        const matchesSearch = component.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            component.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || component.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="min-h-screen bg-[var(--bg-primary)] flex flex-col">
            <Navbar />

            <main className="flex-1 container pt-56 pb-20 relative">
                {/* Background Elements */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-violet-900/10 blur-[120px] rounded-full pointer-events-none -z-10" />

                {/* Header */}
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gradient-primary tracking-tight">
                            Explore Components
                        </h1>
                        <p className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed">
                            Discover our collection of premium, copy-paste React components designed for modern applications.
                        </p>
                    </motion.div>
                </div>

                {/* Search and Filter Bar */}
                <div className="sticky top-24 z-40 mb-16">
                    <div className="glass-panel p-6 rounded-2xl flex flex-col md:flex-row gap-6 items-center justify-between border border-white/10 shadow-xl shadow-black/20 backdrop-blur-xl bg-[#0a0a0a]/90">

                        {/* Search */}
                        <div className="relative flex-1 w-full md:max-w-md group">
                            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-violet-400 transition-colors" size={22} />
                            <input
                                type="text"
                                placeholder="Search components..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl pl-14 pr-5 py-4 text-base text-white placeholder:text-gray-500 focus:outline-none focus:border-violet-500/50 focus:bg-white/10 transition-all"
                            />
                        </div>

                        {/* Categories */}
                        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
                            {categories.map(category => (
                                <button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${selectedCategory === category
                                        ? 'bg-violet-600 text-white shadow-lg shadow-violet-500/25'
                                        : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                                        }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>

                        {/* View Toggle */}
                        <div className="flex bg-white/5 p-1 rounded-xl border border-white/10 hidden md:flex">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white/10 text-white shadow-sm' : 'text-gray-400 hover:text-white'}`}
                            >
                                <Grid size={18} />
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white/10 text-white shadow-sm' : 'text-gray-400 hover:text-white'}`}
                            >
                                <List size={18} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Grid */}
                {filteredComponents.length > 0 ? (
                    <div className={`grid gap-8 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
                        {filteredComponents.map((component, index) => (
                            <motion.div
                                key={component.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                            >
                                <ComponentCard
                                    component={component}
                                    onClick={setSelectedComponent}
                                />
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Search size={32} className="text-gray-600" />
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-2">No components found</h3>
                        <p className="text-gray-400">Try adjusting your search or category filter.</p>
                    </div>
                )}

                <Footer />
            </main>

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
