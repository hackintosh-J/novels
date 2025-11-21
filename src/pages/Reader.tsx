import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { fetchNovelMetadata, fetchChapter } from '../utils/api';
import type { NovelMetadata, Chapter } from '../types';
import { ChevronLeft, ChevronRight, Settings } from 'lucide-react';

export const Reader: React.FC = () => {
    const { novelId, chapterId } = useParams<{ novelId: string; chapterId: string }>();
    const navigate = useNavigate();

    const [metadata, setMetadata] = useState<NovelMetadata | null>(null);
    const [chapter, setChapter] = useState<Chapter | null>(null);
    const [loading, setLoading] = useState(true);
    const [fontSize, setFontSize] = useState(18);
    const [showMenu, setShowMenu] = useState(false);

    useEffect(() => {
        if (!novelId) return;

        const loadData = async () => {
            try {
                setLoading(true);
                const meta = await fetchNovelMetadata(novelId);
                setMetadata(meta);

                // If no chapterId, redirect to first chapter
                if (!chapterId && meta.chapters.length > 0) {
                    navigate(`/read/${novelId}/${meta.chapters[0].id}`, { replace: true });
                    return;
                }

                if (chapterId) {
                    const chap = await fetchChapter(novelId, chapterId);
                    setChapter(chap);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [novelId, chapterId, navigate]);

    if (loading) return <div style={{ textAlign: 'center', padding: 'var(--space-12)' }}>Loading chapter...</div>;
    if (!metadata || !chapter) return <div style={{ textAlign: 'center', padding: 'var(--space-12)' }}>Chapter not found.</div>;

    const currentChapterIndex = metadata.chapters.findIndex(c => c.id === chapter.id);
    const prevChapter = metadata.chapters[currentChapterIndex - 1];
    const nextChapter = metadata.chapters[currentChapterIndex + 1];

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            {/* Controls Bar */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 'var(--space-8)',
                padding: 'var(--space-4)',
                backgroundColor: 'var(--color-bg-secondary)',
                borderRadius: 'var(--radius-md)',
                position: 'sticky',
                top: '80px',
                zIndex: 5,
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                border: '1px solid var(--glass-border)'
            }}>
                <Link to="/" className="btn btn-ghost" title="Back to Library">
                    <ChevronLeft size={20} /> Library
                </Link>

                <h2 style={{ fontSize: '1rem', fontWeight: '600', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '200px' }}>
                    {chapter.title}
                </h2>

                <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                    <button onClick={() => setShowMenu(!showMenu)} className="btn btn-ghost">
                        <Settings size={20} />
                    </button>
                </div>
            </div>

            {/* Settings Menu */}
            {showMenu && (
                <div style={{
                    marginBottom: 'var(--space-8)',
                    padding: 'var(--space-4)',
                    backgroundColor: 'var(--color-bg-secondary)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--color-border)'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
                        <span>Font Size:</span>
                        <button onClick={() => setFontSize(s => Math.max(14, s - 2))} className="btn btn-ghost">-</button>
                        <span>{fontSize}px</span>
                        <button onClick={() => setFontSize(s => Math.min(32, s + 2))} className="btn btn-ghost">+</button>
                    </div>
                </div>
            )}

            {/* Content */}
            <article style={{
                fontSize: `${fontSize}px`,
                lineHeight: '2',
                fontFamily: 'var(--font-serif)',
                marginBottom: 'var(--space-16)',
                textAlign: 'justify',
                maxWidth: '100%',
                overflowWrap: 'break-word'
            }} className="reader-content">
                <div dangerouslySetInnerHTML={{ __html: chapter.content }} />
            </article>

            <style>{`
        .reader-content p {
          margin-bottom: 1.5em;
          text-indent: 2em;
        }
        .reader-content h1, .reader-content h2, .reader-content h3 {
          margin-top: 2em;
          margin-bottom: 1em;
          font-weight: bold;
          text-align: center;
        }
      `}</style>

            {/* Navigation Footer */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: 'var(--space-12)',
                borderTop: '1px solid var(--color-border)',
                paddingTop: 'var(--space-8)'
            }}>
                {prevChapter ? (
                    <Link to={`/read/${novelId}/${prevChapter.id}`} className="btn btn-ghost">
                        <ChevronLeft size={20} /> Previous
                    </Link>
                ) : <div />}

                {nextChapter ? (
                    <Link to={`/read/${novelId}/${nextChapter.id}`} className="btn btn-primary">
                        Next <ChevronRight size={20} />
                    </Link>
                ) : <div />}
            </div>
        </div>
    );
};
