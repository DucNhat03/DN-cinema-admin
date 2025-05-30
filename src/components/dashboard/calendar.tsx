// filepath: d:\VuiVe\shadc-ui\admin-dashboard\src\components\dashboard\calendar.tsx
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
    ChevronLeft, 
    ChevronRight, 
    Calendar as CalendarIcon,
    Clock,
    MapPin,
    Users,
    Video,
    Plus,
    Filter,
    MoreHorizontal,
    Bell
} from 'lucide-react';

interface Event {
    id: number;
    title: string;
    time: string;
    type: 'meeting' | 'call' | 'event' | 'deadline';
    attendees?: number;
    location?: string;
    color: string;
}

interface CalendarDay {
    date: number;
    isCurrentMonth: boolean;
    isToday: boolean;
    events: Event[];
}

const Calendar: React.FC = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<number | null>(null);
    const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('month');

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // Sample events
    const sampleEvents: Event[] = [
        { id: 1, title: 'Team Meeting', time: '09:00', type: 'meeting', attendees: 5, location: 'Conference Room A', color: 'bg-blue-500' },
        { id: 2, title: 'Client Call', time: '14:00', type: 'call', attendees: 3, color: 'bg-green-500' },
        { id: 3, title: 'Project Deadline', time: '17:00', type: 'deadline', color: 'bg-red-500' },
        { id: 4, title: 'Design Review', time: '11:30', type: 'meeting', attendees: 4, location: 'Design Studio', color: 'bg-purple-500' },
        { id: 5, title: 'All Hands Meeting', time: '16:00', type: 'event', attendees: 50, location: 'Main Auditorium', color: 'bg-orange-500' },
    ];

    const getCalendarDays = (): CalendarDay[] => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const firstDayOfMonth = new Date(year, month, 1);
        const lastDayOfMonth = new Date(year, month + 1, 0);
        const firstDayOfWeek = firstDayOfMonth.getDay();
        const daysInMonth = lastDayOfMonth.getDate();

        const today = new Date();
        const isCurrentMonth = year === today.getFullYear() && month === today.getMonth();
        const todayDate = today.getDate();

        const days: CalendarDay[] = [];

        // Previous month's days
        const prevMonth = new Date(year, month - 1, 0);
        for (let i = firstDayOfWeek - 1; i >= 0; i--) {
            days.push({
                date: prevMonth.getDate() - i,
                isCurrentMonth: false,
                isToday: false,
                events: []
            });
        }

        // Current month's days
        for (let date = 1; date <= daysInMonth; date++) {
            const isToday = isCurrentMonth && date === todayDate;
            const dayEvents = date <= 15 ? sampleEvents.slice(0, Math.floor(Math.random() * 3) + 1) : [];
            
            days.push({
                date,
                isCurrentMonth: true,
                isToday,
                events: dayEvents
            });
        }

        // Next month's days
        const remainingDays = 42 - days.length;
        for (let date = 1; date <= remainingDays; date++) {
            days.push({
                date,
                isCurrentMonth: false,
                isToday: false,
                events: []
            });
        }

        return days;
    };

    const navigateMonth = (direction: 'prev' | 'next') => {
        setCurrentDate(prev => {
            const newDate = new Date(prev);
            newDate.setMonth(prev.getMonth() + (direction === 'next' ? 1 : -1));
            return newDate;
        });
    };

    const goToToday = () => {
        setCurrentDate(new Date());
        setSelectedDate(new Date().getDate());
    };

    const calendarDays = getCalendarDays();
    const selectedDay = selectedDate ? calendarDays.find(day => day.date === selectedDate && day.isCurrentMonth) : null;

    return (
        <Card className="p-6 bg-white shadow-lg border-0 rounded-xl">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                        <div className="p-2 rounded-lg bg-purple-100">
                            <CalendarIcon className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900">Calendar</h3>
                            <p className="text-sm text-gray-500">Schedule and events</p>
                        </div>
                    </div>
                </div>
                
                <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
                        <Plus className="h-4 w-4 mr-1" />
                        Add Event
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

            {/* View Mode Selector */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                    {['month', 'week', 'day'].map((mode) => (
                        <Button
                            key={mode}
                            variant={viewMode === mode ? "default" : "ghost"}
                            size="sm"
                            onClick={() => setViewMode(mode as any)}
                            className={`transition-all duration-200 ${
                                viewMode === mode 
                                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg' 
                                    : 'hover:bg-gray-100'
                            }`}
                        >
                            {mode.charAt(0).toUpperCase() + mode.slice(1)}
                        </Button>
                    ))}
                </div>

                <Button
                    variant="outline"
                    size="sm"
                    onClick={goToToday}
                    className="text-purple-600 border-purple-200 hover:bg-purple-50"
                >
                    Today
                </Button>
            </div>

            {/* Month Navigation */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => navigateMonth('prev')}
                        className="hover:bg-gray-100"
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <h2 className="text-xl font-semibold text-gray-900">
                        {months[currentDate.getMonth()]} {currentDate.getFullYear()}
                    </h2>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => navigateMonth('next')}
                        className="hover:bg-gray-100"
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>

                <div className="text-sm text-gray-500">
                    {calendarDays.filter(day => day.isCurrentMonth && day.events.length > 0).length} events this month
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Calendar Grid */}
                <div className="lg:col-span-2">
                    {/* Days of Week Header */}
                    <div className="grid grid-cols-7 gap-1 mb-2">
                        {daysOfWeek.map((day) => (
                            <div key={day} className="p-2 text-center text-xs font-semibold text-gray-500 uppercase tracking-wide">
                                {day}
                            </div>
                        ))}
                    </div>

                    {/* Calendar Days */}
                    <div className="grid grid-cols-7 gap-1">
                        {calendarDays.map((day, index) => (
                            <div
                                key={index}
                                className={`
                                    relative p-2 min-h-[80px] border border-gray-100 rounded-lg cursor-pointer transition-all duration-200
                                    ${day.isCurrentMonth ? 'bg-white hover:bg-gray-50' : 'bg-gray-50 text-gray-400'}
                                    ${day.isToday ? 'bg-purple-50 border-purple-200' : ''}
                                    ${selectedDate === day.date && day.isCurrentMonth ? 'ring-2 ring-purple-500 bg-purple-50' : ''}
                                `}
                                onClick={() => day.isCurrentMonth && setSelectedDate(day.date)}
                            >
                                <div className={`
                                    text-sm font-medium
                                    ${day.isToday ? 'text-purple-600' : day.isCurrentMonth ? 'text-gray-900' : 'text-gray-400'}
                                `}>
                                    {day.date}
                                </div>
                                
                                {/* Event Indicators */}
                                <div className="mt-1 space-y-1">
                                    {day.events.slice(0, 2).map((event, eventIndex) => (
                                        <div
                                            key={eventIndex}
                                            className={`w-full h-1.5 rounded-full ${event.color} opacity-80`}
                                            title={`${event.time} - ${event.title}`}
                                        ></div>
                                    ))}
                                    {day.events.length > 2 && (
                                        <div className="text-xs text-gray-500 font-medium">
                                            +{day.events.length - 2} more
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Event Details Sidebar */}
                <div className="space-y-4">
                    <div className="p-4 bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg">
                        <h4 className="font-semibold text-gray-900 mb-2">
                            {selectedDate ? `Events for ${selectedDate}` : 'Select a date'}
                        </h4>
                        
                        {selectedDay && selectedDay.events.length > 0 ? (
                            <div className="space-y-3">
                                {selectedDay.events.map((event) => (
                                    <div key={event.id} className="p-3 bg-white rounded-lg shadow-sm border">
                                        <div className="flex items-start justify-between">
                                            <div className="flex items-start space-x-3">
                                                <div className={`w-3 h-3 rounded-full ${event.color} mt-1`}></div>
                                                <div className="flex-1">
                                                    <div className="font-medium text-gray-900 text-sm">{event.title}</div>
                                                    <div className="flex items-center text-xs text-gray-500 mt-1">
                                                        <Clock className="h-3 w-3 mr-1" />
                                                        {event.time}
                                                    </div>
                                                    {event.location && (
                                                        <div className="flex items-center text-xs text-gray-500 mt-1">
                                                            <MapPin className="h-3 w-3 mr-1" />
                                                            {event.location}
                                                        </div>
                                                    )}
                                                    {event.attendees && (
                                                        <div className="flex items-center text-xs text-gray-500 mt-1">
                                                            <Users className="h-3 w-3 mr-1" />
                                                            {event.attendees} attendees
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <Badge variant="outline" className="text-xs">
                                                {event.type}
                                            </Badge>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-gray-500">
                                {selectedDate ? 'No events scheduled' : 'Click on a date to view events'}
                            </p>
                        )}
                    </div>

                    {/* Upcoming Events */}
                    <div className="p-4 bg-white border border-gray-200 rounded-lg">
                        <h4 className="font-semibold text-gray-900 mb-3">Upcoming Events</h4>
                        <div className="space-y-3">
                            {sampleEvents.slice(0, 3).map((event) => (
                                <div key={event.id} className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg transition-colors">
                                    <div className={`w-2 h-2 rounded-full ${event.color}`}></div>
                                    <div className="flex-1">
                                        <div className="text-sm font-medium text-gray-900">{event.title}</div>
                                        <div className="text-xs text-gray-500">{event.time}</div>
                                    </div>
                                    <Button variant="ghost" size="sm" className="p-1 h-6 w-6">
                                        <Bell className="h-3 w-3" />
                                    </Button>
                                </div>
                            ))}
                        </div>
                        <Button variant="ghost" className="w-full mt-3 text-purple-600 hover:bg-purple-50">
                            View all events
                        </Button>
                    </div>

                    {/* Quick Actions */}
                    <div className="p-4 bg-white border border-gray-200 rounded-lg">
                        <h4 className="font-semibold text-gray-900 mb-3">Quick Actions</h4>
                        <div className="space-y-2">
                            <Button variant="outline" className="w-full justify-start text-sm">
                                <Plus className="h-4 w-4 mr-2" />
                                Schedule Meeting
                            </Button>
                            <Button variant="outline" className="w-full justify-start text-sm">
                                <Video className="h-4 w-4 mr-2" />
                                Video Call
                            </Button>
                            <Button variant="outline" className="w-full justify-start text-sm">
                                <CalendarIcon className="h-4 w-4 mr-2" />
                                Block Time
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default Calendar;