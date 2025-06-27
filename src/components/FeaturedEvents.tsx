
import React from 'react';
import { Star, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import FeaturedEventCard from './FeaturedEventCard';

interface Event {
  id: number;
  name: string;
  location: string;
  region: string;
  country: string;
  countryCode: string;
  categories: string[];
  domains: string[];
  venueType: string;
  startDateTime: Date;
  endDateTime: Date;
  links: string[];
  socials: string[];
  communities: string[];
  hasTimezone: boolean;
  weatherMetrics: {
    temp: number;
    tempmax: number;
    tempmin: number;
    humidity: number;
  };
}

interface FeaturedEventsProps {
  events: Event[];
}

const FeaturedEvents = ({ events }: FeaturedEventsProps) => {
  // Select first 5 events as featured for demo purposes
  // In a real app, this would be determined by a "featured" flag in the data
  const featuredEvents = events.slice(0, 5);

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-blue-100 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-orange-500 to-pink-500 rounded-lg">
                <Star className="w-4 h-4 text-white fill-current" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Featured Events</h2>
                <p className="text-sm text-gray-600">Handpicked events you shouldn't miss</p>
              </div>
            </div>
            <Button variant="ghost" className="hidden sm:flex items-center space-x-2 text-blue-600 hover:text-blue-700">
              <span>View All</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>

          <Carousel
            opts={{
              align: "start",
              loop: false,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {featuredEvents.map((event) => (
                <CarouselItem key={event.id} className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                  <FeaturedEventCard event={event} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex -left-4 bg-white/90 border-blue-200 hover:bg-blue-50" />
            <CarouselNext className="hidden md:flex -right-4 bg-white/90 border-blue-200 hover:bg-blue-50" />
          </Carousel>

          <div className="mt-4 text-center sm:hidden">
            <Button variant="ghost" className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 mx-auto">
              <span>View All Featured Events</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedEvents;
