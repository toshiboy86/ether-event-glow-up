import React from 'react';
import { Badge } from '@/components/ui/badge';
import {
  Palette,
  Wallet,
  Image as ImageIcon,
  Lock,
  BarChart2,
  Shield,
  Network,
  Atom,
  BookOpen,
} from 'lucide-react';

interface ThemeFilterProps {
  selectedTheme: string;
  onThemeChange: (theme: string) => void;
}

const ThemeFilter = ({ selectedTheme, onThemeChange }: ThemeFilterProps) => {
  const themes = [
    { id: 'all', label: 'All Themes', icon: <Palette className="w-4 h-4 mr-2" /> },
    { id: 'web3-general', label: 'Web3 General', icon: <Wallet className="w-4 h-4 mr-2" /> },
    { id: 'nfts', label: 'NFTs', icon: <ImageIcon className="w-4 h-4 mr-2" /> },
    { id: 'privacy', label: 'Privacy', icon: <Lock className="w-4 h-4 mr-2" /> },
    { id: 'dapp', label: 'dApp', icon: <BarChart2 className="w-4 h-4 mr-2" /> },
    { id: 'security', label: 'Security', icon: <Shield className="w-4 h-4 mr-2" /> },
    { id: 'ethereum-ecosystem', label: 'Ethereum Ecosystem', icon: <Network className="w-4 h-4 mr-2" /> },
    { id: 'decentralized-tech', label: 'Decentralized Technologies', icon: <Atom className="w-4 h-4 mr-2" /> },
    { id: 'academics', label: 'Academics', icon: <BookOpen className="w-4 h-4 mr-2" /> },
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
            {theme.icon}
            {theme.label}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default ThemeFilter;
