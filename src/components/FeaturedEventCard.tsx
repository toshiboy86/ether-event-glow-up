
import React from 'react';
import { MapPin, Calendar, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface FeaturedEventCardProps {
  event: {
    id: number;
    name: string;
    location: string;
    countryCode: string;
    categories: string[];
    domains: string[];
    venueType: string;
    startDateTime: Date;
    endDateTime: Date;
  };
}

const FeaturedEventCard = ({ event }: FeaturedEventCardProps) => {
  const getFlagEmoji = (countryCode: string) => {
    if (!countryCode) return '🌍';
    return countryCode
      .toUpperCase()
      .replace(/./g, char => String.fromCodePoint(127397 + char.charCodeAt(0)));
  };

  const formatDate = (date: Date) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
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

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-white/90 backdrop-blur-sm hover:scale-105 rounded-xl overflow-hidden min-w-[280px] max-w-[320px] relative">
      <div className="absolute top-3 right-3 z-10">
        <div className="flex items-center space-x-1 bg-orange-100 text-orange-600 px-2 py-1 rounded-full text-xs font-medium">
          <Star className="w-3 h-3 fill-current" />
          <span>Featured</span>
        </div>
      </div>
      
      <CardContent className="p-4">
        <div className="mb-3">
          <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
            {event.name}
          </h3>
          <Badge className={`text-xs px-2 py-1 rounded-full border ${getVenueTypeColor(event.venueType)}`}>
            {event.venueType}
          </Badge>
        </div>

        <div className="space-y-2 mb-3">
          <div className="flex items-center text-gray-600 text-sm">
            <MapPin className="w-3 h-3 mr-2 text-blue-500 flex-shrink-0" />
            <span className="truncate mr-1">{event.location}</span>
            <span className="text-base">{getFlagEmoji(event.countryCode)}</span>
          </div>
          <div className="flex items-center text-gray-600 text-sm">
            <Calendar className="w-3 h-3 mr-2 text-purple-500 flex-shrink-0" />
            <span>
              {formatDate(event.startDateTime)}
              {event.endDateTime && (
                <>
                  <span className="mx-1">-</span>
                  {formatDate(event.endDateTime)}
                </>
              )}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1">
          {event.domains.slice(0, 2).map((domain, idx) => (
            <Badge
              key={idx}
              variant="secondary"
              className="text-xs px-2 py-1 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 border-0 rounded-lg"
            >
              {domain}
            </Badge>
          ))}
          {event.categories.slice(0, 1).map((cat, idx) => (
            <Badge
              key={idx}
              variant="secondary"
              className="text-xs px-2 py-1 rounded-lg bg-gradient-to-r from-gray-100 via-gray-200 to-gray-50 text-gray-700 border-0"
            >
              #{cat}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default FeaturedEventCard;
