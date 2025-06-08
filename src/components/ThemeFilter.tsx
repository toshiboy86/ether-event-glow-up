
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface ThemeFilterProps {
  selectedTheme: string;
  onThemeChange: (theme: string) => void;
}

const ThemeFilter = ({ selectedTheme, onThemeChange }: ThemeFilterProps) => {
  const themes = [
    { id: 'all', label: 'All Themes', icon: '🎨' },
    { id: 'defi', label: 'DeFi', icon: '💰' },
    { id: 'gaming', label: 'Gaming', icon: '🎮' },
    { id: 'nfts', label: 'NFTs', icon: '🖼️' },
    { id: 'privacy', label: 'Privacy', icon: '🔒' },
    { id: 'scaling', label: 'Scaling', icon: '📈' },
    { id: 'zk', label: 'ZK', icon: '🔐' },
  ];

  return (
    <div>
      <h4 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">Themes</h4>
      <div className="flex flex-wrap gap-2">
        {themes.map((theme) => (
          <Badge
            key={theme.id}
            variant={selectedTheme === theme.id ? "default" : "outline"}
            className={`cursor-pointer px-4 py-2 rounded-xl transition-all duration-200 hover:scale-105 ${
              selectedTheme === theme.id
                ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white border-0 shadow-lg'
                : 'border-orange-200 hover:border-orange-300 hover:bg-orange-50'
            }`}
            onClick={() => onThemeChange(theme.id)}
          >
            <span className="mr-2">{theme.icon}</span>
            {theme.label}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default ThemeFilter;
