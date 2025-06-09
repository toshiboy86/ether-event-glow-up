import React from 'react';
import { MapPin, Calendar, Thermometer, Globe, X, Bookmark } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { EventCardProps } from '@/lib/data';

const EventCard = ({ event }: EventCardProps) => {
  const getFlagEmoji = (countryCode: string) => {
    if (!countryCode) return '🌍';
    // Country code to regional indicator symbols
    return countryCode
      .toUpperCase()
      .replace(/./g, char => String.fromCodePoint(127397 + char.charCodeAt(0)));
  };

  const getVenueTypeColor = (venueType: string) => {
    switch (venueType) {
      case 'in_person':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'virtual':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'hybrid':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const formatDate = (date: Date) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm hover:scale-105 rounded-2xl overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <Badge className={`text-xs px-3 py-1 rounded-full border ${getVenueTypeColor(event.venueType)}`}>
            {event.venueType}
          </Badge>
          <Badge className="text-xs px-3 py-1 rounded-full border bg-gray-100 text-gray-700 border-gray-200">
            {event.region}
          </Badge>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
          {event.name}
        </h3>

        <div className="space-y-3 mb-4">
          <div className="flex items-center text-gray-600 text-sm">
            <MapPin className="w-4 h-4 mr-2 text-blue-500" />
            <span className="mr-2">{event.location}</span>
            <span className="text-lg">{getFlagEmoji(event.countryCode)}</span>
          </div>
          <div className="flex items-center text-gray-600 text-sm">
            <Calendar className="w-4 h-4 mr-2 text-purple-500" />
            {formatDate(event.startDateTime)}
            {event.endDateTime && (
              <>
                <span className="mx-1">-</span>
                {formatDate(event.endDateTime)}
              </>
            )}
          </div>
          <div className="flex items-center text-gray-600 text-sm">
            <Thermometer className="w-4 h-4 mr-2 text-orange-500" />
            Temp: Max: {event.weatherMetrics?.tempmax ?? '-'}°C / Min: {event.weatherMetrics?.tempmin ?? '-'}°C
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {event.categories.slice(0, 3).map((cat, idx) => (
            <Badge
              key={idx}
              variant="secondary"
              className="text-xs px-2 py-1 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 border-0 rounded-lg"
            >
              {cat}
            </Badge>
          ))}
          {event.categories.length > 3 && (
            <Badge variant="secondary" className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-lg">
              +{event.categories.length - 3} more
            </Badge>
          )}
        </div>

        {/* Footer Actions */}
        <div className="relative flex items-center justify-between pt-4 border-t border-gray-100 mt-4">
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              className="p-2 h-8 w-8 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="p-2 h-8 w-8 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600"
            >
              <Bookmark className="h-4 w-4" />
            </Button>
            {/* No website field in new data, so Globe button omitted */}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EventCard;
