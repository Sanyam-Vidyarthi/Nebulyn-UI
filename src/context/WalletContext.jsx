import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const WalletContext = createContext({});

export const useWallet = () => useContext(WalletContext);

export const WalletProvider = ({ children }) => {
    const { user } = useAuth();
    const [tokens, setTokens] = useState(0);
    const [transactions, setTransactions] = useState([]);
    const [purchases, setPurchases] = useState([]);
    const [wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState(false);

    // Fetch wallet data when user logs in
    useEffect(() => {
        if (user) {
            refreshWallet();
            fetchPurchases();
            fetchWishlist();
        } else {
            setTokens(0);
            setTransactions([]);
            setPurchases([]);
            setWishlist([]);
        }
    }, [user]);

    const refreshWallet = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return;

            const response = await fetch('http://localhost:5000/api/wallet/balance', {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.ok) {
                const data = await response.json();
                setTokens(data.tokens);
            }
        } catch (error) {
            console.error('Error fetching wallet:', error);
        }
    };

    const fetchPurchases = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return;

            const response = await fetch('http://localhost:5000/api/purchases/my-purchases', {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.ok) {
                const data = await response.json();
                setPurchases(data);
            }
        } catch (error) {
            console.error('Error fetching purchases:', error);
        }
    };

    const fetchWishlist = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return;

            const response = await fetch('http://localhost:5000/api/wishlist/my-wishlist', {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.ok) {
                const data = await response.json();
                setWishlist(data);
            }
        } catch (error) {
            console.error('Error fetching wishlist:', error);
        }
    };

    const purchaseTokens = async (amount) => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');

            const response = await fetch('http://localhost:5000/api/wallet/purchase-tokens', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ amount })
            });

            const data = await response.json();

            if (response.ok) {
                setTokens(data.tokens);
                return { success: true, message: 'Tokens purchased successfully!' };
            } else {
                return { success: false, message: data.message };
            }
        } catch (error) {
            return { success: false, message: error.message };
        } finally {
            setLoading(false);
        }
    };

    const purchaseComponent = async (componentId) => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');

            const response = await fetch(`http://localhost:5000/api/purchases/purchase/${componentId}`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            const data = await response.json();

            if (response.ok) {
                setTokens(data.remainingTokens);
                await fetchPurchases(); // Refresh purchases list
                return { success: true, message: 'Purchase successful!' };
            } else {
                return { success: false, message: data.message };
            }
        } catch (error) {
            return { success: false, message: error.message };
        } finally {
            setLoading(false);
        }
    };

    const toggleWishlist = async (componentId) => {
        try {
            const token = localStorage.getItem('token');
            const isWishlisted = wishlist.some(w => w.component._id === componentId || w.component === componentId);

            const url = isWishlisted
                ? `http://localhost:5000/api/wishlist/remove/${componentId}`
                : `http://localhost:5000/api/wishlist/add/${componentId}`;

            const method = isWishlisted ? 'DELETE' : 'POST';

            const response = await fetch(url, {
                method,
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.ok) {
                await fetchWishlist();
                return { success: true, isWishlisted: !isWishlisted };
            }
        } catch (error) {
            console.error('Error toggling wishlist:', error);
        }
        return { success: false };
    };

    const value = {
        tokens,
        purchases,
        wishlist,
        loading,
        refreshWallet,
        purchaseTokens,
        purchaseComponent,
        toggleWishlist,
        isOwned: (componentId) => purchases.some(p => p.component && (p.component._id === componentId || p.component === componentId)),
        isWishlisted: (componentId) => wishlist.some(w => w.component && (w.component._id === componentId || w.component === componentId))
    };

    return (
        <WalletContext.Provider value={value}>
            {children}
        </WalletContext.Provider>
    );
};
