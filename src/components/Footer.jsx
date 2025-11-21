import React from 'react';
import { Logo } from './Logo';
import { Twitter, Github, Disc } from 'lucide-react';

const Footer = () => {
    return (
        <footer style={{
            borderTop: '1px solid var(--border-subtle)',
            padding: '6rem 0 3rem',
            marginTop: 'auto',
            background: '#020202',
            position: 'relative'
        }}>
            <div className="container">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    <div className="col-span-1 md:col-span-2">
                        <div className="mb-6">
                            <Logo size="small" />
                        </div>
                        <p className="text-gray-400 text-lg leading-relaxed max-w-md">
                            The ultimate resource for premium, copy-paste UI components. Built for developers who care about design.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-white font-semibold mb-6 text-lg">Product</h4>
                        <ul className="space-y-4 text-gray-400">
                            <li><a href="#" className="hover:text-white transition-colors">Components</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Templates</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Changelog</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-semibold mb-6 text-lg">Community</h4>
                        <ul className="space-y-4 text-gray-400">
                            <li><a href="#" className="hover:text-white transition-colors">Discord</a></li>
                            <li><a href="https://x.com/Cool_Dev_" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Twitter</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">GitHub</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">License</a></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-gray-500">&copy; 2025 UI/UX Marketplace. All rights reserved.</p>
                    <div className="flex gap-6">
                        <a href="https://x.com/Cool_Dev_" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors"><Twitter size={20} /></a>
                        <a href="#" className="text-gray-500 hover:text-white transition-colors"><Github size={20} /></a>
                        <a href="#" className="text-gray-500 hover:text-white transition-colors"><Disc size={20} /></a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
