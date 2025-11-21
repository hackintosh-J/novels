import React from 'react';
import { Link } from 'react-router-dom';
import type { Novel } from '../types';

interface NovelCardProps {
    novel: Novel;
}

export const NovelCard: React.FC<NovelCardProps> = ({ novel }) => {
    return (
        <Link
            to={`/read/${novel.id}`}
            className="novel-card"
            style={{
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: 'var(--color-bg-secondary)',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                transition: 'transform var(--transition-fast), box-shadow var(--transition-fast)',
                border: '1px solid var(--color-border)',
                height: '100%'
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
            }}
        >
            <div style={{ aspectRatio: '2/3', overflow: 'hidden', position: 'relative' }}>
                {novel.coverUrl ? (
                    <img
                        src={novel.coverUrl}
                        alt={novel.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                ) : (
                    <div style={{
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'var(--color-bg-tertiary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--color-text-tertiary)'
                    }}>
                        No Cover
                    </div>
                )}
            </div>
            <div style={{ padding: 'var(--space-4)', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 style={{
                    fontSize: '1.125rem',
                    fontWeight: '600',
                    marginBottom: 'var(--space-1)',
                    lineHeight: 1.4
                }}>
                    {novel.title}
                </h3>
                <p style={{
                    color: 'var(--color-text-secondary)',
                    fontSize: '0.875rem',
                    marginBottom: 'var(--space-2)'
                }}>
                    {novel.author}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-1)', marginTop: 'auto' }}>
                    {novel.tags.map(tag => (
                        <span key={tag} style={{
                            fontSize: '0.75rem',
                            padding: '2px 8px',
                            backgroundColor: 'var(--color-bg-tertiary)',
                            borderRadius: 'var(--radius-full)',
                            color: 'var(--color-text-secondary)'
                        }}>
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </Link>
    );
};
