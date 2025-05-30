import React from 'react';
import Sidebar from '../dashboard/sidebar';
import Header from '../dashboard/header';

interface MainLayoutProps {
    children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
            <Sidebar />
            <div className="lg:pl-72">
                <Header />
                <main className="py-8">
                    <div className="px-4 sm:px-6 lg:px-8 animate-fade-in">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default MainLayout;