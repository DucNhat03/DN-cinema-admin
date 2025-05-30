import React, { useState } from 'react';
import { useAuth } from '../contexts/auth-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { User, Mail, Calendar, Shield, Save, Loader2 } from 'lucide-react';

const ProfilePage: React.FC = () => {
  const { user, updateProfile, isLoading } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.name || !formData.email) {
      setError('Vui lòng điền đầy đủ thông tin');
      return;
    }

    const success = await updateProfile({
      name: formData.name,
      email: formData.email,
    });

    if (success) {
      setSuccess('Cập nhật thông tin thành công!');
      setIsEditing(false);
      setTimeout(() => setSuccess(''), 3000);
    } else {
      setError('Có lỗi xảy ra khi cập nhật thông tin');
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
    });
    setIsEditing(false);
    setError('');
  };

  if (!user) {
    return (
      <div className="space-y-8">
        <div className="animate-fade-in">
          <h2 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">Profile</h2>
          <p className="text-gray-600 mt-2 text-lg">Không tìm thấy thông tin người dùng.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="animate-fade-in">
        <h2 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">Profile</h2>
        <p className="text-gray-600 mt-2 text-lg">
          Quản lý thông tin cá nhân của bạn.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Profile Info Card */}
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm card-hover">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                <User className="h-8 w-8 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl font-semibold text-gray-900">{user.name}</CardTitle>
                <CardDescription className="text-gray-600 mt-1">
                  {user.email}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div className="grid gap-4">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                <Mail className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm font-medium text-gray-700">Email</p>
                  <p className="text-sm text-gray-600">{user.email}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                <Shield className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm font-medium text-gray-700">Vai trò</p>
                  <Badge 
                    className={user.role === 'admin' 
                      ? 'bg-purple-100 text-purple-800 hover:bg-purple-100' 
                      : 'bg-blue-100 text-blue-800 hover:bg-blue-100'
                    }
                  >
                    {user.role === 'admin' ? 'Quản trị viên' : 'Người dùng'}
                  </Badge>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                <Calendar className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm font-medium text-gray-700">Ngày tạo</p>
                  <p className="text-sm text-gray-600">
                    {new Date(user.createdAt).toLocaleDateString('vi-VN')}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Edit Profile Card */}
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm card-hover">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-semibold text-gray-900">Chỉnh sửa thông tin</CardTitle>
            <CardDescription className="text-gray-600 mt-1">
              Cập nhật thông tin cá nhân của bạn.
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {success && (
                <div className="p-3 rounded-lg bg-green-50 border border-green-200">
                  <p className="text-sm text-green-600">{success}</p>
                </div>
              )}
              
              {error && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-200">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}
              
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-gray-700">
                  Họ và tên
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Nguyen Van A"
                  className="h-11"
                  disabled={!isEditing || isLoading}
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className="h-11"
                  disabled={!isEditing || isLoading}
                />
              </div>
              
              <div className="flex gap-3 pt-2">
                {!isEditing ? (
                  <Button 
                    type="button"
                    onClick={() => setIsEditing(true)}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                  >
                    Chỉnh sửa
                  </Button>
                ) : (
                  <>
                    <Button 
                      type="submit" 
                      className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Đang lưu...
                        </>
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Lưu
                        </>
                      )}
                    </Button>
                    <Button 
                      type="button"
                      variant="outline"
                      onClick={handleCancel}
                      className="flex-1"
                      disabled={isLoading}
                    >
                      Hủy
                    </Button>
                  </>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;
