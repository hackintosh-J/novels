import React, { useState } from 'react';
import { Download, Copy, Plus, Trash } from 'lucide-react';
import type { Novel, Chapter } from '../types';

export const Publisher: React.FC = () => {
    const [novel, setNovel] = useState<Partial<Novel>>({
        id: '',
        title: '',
        author: '',
        description: '',
        tags: [],
        coverUrl: ''
    });

    const [chapters, setChapters] = useState<Partial<Chapter>[]>([
        { id: 'chapter-1', title: 'Chapter 1', content: '', order: 1 }
    ]);

    const [activeTab, setActiveTab] = useState<'novel' | 'chapters'>('novel');

    const handleNovelChange = (field: keyof Novel, value: any) => {
        setNovel(prev => ({ ...prev, [field]: value }));
    };

    const handleChapterChange = (index: number, field: keyof Chapter, value: any) => {
        const newChapters = [...chapters];
        newChapters[index] = { ...newChapters[index], [field]: value };
        setChapters(newChapters);
    };

    const addChapter = () => {
        setChapters(prev => [
            ...prev,
            { id: `chapter-${prev.length + 1}`, title: `Chapter ${prev.length + 1}`, content: '', order: prev.length + 1 }
        ]);
    };

    const removeChapter = (index: number) => {
        setChapters(prev => prev.filter((_, i) => i !== index));
    };

    const generateNovelJSON = () => {
        const data = {
            ...novel,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            chapterCount: chapters.length
        };
        return JSON.stringify(data, null, 2);
    };

    const generateMetaJSON = () => {
        const data = {
            novel: {
                ...novel,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                chapterCount: chapters.length
            },
            chapters: chapters.map(c => ({ id: c.id, title: c.title, order: c.order }))
        };
        return JSON.stringify(data, null, 2);
    };

    const generateChapterJSON = (chapter: Partial<Chapter>) => {
        const data = {
            ...chapter,
            novelId: novel.id,
            createdAt: new Date().toISOString()
        };
        return JSON.stringify(data, null, 2);
    };

    const downloadFile = (filename: string, content: string) => {
        const element = document.createElement('a');
        const file = new Blob([content], { type: 'application/json' });
        element.href = URL.createObjectURL(file);
        element.download = filename;
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    };

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <header style={{ marginBottom: 'var(--space-8)' }}>
                <h1 style={{ fontSize: '2rem', fontWeight: '800' }}>Publisher Studio</h1>
                <p style={{ color: 'var(--color-text-secondary)' }}>Generate files to publish your novel.</p>
            </header>

            <div style={{ display: 'flex', gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
                <button
                    className={`btn ${activeTab === 'novel' ? 'btn-primary' : 'btn-ghost'}`}
                    onClick={() => setActiveTab('novel')}
                >
                    Novel Details
                </button>
                <button
                    className={`btn ${activeTab === 'chapters' ? 'btn-primary' : 'btn-ghost'}`}
                    onClick={() => setActiveTab('chapters')}
                >
                    Chapters ({chapters.length})
                </button>
            </div>

            {activeTab === 'novel' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                    <div className="form-group">
                        <label style={{ display: 'block', marginBottom: 'var(--space-2)', fontWeight: '500' }}>ID (Slug)</label>
                        <input
                            type="text"
                            value={novel.id}
                            onChange={e => handleNovelChange('id', e.target.value)}
                            placeholder="my-awesome-novel"
                            style={{ width: '100%', padding: 'var(--space-2)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', background: 'var(--color-bg)' }}
                        />
                    </div>
                    <div className="form-group">
                        <label style={{ display: 'block', marginBottom: 'var(--space-2)', fontWeight: '500' }}>Title</label>
                        <input
                            type="text"
                            value={novel.title}
                            onChange={e => handleNovelChange('title', e.target.value)}
                            placeholder="The Great Adventure"
                            style={{ width: '100%', padding: 'var(--space-2)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', background: 'var(--color-bg)' }}
                        />
                    </div>
                    <div className="form-group">
                        <label style={{ display: 'block', marginBottom: 'var(--space-2)', fontWeight: '500' }}>Author</label>
                        <input
                            type="text"
                            value={novel.author}
                            onChange={e => handleNovelChange('author', e.target.value)}
                            placeholder="Jane Doe"
                            style={{ width: '100%', padding: 'var(--space-2)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', background: 'var(--color-bg)' }}
                        />
                    </div>
                    <div className="form-group">
                        <label style={{ display: 'block', marginBottom: 'var(--space-2)', fontWeight: '500' }}>Description</label>
                        <textarea
                            value={novel.description}
                            onChange={e => handleNovelChange('description', e.target.value)}
                            rows={4}
                            style={{ width: '100%', padding: 'var(--space-2)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', background: 'var(--color-bg)' }}
                        />
                    </div>
                    <div className="form-group">
                        <label style={{ display: 'block', marginBottom: 'var(--space-2)', fontWeight: '500' }}>Cover URL</label>
                        <input
                            type="text"
                            value={novel.coverUrl}
                            onChange={e => handleNovelChange('coverUrl', e.target.value)}
                            placeholder="https://..."
                            style={{ width: '100%', padding: 'var(--space-2)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', background: 'var(--color-bg)' }}
                        />
                    </div>

                    <div style={{ marginTop: 'var(--space-4)', padding: 'var(--space-4)', backgroundColor: 'var(--color-bg-secondary)', borderRadius: 'var(--radius-md)' }}>
                        <h3 style={{ marginBottom: 'var(--space-2)' }}>Generated Files</h3>
                        <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                            <button onClick={() => downloadFile('meta.json', generateMetaJSON())} className="btn btn-primary">
                                <Download size={16} style={{ marginRight: 'var(--space-2)' }} /> meta.json
                            </button>
                            <button onClick={() => navigator.clipboard.writeText(generateNovelJSON())} className="btn btn-ghost">
                                <Copy size={16} style={{ marginRight: 'var(--space-2)' }} /> Copy Novel Entry
                            </button>
                        </div>
                        <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginTop: 'var(--space-2)' }}>
                            Download <code>meta.json</code> and place it in <code>public/novels/{novel.id}/</code>.
                            <br />
                            Copy the Novel Entry and add it to <code>public/novels/novels.json</code>.
                        </p>
                    </div>
                </div>
            )}

            {activeTab === 'chapters' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
                    {chapters.map((chapter, index) => (
                        <div key={index} style={{ padding: 'var(--space-4)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-4)' }}>
                                <h3 style={{ fontWeight: '600' }}>Chapter {index + 1}</h3>
                                <button onClick={() => removeChapter(index)} className="btn btn-ghost" style={{ color: 'red' }}>
                                    <Trash size={16} />
                                </button>
                            </div>

                            <div className="form-group" style={{ marginBottom: 'var(--space-4)' }}>
                                <label style={{ display: 'block', marginBottom: 'var(--space-2)', fontWeight: '500' }}>ID</label>
                                <input
                                    type="text"
                                    value={chapter.id}
                                    onChange={e => handleChapterChange(index, 'id', e.target.value)}
                                    style={{ width: '100%', padding: 'var(--space-2)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', background: 'var(--color-bg)' }}
                                />
                            </div>
                            <div className="form-group" style={{ marginBottom: 'var(--space-4)' }}>
                                <label style={{ display: 'block', marginBottom: 'var(--space-2)', fontWeight: '500' }}>Title</label>
                                <input
                                    type="text"
                                    value={chapter.title}
                                    onChange={e => handleChapterChange(index, 'title', e.target.value)}
                                    style={{ width: '100%', padding: 'var(--space-2)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', background: 'var(--color-bg)' }}
                                />
                            </div>
                            <div className="form-group" style={{ marginBottom: 'var(--space-4)' }}>
                                <label style={{ display: 'block', marginBottom: 'var(--space-2)', fontWeight: '500' }}>Content (HTML/Markdown)</label>
                                <textarea
                                    value={chapter.content}
                                    onChange={e => handleChapterChange(index, 'content', e.target.value)}
                                    rows={10}
                                    style={{ width: '100%', padding: 'var(--space-2)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', background: 'var(--color-bg)' }}
                                />
                            </div>

                            <button onClick={() => downloadFile(`${chapter.id}.json`, generateChapterJSON(chapter))} className="btn btn-primary">
                                <Download size={16} style={{ marginRight: 'var(--space-2)' }} /> Download {chapter.id}.json
                            </button>
                        </div>
                    ))}

                    <button onClick={addChapter} className="btn btn-ghost" style={{ alignSelf: 'center' }}>
                        <Plus size={20} style={{ marginRight: 'var(--space-2)' }} /> Add Chapter
                    </button>
                </div>
            )}
        </div>
    );
};
