// filepath: d:\VuiVe\shadc-ui\admin-dashboard\src\components\dashboard\analytics-chart.tsx
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
    TrendingUp, 
    TrendingDown, 
    BarChart3, 
    LineChart, 
    PieChart, 
    Download,
    Filter,
    MoreHorizontal,
    Users,
    DollarSign,
    Activity
} from 'lucide-react';

interface ChartData {
    month: string;
    revenue: number;
    users: number;
    orders: number;
}

const mockData: ChartData[] = [
    { month: 'Jan', revenue: 45000, users: 1200, orders: 890 },
    { month: 'Feb', revenue: 52000, users: 1350, orders: 1020 },
    { month: 'Mar', revenue: 48000, users: 1180, orders: 950 },
    { month: 'Apr', revenue: 61000, users: 1580, orders: 1200 },
    { month: 'May', revenue: 55000, users: 1420, orders: 1100 },
    { month: 'Jun', revenue: 67000, users: 1680, orders: 1350 },
];

const AnalyticsChart: React.FC = () => {
    const [selectedPeriod, setSelectedPeriod] = useState('6months');
    const [selectedMetric, setSelectedMetric] = useState('revenue');
    const [chartType, setChartType] = useState('line');

    const metrics = [
        { key: 'revenue', label: 'Revenue', icon: DollarSign, color: 'text-green-600', bgColor: 'bg-green-100' },
        { key: 'users', label: 'Users', icon: Users, color: 'text-blue-600', bgColor: 'bg-blue-100' },
        { key: 'orders', label: 'Orders', icon: Activity, color: 'text-purple-600', bgColor: 'bg-purple-100' },
    ];

    const periods = [
        { key: '7days', label: '7 Days' },
        { key: '30days', label: '30 Days' },
        { key: '3months', label: '3 Months' },
        { key: '6months', label: '6 Months' },
        { key: '1year', label: '1 Year' },
    ];

    const getCurrentData = () => {
        const current = mockData[mockData.length - 1];
        const previous = mockData[mockData.length - 2];
        const currentValue = current[selectedMetric as keyof ChartData] as number;
        const previousValue = previous[selectedMetric as keyof ChartData] as number;
        const change = ((currentValue - previousValue) / previousValue) * 100;
        
        return { currentValue, change };
    };

    const { currentValue, change } = getCurrentData();
    const selectedMetricData = metrics.find(m => m.key === selectedMetric);
    const maxValue = Math.max(...mockData.map(d => d[selectedMetric as keyof ChartData] as number));

    return (
        <Card className="p-6 bg-white shadow-lg border-0 rounded-xl">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                        <div className={`p-2 rounded-lg ${selectedMetricData?.bgColor}`}>
                            {selectedMetricData?.icon && <selectedMetricData.icon className={`h-5 w-5 ${selectedMetricData.color}`} />}
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900">Analytics Overview</h3>
                            <p className="text-sm text-gray-500">Performance metrics and trends</p>
                        </div>
                    </div>
                </div>
                
                <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
                        <Download className="h-4 w-4 mr-1" />
                        Export
                    </Button>
                    <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
                        <Filter className="h-4 w-4 mr-1" />
                        Filter
                    </Button>
                    <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            {/* Metric Selector */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                    {metrics.map((metric) => (
                        <Button
                            key={metric.key}
                            variant={selectedMetric === metric.key ? "default" : "ghost"}
                            size="sm"
                            onClick={() => setSelectedMetric(metric.key)}
                            className={`transition-all duration-200 ${
                                selectedMetric === metric.key 
                                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg' 
                                    : 'hover:bg-gray-100'
                            }`}
                        >
                            <metric.icon className="h-4 w-4 mr-1" />
                            {metric.label}
                        </Button>
                    ))}
                </div>

                <div className="flex items-center space-x-2">
                    {periods.map((period) => (
                        <Button
                            key={period.key}
                            variant={selectedPeriod === period.key ? "outline" : "ghost"}
                            size="sm"
                            onClick={() => setSelectedPeriod(period.key)}
                            className="text-xs"
                        >
                            {period.label}
                        </Button>
                    ))}
                </div>
            </div>

            {/* Current Value & Change */}
            <div className="mb-6 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg">
                <div className="flex items-center justify-between">
                    <div>
                        <div className="text-2xl font-bold text-gray-900">
                            {selectedMetric === 'revenue' 
                                ? `$${currentValue.toLocaleString()}` 
                                : currentValue.toLocaleString()
                            }
                        </div>
                        <div className="text-sm text-gray-500">
                            Current {selectedMetricData?.label.toLowerCase()}
                        </div>
                    </div>
                    <div className="flex items-center">
                        {change >= 0 ? (
                            <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                        ) : (
                            <TrendingDown className="h-4 w-4 text-red-600 mr-1" />
                        )}
                        <span className={`text-sm font-semibold ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {Math.abs(change).toFixed(1)}%
                        </span>
                        <span className="text-xs text-gray-500 ml-1">vs last month</span>
                    </div>
                </div>
            </div>

            {/* Chart Type Selector */}
            <div className="flex items-center space-x-2 mb-4">
                <span className="text-sm text-gray-500">Chart type:</span>
                {[
                    { key: 'line', icon: LineChart, label: 'Line' },
                    { key: 'bar', icon: BarChart3, label: 'Bar' },
                    { key: 'pie', icon: PieChart, label: 'Pie' },
                ].map((type) => (
                    <Button
                        key={type.key}
                        variant={chartType === type.key ? "outline" : "ghost"}
                        size="sm"
                        onClick={() => setChartType(type.key)}
                        className="h-8"
                    >
                        <type.icon className="h-3 w-3 mr-1" />
                        {type.label}
                    </Button>
                ))}
            </div>

            {/* Chart Area */}
            <div className="h-64 bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg p-4 mb-4">
                {chartType === 'line' && (
                    <div className="h-full flex items-end justify-between space-x-2">
                        {mockData.map((data, index) => {
                            const value = data[selectedMetric as keyof ChartData] as number;
                            const height = (value / maxValue) * 100;
                            return (
                                <div key={index} className="flex-1 flex flex-col items-center">
                                    <div className="w-full flex flex-col items-center">
                                        <div 
                                            className="w-full bg-gradient-to-t from-purple-600 to-blue-600 rounded-t transition-all duration-700 ease-out hover:opacity-80 cursor-pointer"
                                            style={{ height: `${height}%` }}
                                            title={`${data.month}: ${selectedMetric === 'revenue' ? '$' : ''}${value.toLocaleString()}`}
                                        ></div>
                                        <div className="text-xs text-gray-600 mt-2 font-medium">
                                            {data.month}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {chartType === 'bar' && (
                    <div className="h-full flex items-end justify-between space-x-2">
                        {mockData.map((data, index) => {
                            const value = data[selectedMetric as keyof ChartData] as number;
                            const height = (value / maxValue) * 100;
                            return (
                                <div key={index} className="flex-1 flex flex-col items-center">
                                    <div className="w-full flex flex-col items-center">
                                        <div 
                                            className="w-full bg-gradient-to-t from-purple-600 to-blue-600 rounded transition-all duration-700 ease-out hover:opacity-80 cursor-pointer"
                                            style={{ height: `${height}%` }}
                                            title={`${data.month}: ${selectedMetric === 'revenue' ? '$' : ''}${value.toLocaleString()}`}
                                        ></div>
                                        <div className="text-xs text-gray-600 mt-2 font-medium">
                                            {data.month}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {chartType === 'pie' && (
                    <div className="h-full flex items-center justify-center">
                        <div className="relative">
                            <div className="w-40 h-40 rounded-full bg-gradient-to-br from-purple-600 via-blue-600 to-purple-800 flex items-center justify-center">
                                <div className="w-24 h-24 rounded-full bg-white flex flex-col items-center justify-center">
                                    <div className="text-lg font-bold text-gray-900">
                                        {selectedMetric === 'revenue' ? `$${(currentValue/1000).toFixed(0)}K` : currentValue.toLocaleString()}
                                    </div>
                                    <div className="text-xs text-gray-500">Total</div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Summary Stats */}            <div className="grid grid-cols-3 gap-4">
                {metrics.map((metric) => {
                    const value = mockData[mockData.length - 1][metric.key as keyof ChartData] as number;
                    const prevValue = mockData[mockData.length - 2][metric.key as keyof ChartData] as number;
                    const change = ((value - prevValue) / prevValue) * 100;
                    
                    return (
                        <div key={metric.key} className="p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-sm font-medium text-gray-900">
                                        {metric.key === 'revenue' ? `$${value.toLocaleString()}` : value.toLocaleString()}
                                    </div>
                                    <div className="text-xs text-gray-500">{metric.label}</div>
                                </div>
                                <div className={`p-1 rounded ${metric.bgColor}`}>
                                    <metric.icon className={`h-3 w-3 ${metric.color}`} />
                                </div>
                            </div>
                            <div className="flex items-center mt-2">
                                {change >= 0 ? (
                                    <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                                ) : (
                                    <TrendingDown className="h-3 w-3 text-red-600 mr-1" />
                                )}
                                <span className={`text-xs font-medium ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                    {Math.abs(change).toFixed(1)}%
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </Card>
    );
};

export default AnalyticsChart;