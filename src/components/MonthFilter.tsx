
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from 'lucide-react';

interface MonthFilterProps {
  selectedMonth: string;
  onMonthChange: (month: string) => void;
}

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

const MonthFilter = ({ selectedMonth, onMonthChange }: MonthFilterProps) => {
  const selectedMonthLabel = months.find(month => month.value === selectedMonth)?.label || 'All Months';

  return (
    <Select value={selectedMonth} onValueChange={onMonthChange}>
      <SelectTrigger 
        className="w-auto min-w-[130px] h-9 bg-white border-purple-200 rounded-xl hover:bg-purple-50 focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-all"
        aria-label="Filter by month"
      >
        <div className="flex items-center space-x-2">
          <Calendar className="w-4 h-4 text-purple-500" />
          <SelectValue placeholder="All Months">
            {selectedMonthLabel}
          </SelectValue>
        </div>
      </SelectTrigger>
      <SelectContent 
        className="bg-white border-purple-200 shadow-xl rounded-xl z-50 animate-fade-in"
        sideOffset={5}
      >
        {months.map((month) => (
          <SelectItem 
            key={month.value} 
            value={month.value}
            className="hover:bg-purple-50 focus:bg-purple-50 cursor-pointer rounded-lg transition-colors"
          >
            {month.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default MonthFilter;
