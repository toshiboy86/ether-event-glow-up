import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { EventCardProps } from '@/lib/data';

type Event = EventCardProps['event'];

interface EventCalendarProps {
  events: Event[];
  isVisible: boolean;
}

const EventCalendar = ({ events, isVisible }: EventCalendarProps) => {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 5)); // June 2025

  if (!isVisible) return null;

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    return days;
  };

  const getEventsForDay = (day: number) => {
    if (!day) return [];
    return events.filter(event => {
      const eventStart = new Date(event.startDateTime);
      const eventEnd = new Date(event.endDateTime);
      const isSameMonth = eventStart.getMonth() === currentDate.getMonth() && eventStart.getFullYear() === currentDate.getFullYear();
      if (!isSameMonth) return false;
      return day >= eventStart.getDate() && day <= eventEnd.getDate();
    });
  };

  const getEventColor = (event: Event) => {
    const eventName = event.name.toLowerCase();
    if (eventName.includes('edge esmeralda')) return 'bg-green-300 text-green-800 border-l-4 border-green-500';
    if (eventName.includes('protocol berg')) return 'bg-orange-300 text-orange-800 border-l-4 border-orange-500';
    if (eventName.includes('ethkyiv')) return 'bg-cyan-300 text-cyan-800 border-l-4 border-cyan-500';
    if (eventName.includes('dappcon')) return 'bg-yellow-300 text-yellow-800 border-l-4 border-yellow-500';
    if (eventName.includes('ethmilan')) return 'bg-pink-300 text-pink-800 border-l-4 border-pink-500';
    if (eventName.includes('nft nyc')) return 'bg-purple-300 text-purple-800 border-l-4 border-purple-500';
    if (eventName.includes('ethcc')) return 'bg-teal-300 text-teal-800 border-l-4 border-teal-500';
    if (eventName.includes('permissionless')) return 'bg-blue-300 text-blue-800 border-l-4 border-blue-500';
    if (eventName.includes('ethcluj')) return 'bg-amber-300 text-amber-800 border-l-4 border-amber-500';
    const colors = [
      'bg-red-300 text-red-800 border-l-4 border-red-500',
      'bg-indigo-300 text-indigo-800 border-l-4 border-indigo-500',
      'bg-rose-300 text-rose-800 border-l-4 border-rose-500',
      'bg-lime-300 text-lime-800 border-l-4 border-lime-500',
      'bg-sky-300 text-sky-800 border-l-4 border-sky-500',
      'bg-violet-300 text-violet-800 border-l-4 border-violet-500'
    ];
    return colors[event.id % colors.length];
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const days = getDaysInMonth(currentDate);

  return (
    <Card className="w-full bg-white/70 backdrop-blur-sm border border-blue-100 shadow-lg p-6 mb-8">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-blue-600">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h2>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigateMonth('prev')}
            className="h-8 w-8 border-blue-200 hover:bg-blue-50"
          >
            <ChevronLeft className="h-4 w-4 text-blue-600" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigateMonth('next')}
            className="h-8 w-8 border-blue-200 hover:bg-blue-50"
          >
            <ChevronRight className="h-4 w-4 text-blue-600" />
          </Button>
        </div>
      </div>
      {/* Days of Week Header */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {daysOfWeek.map(day => (
          <div key={day} className="p-2 text-center text-sm font-medium text-gray-600">
            {day}
          </div>
        ))}
      </div>
      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => {
          const dayEvents = day ? getEventsForDay(day) : [];
          return (
            <div
              key={index}
              className={`min-h-[120px] p-1 border border-gray-100 rounded-lg ${day ? 'bg-white' : 'bg-gray-50'}`}
            >
              {day && (
                <>
                  <div className="text-sm font-medium text-gray-700 mb-1 p-1">
                    {day}
                  </div>
                  <div className="space-y-1">
                    {dayEvents.map((event, eventIndex) => (
                      <div
                        key={`${event.id}-${eventIndex}`}
                        className={`text-xs px-2 py-1 rounded-md ${getEventColor(event)} font-medium shadow-sm`}
                        title={`${event.name} - ${event.location}`}
                      >
                        <div className="flex items-center space-x-1">
                          <span className="w-2 h-2 bg-current rounded-full opacity-60"></span>
                          <span className="truncate">{event.name}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default EventCalendar;
