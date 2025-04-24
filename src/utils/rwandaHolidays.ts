
import { addYears } from "date-fns";

export interface Holiday {
  name: string;
  date: Date;
  description?: string;
}

// Function to generate holidays for the next few years
export const getRwandaHolidays = (baseYear: number = new Date().getFullYear()): Holiday[] => {
  const holidays: Holiday[] = [
    { 
      name: "New Year's Day", 
      date: new Date(baseYear, 0, 1),
      description: "New Year's Day celebration"
    },
    { 
      name: "Heroes' Day", 
      date: new Date(baseYear, 1, 1),
      description: "National Heroes Day"
    },
    { 
      name: "Easter Monday", 
      date: new Date(baseYear, 3, 10), // Note: Date varies each year
      description: "Easter Monday celebration"
    },
    { 
      name: "Labour Day", 
      date: new Date(baseYear, 4, 1),
      description: "International Workers' Day"
    },
    { 
      name: "Liberation Day", 
      date: new Date(baseYear, 6, 4),
      description: "Rwanda Liberation Day"
    },
    { 
      name: "Umuganura Day", 
      date: new Date(baseYear, 7, 1),
      description: "National Harvest Day"
    },
    {
      name: "Christmas Day",
      date: new Date(baseYear, 11, 25),
      description: "Christmas Day celebration"
    },
    {
      name: "Boxing Day",
      date: new Date(baseYear, 11, 26),
      description: "Boxing Day"
    }
  ];

  // Add holidays for next year as well
  const nextYearHolidays = holidays.map(holiday => ({
    ...holiday,
    date: addYears(holiday.date, 1)
  }));

  return [...holidays, ...nextYearHolidays];
};
