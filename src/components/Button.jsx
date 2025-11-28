import React from 'react';

import { Link } from 'react-router-dom';

const Button = ({ children, variant = 'primary', className = '', href, ...props }) => {
    const baseStyle = {
        padding: '0.75rem 1.5rem',
        borderRadius: '8px',
        fontWeight: '600',
        transition: 'var(--transition-fast)',
        cursor: 'pointer',
        border: 'none',
        fontFamily: 'inherit',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        textDecoration: 'none', // Ensure links don't have underline
    };

    const variants = {
        primary: {
            background: 'var(--accent-primary)',
            color: 'white',
            boxShadow: '0 0 20px var(--accent-glow)',
        },
        secondary: {
            background: 'var(--bg-secondary)',
            color: 'var(--text-primary)',
            border: '1px solid var(--border-subtle)',
        },
        ghost: {
            background: 'transparent',
            color: 'var(--text-secondary)',
        }
    };

    const combinedStyle = { ...baseStyle, ...variants[variant] };

    if (href) {
        return (
            <Link to={href} style={combinedStyle} className={className} {...props}>
                {children}
            </Link>
        );
    }

    return (
        <button
            style={combinedStyle}
            className={className}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
