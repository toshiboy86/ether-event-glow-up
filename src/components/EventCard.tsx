
import React from 'react';
import { MapPin, Users, Calendar, Thermometer } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

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

interface EventCardProps {
  event: Event;
}

const EventCard = ({ event }: EventCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'ongoing':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'past':
        return 'bg-gray-100 text-gray-700 border-gray-200';
      default:
        return 'bg-blue-100 text-blue-700 border-blue-200';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'conference':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'hackathon':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'meetup':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'workshop':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      default:
        return 'bg-blue-100 text-blue-700 border-blue-200';
    }
  };

  const getFlagEmoji = (location: string) => {
    if (location.includes('USA')) return '🇺🇸';
    if (location.includes('Germany')) return '🇩🇪';
    if (location.includes('Ukraine')) return '🇺🇦';
    if (location.includes('Italy')) return '🇮🇹';
    return '🌍';
  };

  const getTemperature = () => {
    // Mock temperature data - in a real app this would come from an API
    const temps = ['Max: 28.9°C / Min: 8.6°C', 'Max: 22.1°C / Min: 12.3°C', 'Max: 25.5°C / Min: 15.2°C'];
    return temps[Math.floor(Math.random() * temps.length)];
  };

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm hover:scale-105 rounded-2xl overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <Badge className={`text-xs px-3 py-1 rounded-full border ${getTypeColor(event.type)}`}>
            {event.type}
          </Badge>
          <Badge className={`text-xs px-3 py-1 rounded-full border ${getStatusColor(event.status)}`}>
            {event.status}
          </Badge>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
          {event.title}
        </h3>

        <div className="space-y-3 mb-4">
          <div className="flex items-center text-gray-600 text-sm">
            <MapPin className="w-4 h-4 mr-2 text-blue-500" />
            <span className="mr-2">{event.location}</span>
            <span className="text-lg">{getFlagEmoji(event.location)}</span>
          </div>
          <div className="flex items-center text-gray-600 text-sm">
            <Calendar className="w-4 h-4 mr-2 text-purple-500" />
            {event.date}
          </div>
          <div className="flex items-center text-gray-600 text-sm">
            <Thermometer className="w-4 h-4 mr-2 text-orange-500" />
            Temp: {getTemperature()}
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {event.tags.slice(0, 3).map((tag, index) => (
            <Badge 
              key={index} 
              variant="secondary" 
              className="text-xs px-2 py-1 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 border-0 rounded-lg"
            >
              {tag}
            </Badge>
          ))}
          {event.tags.length > 3 && (
            <Badge variant="secondary" className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-lg">
              +{event.tags.length - 3} more
            </Badge>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center text-gray-600 text-sm">
            <Users className="w-4 h-4 mr-2 text-green-500" />
            {event.attendees.toLocaleString()} attendees
          </div>
          
          <div className="flex items-center space-x-3">
            <button className="text-gray-400 hover:text-gray-600 transition-colors">
              ✕
            </button>
            <button className="text-gray-400 hover:text-gray-600 transition-colors">
              🔖
            </button>
            <button className="text-gray-400 hover:text-gray-600 transition-colors">
              🌐
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EventCard;
