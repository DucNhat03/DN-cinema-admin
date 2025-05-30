import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/contexts/auth-context';
import { User, Shield, Bell, Palette, CheckCircle } from 'lucide-react';

const SettingsPage: React.FC = () => {
    const { user, updateProfile, isLoading } = useAuth();
    const [profileForm, setProfileForm] = useState({
        name: user?.name || '',
        email: user?.email || ''
    });
    const [passwordForm, setPasswordForm] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [isUpdating, setIsUpdating] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const handleProfileUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsUpdating(true);
        setSuccessMessage('');

        try {
            const success = await updateProfile({
                name: profileForm.name,
                email: profileForm.email
            });

            if (success) {
                setSuccessMessage('Profile updated successfully!');
                setTimeout(() => setSuccessMessage(''), 3000);
            }
        } catch (error) {
            console.error('Profile update failed:', error);
        } finally {
            setIsUpdating(false);
        }
    };

    const handlePasswordUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (passwordForm.newPassword !== passwordForm.confirmPassword) {
            alert('New passwords do not match');
            return;
        }
        // Password update logic would go here
        alert('Password update functionality would be implemented here');
    };

    // Parse first and last name
    const nameParts = user?.name?.split(' ') || [''];
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';

    return (
        <div className="space-y-8">
            <div className="animate-fade-in">
                <h2 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">Settings</h2>
                <p className="text-gray-600 mt-2 text-lg">
                    Manage your account settings and application preferences.
                </p>
            </div>

            <div className="grid gap-8">
                <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm card-hover animate-slide-up">
                    <CardHeader className="pb-6">
                        <CardTitle className="flex items-center gap-3 text-xl">
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <User className="h-5 w-5 text-blue-600" />
                            </div>
                            Profile Information
                        </CardTitle>
                        <CardDescription className="text-gray-600 text-base">
                            Update your personal information and contact details.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {successMessage && (
                            <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                                <CheckCircle className="h-4 w-4 text-green-600" />
                                <span className="text-sm text-green-700">{successMessage}</span>
                            </div>
                        )}
                        <form onSubmit={handleProfileUpdate}>
                            <div className="grid grid-cols-2 gap-6 mb-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-700">First Name</label>
                                    <Input 
                                        value={firstName}
                                        onChange={(e) => {
                                            const newFirstName = e.target.value;
                                            setProfileForm(prev => ({
                                                ...prev,
                                                name: `${newFirstName} ${lastName}`.trim()
                                            }));
                                        }}
                                        placeholder="Enter first name" 
                                        className="h-12 border-2 focus:border-purple-500 focus:ring-purple-500 rounded-xl" 
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-700">Last Name</label>
                                    <Input 
                                        value={lastName}
                                        onChange={(e) => {
                                            const newLastName = e.target.value;
                                            setProfileForm(prev => ({
                                                ...prev,
                                                name: `${firstName} ${newLastName}`.trim()
                                            }));
                                        }}
                                        placeholder="Enter last name" 
                                        className="h-12 border-2 focus:border-purple-500 focus:ring-purple-500 rounded-xl" 
                                    />
                                </div>
                            </div>
                            <div className="space-y-2 mb-6">
                                <label className="text-sm font-semibold text-gray-700">Email</label>
                                <Input 
                                    value={profileForm.email}
                                    onChange={(e) => setProfileForm(prev => ({ ...prev, email: e.target.value }))}
                                    placeholder="Enter email address" 
                                    type="email" 
                                    className="h-12 border-2 focus:border-purple-500 focus:ring-purple-500 rounded-xl" 
                                />
                            </div>
                            <div className="space-y-2 mb-6">
                                <label className="text-sm font-semibold text-gray-700">Role</label>
                                <div className="flex items-center h-12 px-3 bg-gray-50 border-2 border-gray-200 rounded-xl">
                                    <Badge variant="outline" className="capitalize bg-blue-100 text-blue-700 border-blue-200">
                                        {user?.role || 'Member'}
                                    </Badge>
                                    <span className="ml-2 text-sm text-gray-500">Role cannot be changed</span>
                                </div>
                            </div>
                            <div className="space-y-2 mb-6">
                                <label className="text-sm font-semibold text-gray-700">Member Since</label>
                                <div className="flex items-center h-12 px-3 bg-gray-50 border-2 border-gray-200 rounded-xl">
                                    <span className="text-sm text-gray-700">
                                        {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        }) : 'Unknown'}
                                    </span>
                                </div>
                            </div>
                            <Button 
                                type="submit"
                                disabled={isUpdating || isLoading}
                                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg shadow-purple-600/25 h-12 px-8"
                            >
                                {isUpdating ? 'Saving...' : 'Save Changes'}
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm card-hover animate-slide-up" style={{ animationDelay: '0.1s' }}>
                    <CardHeader className="pb-6">
                        <CardTitle className="flex items-center gap-3 text-xl">
                            <div className="p-2 bg-green-100 rounded-lg">
                                <Shield className="h-5 w-5 text-green-600" />
                            </div>
                            Security Settings
                        </CardTitle>
                        <CardDescription className="text-gray-600 text-base">
                            Manage your password and security preferences.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <form onSubmit={handlePasswordUpdate}>
                            <div className="space-y-2 mb-4">
                                <label className="text-sm font-semibold text-gray-700">Current Password</label>
                                <Input 
                                    type="password" 
                                    value={passwordForm.currentPassword}
                                    onChange={(e) => setPasswordForm(prev => ({ ...prev, currentPassword: e.target.value }))}
                                    placeholder="Enter current password" 
                                    className="h-12 border-2 focus:border-purple-500 focus:ring-purple-500 rounded-xl" 
                                />
                            </div>
                            <div className="space-y-2 mb-4">
                                <label className="text-sm font-semibold text-gray-700">New Password</label>
                                <Input 
                                    type="password" 
                                    value={passwordForm.newPassword}
                                    onChange={(e) => setPasswordForm(prev => ({ ...prev, newPassword: e.target.value }))}
                                    placeholder="Enter new password" 
                                    className="h-12 border-2 focus:border-purple-500 focus:ring-purple-500 rounded-xl" 
                                />
                            </div>
                            <div className="space-y-2 mb-6">
                                <label className="text-sm font-semibold text-gray-700">Confirm New Password</label>
                                <Input 
                                    type="password" 
                                    value={passwordForm.confirmPassword}
                                    onChange={(e) => setPasswordForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                                    placeholder="Confirm new password" 
                                    className="h-12 border-2 focus:border-purple-500 focus:ring-purple-500 rounded-xl" 
                                />
                            </div>
                            <Separator className="my-6" />
                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border-2 border-gray-100 mb-6">
                                <div>
                                    <p className="font-semibold text-gray-900">Two-Factor Authentication</p>
                                    <p className="text-sm text-gray-600">
                                        Add an extra layer of security to your account
                                    </p>
                                </div>
                                <Badge variant="outline" className="bg-orange-100 text-orange-700 border-orange-200">Not Enabled</Badge>
                            </div>
                            <Button 
                                type="submit"
                                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg shadow-purple-600/25 h-12 px-8"
                            >
                                Update Password
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm card-hover animate-slide-up" style={{ animationDelay: '0.2s' }}>
                    <CardHeader className="pb-6">
                        <CardTitle className="flex items-center gap-3 text-xl">
                            <div className="p-2 bg-yellow-100 rounded-lg">
                                <Bell className="h-5 w-5 text-yellow-600" />
                            </div>
                            Notification Preferences
                        </CardTitle>
                        <CardDescription className="text-gray-600 text-base">
                            Choose how you want to be notified about updates and activities.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border-2 border-gray-100">
                            <div>
                                <p className="font-semibold text-gray-900">Email Notifications</p>
                                <p className="text-sm text-gray-600">
                                    Receive email updates about your account
                                </p>
                            </div>
                            <Badge className="bg-green-100 text-green-700 border-green-200">Enabled</Badge>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border-2 border-gray-100">
                            <div>
                                <p className="font-semibold text-gray-900">Push Notifications</p>
                                <p className="text-sm text-gray-600">
                                    Receive push notifications on your devices
                                </p>
                            </div>
                            <Badge variant="outline" className="bg-red-100 text-red-700 border-red-200">Disabled</Badge>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border-2 border-gray-100">
                            <div>
                                <p className="font-semibold text-gray-900">Weekly Reports</p>
                                <p className="text-sm text-gray-600">
                                    Get weekly summary of your activities
                                </p>
                            </div>
                            <Badge className="bg-green-100 text-green-700 border-green-200">Enabled</Badge>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm card-hover animate-slide-up" style={{ animationDelay: '0.3s' }}>
                    <CardHeader className="pb-6">
                        <CardTitle className="flex items-center gap-3 text-xl">
                            <div className="p-2 bg-purple-100 rounded-lg">
                                <Palette className="h-5 w-5 text-purple-600" />
                            </div>
                            Appearance
                        </CardTitle>
                        <CardDescription className="text-gray-600 text-base">
                            Customize the look and feel of your dashboard.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border-2 border-gray-100">
                            <div>
                                <p className="font-semibold text-gray-900">Theme</p>
                                <p className="text-sm text-gray-600">
                                    Select your preferred theme
                                </p>
                            </div>
                            <Badge className="bg-blue-100 text-blue-700 border-blue-200">Light</Badge>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border-2 border-gray-100">
                            <div>
                                <p className="font-semibold text-gray-900">Language</p>
                                <p className="text-sm text-gray-600">
                                    Choose your display language
                                </p>
                            </div>
                            <Badge className="bg-blue-100 text-blue-700 border-blue-200">English</Badge>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default SettingsPage;