import React, { useEffect, useState } from 'react';
import { fetchNovels } from '../utils/api';
import type { Novel } from '../types';
import { NovelCard } from '../components/NovelCard';

export const Home: React.FC = () => {
    const [novels, setNovels] = useState<Novel[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchNovels()
            .then(setNovels)
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return <div style={{ textAlign: 'center', padding: 'var(--space-12)' }}>Loading library...</div>;
    }

    if (error) {
        return <div style={{ textAlign: 'center', padding: 'var(--space-12)', color: 'red' }}>Error: {error}</div>;
    }

    return (
        <div>
            <header style={{ marginBottom: 'var(--space-8)', textAlign: 'center' }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: 'var(--space-2)' }}>Library</h1>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.125rem' }}>
                    Discover your next favorite story.
                </p>
            </header>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                gap: 'var(--space-6)'
            }}>
                {novels.map(novel => (
                    <NovelCard key={novel.id} novel={novel} />
                ))}
            </div>
        </div>
    );
};
