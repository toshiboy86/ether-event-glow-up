import React from 'react';
import { Badge } from '@/components/ui/badge';
import {
  Sparkles,
  Target,
  Zap,
  Handshake,
  Hammer,
  Bitcoin,
  Calendar,
  Landmark,
} from 'lucide-react';

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryFilter = ({ selectedCategory, onCategoryChange }: CategoryFilterProps) => {
  const categories = [
    { id: 'all', label: 'All Categories', icon: <Sparkles className="w-4 h-4 mr-2" /> },
    { id: 'conference', label: 'Conference', icon: <Target className="w-4 h-4 mr-2" /> },
    { id: 'hackathon', label: 'Hackathon', icon: <Zap className="w-4 h-4 mr-2" /> },
    { id: 'meetup', label: 'Meetup', icon: <Handshake className="w-4 h-4 mr-2" /> },
    { id: 'workshop', label: 'Workshop', icon: <Hammer className="w-4 h-4 mr-2" /> },
    { id: 'bitcoin talk', label: 'Popup Village/City', icon: <Bitcoin className="w-4 h-4 mr-2" /> },
    { id: 'blockchain week', label: 'Blockchain Week', icon: <Calendar className="w-4 h-4 mr-2" /> },
    { id: 'summit', label: 'Summit', icon: <Landmark className="w-4 h-4 mr-2" /> },
  ];

  return (
    <div>
      <h4 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">Categories</h4>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Badge
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            className={`cursor-pointer px-4 py-2 rounded-xl transition-all duration-200 hover:scale-105 ${
              selectedCategory === category.id
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0 shadow-lg'
                : 'border-blue-200 hover:border-blue-300 hover:bg-blue-50'
            }`}
            onClick={() => onCategoryChange(category.id)}
          >
            {category.icon}
            {category.label}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
