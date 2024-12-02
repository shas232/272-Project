// Comprehensive list of major airports worldwide
export const airports = [
  // Existing International Airports
  { code: 'ATL', city: 'Atlanta', country: 'United States', name: 'Hartsfield-Jackson Atlanta International Airport' },
  { code: 'PEK', city: 'Beijing', country: 'China', name: 'Beijing Capital International Airport' },
  { code: 'DXB', city: 'Dubai', country: 'United Arab Emirates', name: 'Dubai International Airport' },
  { code: 'HND', city: 'Tokyo', country: 'Japan', name: 'Tokyo Haneda Airport' },
  { code: 'LAX', city: 'Los Angeles', country: 'United States', name: 'Los Angeles International Airport' },
  { code: 'ORD', city: 'Chicago', country: 'United States', name: "O'Hare International Airport" },
  { code: 'LHR', city: 'London', country: 'United Kingdom', name: 'London Heathrow Airport' },
  { code: 'HKG', city: 'Hong Kong', country: 'Hong Kong', name: 'Hong Kong International Airport' },
  { code: 'PVG', city: 'Shanghai', country: 'China', name: 'Shanghai Pudong International Airport' },
  { code: 'CDG', city: 'Paris', country: 'France', name: 'Charles de Gaulle Airport' },
  { code: 'AMS', city: 'Amsterdam', country: 'Netherlands', name: 'Amsterdam Airport Schiphol' },
  { code: 'FRA', city: 'Frankfurt', country: 'Germany', name: 'Frankfurt Airport' },
  { code: 'IST', city: 'Istanbul', country: 'Turkey', name: 'Istanbul Airport' },
  { code: 'SIN', city: 'Singapore', country: 'Singapore', name: 'Singapore Changi Airport' },
  { code: 'ICN', city: 'Seoul', country: 'South Korea', name: 'Incheon International Airport' },
  { code: 'BKK', city: 'Bangkok', country: 'Thailand', name: 'Suvarnabhumi Airport' },
  { code: 'JFK', city: 'New York', country: 'United States', name: 'John F. Kennedy International Airport' },
  { code: 'LGW', city: 'London', country: 'United Kingdom', name: 'London Gatwick Airport' },
  { code: 'BCN', city: 'Barcelona', country: 'Spain', name: 'Barcelona–El Prat Airport' },
  { code: 'SYD', city: 'Sydney', country: 'Australia', name: 'Sydney Airport' },
  { code: 'MEL', city: 'Melbourne', country: 'Australia', name: 'Melbourne Airport' },
  { code: 'YYZ', city: 'Toronto', country: 'Canada', name: 'Toronto Pearson International Airport' },
  { code: 'YVR', city: 'Vancouver', country: 'Canada', name: 'Vancouver International Airport' },
  { code: 'DXB', city: 'Dubai', country: 'United Arab Emirates', name: 'Dubai International Airport' },
  { code: 'DOH', city: 'Doha', country: 'Qatar', name: 'Hamad International Airport' },
  { code: 'MUC', city: 'Munich', country: 'Germany', name: 'Munich Airport' },
  { code: 'FCO', city: 'Rome', country: 'Italy', name: 'Leonardo da Vinci International Airport' },
  { code: 'MAD', city: 'Madrid', country: 'Spain', name: 'Adolfo Suárez Madrid–Barajas Airport' },
  { code: 'SFO', city: 'San Francisco', country: 'United States', name: 'San Francisco International Airport' },
  { code: 'SEA', city: 'Seattle', country: 'United States', name: 'Seattle-Tacoma International Airport' },

  // Additional US Airports
  { code: 'DFW', city: 'Dallas', country: 'United States', name: 'Dallas/Fort Worth International Airport' },
  { code: 'DEN', city: 'Denver', country: 'United States', name: 'Denver International Airport' },
  { code: 'MIA', city: 'Miami', country: 'United States', name: 'Miami International Airport' },
  { code: 'CLT', city: 'Charlotte', country: 'United States', name: 'Charlotte Douglas International Airport' },
  { code: 'LAS', city: 'Las Vegas', country: 'United States', name: 'Harry Reid International Airport' },
  { code: 'PHX', city: 'Phoenix', country: 'United States', name: 'Phoenix Sky Harbor International Airport' },
  { code: 'IAH', city: 'Houston', country: 'United States', name: 'George Bush Intercontinental Airport' },
  { code: 'MCO', city: 'Orlando', country: 'United States', name: 'Orlando International Airport' },
  { code: 'EWR', city: 'Newark', country: 'United States', name: 'Newark Liberty International Airport' },
  { code: 'MSP', city: 'Minneapolis', country: 'United States', name: 'Minneapolis-Saint Paul International Airport' },
  { code: 'BOS', city: 'Boston', country: 'United States', name: 'Boston Logan International Airport' },
  { code: 'DTW', city: 'Detroit', country: 'United States', name: 'Detroit Metropolitan Wayne County Airport' },
  { code: 'PHL', city: 'Philadelphia', country: 'United States', name: 'Philadelphia International Airport' },
  { code: 'LGA', city: 'New York', country: 'United States', name: 'LaGuardia Airport' },
  { code: 'FLL', city: 'Fort Lauderdale', country: 'United States', name: 'Fort Lauderdale-Hollywood International Airport' },
  { code: 'BWI', city: 'Baltimore', country: 'United States', name: 'Baltimore/Washington International Thurgood Marshall Airport' },
  { code: 'DCA', city: 'Washington', country: 'United States', name: 'Ronald Reagan Washington National Airport' },
  { code: 'IAD', city: 'Washington', country: 'United States', name: 'Washington Dulles International Airport' },
  { code: 'MDW', city: 'Chicago', country: 'United States', name: 'Chicago Midway International Airport' },
  { code: 'SLC', city: 'Salt Lake City', country: 'United States', name: 'Salt Lake City International Airport' },
  { code: 'SAN', city: 'San Diego', country: 'United States', name: 'San Diego International Airport' },
  { code: 'HNL', city: 'Honolulu', country: 'United States', name: 'Daniel K. Inouye International Airport' },
  { code: 'PDX', city: 'Portland', country: 'United States', name: 'Portland International Airport' },
  { code: 'TPA', city: 'Tampa', country: 'United States', name: 'Tampa International Airport' },
  { code: 'AUS', city: 'Austin', country: 'United States', name: 'Austin-Bergstrom International Airport' },
  { code: 'BNA', city: 'Nashville', country: 'United States', name: 'Nashville International Airport' },
  { code: 'MCI', city: 'Kansas City', country: 'United States', name: 'Kansas City International Airport' },
  { code: 'RDU', city: 'Raleigh', country: 'United States', name: 'Raleigh-Durham International Airport' },
  { code: 'OAK', city: 'Oakland', country: 'United States', name: 'Oakland International Airport' },
  { code: 'SJC', city: 'San Jose', country: 'United States', name: 'Norman Y. Mineta San Jose International Airport' }
];

export interface Airport {
  code: string;
  city: string;
  country: string;
  name: string;
}

export function searchAirports(query: string): Airport[] {
  const normalizedQuery = query.toLowerCase().trim();
  
  // If query is empty or too short, return empty array
  if (normalizedQuery.length < 2) return [];

  // Score and sort airports based on match relevance
  const scoredAirports = airports.map(airport => {
    let score = 0;
    
    // Exact matches get highest scores
    if (airport.code.toLowerCase() === normalizedQuery) score += 100;
    if (airport.city.toLowerCase() === normalizedQuery) score += 90;
    if (airport.country.toLowerCase() === normalizedQuery) score += 80;
    
    // Partial matches get lower scores
    if (airport.code.toLowerCase().includes(normalizedQuery)) score += 70;
    if (airport.city.toLowerCase().includes(normalizedQuery)) score += 60;
    if (airport.country.toLowerCase().includes(normalizedQuery)) score += 50;
    if (airport.name.toLowerCase().includes(normalizedQuery)) score += 40;
    
    // Bonus for matches at the start of words
    if (airport.city.toLowerCase().startsWith(normalizedQuery)) score += 30;
    if (airport.country.toLowerCase().startsWith(normalizedQuery)) score += 20;
    
    return { airport, score };
  });

  // Filter out non-matches and sort by score
  return scoredAirports
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .map(item => item.airport)
    .slice(0, 5); // Return top 5 matches
}