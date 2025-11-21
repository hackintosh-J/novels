import React from 'react';
import { Navbar } from './Navbar';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <>
            <Navbar />
            <main className="container" style={{ paddingBottom: 'var(--space-12)', paddingTop: 'var(--space-8)' }}>
                {children}
            </main>
        </>
    );
};
