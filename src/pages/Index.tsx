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

  const events = [
    {
      id: 1,
      title: "Edge Esmeralda",
      location: "Esmeralda, USA",
      date: "May 24 - May 31, 2025",
      attendees: 250,
      type: "Conference",
      status: "upcoming",
      description: "A premier conference focusing on cutting-edge blockchain technology and Ethereum development.",
      tags: ["DeFi", "ZK-SNARKs", "Ethereum Ecosystem"]
    },
    {
      id: 2,
      title: "Protocol Berg v2",
      location: "Berlin, Germany",
      date: "Jun 18 - Jun 15, 2025",
      attendees: 800,
      type: "Conference",
      status: "upcoming",
      description: "Deep dive into protocol development and blockchain infrastructure with leading developers.",
      tags: ["Protocol Development", "Infrastructure"]
    },
    {
      id: 3,
      title: "ETHKyiv",
      location: "Kyiv, Ukraine",
      date: "Jun 15 - Jun 30, 2025",
      attendees: 600,
      type: "Hackathon",
      status: "upcoming",
      description: "Ukraine's premier Ethereum hackathon bringing together developers from across Eastern Europe.",
      tags: ["Hackathon", "Eastern Europe", "Web3"]
    },
    {
      id: 4,
      title: "DappCon",
      location: "Berlin, Germany",
      date: "Sep 10 - Sep 12, 2025",
      attendees: 1500,
      type: "Conference",
      status: "upcoming",
      description: "The leading conference for Ethereum dApp developers and the decentralized web community.",
      tags: ["dApps", "Decentralized Web", "Berlin"]
    },
    {
      id: 5,
      title: "ETHMilan",
      location: "Milan, Italy",
      date: "Jan 20 - Jan 25, 2025",
      attendees: 900,
      type: "Conference",
      status: "past",
      description: "Exploring the intersection of traditional finance and DeFi in the heart of Italy.",
      tags: ["DeFi", "Traditional Finance", "Italy"]
    },
    {
      id: 6,
      title: "NFT NYC",
      location: "NYC, USA",
      date: "Jun 25 - Jun 30, 2025",
      attendees: 2000,
      type: "Conference",
      status: "ongoing",
      description: "The largest NFT conference bringing together artists, developers, and collectors.",
      tags: ["NFTs", "Digital Art", "NYC"]
    }
  ];

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || event.type.toLowerCase() === selectedCategory;
    const matchesTheme = selectedTheme === 'all' || event.tags.some(tag => 
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
      const eventDate = event.date.toLowerCase();
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
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">Ξ</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Ethereum Events
                </h1>
                <p className="text-sm text-gray-600">discover.protocol.events</p>
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
                <EventCard key={event.id} event={event} />
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
