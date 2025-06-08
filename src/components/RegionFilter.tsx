
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin } from 'lucide-react';

interface RegionFilterProps {
  selectedRegion: string;
  onRegionChange: (region: string) => void;
}

const regions = [
  { value: 'all', label: 'All Regions' },
  { value: 'asia', label: 'Asia' },
  { value: 'europe', label: 'Europe' },
  { value: 'north-america', label: 'North America' },
  { value: 'south-america', label: 'South America' },
  { value: 'africa', label: 'Africa' },
  { value: 'oceania', label: 'Oceania' }
];

const RegionFilter = ({ selectedRegion, onRegionChange }: RegionFilterProps) => {
  const selectedRegionLabel = regions.find(region => region.value === selectedRegion)?.label || 'All Regions';

  return (
    <Select value={selectedRegion} onValueChange={onRegionChange}>
      <SelectTrigger 
        className="w-auto min-w-[140px] h-9 bg-white border-blue-200 rounded-xl hover:bg-blue-50 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
        aria-label="Filter by region"
      >
        <div className="flex items-center space-x-2">
          <MapPin className="w-4 h-4 text-blue-500" />
          <SelectValue placeholder="All Regions">
            {selectedRegionLabel}
          </SelectValue>
        </div>
      </SelectTrigger>
      <SelectContent 
        className="bg-white border-blue-200 shadow-xl rounded-xl z-50 animate-fade-in"
        sideOffset={5}
      >
        {regions.map((region) => (
          <SelectItem 
            key={region.value} 
            value={region.value}
            className="hover:bg-blue-50 focus:bg-blue-50 cursor-pointer rounded-lg transition-colors"
          >
            {region.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default RegionFilter;
