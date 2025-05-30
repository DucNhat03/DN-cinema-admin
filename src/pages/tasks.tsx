import React from 'react';
import TaskManager from '../components/dashboard/task-manager';

const TasksPage: React.FC = () => {
    return (
        <div className="space-y-8">
            <div className="animate-fade-in">
                <h2 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">Tasks</h2>
                <p className="text-gray-600 mt-2 text-lg">
                    Manage and track your tasks efficiently.
                </p>
            </div>
            
            {/* Task Manager Component */}
            <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
                <TaskManager />
            </div>
        </div>
    );
};

export default TasksPage;
