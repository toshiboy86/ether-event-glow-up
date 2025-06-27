
import React, { useState } from 'react';
import { Filter, Search, X, ChevronDown, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import FilterSection from './FilterSection';

interface FilterPanelProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  selectedTheme: string;
  onThemeChange: (theme: string) => void;
  selectedRegion: string;
  onRegionChange: (region: string) => void;
  selectedMonth: string;
  onMonthChange: (month: string) => void;
  startThisMonth: boolean;
  onStartThisMonthChange: (value: boolean) => void;
  activeEventsOnly: boolean;
  onActiveEventsOnlyChange: (value: boolean) => void;
}

const FilterPanel = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedTheme,
  onThemeChange,
  selectedRegion,
  onRegionChange,
  selectedMonth,
  onMonthChange,
  startThisMonth,
  onStartThisMonthChange,
  activeEventsOnly,
  onActiveEventsOnlyChange,
}: FilterPanelProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    categories: true,
    themes: false,
    regions: false,
    months: false,
  });

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const clearAllFilters = () => {
    onCategoryChange('all');
    onThemeChange('all');
    onRegionChange('all');
    onMonthChange('all');
    onStartThisMonthChange(false);
    onActiveEventsOnlyChange(false);
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (selectedCategory !== 'all') count++;
    if (selectedTheme !== 'all') count++;
    if (selectedRegion !== 'all') count++;
    if (selectedMonth !== 'all') count++;
    if (startThisMonth) count++;
    if (activeEventsOnly) count++;
    return count;
  };

  const getFilterChips = () => {
    const chips = [];
    
    if (selectedCategory !== 'all') {
      chips.push({
        id: 'category',
        label: selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1),
        onRemove: () => onCategoryChange('all')
      });
    }
    
    if (selectedTheme !== 'all') {
      chips.push({
        id: 'theme',
        label: selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1),
        onRemove: () => onThemeChange('all')
      });
    }
    
    if (selectedRegion !== 'all') {
      chips.push({
        id: 'region',
        label: selectedRegion.charAt(0).toUpperCase() + selectedRegion.slice(1),
        onRemove: () => onRegionChange('all')
      });
    }
    
    if (selectedMonth !== 'all') {
      chips.push({
        id: 'month',
        label: selectedMonth.charAt(0).toUpperCase() + selectedMonth.slice(1),
        onRemove: () => onMonthChange('all')
      });
    }
    
    if (startThisMonth) {
      chips.push({
        id: 'startThisMonth',
        label: 'Start This Month',
        onRemove: () => onStartThisMonthChange(false)
      });
    }
    
    if (activeEventsOnly) {
      chips.push({
        id: 'activeEventsOnly',
        label: 'Active Events Only',
        onRemove: () => onActiveEventsOnlyChange(false)
      });
    }
    
    return chips;
  };

  const activeFiltersCount = getActiveFiltersCount();
  const filterChips = getFilterChips();

  return (
    <div className="w-full">
      {/* Main Search and Filter Bar */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-blue-100 shadow-lg p-4">
        <div className="flex items-center space-x-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Search by location and event name..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-11 h-12 bg-white/70 border-blue-200 focus:border-blue-400 rounded-xl text-base"
            />
          </div>
          
          {/* Filter Toggle Button */}
          <Button
            variant="outline"
            onClick={() => setIsExpanded(!isExpanded)}
            className={`h-12 px-4 rounded-xl border-2 transition-all duration-200 ${
              isExpanded || activeFiltersCount > 0
                ? 'border-blue-400 bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600'
                : 'border-blue-200 hover:border-blue-300 hover:bg-blue-50'
            }`}
          >
            <Filter className="w-5 h-5" />
            {activeFiltersCount > 0 && (
              <Badge className="ml-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white border-0">
                {activeFiltersCount}
              </Badge>
            )}
          </Button>
        </div>

        {/* Active Filter Chips */}
        {filterChips.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-blue-100">
            {filterChips.map((chip) => (
              <Badge
                key={chip.id}
                variant="secondary"
                className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 border border-blue-200 hover:border-blue-300 transition-all duration-200 cursor-pointer"
                onClick={chip.onRemove}
              >
                {chip.label}
                <X className="w-3 h-3 ml-1" />
              </Badge>
            ))}
            
            {filterChips.length > 1 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAllFilters}
                className="text-gray-500 hover:text-gray-700 h-auto p-1 text-xs"
              >
                Clear All
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Expandable Filter Panel */}
      <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
        <CollapsibleContent className="data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
          <div className="mt-4 bg-white/80 backdrop-blur-sm rounded-2xl border border-blue-100 shadow-lg p-6 space-y-6">
            
            {/* Categories Section */}
            <FilterSection
              title="Categories"
              icon="🎯"
              isOpen={openSections.categories}
              onToggle={() => toggleSection('categories')}
              iconColor="from-blue-500 to-purple-500"
            >
              <FilterSection.CategoryFilter
                selectedCategory={selectedCategory}
                onCategoryChange={onCategoryChange}
              />
            </FilterSection>

            {/* Themes Section */}
            <FilterSection
              title="Themes"
              icon="🎨"
              isOpen={openSections.themes}
              onToggle={() => toggleSection('themes')}
              iconColor="from-orange-500 to-pink-500"
            >
              <FilterSection.ThemeFilter
                selectedTheme={selectedTheme}
                onThemeChange={onThemeChange}
              />
            </FilterSection>

            {/* Regions Section */}
            <FilterSection
              title="Regions"
              icon="🌍"
              isOpen={openSections.regions}
              onToggle={() => toggleSection('regions')}
              iconColor="from-green-500 to-blue-500"
            >
              <FilterSection.RegionFilter
                selectedRegion={selectedRegion}
                onRegionChange={onRegionChange}
              />
            </FilterSection>

            {/* Months Section */}
            <FilterSection
              title="Months"
              icon="📅"
              isOpen={openSections.months}
              onToggle={() => toggleSection('months')}
              iconColor="from-purple-500 to-pink-500"
            >
              <FilterSection.MonthFilter
                selectedMonth={selectedMonth}
                onMonthChange={onMonthChange}
              />
            </FilterSection>

            {/* Toggle Options */}
            <div className="space-y-4 pt-4 border-t border-blue-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                    <span className="text-white text-sm">📅</span>
                  </div>
                  <div>
                    <label htmlFor="start-this-month" className="font-medium text-gray-900 cursor-pointer">
                      Start This Month
                    </label>
                    <p className="text-sm text-gray-500">Events starting in the current month</p>
                  </div>
                </div>
                <Switch
                  id="start-this-month"
                  checked={startThisMonth}
                  onCheckedChange={onStartThisMonthChange}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
                    <span className="text-white text-sm">⚡</span>
                  </div>
                  <div>
                    <label htmlFor="active-events" className="font-medium text-gray-900 cursor-pointer">
                      Active Events Only
                    </label>
                    <p className="text-sm text-gray-500">Only show ongoing and upcoming events</p>
                  </div>
                </div>
                <Switch
                  id="active-events"
                  checked={activeEventsOnly}
                  onCheckedChange={onActiveEventsOnlyChange}
                />
              </div>
            </div>

            {/* Apply Filters Button */}
            <div className="flex justify-end pt-4 border-t border-blue-100">
              <Button
                onClick={() => setIsExpanded(false)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-xl shadow-lg transition-all duration-200"
              >
                Apply Filters
              </Button>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default FilterPanel;
