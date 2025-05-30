import React from 'react';
import Calendar from '../components/dashboard/calendar';

const CalendarPage: React.FC = () => {
    return (
        <div className="space-y-8">
            <div className="animate-fade-in">
                <h2 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">Calendar</h2>
                <p className="text-gray-600 mt-2 text-lg">
                    Manage your schedule and view upcoming events.
                </p>
            </div>
            
            {/* Calendar Component */}
            <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
                <Calendar />
            </div>
        </div>
    );
};

export default CalendarPage;
