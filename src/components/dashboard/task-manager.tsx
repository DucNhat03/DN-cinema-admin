// filepath: d:\VuiVe\shadc-ui\admin-dashboard\src\components\dashboard\task-manager.tsx
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
    CheckSquare, 
    Square,
    Plus,
    Search,
    Filter,
    MoreHorizontal,
    User,
    Calendar,
    MessageSquare,
    Paperclip,
    Star,
    ArrowUp,
    ArrowDown,
    Minus,
    Trash2,
    Edit3
} from 'lucide-react';

interface Task {
    id: number;
    title: string;
    description?: string;
    completed: boolean;
    priority: 'high' | 'medium' | 'low';
    dueDate?: string;
    assignee?: string;
    category: string;
    comments?: number;
    attachments?: number;
    starred?: boolean;
}

interface TaskCategory {
    name: string;
    color: string;
    count: number;
}

const TaskManager: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([
        {
            id: 1,
            title: 'Review user feedback reports',
            description: 'Analyze feedback from the latest user survey and prepare action items',
            completed: false,
            priority: 'high',
            dueDate: '2024-12-30',
            assignee: 'John Doe',
            category: 'Analysis',
            comments: 3,
            attachments: 2,
            starred: true
        },
        {
            id: 2,
            title: 'Update dashboard UI components',
            description: 'Implement new design system changes across all dashboard components',
            completed: false,
            priority: 'medium',
            dueDate: '2024-12-28',
            assignee: 'Jane Smith',
            category: 'Development',
            comments: 1,
            starred: false
        },
        {
            id: 3,
            title: 'Database optimization',
            completed: true,
            priority: 'low',
            dueDate: '2024-12-25',
            assignee: 'Mike Johnson',
            category: 'Maintenance',
            starred: false
        },
        {
            id: 4,
            title: 'Prepare monthly report',
            description: 'Compile performance metrics and insights for December',
            completed: false,
            priority: 'medium',
            dueDate: '2024-12-31',
            assignee: 'Sarah Wilson',
            category: 'Reporting',
            comments: 5,
            attachments: 1,
            starred: true
        },
        {
            id: 5,
            title: 'Security audit implementation',
            completed: false,
            priority: 'high',
            dueDate: '2024-12-29',
            assignee: 'Alex Brown',
            category: 'Security',
            starred: false
        }
    ]);

    const [filter, setFilter] = useState<'all' | 'completed' | 'pending' | 'starred'>('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [showAddTask, setShowAddTask] = useState(false);

    const categories: TaskCategory[] = [
        { name: 'Development', color: 'bg-blue-500', count: tasks.filter(t => t.category === 'Development').length },
        { name: 'Analysis', color: 'bg-green-500', count: tasks.filter(t => t.category === 'Analysis').length },
        { name: 'Reporting', color: 'bg-purple-500', count: tasks.filter(t => t.category === 'Reporting').length },
        { name: 'Security', color: 'bg-red-500', count: tasks.filter(t => t.category === 'Security').length },
        { name: 'Maintenance', color: 'bg-yellow-500', count: tasks.filter(t => t.category === 'Maintenance').length },
    ];

    const toggleTask = (taskId: number) => {
        setTasks(prev => prev.map(task => 
            task.id === taskId ? { ...task, completed: !task.completed } : task
        ));
    };

    const toggleStar = (taskId: number) => {
        setTasks(prev => prev.map(task => 
            task.id === taskId ? { ...task, starred: !task.starred } : task
        ));
    };

    const addTask = () => {
        if (newTaskTitle.trim()) {
            const newTask: Task = {
                id: Math.max(...tasks.map(t => t.id)) + 1,
                title: newTaskTitle,
                completed: false,
                priority: 'medium',
                category: 'Development',
                starred: false
            };
            setTasks(prev => [newTask, ...prev]);
            setNewTaskTitle('');
            setShowAddTask(false);
        }
    };

    const deleteTask = (taskId: number) => {
        setTasks(prev => prev.filter(task => task.id !== taskId));
    };

    const filteredTasks = tasks.filter(task => {
        const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             task.description?.toLowerCase().includes(searchTerm.toLowerCase());
        
        switch (filter) {
            case 'completed':
                return task.completed && matchesSearch;
            case 'pending':
                return !task.completed && matchesSearch;
            case 'starred':
                return task.starred && matchesSearch;
            default:
                return matchesSearch;
        }
    });

    const getPriorityIcon = (priority: string) => {
        switch (priority) {
            case 'high':
                return <ArrowUp className="h-3 w-3 text-red-500" />;
            case 'low':
                return <ArrowDown className="h-3 w-3 text-green-500" />;
            default:
                return <Minus className="h-3 w-3 text-yellow-500" />;
        }
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'high':
                return 'border-l-red-500 bg-red-50';
            case 'medium':
                return 'border-l-yellow-500 bg-yellow-50';
            case 'low':
                return 'border-l-green-500 bg-green-50';
            default:
                return 'border-l-gray-500 bg-gray-50';
        }
    };

    const completedTasks = tasks.filter(t => t.completed).length;
    const totalTasks = tasks.length;
    const completionPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

    return (
        <Card className="p-6 bg-white shadow-lg border-0 rounded-xl">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                        <div className="p-2 rounded-lg bg-blue-100">
                            <CheckSquare className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900">Task Manager</h3>
                            <p className="text-sm text-gray-500">Organize and track your tasks</p>
                        </div>
                    </div>
                </div>
                
                <div className="flex items-center space-x-2">
                    <Button 
                        variant="default" 
                        size="sm" 
                        onClick={() => setShowAddTask(true)}
                        className="bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-200"
                    >
                        <Plus className="h-4 w-4 mr-1" />
                        Add Task
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

            {/* Progress Overview */}
            <div className="mb-6 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                    <div className="text-sm font-medium text-gray-900">
                        Progress Overview
                    </div>
                    <div className="text-sm text-gray-600">
                        {completedTasks} of {totalTasks} tasks completed
                    </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                        className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full transition-all duration-700 ease-out"
                        style={{ width: `${completionPercentage}%` }}
                    ></div>
                </div>
                <div className="mt-2 text-xs text-gray-500">
                    {completionPercentage.toFixed(1)}% complete
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Categories Sidebar */}
                <div className="space-y-4">
                    {/* Filter Buttons */}
                    <div className="space-y-2">
                        <h4 className="text-sm font-semibold text-gray-900 mb-2">Filters</h4>
                        {[
                            { key: 'all', label: 'All Tasks', count: totalTasks },
                            { key: 'pending', label: 'Pending', count: totalTasks - completedTasks },
                            { key: 'completed', label: 'Completed', count: completedTasks },
                            { key: 'starred', label: 'Starred', count: tasks.filter(t => t.starred).length },
                        ].map((filterOption) => (
                            <Button
                                key={filterOption.key}
                                variant={filter === filterOption.key ? "default" : "ghost"}
                                size="sm"
                                onClick={() => setFilter(filterOption.key as any)}
                                className={`w-full justify-between transition-all duration-200 ${
                                    filter === filterOption.key 
                                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg' 
                                        : 'hover:bg-gray-100'
                                }`}
                            >
                                <span>{filterOption.label}</span>
                                <Badge variant="outline" className="text-xs">
                                    {filterOption.count}
                                </Badge>
                            </Button>
                        ))}
                    </div>

                    {/* Categories */}
                    <div className="space-y-2">
                        <h4 className="text-sm font-semibold text-gray-900 mb-2">Categories</h4>
                        {categories.map((category) => (
                            <div key={category.name} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors">
                                <div className="flex items-center space-x-2">
                                    <div className={`w-3 h-3 rounded-full ${category.color}`}></div>
                                    <span className="text-sm text-gray-700">{category.name}</span>
                                </div>
                                <Badge variant="outline" className="text-xs">
                                    {category.count}
                                </Badge>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Task List */}
                <div className="lg:col-span-3 space-y-4">
                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                            placeholder="Search tasks..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                        />
                    </div>

                    {/* Add Task Form */}
                    {showAddTask && (
                        <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                            <div className="flex items-center space-x-2">
                                <Input
                                    placeholder="Enter task title..."
                                    value={newTaskTitle}
                                    onChange={(e) => setNewTaskTitle(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && addTask()}
                                    className="flex-1"
                                />
                                <Button onClick={addTask} size="sm">
                                    Add
                                </Button>
                                <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    onClick={() => {
                                        setShowAddTask(false);
                                        setNewTaskTitle('');
                                    }}
                                >
                                    Cancel
                                </Button>
                            </div>
                        </div>
                    )}

                    {/* Task Items */}
                    <div className="space-y-3">
                        {filteredTasks.map((task) => (
                            <div
                                key={task.id}
                                className={`
                                    p-4 border-l-4 border border-gray-200 rounded-lg transition-all duration-200 hover:shadow-md
                                    ${task.completed ? 'opacity-60 bg-gray-50' : 'bg-white'}
                                    ${getPriorityColor(task.priority)}
                                `}
                            >
                                <div className="flex items-start space-x-3">
                                    {/* Checkbox */}
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => toggleTask(task.id)}
                                        className="p-0 h-5 w-5 mt-0.5"
                                    >
                                        {task.completed ? (
                                            <CheckSquare className="h-5 w-5 text-green-600" />
                                        ) : (
                                            <Square className="h-5 w-5 text-gray-400" />
                                        )}
                                    </Button>

                                    {/* Task Content */}
                                    <div className="flex-1">
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <h4 className={`font-medium text-gray-900 ${task.completed ? 'line-through' : ''}`}>
                                                    {task.title}
                                                </h4>
                                                {task.description && (
                                                    <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                                                )}
                                                
                                                {/* Task Meta */}
                                                <div className="flex items-center space-x-4 mt-2">
                                                    <div className="flex items-center space-x-1">
                                                        {getPriorityIcon(task.priority)}
                                                        <span className="text-xs text-gray-500 capitalize">{task.priority}</span>
                                                    </div>
                                                    
                                                    {task.dueDate && (
                                                        <div className="flex items-center space-x-1">
                                                            <Calendar className="h-3 w-3 text-gray-400" />
                                                            <span className="text-xs text-gray-500">{task.dueDate}</span>
                                                        </div>
                                                    )}
                                                    
                                                    {task.assignee && (
                                                        <div className="flex items-center space-x-1">
                                                            <User className="h-3 w-3 text-gray-400" />
                                                            <span className="text-xs text-gray-500">{task.assignee}</span>
                                                        </div>
                                                    )}
                                                    
                                                    <Badge variant="outline" className="text-xs">
                                                        {task.category}
                                                    </Badge>
                                                </div>
                                                
                                                {/* Task Actions */}
                                                <div className="flex items-center space-x-2 mt-2">
                                                    {task.comments && (
                                                        <div className="flex items-center space-x-1 text-xs text-gray-500">
                                                            <MessageSquare className="h-3 w-3" />
                                                            <span>{task.comments}</span>
                                                        </div>
                                                    )}
                                                    
                                                    {task.attachments && (
                                                        <div className="flex items-center space-x-1 text-xs text-gray-500">
                                                            <Paperclip className="h-3 w-3" />
                                                            <span>{task.attachments}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            
                                            {/* Action Buttons */}
                                            <div className="flex items-center space-x-1 ml-4">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => toggleStar(task.id)}
                                                    className="p-1 h-6 w-6"
                                                >
                                                    <Star className={`h-3 w-3 ${task.starred ? 'text-yellow-500 fill-current' : 'text-gray-400'}`} />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="p-1 h-6 w-6 text-gray-400 hover:text-gray-600"
                                                >
                                                    <Edit3 className="h-3 w-3" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => deleteTask(task.id)}
                                                    className="p-1 h-6 w-6 text-gray-400 hover:text-red-600"
                                                >
                                                    <Trash2 className="h-3 w-3" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        
                        {filteredTasks.length === 0 && (
                            <div className="text-center py-8 text-gray-500">
                                <CheckSquare className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                                <p className="text-lg font-medium">No tasks found</p>
                                <p className="text-sm">Try adjusting your search or filter criteria</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default TaskManager;