export interface MonthlyAnalytics {
  month: string;
  views: number;
  reviews: number;
  clicks: number;
  inquiries: number;
}

export const ORGANIZATION_ANALYTICS: MonthlyAnalytics[] = [
  { month: 'Jun', views: 1840, reviews: 8, clicks: 120, inquiries: 14 },
  { month: 'Jul', views: 2210, reviews: 14, clicks: 165, inquiries: 22 },
  { month: 'Aug', views: 3450, reviews: 26, clicks: 240, inquiries: 38 },
  { month: 'Sep', views: 4120, reviews: 32, clicks: 310, inquiries: 49 },
  { month: 'Oct', views: 3842, reviews: 28, clicks: 284, inquiries: 44 },
  { month: 'Nov', views: 4290, reviews: 18, clicks: 330, inquiries: 51 },
];

export const DEMO_AUDIENCE_LOCATIONS = [
  { city: 'Minneapolis Metro', percentage: 54, count: 2074 },
  { city: 'St. Paul & East Metro', percentage: 22, count: 845 },
  { city: 'Duluth & North', percentage: 11, count: 422 },
  { city: 'Western Wisconsin', percentage: 8, count: 307 },
  { city: 'Other Regions', percentage: 5, count: 194 },
];

export const DEMO_USER_PROFILE = {
  id: 'usr-demo-1',
  fullName: 'Alex Vance',
  email: 'alex.vance@example.com',
  role: 'free' as const,
  anonymousIdentity: 'Anonymous Parent #2048',
  preferredSport: 'Hockey' as const,
  location: 'Minneapolis, Minnesota',
  accountType: 'Parent / Guardian' as const,
  savedOrgIds: ['org-1', 'org-2', 'org-3'],
  helpfulVotesReceived: 24,
};
