import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/auth-context';
import {
    LayoutDashboard,
    Users,
    Settings,
    Menu,
    X,
    Calendar as CalendarIcon,
    CheckSquare,
    User,
    LogOut
} from 'lucide-react';

const navigation = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Users', href: '/users', icon: Users },
    { name: 'Tasks', href: '/tasks', icon: CheckSquare },
    { name: 'Calendar', href: '/calendar', icon: CalendarIcon },
    { name: 'Profile', href: '/profile', icon: User },
    { name: 'Settings', href: '/settings', icon: Settings },
];

const Sidebar: React.FC = () => {
    const location = useLocation();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { user, logout } = useAuth();

    const handleLogout = () => {
        logout();
        setSidebarOpen(false);
    };

    return (
        <>
            {/* Mobile sidebar */}
            <div className={cn(
                "relative z-50 lg:hidden",
                sidebarOpen ? "block" : "hidden"
            )}>
                <div className="fixed inset-0 bg-gray-900/80" onClick={() => setSidebarOpen(false)} />
                <div className="fixed inset-0 flex">
                    <div className="relative mr-16 flex w-full max-w-xs flex-1">
                        <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setSidebarOpen(false)}
                            >
                                <X className="h-6 w-6 text-white" />
                            </Button>
                        </div>
                        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white/90 backdrop-blur-xl border-r border-white/20 px-6 pb-4 shadow-xl">
                            <div className="flex h-16 shrink-0 items-center">
                                <div className="flex items-center space-x-2">
                                    <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                                        <span className="text-white font-bold text-sm">DN</span>
                                    </div>
                                    <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">DN Store</h1>
                                </div>
                            </div>
                            <nav className="flex flex-1 flex-col">
                                <ul className="flex flex-1 flex-col gap-y-7">
                                    <li>
                                        <ul className="-mx-2 space-y-1">
                                            {navigation.map((item) => (
                                                <li key={item.name}>
                                                    <Link
                                                        to={item.href}
                                                        className={cn(
                                                            "group flex gap-x-3 rounded-xl p-3 text-sm leading-6 font-semibold transition-all duration-200",
                                                            location.pathname === item.href
                                                                ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-600/25"
                                                                : "text-gray-700 hover:text-purple-600 hover:bg-purple-50 hover:shadow-md"
                                                        )}
                                                    >
                                                        <item.icon className={cn(
                                                            "h-6 w-6 shrink-0 transition-colors",
                                                            location.pathname === item.href ? "text-white" : "group-hover:text-purple-600"
                                                        )} />
                                                        {item.name}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>

            {/* Desktop sidebar */}
            <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white/90 backdrop-blur-xl border-r border-white/20 px-6 pb-4 shadow-xl">
                    <div className="flex h-16 shrink-0 items-center">
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-sm">DN</span>
                            </div>
                            <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">DN Cinema</h1>
                        </div>
                    </div>
                    <nav className="flex flex-1 flex-col">
                        <ul className="flex flex-1 flex-col gap-y-7">
                            <li>
                                <ul className="-mx-2 space-y-1">
                                    {navigation.map((item) => (
                                        <li key={item.name}>
                                            <Link
                                                to={item.href}
                                                className={cn(
                                                    "group flex gap-x-3 rounded-xl p-3 text-sm leading-6 font-semibold transition-all duration-200",
                                                    location.pathname === item.href
                                                        ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-600/25"
                                                        : "text-gray-700 hover:text-purple-600 hover:bg-purple-50 hover:shadow-md"
                                                )}
                                            >
                                                <item.icon className={cn(
                                                    "h-6 w-6 shrink-0 transition-colors",
                                                    location.pathname === item.href ? "text-white" : "group-hover:text-purple-600"
                                                )} />
                                                {item.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        </ul>
                    </nav>
                    
                    {/* User info and logout */}
                    <div className="mt-auto space-y-3">
                        {user && (
                            <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                                <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                                    <span className="text-white font-bold text-xs">{user.name.charAt(0).toUpperCase()}</span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
                                    <p className="text-xs text-gray-500 truncate">{user.email}</p>
                                </div>
                            </div>
                        )}
                        
                        <Button
                            onClick={handleLogout}
                            variant="outline"
                            className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 hover:border-red-300"
                        >
                            <LogOut className="mr-2 h-4 w-4" />
                            Đăng xuất
                        </Button>
                    </div>
                </div>
            </div>

            {/* Mobile menu button */}
            <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-white/90 backdrop-blur-xl px-4 py-4 shadow-lg border-b border-white/20 sm:px-6 lg:hidden">
                <Button
                    variant="ghost"
                    size="icon"
                    className="text-purple-600 hover:bg-purple-50"
                    onClick={() => setSidebarOpen(true)}
                >
                    <Menu className="h-6 w-6" />
                </Button>
                <div className="flex-1 text-sm font-semibold leading-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    Dashboard
                </div>
            </div>
        </>
    );
};

export default Sidebar;