import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, ShoppingCart, DollarSign, Activity } from 'lucide-react';

const stats = [
    {
        name: 'Total Users',
        value: '10,482',
        icon: Users,
        change: '+4.75%',
        changeType: 'positive' as const,
        color: 'from-blue-500 to-blue-600',
        bgColor: 'bg-blue-50',
        iconColor: 'text-blue-600',
    },
    {
        name: 'Total Orders',
        value: '8,342',
        icon: ShoppingCart,
        change: '+2.02%',
        changeType: 'positive' as const,
        color: 'from-green-500 to-green-600',
        bgColor: 'bg-green-50',
        iconColor: 'text-green-600',
    },
    {
        name: 'Total Revenue',
        value: '$89,400',
        icon: DollarSign,
        change: '+10.18%',
        changeType: 'positive' as const,
        color: 'from-purple-500 to-purple-600',
        bgColor: 'bg-purple-50',
        iconColor: 'text-purple-600',
    },
    {
        name: 'Active Sessions',
        value: '2,040',
        icon: Activity,
        change: '-1.39%',
        changeType: 'negative' as const,
        color: 'from-orange-500 to-orange-600',
        bgColor: 'bg-orange-50',
        iconColor: 'text-orange-600',
    },
];

const StatsCards: React.FC = () => {
    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
                <Card key={stat.name} className={`card-hover border-0 shadow-lg bg-white/80 backdrop-blur-sm animate-slide-up`} style={{ animationDelay: `${index * 0.1}s` }}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-gray-600">
                            {stat.name}
                        </CardTitle>
                        <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                            <stat.icon className={`h-4 w-4 ${stat.iconColor}`} />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                        <div className="flex items-center space-x-1">
                            <p className={`text-xs font-medium ${
                                stat.changeType === 'positive' 
                                    ? 'text-green-600' 
                                    : 'text-red-600'
                            }`}>
                                {stat.change}
                            </p>
                            <p className="text-xs text-gray-500">from last month</p>
                        </div>
                        <div className={`mt-2 h-1 w-full bg-gray-100 rounded-full overflow-hidden`}>
                            <div className={`h-full bg-gradient-to-r ${stat.color} rounded-full w-3/4 transition-all duration-1000`}></div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

export default StatsCards;