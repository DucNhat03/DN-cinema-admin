import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/auth-context';
import { useNavigate } from 'react-router-dom';
import { 
    Bell, Search, User, Settings, Moon, Sun, Filter, 
    Shield, Database, Mic, X, FileText,
    LogOut, Clock, MessageSquare, Activity,
    BarChart3, AlertTriangle, CheckCircle, DollarSign
} from 'lucide-react';

const Header: React.FC = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [isVoiceActive, setIsVoiceActive] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    // Sample notifications data
    const notifications = [
        { id: 1, type: 'user', message: 'New user registration: jane.doe@example.com', time: '2 min ago', unread: true },
        { id: 2, type: 'payment', message: 'Payment of $250 received', time: '5 min ago', unread: true },
        { id: 3, type: 'system', message: 'System backup completed successfully', time: '1 hour ago', unread: false },
        { id: 4, type: 'alert', message: 'High CPU usage detected on server', time: '2 hours ago', unread: true },
    ];

    // Quick search suggestions
    const searchSuggestions = [
        { icon: User, label: 'Add New User', category: 'Quick Actions', shortcut: 'Ctrl+N' },
        { icon: Settings, label: 'System Settings', category: 'Quick Actions', shortcut: 'Ctrl+,' },
        { icon: BarChart3, label: 'Analytics Dashboard', category: 'Navigation', shortcut: 'Ctrl+A' },
        { icon: FileText, label: 'Generate Reports', category: 'Quick Actions', shortcut: 'Ctrl+R' },
        { icon: Shield, label: 'Security Logs', category: 'Monitoring', shortcut: 'Ctrl+L' },
        { icon: Database, label: 'Database Management', category: 'Tools', shortcut: 'Ctrl+D' },
    ];

    const filteredSuggestions = searchSuggestions.filter(suggestion =>
        suggestion.label.toLowerCase().includes(searchValue.toLowerCase())
    );

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.ctrlKey && e.key === 'k') {
                e.preventDefault();
                setShowSearch(true);
                document.getElementById('search-field')?.focus();
            }
            if (e.key === 'Escape') {
                setShowSearch(false);
                setShowNotifications(false);
                setShowProfile(false);
            }
        };

        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (!target.closest('.dropdown-container')) {
                setShowNotifications(false);
                setShowProfile(false);
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 bg-white/95 backdrop-blur-xl border-b border-gray-200/50 px-4 shadow-lg sm:gap-x-20 sm:px-6 lg:px-8">
            {/* Search Container */}
            <div className="flex flex-1 items-center max-w-4xl">
                <div className="relative w-full">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-4 w-4 text-gray-400" />
                    </div>
                    <Input
                        id="search-field"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        className="w-full h-10 pl-10 pr-24 text-sm text-gray-900 placeholder:text-gray-500 border border-gray-300 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 rounded-lg bg-white transition-all duration-200"
                        placeholder="Search anything... (Ctrl+K)"
                        type="search"
                        name="search"
                        onFocus={() => setShowSearch(true)}
                        onBlur={() => setTimeout(() => setShowSearch(false), 200)}
                    />
                    <div className="absolute inset-y-0 right-0 pr-2 flex items-center space-x-1">
                        <Button 
                            variant="ghost" 
                            size="sm" 
                            className={`h-6 w-6 p-0 transition-colors duration-200 ${isVoiceActive ? 'bg-red-100 text-red-600' : 'hover:bg-gray-100 text-gray-400'}`}
                            onClick={() => setIsVoiceActive(!isVoiceActive)}
                        >
                            <Mic className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0 hover:bg-gray-100 text-gray-400">
                            <Filter className="h-3 w-3" />
                        </Button>
                        <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 text-xs font-medium text-gray-500 bg-gray-100 border border-gray-200 rounded">
                            ⌘K
                        </kbd>
                    </div>
                    {/* Enhanced Search Dropdown */}
                    {showSearch && (
                        <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-xl border border-gray-200 z-50 max-h-96 overflow-y-auto">
                            {searchValue && (
                                <div className="p-3 border-b border-gray-100">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium text-gray-700">
                                            Search results for "{searchValue}"
                                        </span>
                                        <Button variant="ghost" size="sm" onClick={() => setSearchValue('')}>
                                            <X className="h-3 w-3" />
                                        </Button>
                                    </div>
                                </div>
                            )}
                            
                            <div className="p-3">
                                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Quick Actions</div>
                                <div className="space-y-1">
                                    {filteredSuggestions.slice(0, 4).map((suggestion, index) => (
                                        <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-md cursor-pointer transition-colors group">
                                            <div className="flex items-center">
                                                <div className="p-1 bg-gray-100 rounded mr-2 group-hover:bg-gray-200 transition-colors">
                                                    <suggestion.icon className="h-3 w-3 text-gray-600" />
                                                </div>
                                                <div>
                                                    <span className="text-sm font-medium text-gray-900">{suggestion.label}</span>
                                                    <div className="text-xs text-gray-500">{suggestion.category}</div>
                                                </div>
                                            </div>
                                            <kbd className="text-xs text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded border">
                                                {suggestion.shortcut}
                                            </kbd>
                                        </div>
                                    ))}
                                </div>
                                
                                <div className="pt-2 mt-2 border-t border-gray-100">
                                    <div className="text-xs text-gray-500 mb-2">Recent searches</div>
                                    <div className="flex flex-wrap gap-1">
                                        {['user management', 'system logs', 'analytics'].map((term, index) => (
                                            <Badge key={index} variant="outline" className="text-xs cursor-pointer hover:bg-gray-50">
                                                {term}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-x-2 ml-auto">
                {/* Quick Stats */}
                <div className="hidden xl:flex items-center space-x-3 px-3 py-1.5 bg-gray-50 rounded-lg">
                    <div className="text-center">
                        <div className="text-xs font-bold text-gray-900">2,048</div>
                        <div className="text-xs text-gray-500">Users</div>
                    </div>
                    <div className="w-px h-6 bg-gray-300"></div>
                    <div className="text-center">
                        <div className="text-xs font-bold text-green-600">98.5%</div>
                        <div className="text-xs text-gray-500">Uptime</div>
                    </div>
                </div>

                {/* Theme Toggle */}
                <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 hover:bg-gray-100 transition-colors duration-200"
                    onClick={() => setIsDarkMode(!isDarkMode)}
                >
                    {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </Button>

                {/* Notifications */}
                <div className="relative dropdown-container">
                    <Button 
                        variant="ghost" 
                        size="icon" 
                        className="relative h-8 w-8 hover:bg-gray-100 transition-colors duration-200"
                        onClick={() => setShowNotifications(!showNotifications)}
                    >
                        <Bell className="h-4 w-4" />
                        <Badge className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 border-2 border-white flex items-center justify-center p-0">
                            <span className="text-xs text-white font-bold">3</span>
                        </Badge>
                    </Button>

                    {/* Notifications Dropdown */}
                    {showNotifications && (
                        <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
                            <div className="p-4 border-b border-gray-100">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
                                    <Button variant="ghost" size="sm" className="text-purple-600 hover:bg-purple-50">
                                        Mark all read
                                    </Button>
                                </div>
                            </div>
                            <div className="max-h-80 overflow-y-auto">
                                {notifications.map((notification) => (
                                    <div key={notification.id} className={`p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors ${notification.unread ? 'bg-blue-50/30' : ''}`}>
                                        <div className="flex items-start">
                                            <div className={`p-2 rounded-lg mr-3 ${
                                                notification.type === 'user' ? 'bg-blue-100 text-blue-600' :
                                                notification.type === 'payment' ? 'bg-green-100 text-green-600' :
                                                notification.type === 'system' ? 'bg-gray-100 text-gray-600' :
                                                'bg-red-100 text-red-600'
                                            }`}>
                                                {notification.type === 'user' && <User className="h-4 w-4" />}
                                                {notification.type === 'payment' && <DollarSign className="h-4 w-4" />}
                                                {notification.type === 'system' && <CheckCircle className="h-4 w-4" />}
                                                {notification.type === 'alert' && <AlertTriangle className="h-4 w-4" />}
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-sm text-gray-900">{notification.message}</p>
                                                <div className="flex items-center mt-1">
                                                    <Clock className="h-3 w-3 text-gray-400 mr-1" />
                                                    <span className="text-xs text-gray-500">{notification.time}</span>
                                                    {notification.unread && (
                                                        <div className="ml-2 h-2 w-2 bg-blue-500 rounded-full"></div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="p-3 bg-gray-50 rounded-b-lg">
                                <Button variant="ghost" className="w-full text-purple-600 hover:bg-purple-50">
                                    View all notifications
                                </Button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Settings */}
                <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 hover:bg-gray-100 transition-colors duration-200"
                    onClick={() => navigate('/settings')}
                >
                    <Settings className="h-4 w-4" />
                </Button>

                {/* Profile */}
                <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-300" />
                <div className="relative dropdown-container flex items-center space-x-3">
                    <div className="hidden lg:block text-right">
                        <div className="text-sm font-semibold text-gray-900">{user?.name || 'User'}</div>
                        <div className="text-xs text-gray-500 capitalize">{user?.role || 'Member'}</div>
                    </div>
                    <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 hover:bg-gray-100 transition-colors duration-200"
                        onClick={() => setShowProfile(!showProfile)}
                    >
                        {user?.avatar ? (
                            <img 
                                src={user.avatar} 
                                alt={user.name} 
                                className="h-8 w-8 rounded-lg object-cover"
                            />
                        ) : (
                            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
                                <User className="h-4 w-4 text-white" />
                            </div>
                        )}
                    </Button>

                    {/* Profile Dropdown */}
                    {showProfile && (
                        <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
                            <div className="p-4 border-b border-gray-100">
                                <div className="flex items-center">
                                    {user?.avatar ? (
                                        <img 
                                            src={user.avatar} 
                                            alt={user.name} 
                                            className="h-10 w-10 rounded-lg object-cover mr-3"
                                        />
                                    ) : (
                                        <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center mr-3">
                                            <User className="h-5 w-5 text-white" />
                                        </div>
                                    )}
                                    <div>
                                        <div className="font-semibold text-gray-900">{user?.name || 'User'}</div>
                                        <div className="text-sm text-gray-500">{user?.email || 'user@example.com'}</div>
                                        <Badge variant="outline" className="mt-1 text-xs capitalize">{user?.role || 'Member'}</Badge>
                                    </div>
                                </div>
                            </div>
                            <div className="p-2">
                                <Button 
                                    variant="ghost" 
                                    className="w-full justify-start px-3 py-2 hover:bg-gray-50"
                                    onClick={() => {
                                        navigate('/profile');
                                        setShowProfile(false);
                                    }}
                                >
                                    <User className="h-4 w-4 mr-3" />
                                    My Profile
                                </Button>
                                <Button 
                                    variant="ghost" 
                                    className="w-full justify-start px-3 py-2 hover:bg-gray-50"
                                    onClick={() => {
                                        navigate('/settings');
                                        setShowProfile(false);
                                    }}
                                >
                                    <Settings className="h-4 w-4 mr-3" />
                                    Settings
                                </Button>
                                <Button variant="ghost" className="w-full justify-start px-3 py-2 hover:bg-gray-50">
                                    <Activity className="h-4 w-4 mr-3" />
                                    Activity Log
                                </Button>
                                <Button variant="ghost" className="w-full justify-start px-3 py-2 hover:bg-gray-50">
                                    <MessageSquare className="h-4 w-4 mr-3" />
                                    Help & Support
                                </Button>
                                <div className="border-t border-gray-100 mt-2 pt-2">
                                    <Button 
                                        variant="ghost" 
                                        className="w-full justify-start px-3 py-2 text-red-600 hover:bg-red-50"
                                        onClick={() => {
                                            handleLogout();
                                            setShowProfile(false);
                                        }}
                                    >
                                        <LogOut className="h-4 w-4 mr-3" />
                                        Sign Out
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Header;