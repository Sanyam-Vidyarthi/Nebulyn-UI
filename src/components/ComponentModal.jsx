import React from 'react';
import Button from './Button';
import ComponentPreview from './ComponentPreview';
import { useWallet } from '../context/WalletContext';
import { Lock, Download } from 'lucide-react';

const ComponentModal = ({ component, onClose, onCopy }) => {
    const { isOwned, purchaseComponent, loading } = useWallet();

    if (!component) return null;

    const owned = isOwned(component._id);
    // ALL components require purchase - no free code access
    const canViewCode = owned;

    const codeSnippet = component.code || `
// ${component.title}
// Copy this code to your project

<div className="component-wrapper">
  {/* Implementation details would go here */}
  <button className="btn-primary">
    ${component.title}
  </button>
</div>
  `.trim();

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(codeSnippet);
            if (onCopy) onCopy();
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const handleDownload = () => {
        const element = document.createElement("a");
        const file = new Blob([codeSnippet], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = `${component.title.replace(/\s+/g, '_')}.jsx`;
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    };

    const handlePurchase = async () => {
        if (confirm(`Purchase ${component.title} for ${component.tokenPrice} tokens?`)) {
            const result = await purchaseComponent(component._id);
            if (result.success) {
                // Success handled by context/toast usually, but we can force update or just let react reactivity handle it
            } else {
                alert(result.message);
            }
        }
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.8)',
            backdropFilter: 'blur(8px)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem'
        }} onClick={onClose}>
            <div style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-highlight)',
                borderRadius: '24px',
                width: '100%',
                maxWidth: '800px',
                maxHeight: '90vh',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
            }} onClick={e => e.stopPropagation()}>

                {/* Header */}
                <div style={{
                    padding: '1.5rem 2rem',
                    borderBottom: '1px solid var(--border-subtle)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <h2 style={{ fontSize: '1.5rem' }}>{component.title}</h2>
                    <button onClick={onClose} style={{
                        color: 'var(--text-secondary)',
                        fontSize: '1.5rem',
                        padding: '0.5rem'
                    }}>&times;</button>
                </div>

                {/* Content */}
                <div style={{ padding: '2rem', overflowY: 'auto' }}>
                    <div style={{
                        height: '300px',
                        background: 'var(--bg-secondary)',
                        borderRadius: '16px',
                        marginBottom: '2rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '1px solid var(--border-subtle)',
                        padding: '2rem',
                        overflow: 'hidden'
                    }}>
                        <ComponentPreview component={component} />
                    </div>

                    <h3 style={{ marginBottom: '1rem', color: 'var(--text-secondary)' }}>Source Code</h3>

                    <div style={{ position: 'relative' }}>
                        <div style={{
                            background: '#0d0d0d',
                            padding: '1.5rem',
                            borderRadius: '12px',
                            fontFamily: 'monospace',
                            fontSize: '0.9rem',
                            color: '#e5e5e5',
                            overflowX: 'auto',
                            border: '1px solid var(--border-subtle)',
                            filter: canViewCode ? 'none' : 'blur(8px)',
                            userSelect: canViewCode ? 'auto' : 'none',
                            opacity: canViewCode ? 1 : 0.5,
                            minHeight: '150px'
                        }}>
                            <pre>{canViewCode ? codeSnippet : 'Code hidden. Purchase to unlock.'}</pre>
                        </div>

                        {!canViewCode && (
                            <div style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '1rem',
                                zIndex: 10
                            }}>
                                <div style={{
                                    background: 'rgba(0,0,0,0.8)',
                                    padding: '1rem 2rem',
                                    borderRadius: '12px',
                                    border: '1px solid var(--border-highlight)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: '0.5rem'
                                }}>
                                    <Lock size={24} className="text-amber-400" />
                                    <span className="text-white font-medium">Purchase Required</span>
                                    <span className="text-gray-400 text-sm">{component.tokenPrice || 10} tokens</span>
                                    <Button variant="primary" onClick={handlePurchase} disabled={loading}>
                                        Unlock for {component.tokenPrice} Tokens
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer */}
                <div style={{
                    padding: '1.5rem 2rem',
                    borderTop: '1px solid var(--border-subtle)',
                    display: 'flex',
                    justifyContent: 'flex-end',
                    gap: '1rem'
                }}>
                    <Button variant="secondary" onClick={onClose}>Close</Button>
                    {canViewCode && (
                        <>
                            <Button variant="secondary" onClick={handleDownload} className="flex items-center gap-2">
                                <Download size={16} /> Download JSX
                            </Button>
                            <Button variant="primary" onClick={handleCopy}>Copy Code</Button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ComponentModal;
