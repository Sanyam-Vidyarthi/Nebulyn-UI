import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Package, Clock, Key, Heart, Wallet, Download, Copy, ExternalLink, Coins } from 'lucide-react';
import { useWallet } from '../context/WalletContext';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import ComponentModal from '../components/ComponentModal';
import Toast from '../components/Toast';

const DashboardPage = () => {
    const { user } = useAuth();
    const { tokens, purchases, wishlist, loading, isOwned } = useWallet();
    const [activeTab, setActiveTab] = useState('purchased');
    const [selectedComponent, setSelectedComponent] = useState(null);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    const showNotification = (msg) => {
        setToastMessage(msg);
        setShowToast(true);
    };

    const tabs = [
        { id: 'purchased', label: 'Purchased Items', icon: Package },
        { id: 'history', label: 'Download History', icon: Clock },
        { id: 'licenses', label: 'License Keys', icon: Key },
        { id: 'wishlist', label: 'Wishlist', icon: Heart },
        { id: 'wallet', label: 'Wallet', icon: Wallet },
    ];

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        showNotification('Copied to clipboard!');
    };

    const handleDownload = (component) => {
        const element = document.createElement("a");
        const file = new Blob([component.code], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = `${component.title.replace(/\s+/g, '_')}.jsx`;
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
        showNotification('Download started!');
    };

    return (
        <div className="min-h-screen bg-[#030303] flex flex-col">
            <Navbar />
            <div className="flex-1 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                        <div>
                            <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
                            <p className="text-zinc-400">Manage your purchases, licenses, and wallet.</p>
                        </div>

                        <div className="bg-gradient-to-r from-zinc-900 to-zinc-900/50 border border-white/10 rounded-2xl p-6 flex items-center gap-6 w-full md:w-auto">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center border border-amber-500/20">
                                    <Coins className="text-amber-500" size={24} />
                                </div>
                                <div>
                                    <p className="text-sm text-zinc-400">Wallet Balance</p>
                                    <p className="text-2xl font-bold text-white">{tokens} Tokens</p>
                                </div>
                            </div>
                            <div className="h-10 w-px bg-white/10 mx-2" />
                            <Button href="/pricing" variant="primary" className="whitespace-nowrap">
                                Buy Tokens
                            </Button>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="flex overflow-x-auto gap-2 mb-8 pb-2 border-b border-white/5">
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            const isActive = activeTab === tab.id;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all whitespace-nowrap ${isActive
                                        ? 'bg-white text-black font-medium'
                                        : 'text-zinc-400 hover:text-white hover:bg-white/5'
                                        }`}
                                >
                                    <Icon size={18} />
                                    {tab.label}
                                </button>
                            );
                        })}
                    </div>

                    {/* Content */}
                    <div className="min-h-[400px]">
                        {activeTab === 'purchased' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {purchases.length > 0 ? (
                                    purchases.filter(p => p.component).map((purchase) => (
                                        <div key={purchase._id} className="bg-zinc-900/50 border border-white/5 rounded-xl overflow-hidden hover:border-white/10 transition-colors group">
                                            <div className="h-40 bg-zinc-900 relative overflow-hidden">
                                                {purchase.component?.previewImage ? (
                                                    <img src={purchase.component.previewImage} alt={purchase.component.title} className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="absolute inset-0 flex items-center justify-center text-4xl">🎨</div>
                                                )}
                                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                    <Button
                                                        variant="secondary"
                                                        className="flex items-center gap-2"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleDownload(purchase.component);
                                                        }}
                                                    >
                                                        <Download size={16} /> Download
                                                    </Button>
                                                </div>
                                            </div>
                                            <div className="p-5 cursor-pointer" onClick={() => setSelectedComponent(purchase.component)}>
                                                <h3 className="text-white font-semibold mb-1">{purchase.component.title}</h3>
                                                <p className="text-zinc-500 text-sm mb-4">Purchased on {new Date(purchase.purchaseDate).toLocaleDateString()}</p>
                                                <div className="flex items-center justify-between">
                                                    <span className="text-xs px-2 py-1 rounded-full bg-white/5 text-zinc-400 border border-white/5">
                                                        {purchase.component.category}
                                                    </span>
                                                    <button className="text-zinc-400 hover:text-white transition-colors">
                                                        <ExternalLink size={18} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="col-span-full text-center py-20 text-zinc-500">
                                        <Package size={48} className="mx-auto mb-4 opacity-50" />
                                        <p>You haven't purchased any components yet.</p>
                                        <Button href="/marketplace" variant="ghost" className="mt-4">Browse Marketplace</Button>
                                    </div>
                                )}
                            </div>
                        )}

                        {activeTab === 'history' && (
                            <div className="bg-zinc-900/30 border border-white/5 rounded-xl overflow-hidden">
                                <table className="w-full text-left">
                                    <thead className="bg-white/5 text-zinc-400 text-sm">
                                        <tr>
                                            <th className="p-4 font-medium">Component</th>
                                            <th className="p-4 font-medium">Date</th>
                                            <th className="p-4 font-medium">Version</th>
                                            <th className="p-4 font-medium text-right">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5 text-zinc-300">
                                        {purchases.filter(p => p.component).map((purchase) => (
                                            <tr key={purchase._id} className="hover:bg-white/5 transition-colors">
                                                <td className="p-4">{purchase.component.title}</td>
                                                <td className="p-4">{new Date(purchase.purchaseDate).toLocaleDateString()}</td>
                                                <td className="p-4">v1.0</td>
                                                <td className="p-4 text-right">
                                                    <button
                                                        onClick={() => handleDownload(purchase.component)}
                                                        className="text-violet-400 hover:text-violet-300 text-sm font-medium"
                                                    >
                                                        Download Again
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                        {purchases.length === 0 && (
                                            <tr>
                                                <td colSpan="4" className="p-8 text-center text-zinc-500">No download history available.</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        {activeTab === 'licenses' && (
                            <div className="space-y-4">
                                {purchases.filter(p => p.component).map((purchase) => (
                                    <div key={purchase._id} className="bg-zinc-900/30 border border-white/5 rounded-xl p-6 flex flex-col md:flex-row justify-between items-center gap-4">
                                        <div>
                                            <h3 className="text-white font-medium mb-1">{purchase.component.title}</h3>
                                            <p className="text-zinc-500 text-sm">Standard License</p>
                                        </div>
                                        <div className="flex items-center gap-3 w-full md:w-auto bg-black/50 p-3 rounded-lg border border-white/5">
                                            <code className="text-zinc-300 font-mono text-sm flex-1">{purchase.licenseKey}</code>
                                            <button
                                                onClick={() => copyToClipboard(purchase.licenseKey)}
                                                className="text-zinc-500 hover:text-white transition-colors"
                                                title="Copy License Key"
                                            >
                                                <Copy size={16} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                {purchases.length === 0 && (
                                    <div className="text-center py-20 text-zinc-500">
                                        <Key size={48} className="mx-auto mb-4 opacity-50" />
                                        <p>No licenses found.</p>
                                    </div>
                                )}
                            </div>
                        )}

                        {activeTab === 'wishlist' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {wishlist.length > 0 ? (
                                    wishlist.filter(w => w.component).map((item) => (
                                        <div key={item._id} className="bg-zinc-900/50 border border-white/5 rounded-xl overflow-hidden hover:border-white/10 transition-colors">
                                            <div className="p-5">
                                                <div className="flex justify-between items-start mb-4">
                                                    <h3 className="text-white font-semibold">{item.component.title}</h3>
                                                    <Heart size={20} className="text-red-500 fill-red-500" />
                                                </div>
                                                <p className="text-zinc-400 text-sm mb-4 line-clamp-2">{item.component.description}</p>
                                                <div className="flex items-center justify-between mt-auto">
                                                    <div className="flex items-center gap-1 text-amber-400 font-medium">
                                                        <Coins size={14} />
                                                        {item.component.tokenPrice}
                                                    </div>
                                                    <Button variant="primary" size="sm">View Details</Button>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="col-span-full text-center py-20 text-zinc-500">
                                        <Heart size={48} className="mx-auto mb-4 opacity-50" />
                                        <p>Your wishlist is empty.</p>
                                        <Button href="/marketplace" variant="ghost" className="mt-4">Browse Marketplace</Button>
                                    </div>
                                )}
                            </div>
                        )}

                        {activeTab === 'wallet' && (
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                <div className="lg:col-span-2 bg-zinc-900/30 border border-white/5 rounded-xl overflow-hidden">
                                    <div className="p-6 border-b border-white/5">
                                        <h3 className="text-white font-semibold">Transaction History</h3>
                                    </div>
                                    <div className="divide-y divide-white/5">
                                        {/* Mock transactions for now if none exist */}
                                        {[1, 2, 3].map((i) => (
                                            <div key={i} className="p-4 flex justify-between items-center hover:bg-white/5 transition-colors">
                                                <div className="flex items-center gap-4">
                                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${i === 1 ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                                                        {i === 1 ? <Wallet size={18} /> : <Package size={18} />}
                                                    </div>
                                                    <div>
                                                        <p className="text-white font-medium">{i === 1 ? 'Purchased Tokens' : 'Component Purchase'}</p>
                                                        <p className="text-zinc-500 text-xs">Nov {25 - i}, 2025</p>
                                                    </div>
                                                </div>
                                                <span className={`font-mono font-medium ${i === 1 ? 'text-green-400' : 'text-white'}`}>
                                                    {i === 1 ? '+500' : '-25'}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="bg-gradient-to-br from-violet-600/20 to-indigo-600/20 border border-violet-500/20 rounded-xl p-6">
                                        <h3 className="text-white font-semibold mb-2">Total Spent</h3>
                                        <p className="text-3xl font-bold text-white">1,250 <span className="text-sm font-normal text-zinc-400">Tokens</span></p>
                                    </div>
                                    <div className="bg-zinc-900/30 border border-white/5 rounded-xl p-6">
                                        <h3 className="text-white font-semibold mb-4">Need more tokens?</h3>
                                        <p className="text-zinc-400 text-sm mb-6">Top up your wallet to purchase more premium components.</p>
                                        <Button href="/pricing" variant="primary" className="w-full justify-center">
                                            Buy Tokens
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer />

            {selectedComponent && (
                <ComponentModal
                    component={selectedComponent}
                    onClose={() => setSelectedComponent(null)}
                    onCopy={() => showNotification('Code copied to clipboard!')}
                />
            )}

            {showToast && (
                <Toast
                    message={toastMessage}
                    onClose={() => setShowToast(false)}
                />
            )}
        </div>
    );
};

export default DashboardPage;
