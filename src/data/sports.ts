import { Sport } from '../types';

export interface SportOption {
  id: Sport;
  name: string;
  icon: string;
  badge: string;
  count: number;
}

export const SPORTS_CATALOG: SportOption[] = [
  { id: 'Hockey', name: 'Youth Hockey', icon: '🏒', badge: 'Active Hub', count: 180 },
  { id: 'Soccer', name: 'Youth Soccer', icon: '⚽', badge: 'Expanding', count: 142 },
  { id: 'Basketball', name: 'Youth Basketball', icon: '🏀', badge: 'Expanding', count: 118 },
  { id: 'Baseball', name: 'Youth Baseball', icon: '⚾', badge: 'Beta', count: 96 },
  { id: 'Football', name: 'Youth Football', icon: '🏈', badge: 'Beta', count: 64 },
  { id: 'Lacrosse', name: 'Youth Lacrosse', icon: '🥍', badge: 'Beta', count: 52 },
  { id: 'Volleyball', name: 'Youth Volleyball', icon: '🏐', badge: 'Coming Soon', count: 38 },
  { id: 'Swimming', name: 'Competitive Swimming', icon: '🏊', badge: 'Coming Soon', count: 41 },
];
