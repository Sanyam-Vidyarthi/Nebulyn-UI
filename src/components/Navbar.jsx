import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from './Button';
import { Logo } from './Logo';

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogoClick = (e) => {
        e.preventDefault();
        // Navigate immediately
        navigate('/');
    };

    return (
        <nav style={{
            padding: '1.25rem 0',
            background: 'rgba(3, 3, 3, 0.6)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            position: 'sticky',
            top: 0,
            zIndex: 100,
            borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
        }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <a href="/" onClick={handleLogoClick} style={{ textDecoration: 'none', cursor: 'pointer' }}>
                    <div className="transition-all duration-300 hover:opacity-90">
                        <Logo size="small" />
                    </div>
                </a>

                <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
                    {['Explore', 'How to Use', 'Components', 'Templates'].map((item) => (
                        <Link
                            key={item}
                            to={item === 'How to Use' ? '/how-to-use' : (item === 'Explore' || item === 'Components' ? '/marketplace' : '/')}
                            style={{
                                color: 'var(--text-secondary)',
                                fontSize: '0.95rem',
                                fontWeight: '500',
                                textDecoration: 'none',
                                transition: 'all 0.2s',
                                position: 'relative'
                            }}
                            className="hover:text-white group"
                        >
                            {item}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all group-hover:w-full opacity-50" />
                        </Link>
                    ))}
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                    <Button
                        variant="ghost"
                        style={{ color: 'var(--text-secondary)' }}
                        onClick={() => navigate('/login')}
                    >
                        Log In
                    </Button>
                    <Button variant="primary" style={{ padding: '0.6rem 1.25rem', fontSize: '0.95rem' }}>Get All Access</Button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
