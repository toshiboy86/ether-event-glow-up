import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ViewControls } from "@/components/ViewControls";

const Index = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showAllTags, setShowAllTags] = useState(false);
  const [currentView, setCurrentView] = useState<'calendar' | 'list'>('calendar');
  const [calendarVisible, setCalendarVisible] = useState(true);

  const tags = [
    "Conference",
    "Hackathon",
    "Workshop",
    "Meetup",
    "Web3",
    "DeFi",
    "NFT",
    "DAO",
    "Gaming",
    "Infrastructure",
    "Security",
    "Privacy",
    "Research",
    "Community",
    "Education",
    "Art",
    "Culture",
    "Social Impact",
    "Sustainability",
  ];

  const events = [
    {
      id: 1,
      title: "ETHGlobal New York",
      date: "2024-09-20",
      location: "New York, USA",
      tags: ["Conference", "Hackathon", "Web3"],
    },
    {
      id: 2,
      title: "Devcon 7",
      date: "2024-11-12",
      location: "Bogota, Colombia",
      tags: ["Conference", "Web3", "DeFi"],
    },
    {
      id: 3,
      title: "ETHDenver",
      date: "2025-02-14",
      location: "Denver, USA",
      tags: ["Conference", "Hackathon", "DAO"],
    },
    {
      id: 4,
      title: "NFT.NYC",
      date: "2024-11-06",
      location: "New York, USA",
      tags: ["Conference", "NFT", "Art"],
    },
    {
      id: 5,
      title: "Lisbon Blockchain Week",
      date: "2024-10-21",
      location: "Lisbon, Portugal",
      tags: ["Conference", "Web3", "Infrastructure"],
    },
    {
      id: 6,
      title: "ETHWaterloo",
      date: "2024-09-27",
      location: "Waterloo, Canada",
      tags: ["Hackathon", "Web3", "Education"],
    },
    {
      id: 7,
      title: "DappCon",
      date: "2024-09-09",
      location: "Berlin, Germany",
      tags: ["Conference", "Web3", "Gaming"],
    },
    {
      id: 8,
      title: "Solana Breakpoint",
      date: "2024-09-18",
      location: "Lisbon, Portugal",
      tags: ["Conference", "Web3", "Infrastructure"],
    },
    {
      id: 9,
      title: "Cosmoverse",
      date: "2024-10-02",
      location: "Istanbul, Turkey",
      tags: ["Conference", "Web3", "Community"],
    },
    {
      id: 10,
      title: "Avalanche Summit",
      date: "2025-03-01",
      location: "Barcelona, Spain",
      tags: ["Conference", "Web3", "DeFi"],
    },
  ];

  const filteredEvents = events.filter((event) => {
    const dateMatch = date ? event.date === format(date, "yyyy-MM-dd") : true;
    const tagMatch =
      selectedTags.length > 0 ? selectedTags.every((tag) => event.tags.includes(tag)) : true;
    const searchMatch = search
      ? event.title.toLowerCase().includes(search.toLowerCase()) ||
        event.location.toLowerCase().includes(search.toLowerCase())
      : true;
    return dateMatch && tagMatch && searchMatch;
  });

  const handleViewChange = (view: 'calendar' | 'list') => {
    setCurrentView(view);
  };

  const handleCalendarToggle = () => {
    setCalendarVisible(!calendarVisible);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Ethereum Events</h1>
              <p className="text-muted-foreground">Discover protocol events worldwide</p>
            </div>
            <ViewControls
              currentView={currentView}
              onViewChange={handleViewChange}
              calendarVisible={calendarVisible}
              onCalendarToggle={handleCalendarToggle}
            />
          </div>
        </div>
      </header>

      {/* Filters */}
      <section className="border-b">
        <div className="container mx-auto flex flex-col gap-4 px-4 py-4 md:flex-row">
          {/* Date Picker */}
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[300px] justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border shadow-sm" />
            </PopoverContent>
          </Popover>

          {/* Search Bar */}
          <Input type="search" placeholder="Search events or locations..." value={search} onChange={(e) => setSearch(e.target.value)} />

          {/* Tags Filter */}
          <Command>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" role="combobox" aria-expanded={open} className="w-[200px] justify-between">
                  Tags
                  <span className="ml-2 flex h-4 w-4 items-center justify-center rounded-full bg-muted text-xs text-muted-foreground">
                    {selectedTags.length}
                  </span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0">
                <CommandInput placeholder="Search tags..." />
                <CommandList>
                  <CommandEmpty>No tags found.</CommandEmpty>
                  <CommandGroup heading="Tags">
                    <ScrollArea className="h-60">
                      {tags.slice(0, showAllTags ? tags.length : 5).map((tag) => (
                        <CommandItem key={tag} onSelect={() => {
                          if (selectedTags.includes(tag)) {
                            setSelectedTags(selectedTags.filter((t) => t !== tag));
                          } else {
                            setSelectedTags([...selectedTags, tag]);
                          }
                        }}>
                          <div className="mr-2 flex h-4 w-4 items-center justify-center">
                            <Checkbox
                              checked={selectedTags.includes(tag)}
                            />
                          </div>
                          <span>{tag}</span>
                        </CommandItem>
                      ))}
                    </ScrollArea>
                  </CommandGroup>
                  {tags.length > 5 && (
                    <>
                      <CommandSeparator />
                      <CommandItem onSelect={() => setShowAllTags(!showAllTags)}>
                        {showAllTags ? "Show less" : "Show more"}
                      </CommandItem>
                    </>
                  )}
                </CommandList>
              </PopoverContent>
            </Popover>
          </Command>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Events List/Grid */}
          <div className="flex-1">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredEvents.map((event) => (
                <Card key={event.id}>
                  <CardHeader>
                    <CardTitle>{event.title}</CardTitle>
                    <CardDescription>
                      {format(new Date(event.date), "PPP")} - {event.location}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-2">
                      {event.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">{tag}</Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Calendar Sidebar - conditionally rendered */}
          {calendarVisible && (
            <div className="w-80 lg:block">
              <div className="sticky top-4">
                <div className="rounded-lg border bg-card p-6">
                  <h3 className="mb-4 text-lg font-semibold">Event Calendar</h3>
                  <div className="text-sm text-muted-foreground">
                    Calendar view coming soon...
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Newsletter Signup */}
      <section className="border-t bg-secondary">
        <div className="container mx-auto px-4 py-12">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold">Stay in the loop</h2>
              <p className="text-muted-foreground">
                Subscribe to our newsletter and never miss an event.
              </p>
            </div>
            <div className="flex items-center">
              <Input type="email" placeholder="Enter your email..." className="mr-4" />
              <Button>Subscribe</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted">
        <div className="container mx-auto px-4 py-8 text-center text-muted-foreground">
          <p>© 2024 Ethereum Events. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
