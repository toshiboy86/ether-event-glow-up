import React, { useState } from 'react';
import { Search, Calendar, MapPin, Users, Filter, Grid, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Toggle } from '@/components/ui/toggle';
import EventCard from '@/components/EventCard';
import EventCalendar from '@/components/EventCalendar';
import CategoryFilter from '@/components/CategoryFilter';
import ThemeFilter from '@/components/ThemeFilter';
import RegionFilter from '@/components/RegionFilter';
import MonthFilter from '@/components/MonthFilter';
import Newsletter from '@/components/Newsletter';
import Footer from '@/components/Footer';
import EventListView from '@/components/EventListView';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTheme, setSelectedTheme] = useState('all');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedMonth, setSelectedMonth] = useState('all');
  const [calendarView, setCalendarView] = useState(false);
  const [listView, setListView] = useState(false);

  const events =[
    {
      id: 1,
      name: "FarCon",
      location: "NYC, USA",
      region: "North America",
      country: "United States",
      countryCode: "US",
      categories: ["Hackathon", "Summit"],
      domains: ["Web3 General"],
      venueType: "in_person",
      startDateTime: new Date("2025-05-01T00:00:00"),
      endDateTime: new Date("2025-05-04T00:00:00"),
      links: ["https://farcon.nyc/"],
      socials: ["https://warpcast.com/~/channel/farcon-nyc"],
      communities: [],
      hasTimezone: false,
      weatherMetrics: {
        temp: 19.5,
        tempmax: 29.4,
        tempmin: 11.2,
        humidity: 59.9,
      },
    },
    {
      id: 2,
      name: "ETH Tokyo",
      location: "Tokyo, Japan",
      region: "Asia",
      country: "Japan",
      countryCode: "JP",
      categories: ["Hackathon"],
      domains: ["DeFi", "NFT"],
      venueType: "in_person",
      startDateTime: new Date("2025-06-10T00:00:00"),
      endDateTime: new Date("2025-06-12T00:00:00"),
      links: ["https://ethtokyo.com/"],
      socials: ["https://twitter.com/ethtokyo"],
      communities: [],
      hasTimezone: true,
      weatherMetrics: {
        temp: 22.1,
        tempmax: 27.0,
        tempmin: 18.3,
        humidity: 70.2,
      },
    },
    {
      id: 3,
      name: "ETH Berlin",
      location: "Berlin, Germany",
      region: "Europe",
      country: "Germany",
      countryCode: "DE",
      categories: ["Conference"],
      domains: ["Web3 General"],
      venueType: "in_person",
      startDateTime: new Date("2025-07-15T00:00:00"),
      endDateTime: new Date("2025-07-18T00:00:00"),
      links: ["https://ethberlin.com/"],
      socials: ["https://twitter.com/ethberlin"],
      communities: [],
      hasTimezone: true,
      weatherMetrics: {
        temp: 24.0,
        tempmax: 30.0,
        tempmin: 17.5,
        humidity: 60.0,
      },
    },
    {
      id: 4,
      name: "ETH Denver",
      location: "Denver, USA",
      region: "North America",
      country: "United States",
      countryCode: "US",
      categories: ["Hackathon", "Summit"],
      domains: ["DeFi"],
      venueType: "in_person",
      startDateTime: new Date("2025-08-20T00:00:00"),
      endDateTime: new Date("2025-08-25T00:00:00"),
      links: ["https://ethdenver.com/"],
      socials: ["https://twitter.com/ethdenver"],
      communities: [],
      hasTimezone: false,
      weatherMetrics: {
        temp: 27.5,
        tempmax: 33.0,
        tempmin: 20.0,
        humidity: 40.0,
      },
    },
    {
      id: 5,
      name: "ETH Singapore",
      location: "Singapore",
      region: "Asia",
      country: "Singapore",
      countryCode: "SG",
      categories: ["Conference"],
      domains: ["NFT", "Gaming"],
      venueType: "in_person",
      startDateTime: new Date("2025-09-05T00:00:00"),
      endDateTime: new Date("2025-09-07T00:00:00"),
      links: ["https://ethsingapore.com/"],
      socials: ["https://twitter.com/ethsingapore"],
      communities: [],
      hasTimezone: true,
      weatherMetrics: {
        temp: 30.0,
        tempmax: 33.5,
        tempmin: 27.0,
        humidity: 80.0,
      },
    },
    {
      id: 6,
      name: "ETH Paris",
      location: "Paris, France",
      region: "Europe",
      country: "France",
      countryCode: "FR",
      categories: ["Summit"],
      domains: ["Web3 General", "DeFi"],
      venueType: "in_person",
      startDateTime: new Date("2025-10-10T00:00:00"),
      endDateTime: new Date("2025-10-13T00:00:00"),
      links: ["https://ethparis.com/"],
      socials: ["https://twitter.com/ethparis"],
      communities: [],
      hasTimezone: true,
      weatherMetrics: {
        temp: 18.0,
        tempmax: 22.0,
        tempmin: 14.0,
        humidity: 65.0,
      },
    },
    {
      id: 7,
      name: "ETH London",
      location: "London, UK",
      region: "Europe",
      country: "United Kingdom",
      countryCode: "GB",
      categories: ["Hackathon"],
      domains: ["DeFi", "Web3 General"],
      venueType: "in_person",
      startDateTime: new Date("2025-11-01T00:00:00"),
      endDateTime: new Date("2025-11-03T00:00:00"),
      links: ["https://ethlondon.com/"],
      socials: ["https://twitter.com/ethlondon"],
      communities: [],
      hasTimezone: true,
      weatherMetrics: {
        temp: 15.0,
        tempmax: 18.0,
        tempmin: 10.0,
        humidity: 75.0,
      },
    },
    {
      id: 8,
      name: "ETH Mexico",
      location: "Mexico City, Mexico",
      region: "North America",
      country: "Mexico",
      countryCode: "MX",
      categories: ["Summit"],
      domains: ["NFT"],
      venueType: "in_person",
      startDateTime: new Date("2025-12-05T00:00:00"),
      endDateTime: new Date("2025-12-08T00:00:00"),
      links: ["https://ethmexico.com/"],
      socials: ["https://twitter.com/ethmexico"],
      communities: [],
      hasTimezone: false,
      weatherMetrics: {
        temp: 21.0,
        tempmax: 25.0,
        tempmin: 16.0,
        humidity: 55.0,
      },
    },
    {
      id: 9,
      name: "ETH India",
      location: "Bangalore, India",
      region: "Asia",
      country: "India",
      countryCode: "IN",
      categories: ["Hackathon", "Conference"],
      domains: ["Web3 General", "Gaming"],
      venueType: "in_person",
      startDateTime: new Date("2026-01-15T00:00:00"),
      endDateTime: new Date("2026-01-18T00:00:00"),
      links: ["https://ethindia.com/"],
      socials: ["https://twitter.com/ethindia"],
      communities: [],
      hasTimezone: true,
      weatherMetrics: {
        temp: 26.0,
        tempmax: 30.0,
        tempmin: 20.0,
        humidity: 60.0,
      },
    },
    {
      id: 10,
      name: "ETH Sydney",
      location: "Sydney, Australia",
      region: "Oceania",
      country: "Australia",
      countryCode: "AU",
      categories: ["Summit", "Conference"],
      domains: ["DeFi", "NFT"],
      venueType: "in_person",
      startDateTime: new Date("2026-02-10T00:00:00"),
      endDateTime: new Date("2026-02-13T00:00:00"),
      links: ["https://ethsydney.com/"],
      socials: ["https://twitter.com/ethsydney"],
      communities: [],
      hasTimezone: true,
      weatherMetrics: {
        temp: 28.0,
        tempmax: 32.0,
        tempmin: 22.0,
        humidity: 68.0,
      },
    },
  ];

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || event.categories.some(category => 
      category.toLowerCase().includes(selectedCategory.toLowerCase())
    );
    const matchesTheme = selectedTheme === 'all' || event.domains.some(tag => 
      tag.toLowerCase().includes(selectedTheme.toLowerCase())
    );
    
    // Region filtering logic
    const matchesRegion = selectedRegion === 'all' || (() => {
      const location = event.location.toLowerCase();
      switch (selectedRegion) {
        case 'asia': return location.includes('tokyo') || location.includes('singapore') || location.includes('seoul');
        case 'europe': return location.includes('berlin') || location.includes('london') || location.includes('milan') || location.includes('kyiv');
        case 'north-america': return location.includes('usa') || location.includes('nyc') || location.includes('canada');
        case 'south-america': return location.includes('brazil') || location.includes('argentina') || location.includes('chile');
        case 'africa': return location.includes('cape town') || location.includes('lagos') || location.includes('cairo');
        case 'oceania': return location.includes('sydney') || location.includes('melbourne') || location.includes('auckland');
        default: return true;
      }
    })();

    // Month filtering logic (simplified - in real app would parse actual dates)
    const matchesMonth = selectedMonth === 'all' || (() => {
      const eventDate = event.startDateTime.getMonth().toString();
      return eventDate.includes(selectedMonth);
    })();
    
    return matchesSearch && matchesCategory && matchesTheme && matchesRegion && matchesMonth;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-blue-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Eth Stars
                </h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search events by location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-80 bg-white/70 border-blue-200 focus:border-blue-400 rounded-xl"
                />
              </div>
              
              {/* Grid/List View Toggle */}
              <div className="flex items-center space-x-1">
                <Toggle 
                  pressed={!listView}
                  onPressedChange={() => setListView(false)}
                  variant="outline" 
                  className="rounded-xl border-blue-200 hover:bg-blue-50 data-[state=on]:bg-blue-100"
                >
                  <Grid className="w-4 h-4" />
                </Toggle>
                <Toggle 
                  pressed={listView}
                  onPressedChange={() => setListView(true)}
                  variant="outline" 
                  className="rounded-xl border-blue-200 hover:bg-blue-50 data-[state=on]:bg-blue-100"
                >
                  <List className="w-4 h-4" />
                </Toggle>
              </div>
              
              <Toggle 
                pressed={calendarView}
                onPressedChange={setCalendarView}
                variant="outline" 
                className="rounded-xl border-blue-200 hover:bg-blue-50 data-[state=on]:bg-blue-100"
              >
                Calendar
                <Calendar className="w-4 h-4 ml-2" />
              </Toggle>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            A curated selection of{' '}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-orange-500 bg-clip-text text-transparent">
              conferences, hackathons, and gatherings
            </span>
            <br />
            across the global Ethereum ecosystem
          </h2>
        </div>
      </section>

      {/* Filters */}
      <section className="px-4 sm:px-6 lg:px-8 mb-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-blue-100 shadow-lg">
            <div className="space-y-6">
              <CategoryFilter 
                selectedCategory={selectedCategory} 
                onCategoryChange={setSelectedCategory} 
              />
              <ThemeFilter 
                selectedTheme={selectedTheme} 
                onThemeChange={setSelectedTheme} 
              />
              
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center space-x-4">
                  <RegionFilter 
                    selectedRegion={selectedRegion} 
                    onRegionChange={setSelectedRegion} 
                  />
                  <MonthFilter 
                    selectedMonth={selectedMonth} 
                    onMonthChange={setSelectedMonth} 
                  />
                  <span className="text-sm text-gray-600">Only Ongoing/Upcoming</span>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-700">Events Calendar 2025</p>
                  <p className="text-sm text-gray-500">{filteredEvents.length} events found</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Calendar Component */}
      <section className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-7xl mx-auto">
          <EventCalendar events={events} isVisible={calendarView} />
        </div>
      </section>

      {/* Events Grid/List */}
      <section className="px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">Events Calendar 2025</h3>
          {listView ? (
            <EventListView events={filteredEvents} />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((event) => (
                <EventCard key={event.id} event={event} viewMode="grid" />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <Newsletter />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
