
import React, { useState } from 'react';
import { Calendar, List, ToggleLeft, ToggleRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ViewControlsProps {
  currentView: 'calendar' | 'list';
  onViewChange: (view: 'calendar' | 'list') => void;
  calendarVisible: boolean;
  onCalendarToggle: () => void;
}

export const ViewControls = ({ 
  currentView, 
  onViewChange, 
  calendarVisible, 
  onCalendarToggle 
}: ViewControlsProps) => {
  return (
    <div className="flex items-center gap-4">
      {/* View Switcher */}
      <div className="flex bg-muted rounded-lg p-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onViewChange('calendar')}
          className={cn(
            "h-8 w-8 p-0 rounded-md transition-colors",
            currentView === 'calendar' 
              ? "bg-primary text-primary-foreground shadow-sm" 
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <Calendar className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onViewChange('list')}
          className={cn(
            "h-8 w-8 p-0 rounded-md transition-colors",
            currentView === 'list' 
              ? "bg-primary text-primary-foreground shadow-sm" 
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <List className="h-4 w-4" />
        </Button>
      </div>

      {/* Calendar Toggle */}
      <div className="flex items-center gap-2 bg-muted rounded-lg px-3 py-1.5">
        <span className="text-sm text-foreground">Calendar</span>
        <Button
          variant="ghost"
          size="sm"
          onClick={onCalendarToggle}
          className="h-6 w-6 p-0 text-muted-foreground hover:text-foreground"
        >
          {calendarVisible ? (
            <ToggleRight className="h-5 w-5 text-primary" />
          ) : (
            <ToggleLeft className="h-5 w-5" />
          )}
        </Button>
      </div>
    </div>
  );
};
