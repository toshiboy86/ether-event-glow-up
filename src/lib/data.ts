const defaultFilters = {
    region: "All Regions",
    month: "All Months",
    domain: "All Domains",
    category: "All Categories",
    venueType: "All Venue Types",
  }
  
  export type TVenueType =
    | "in_person"
    | "virtual"
    | "hybrid"
    | (typeof defaultFilters)["venueType"]
  
  export interface IWeatherAverage {
    tempmax: number
    tempmin: number
    temp: number
    humidity: number
  }
    
  
  export interface EventCardProps {
    event: {
      id: number
      name: string
      location: string
      region: string
      country: string
      countryCode: string
      categories: string[]
      domains: string[]
      venueType: TVenueType
      startDateTime: Date
      endDateTime: Date
      links: string[]
      socials: string[]
      communities: string[]
      hasTimezone: boolean
      weatherMetrics: IWeatherAverage
    };
    viewMode: 'grid' | 'list';
  }