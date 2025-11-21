import React from 'react';
import Button from './Button';
import ComponentPreview from './ComponentPreview';

const ComponentCard = ({ component, onClick }) => {
    const handleMouseMove = (e) => {
        const { currentTarget: target } = e;
        const rect = target.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        target.style.setProperty("--mouse-x", `${x}px`);
        target.style.setProperty("--mouse-y", `${y}px`);
    };

    return (
        <div
            className="glass-panel group spotlight-card"
            onMouseMove={handleMouseMove}
            style={{
                borderRadius: '24px',
                overflow: 'hidden',
                transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                border: '1px solid rgba(255,255,255,0.05)',
                background: 'rgba(20, 20, 20, 0.6)'
            }}
            onClick={() => onClick(component)}
        >
            {/* Preview Area */}
            <div style={{
                height: '220px',
                background: 'radial-gradient(circle at center, rgba(255,255,255,0.03) 0%, rgba(0,0,0,0.2) 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderBottom: '1px solid var(--border-subtle)',
                padding: '2rem',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div className="absolute inset-0 bg-gradient-to-tr from-violet-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="transform group-hover:scale-105 transition-transform duration-500 w-full flex justify-center">
                    <ComponentPreview component={component} />
                </div>
            </div>

            {/* Content Area */}
            <div style={{ padding: '1.75rem', flex: 1, display: 'flex', flexDirection: 'column', background: 'transparent' }}>
                <div style={{ marginBottom: 'auto' }}>
                    <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '50px',
                        background: 'rgba(255,255,255,0.05)',
                        fontSize: '0.7rem',
                        color: 'var(--accent-primary)',
                        fontWeight: '600',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        marginBottom: '1rem',
                        border: '1px solid rgba(255,255,255,0.05)'
                    }}>
                        {component.category}
                    </div>
                    <h3 style={{ fontSize: '1.35rem', marginBottom: '0.75rem', fontWeight: '700', color: 'white' }}>{component.title}</h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                        {component.description}
                    </p>
                </div>

                <div style={{ marginTop: '2rem', display: 'flex', gap: '0.75rem', opacity: 0, transform: 'translateY(10px)', transition: 'all 0.3s ease' }} className="group-hover:opacity-100 group-hover:translate-y-0">
                    <Button variant="ghost" style={{ flex: 1, fontSize: '0.9rem' }}>Preview</Button>
                    <Button variant="primary" style={{ flex: 1, fontSize: '0.9rem' }}>Get Code</Button>
                </div>
            </div>
        </div>
    );
};

export default ComponentCard;
