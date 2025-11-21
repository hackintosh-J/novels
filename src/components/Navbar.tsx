import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, Moon, Sun, Coffee, Upload } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const Navbar: React.FC = () => {
    const { theme, setTheme } = useTheme();
    const location = useLocation();

    const toggleTheme = () => {
        if (theme === 'light') setTheme('dark');
        else if (theme === 'dark') setTheme('sepia');
        else setTheme('light');
    };

    const getThemeIcon = () => {
        switch (theme) {
            case 'light': return <Sun size={20} />;
            case 'dark': return <Moon size={20} />;
            case 'sepia': return <Coffee size={20} />;
        }
    };

    return (
        <nav style={{
            borderBottom: '1px solid var(--color-border)',
            backgroundColor: 'var(--color-bg)',
            position: 'sticky',
            top: 0,
            zIndex: 10
        }}>
            <div className="container" style={{
                height: '64px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>
                <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', fontWeight: 'bold', fontSize: '1.25rem' }}>
                    <BookOpen size={24} color="var(--color-primary)" />
                    <span>NovelReader</span>
                </Link>

                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
                    <Link
                        to="/publish"
                        className={`btn btn-ghost ${location.pathname === '/publish' ? 'active' : ''}`}
                        title="Publish Novel"
                    >
                        <Upload size={20} />
                    </Link>

                    <button
                        onClick={toggleTheme}
                        className="btn btn-ghost"
                        title={`Current theme: ${theme}`}
                    >
                        {getThemeIcon()}
                    </button>
                </div>
            </div>
        </nav>
    );
};
