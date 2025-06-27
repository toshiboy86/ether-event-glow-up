
import React from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
  Sparkles,
  Target,
  Zap,
  Handshake,
  Hammer,
  Bitcoin,
  Calendar,
  Landmark,
  Palette,
  Wallet,
  Image as ImageIcon,
  Lock,
  BarChart2,
  Shield,
  Network,
  Atom,
  BookOpen,
  MapPin,
} from 'lucide-react';

interface FilterSectionProps {
  title: string;
  icon: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
  iconColor: string;
}

const FilterSection = ({ title, icon, isOpen, onToggle, children, iconColor }: FilterSectionProps) => {
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden transition-all duration-200 hover:border-gray-300">
      <Collapsible open={isOpen} onOpenChange={onToggle}>
        <CollapsibleTrigger className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors duration-200">
          <div className="flex items-center space-x-3">
            <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${iconColor} flex items-center justify-center`}>
              <span className="text-white text-sm">{icon}</span>
            </div>
            <h3 className="font-semibold text-gray-900">{title}</h3>
          </div>
          {isOpen ? (
            <ChevronDown className="w-5 h-5 text-gray-500 transition-transform duration-200" />
          ) : (
            <ChevronRight className="w-5 h-5 text-gray-500 transition-transform duration-200" />
          )}
        </CollapsibleTrigger>
        
        <CollapsibleContent className="data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
          <div className="p-4 pt-0 border-t border-gray-100">
            {children}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

// Category Filter Component
const CategoryFilter = ({ selectedCategory, onCategoryChange }: { selectedCategory: string; onCategoryChange: (category: string) => void }) => {
  const categories = [
    { id: 'all', label: 'All Categories', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'conference', label: 'Conference', icon: <Target className="w-4 h-4" /> },
    { id: 'hackathon', label: 'Hackathon', icon: <Zap className="w-4 h-4" /> },
    { id: 'meetup', label: 'Meetup', icon: <Handshake className="w-4 h-4" /> },
    { id: 'workshop', label: 'Workshop', icon: <Hammer className="w-4 h-4" /> },
    { id: 'bitcoin talk', label: 'Popup Village/City', icon: <Bitcoin className="w-4 h-4" /> },
    { id: 'blockchain week', label: 'Blockchain Week', icon: <Calendar className="w-4 h-4" /> },
    { id: 'summit', label: 'Summit', icon: <Landmark className="w-4 h-4" /> },
  ];

  return (
    <div className="grid grid-cols-2 gap-2">
      {categories.map((category) => (
        <Badge
          key={category.id}
          variant={selectedCategory === category.id ? "default" : "outline"}
          className={`cursor-pointer px-3 py-2 rounded-lg transition-all duration-200 hover:scale-105 justify-start ${
            selectedCategory === category.id
              ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0 shadow-lg'
              : 'border-blue-200 hover:border-blue-300 hover:bg-blue-50'
          }`}
          onClick={() => onCategoryChange(category.id)}
        >
          {category.icon}
          <span className="ml-2 text-sm">{category.label}</span>
        </Badge>
      ))}
    </div>
  );
};

// Theme Filter Component
const ThemeFilter = ({ selectedTheme, onThemeChange }: { selectedTheme: string; onThemeChange: (theme: string) => void }) => {
  const themes = [
    { id: 'all', label: 'All Themes', icon: <Palette className="w-4 h-4" /> },
    { id: 'web3-general', label: 'Web3 General', icon: <Wallet className="w-4 h-4" /> },
    { id: 'nfts', label: 'NFTs', icon: <ImageIcon className="w-4 h-4" /> },
    { id: 'privacy', label: 'Privacy', icon: <Lock className="w-4 h-4" /> },
    { id: 'dapp', label: 'dApp', icon: <BarChart2 className="w-4 h-4" /> },
    { id: 'security', label: 'Security', icon: <Shield className="w-4 h-4" /> },
    { id: 'ethereum-ecosystem', label: 'Ethereum Ecosystem', icon: <Network className="w-4 h-4" /> },
    { id: 'decentralized-tech', label: 'Decentralized Technologies', icon: <Atom className="w-4 h-4" /> },
    { id: 'academics', label: 'Academics', icon: <BookOpen className="w-4 h-4" /> },
  ];

  return (
    <div className="grid grid-cols-2 gap-2">
      {themes.map((theme) => (
        <Badge
          key={theme.id}
          variant={selectedTheme === theme.id ? "default" : "outline"}
          className={`cursor-pointer px-3 py-2 rounded-lg transition-all duration-200 hover:scale-105 justify-start ${
            selectedTheme === theme.id
              ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white border-0 shadow-lg'
              : 'border-orange-200 hover:border-orange-300 hover:bg-orange-50'
          }`}
          onClick={() => onThemeChange(theme.id)}
        >
          {theme.icon}
          <span className="ml-2 text-sm">{theme.label}</span>
        </Badge>
      ))}
    </div>
  );
};

// Region Filter Component
const RegionFilter = ({ selectedRegion, onRegionChange }: { selectedRegion: string; onRegionChange: (region: string) => void }) => {
  const regions = [
    { value: 'all', label: 'All Regions' },
    { value: 'asia', label: 'Asia' },
    { value: 'europe', label: 'Europe' },
    { value: 'north-america', label: 'North America' },
    { value: 'south-america', label: 'South America' },
    { value: 'africa', label: 'Africa' },
    { value: 'oceania', label: 'Oceania' }
  ];

  return (
    <div className="grid grid-cols-2 gap-2">
      {regions.map((region) => (
        <Badge
          key={region.value}
          variant={selectedRegion === region.value ? "default" : "outline"}
          className={`cursor-pointer px-3 py-2 rounded-lg transition-all duration-200 hover:scale-105 justify-start ${
            selectedRegion === region.value
              ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white border-0 shadow-lg'
              : 'border-green-200 hover:border-green-300 hover:bg-green-50'
          }`}
          onClick={() => onRegionChange(region.value)}
        >
          <MapPin className="w-4 h-4" />
          <span className="ml-2 text-sm">{region.label}</span>
        </Badge>
      ))}
    </div>
  );
};

// Month Filter Component
const MonthFilter = ({ selectedMonth, onMonthChange }: { selectedMonth: string; onMonthChange: (month: string) => void }) => {
  const months = [
    { value: 'all', label: 'All Months' },
    { value: 'january', label: 'January' },
    { value: 'february', label: 'February' },
    { value: 'march', label: 'March' },
    { value: 'april', label: 'April' },
    { value: 'may', label: 'May' },
    { value: 'june', label: 'June' },
    { value: 'july', label: 'July' },
    { value: 'august', label: 'August' },
    { value: 'september', label: 'September' },
    { value: 'october', label: 'October' },
    { value: 'november', label: 'November' },
    { value: 'december', label: 'December' }
  ];

  return (
    <div className="grid grid-cols-3 gap-2">
      {months.map((month) => (
        <Badge
          key={month.value}
          variant={selectedMonth === month.value ? "default" : "outline"}
          className={`cursor-pointer px-3 py-2 rounded-lg transition-all duration-200 hover:scale-105 justify-center ${
            selectedMonth === month.value
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 shadow-lg'
              : 'border-purple-200 hover:border-purple-300 hover:bg-purple-50'
          }`}
          onClick={() => onMonthChange(month.value)}
        >
          <span className="text-sm">{month.label}</span>
        </Badge>
      ))}
    </div>
  );
};

// Attach sub-components to FilterSection
FilterSection.CategoryFilter = CategoryFilter;
FilterSection.ThemeFilter = ThemeFilter;
FilterSection.RegionFilter = RegionFilter;
FilterSection.MonthFilter = MonthFilter;

export default FilterSection;
