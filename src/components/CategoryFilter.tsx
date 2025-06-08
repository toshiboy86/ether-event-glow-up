
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryFilter = ({ selectedCategory, onCategoryChange }: CategoryFilterProps) => {
  const categories = [
    { id: 'all', label: 'All Categories', icon: '🌟' },
    { id: 'conference', label: 'Conference', icon: '🎯' },
    { id: 'hackathon', label: 'Hackathon', icon: '⚡' },
    { id: 'meetup', label: 'Meetup', icon: '🤝' },
    { id: 'workshop', label: 'Workshop', icon: '🛠️' },
    { id: 'bitcoin talk', label: 'Bitcoin Talk', icon: '₿' },
    { id: 'event', label: 'Event', icon: '📅' },
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
            <span className="mr-2">{category.icon}</span>
            {category.label}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
