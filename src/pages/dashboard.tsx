import React from 'react';
import StatsCards from '../components/dashboard/stats-cards';
import AnalyticsChart from '../components/dashboard/analytics-chart';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowUpRight, TrendingUp, Users, Activity, BarChart3 } from 'lucide-react';

const DashboardPage: React.FC = () => {
    return (
        <div className="space-y-8">
            <div className="animate-fade-in">
                <h2 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">Dashboard</h2>
                <p className="text-gray-600 mt-2 text-lg">
                    Welcome back! Here's what's happening with your business today.
                </p>
            </div>
            
            <StatsCards />
                 
            {/* Performance Metrics */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 animate-slide-up" style={{ animationDelay: '0.3s' }}>
                <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50 card-hover">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-blue-600">Server Uptime</p>
                                <p className="text-2xl font-bold text-blue-900">99.8%</p>
                                <p className="text-xs text-blue-600 mt-1">Last 30 days</p>
                            </div>
                            <div className="p-3 bg-blue-600 rounded-xl">
                                <Activity className="h-6 w-6 text-white" />
                            </div>
                        </div>
                        <div className="mt-4 h-2 bg-blue-200 rounded-full overflow-hidden">
                            <div className="h-full w-[99.8%] bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"></div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50 card-hover">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-green-600">Response Time</p>
                                <p className="text-2xl font-bold text-green-900">245ms</p>
                                <p className="text-xs text-green-600 mt-1 flex items-center">
                                    <TrendingUp className="h-3 w-3 mr-1" />
                                    8% faster
                                </p>
                            </div>
                            <div className="p-3 bg-green-600 rounded-xl">
                                <BarChart3 className="h-6 w-6 text-white" />
                            </div>
                        </div>
                        <div className="mt-4 h-2 bg-green-200 rounded-full overflow-hidden">
                            <div className="h-full w-[85%] bg-gradient-to-r from-green-500 to-green-600 rounded-full"></div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-violet-50 card-hover">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-purple-600">Active Sessions</p>
                                <p className="text-2xl font-bold text-purple-900">1,245</p>
                                <p className="text-xs text-purple-600 mt-1">Currently online</p>
                            </div>
                            <div className="p-3 bg-purple-600 rounded-xl">
                                <Users className="h-6 w-6 text-white" />
                            </div>
                        </div>
                        <div className="mt-4 flex space-x-1">
                            {[85, 92, 78, 95, 88, 90, 94].map((height, index) => (
                                <div 
                                    key={index} 
                                    className="flex-1 bg-purple-600 rounded-sm" 
                                    style={{ height: `${height / 4}px` }}
                                ></div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-50 to-amber-50 card-hover">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-orange-600">Error Rate</p>
                                <p className="text-2xl font-bold text-orange-900">0.12%</p>
                                <p className="text-xs text-orange-600 mt-1">Below threshold</p>
                            </div>
                            <div className="p-3 bg-orange-600 rounded-xl">
                                <Activity className="h-6 w-6 text-white" />
                            </div>
                        </div>
                        <div className="mt-4">
                            <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                                Healthy
                            </Badge>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Analytics Chart Section */}
            <div className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
                <AnalyticsChart />
            </div>

            <div className="grid gap-6 md:grid-cols-1">
                <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm card-hover">
                    <CardHeader className="pb-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="text-xl font-semibold text-gray-900">Recent Activity</CardTitle>
                                <CardDescription className="text-gray-600 mt-1">
                                    Latest user activities and system events
                                </CardDescription>
                            </div>
                            <Button variant="ghost" size="icon" className="hover:bg-purple-50 hover:text-purple-600">
                                <ArrowUpRight className="h-4 w-4" />
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center gap-4 p-3 rounded-lg bg-blue-50 border border-blue-100">
                            <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                            <div className="flex-1">
                                <p className="text-sm font-medium text-gray-900">New user registration</p>
                                <p className="text-xs text-gray-500">john.doe@example.com</p>
                            </div>
                            <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded-full">2 min ago</span>
                        </div>
                        <div className="flex items-center gap-4 p-3 rounded-lg bg-green-50 border border-green-100">
                            <div className="h-2 w-2 rounded-full bg-green-500"></div>
                            <div className="flex-1">
                                <p className="text-sm font-medium text-gray-900">Payment processed</p>
                                <p className="text-xs text-gray-500">$150.00 from Premium Plan</p>
                            </div>
                            <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded-full">5 min ago</span>
                        </div>
                        <div className="flex items-center gap-4 p-3 rounded-lg bg-orange-50 border border-orange-100">
                            <div className="h-2 w-2 rounded-full bg-orange-500"></div>
                            <div className="flex-1">
                                <p className="text-sm font-medium text-gray-900">System maintenance</p>
                                <p className="text-xs text-gray-500">Scheduled backup completed</p>
                            </div>
                            <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded-full">1 hour ago</span>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Analytics & System Overview */}
            <div className="grid gap-6 md:grid-cols-1 animate-slide-up" style={{ animationDelay: '0.6s' }}>
                <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm card-hover">
                    <CardHeader className="pb-4">
                        <CardTitle className="text-xl font-semibold text-gray-900">Top Performing Pages</CardTitle>
                        <CardDescription className="text-gray-600 mt-1">
                            Most visited pages this week
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50">
                                <div>
                                    <p className="text-sm font-medium text-gray-900">/dashboard</p>
                                    <p className="text-xs text-gray-500">Admin Dashboard</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-semibold text-gray-900">24,560</p>
                                    <p className="text-xs text-green-600">+12%</p>
                                </div>
                            </div>
                            
                            <div className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-green-50 to-blue-50">
                                <div>
                                    <p className="text-sm font-medium text-gray-900">/users</p>
                                    <p className="text-xs text-gray-500">User Management</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-semibold text-gray-900">18,340</p>
                                    <p className="text-xs text-green-600">+8%</p>
                                </div>
                            </div>
                            
                            <div className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-purple-50 to-pink-50">
                                <div>
                                    <p className="text-sm font-medium text-gray-900">/settings</p>
                                    <p className="text-xs text-gray-500">System Settings</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-semibold text-gray-900">12,890</p>
                                    <p className="text-xs text-red-600">-3%</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default DashboardPage;