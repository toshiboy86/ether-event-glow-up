
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface Event {
  id: number;
  title: string;
  location: string;
  date: string;
  attendees: number;
  type: string;
  status: string;
  description: string;
  tags: string[];
}

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
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }

    return days;
  };

  const getEventsForDay = (day: number) => {
    if (!day) return [];
    
    return events.filter(event => {
      // Simple date matching - in a real app, you'd parse the actual dates
      const eventDate = event.date.toLowerCase();
      const monthName = monthNames[currentDate.getMonth()].toLowerCase();
      
      // Check if event is in current month and matches the day
      if (eventDate.includes(monthName)) {
        // Extract day numbers from date string (simplified logic)
        const dayMatch = eventDate.match(/\d+/g);
        if (dayMatch) {
          const startDay = parseInt(dayMatch[0]);
          const endDay = dayMatch[1] ? parseInt(dayMatch[1]) : startDay;
          return day >= startDay && day <= endDay;
        }
      }
      return false;
    });
  };

  const getEventColor = (event: Event) => {
    const eventTitle = event.title.toLowerCase();
    if (eventTitle.includes('edge')) return 'bg-emerald-200 text-emerald-800';
    if (eventTitle.includes('protocol')) return 'bg-orange-200 text-orange-800';
    if (eventTitle.includes('ethkyiv')) return 'bg-yellow-200 text-yellow-800';
    if (eventTitle.includes('dappcon')) return 'bg-amber-200 text-amber-800';
    if (eventTitle.includes('nft')) return 'bg-purple-200 text-purple-800';
    if (eventTitle.includes('ethcc')) return 'bg-teal-200 text-teal-800';
    return 'bg-blue-200 text-blue-800';
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
              className={`min-h-[100px] p-1 border border-gray-100 rounded-lg ${
                day ? 'bg-white' : 'bg-gray-50'
              }`}
            >
              {day && (
                <>
                  <div className="text-sm font-medium text-gray-700 mb-1">
                    {day}
                  </div>
                  <div className="space-y-1">
                    {dayEvents.map((event, eventIndex) => (
                      <div
                        key={`${event.id}-${eventIndex}`}
                        className={`text-xs px-2 py-1 rounded-md truncate ${getEventColor(event)}`}
                        title={`${event.title} - ${event.location}`}
                      >
                        {event.title}
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
