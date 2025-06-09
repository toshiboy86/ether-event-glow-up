
import React, { useState } from 'react';
import { MapPin, Users, Calendar, Thermometer, ChevronUp, ChevronDown, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { EventCardProps } from '@/lib/data';

type Event = EventCardProps['event'];
type SortField = 'name' | 'location' | 'startDateTime' | 'venueType';
type SortDirection = 'asc' | 'desc';

interface EventListViewProps {
  events: Event[];
}

const EventListView = ({ events }: EventListViewProps) => {
  const [sortField, setSortField] = useState<SortField>('startDateTime');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

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
      case 'in_person':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'virtual':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'hybrid':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      default:
        return 'bg-blue-100 text-blue-700 border-blue-200';
    }
  };

  const getFlagEmoji = (location: string) => {
    if (location.includes('USA')) return '🇺🇸';
    if (location.includes('Germany')) return '🇩🇪';
    if (location.includes('Ukraine')) return '🇺🇦';
    if (location.includes('Italy')) return '🇮🇹';
    if (location.includes('Japan')) return '🇯🇵';
    if (location.includes('France')) return '🇫🇷';
    if (location.includes('UK')) return '🇬🇧';
    if (location.includes('Mexico')) return '🇲🇽';
    if (location.includes('India')) return '🇮🇳';
    if (location.includes('Australia')) return '🇦🇺';
    if (location.includes('Singapore')) return '🇸🇬';
    return '🌍';
  };

  const formatTemperature = (weatherMetrics: Event['weatherMetrics']) => {
    return `${Math.round(weatherMetrics.tempmax)}°/${Math.round(weatherMetrics.tempmin)}°C`;
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedEvents = [...events].sort((a, b) => {
    let comparison = 0;
    
    switch (sortField) {
      case 'name':
        comparison = a.name.localeCompare(b.name);
        break;
      case 'location':
        comparison = a.location.localeCompare(b.location);
        break;
      case 'startDateTime':
        comparison = a.startDateTime.getTime() - b.startDateTime.getTime();
        break;
      case 'venueType':
        comparison = a.venueType.localeCompare(b.venueType);
        break;
    }

    return sortDirection === 'asc' ? comparison : -comparison;
  });

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? 
      <ChevronUp className="w-4 h-4 ml-1 inline" /> : 
      <ChevronDown className="w-4 h-4 ml-1 inline" />;
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-blue-100 shadow-lg overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-gradient-to-r from-blue-50/50 to-purple-50/50 border-b border-blue-100">
              <TableHead className="w-[300px]">
                <Button
                  variant="ghost"
                  onClick={() => handleSort('name')}
                  className="font-semibold text-gray-700 hover:text-blue-600 p-0 h-auto"
                  role="columnheader"
                  // aria-sort={sortField === 'name' ? sortDirection : 'none'}
                >
                  Event Name
                  <SortIcon field="name" />
                </Button>
              </TableHead>
              <TableHead className="w-[200px]">
                <Button
                  variant="ghost"
                  onClick={() => handleSort('location')}
                  className="font-semibold text-gray-700 hover:text-blue-600 p-0 h-auto"
                  role="columnheader"
                  // aria-sort={sortField === 'location' ? sortDirection : 'none'}
                >
                  Location
                  <SortIcon field="location" />
                </Button>
              </TableHead>
              <TableHead className="w-[120px]">
                <Button
                  variant="ghost"
                  onClick={() => handleSort('startDateTime')}
                  className="font-semibold text-gray-700 hover:text-blue-600 p-0 h-auto"
                  role="columnheader"
                  // aria-sort={sortField === 'startDateTime' ? sortDirection : 'none'}
                >
                  Date
                  <SortIcon field="startDateTime" />
                </Button>
              </TableHead>
              <TableHead className="w-[100px]">
                <Button
                  variant="ghost"
                  onClick={() => handleSort('venueType')}
                  className="font-semibold text-gray-700 hover:text-blue-600 p-0 h-auto"
                  role="columnheader"
                  // aria-sort={sortField === 'venueType' ? sortDirection : 'none'}
                >
                  Type
                  <SortIcon field="venueType" />
                </Button>
              </TableHead>
              <TableHead className="w-[100px]">
                <span className="font-semibold text-gray-700">Weather</span>
              </TableHead>
              <TableHead className="w-[250px]">
                <span className="font-semibold text-gray-700">Categories</span>
              </TableHead>
              <TableHead className="w-[80px]">
                <span className="font-semibold text-gray-700">Links</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedEvents.map((event, index) => (
              <TableRow 
                key={event.id}
                className={`transition-all duration-200 hover:bg-gradient-to-r hover:from-blue-50/30 hover:to-purple-50/30 group ${
                  index % 2 === 0 ? 'bg-white/50' : 'bg-gray-50/30'
                }`}
              >
                <TableCell className="py-4">
                  <div className="space-y-1">
                    <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors text-sm leading-tight">
                      {event.name}
                    </h3>
                    <div className="flex flex-wrap gap-1">
                      {event.domains.slice(0, 2).map((domain, index) => (
                        <Badge 
                          key={index} 
                          variant="secondary" 
                          className="text-xs px-2 py-0 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 border-0 rounded-md"
                        >
                          {domain}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-4">
                  <div className="flex items-center text-sm">
                    <MapPin className="w-3 h-3 mr-1 text-blue-500 flex-shrink-0" />
                    <span className="text-gray-700 truncate mr-1">{event.location}</span>
                    <span className="text-lg flex-shrink-0">{getFlagEmoji(event.location)}</span>
                  </div>
                </TableCell>
                <TableCell className="py-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="w-3 h-3 mr-1 text-purple-500" />
                    {event.startDateTime.toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric',
                      year: event.startDateTime.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined
                    })}
                  </div>
                </TableCell>
                <TableCell className="py-4">
                  <Badge className={`text-xs px-2 py-1 rounded-lg border ${getTypeColor(event.venueType)}`}>
                    {event.venueType.replace('_', ' ')}
                  </Badge>
                </TableCell>
                <TableCell className="py-4">
                  <div className="flex items-center text-xs text-gray-600">
                    <Thermometer className="w-3 h-3 mr-1 text-orange-500" />
                    {formatTemperature(event.weatherMetrics)}
                  </div>
                </TableCell>
                <TableCell className="py-4">
                  <div className="flex flex-wrap gap-1 max-w-[240px]">
                    {event.categories.slice(0, 3).map((category, index) => (
                      <Badge 
                        key={index} 
                        variant="outline" 
                        className="text-xs px-2 py-0 border-orange-200 text-orange-700 hover:bg-orange-50 rounded-md"
                      >
                        {category}
                      </Badge>
                    ))}
                    {event.categories.length > 3 && (
                      <Badge 
                        variant="outline" 
                        className="text-xs px-2 py-0 border-gray-200 text-gray-600 rounded-md"
                        title={event.categories.slice(3).join(', ')}
                      >
                        +{event.categories.length - 3}
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell className="py-4">
                  {event.links.length > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 hover:bg-blue-100 rounded-lg"
                      asChild
                    >
                      <a 
                        href={event.links[0]} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        aria-label={`Visit ${event.name} website`}
                      >
                        <ExternalLink className="w-4 h-4 text-blue-600" />
                      </a>
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      {sortedEvents.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <p className="text-lg font-medium">No events found</p>
          <p className="text-sm">Try adjusting your filters to see more events.</p>
        </div>
      )}
    </div>
  );
};

export default EventListView;
