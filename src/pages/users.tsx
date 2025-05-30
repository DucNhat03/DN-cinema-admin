import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, Edit, Trash2 } from 'lucide-react';

const users = [
    {
        id: 1,
        name: 'John Doe',
        email: 'john.doe@example.com',
        role: 'Admin',
        status: 'Active',
        lastLogin: '2 hours ago'
    },
    {
        id: 2,
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        role: 'User',
        status: 'Active',
        lastLogin: '1 day ago'
    },
    {
        id: 3,
        name: 'Mike Johnson',
        email: 'mike.johnson@example.com',
        role: 'Editor',
        status: 'Inactive',
        lastLogin: '1 week ago'
    },
    {
        id: 4,
        name: 'Sarah Wilson',
        email: 'sarah.wilson@example.com',
        role: 'User',
        status: 'Active',
        lastLogin: '3 hours ago'
    }
];

const UsersPage: React.FC = () => {
    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center animate-fade-in">
                <div>
                    <h2 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">Users</h2>
                    <p className="text-gray-600 mt-2 text-lg">
                        Manage your application users and their permissions.
                    </p>
                </div>
                <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg shadow-purple-600/25">
                    <Plus className="mr-2 h-4 w-4" />
                    Add User
                </Button>
            </div>

            <div className="flex items-center space-x-4">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input 
                        placeholder="Search users..." 
                        className="pl-10 h-12 border-2 focus:border-purple-500 focus:ring-purple-500 rounded-xl bg-white/80 backdrop-blur-sm"
                    />
                </div>
                <Button variant="outline" className="h-12 px-6 border-2 hover:bg-purple-50 hover:border-purple-200 hover:text-purple-600">
                    Filter
                </Button>
            </div>

            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                <CardHeader className="pb-6">
                    <CardTitle className="text-2xl font-semibold text-gray-900">All Users</CardTitle>
                    <CardDescription className="text-gray-600 text-base">
                        A list of all users in your application including their name, email, role, and status.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {users.map((user, index) => (
                            <div key={user.id} className="flex items-center justify-between p-6 border-2 border-gray-100 rounded-xl hover:border-purple-200 hover:bg-purple-50/50 transition-all duration-200 card-hover animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                                        {user.name.split(' ').map(n => n[0]).join('')}
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900 text-lg">{user.name}</p>
                                        <p className="text-gray-600">{user.email}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-6">
                                    <Badge 
                                        variant={user.role === 'Admin' ? 'default' : 'secondary'}
                                        className={user.role === 'Admin' 
                                            ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg' 
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }
                                    >
                                        {user.role}
                                    </Badge>
                                    <Badge 
                                        variant={user.status === 'Active' ? 'default' : 'secondary'}
                                        className={user.status === 'Active' 
                                            ? 'bg-green-100 text-green-700 border-green-200 hover:bg-green-200' 
                                            : 'bg-red-100 text-red-700 border-red-200'
                                        }
                                    >
                                        {user.status}
                                    </Badge>
                                    <p className="text-sm text-gray-500 min-w-[120px]">
                                        Last login: {user.lastLogin}
                                    </p>
                                    <div className="flex space-x-2">
                                        <Button variant="outline" size="sm" className="hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600">
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                        <Button variant="outline" size="sm" className="hover:bg-red-50 hover:border-red-200 hover:text-red-600">
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default UsersPage;