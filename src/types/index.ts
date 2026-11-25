export type Sport = 
  | 'Hockey' 
  | 'Soccer' 
  | 'Basketball' 
  | 'Baseball' 
  | 'Football' 
  | 'Lacrosse' 
  | 'Volleyball' 
  | 'Swimming';

export type ProgramCategory = 'Club' | 'Academy' | 'Training Center' | 'League' | 'Team';

export interface CategoryRatings {
  coaching: number;
  development: number;
  communication: number;
  management: number;
  safety: number;
  overall: number;
}

export interface RatingDistribution {
  5: number;
  4: number;
  3: number;
  2: number;
  1: number;
}

export interface Organization {
  id: string;
  slug: string;
  name: string;
  sport: Sport;
  category: ProgramCategory;
  location: {
    city: string;
    state: string;
    address: string;
  };
  rating: number;
  reviewCount: number;
  heroImage: string;
  logoImage: string;
  claimed: boolean;
  verified: boolean;
  description: string;
  foundedYear: number;
  website: string;
  email: string;
  phone: string;
  highlights: string[];
  developmentFocus: string;
  categoryRatings: CategoryRatings;
  ratingDistribution: RatingDistribution;
  weightedScore: number;
  featured?: boolean;
  priceRange?: string;
}

export interface ReviewResponse {
  author: string;
  role: string;
  date: string;
  content: string;
}

export interface Review {
  id: string;
  orgId: string;
  orgName: string;
  orgSlug: string;
  authorAnonymousId: string;
  authorRole: string;
  sport: Sport;
  date: string;
  title: string;
  excerpt: string;
  content: string;
  pros?: string;
  cons?: string;
  rating: number;
  categoryScores: CategoryRatings;
  helpfulCount: number;
  status: 'Published' | 'Pending Moderation' | 'Draft';
  isFeatured?: boolean;
  isPremiumOnly?: boolean;
  organizationResponse?: ReviewResponse;
}

export type MarketplaceCategory = 
  | 'Hockey Camps' 
  | 'Private Coaching' 
  | 'Skating Lessons' 
  | 'Equipment' 
  | 'Training Programs' 
  | 'Tournaments' 
  | 'Other Services';

export interface MarketplaceListing {
  id: string;
  slug: string;
  title: string;
  category: MarketplaceCategory;
  provider: string;
  orgSlug?: string;
  location: string;
  price: string;
  numericPrice: number;
  image: string;
  description: string;
  features: string[];
  featured: boolean;
  sport: Sport;
  isPremiumOnly?: boolean;
  contactEmail: string;
  contactPhone: string;
}

export type DemoRole = 'free' | 'premium' | 'org_manager';

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  role: DemoRole;
  anonymousIdentity: string;
  preferredSport: Sport;
  location: string;
  accountType: 'Parent / Guardian' | 'Athlete' | 'Coach' | 'Organization Representative';
  savedOrgIds: string[];
  helpfulVotesReceived: number;
}

export interface ClaimRequest {
  id: string;
  orgId: string;
  orgName: string;
  fullName: string;
  workEmail: string;
  roleTitle: string;
  verificationMethod: 'Work Email Domain' | 'Official State Registration' | 'Club Website Webmaster Verification';
  submittedAt: string;
  status: 'Pending Verification (Demo)' | 'Approved';
}

export interface AdCampaign {
  id: string;
  campaignName: string;
  targetCity: string;
  targetSport: Sport;
  targetAudience: string;
  placementType: 'Featured Discovery Listing' | 'Search Spotlight Card' | 'Marketplace Premier Banner';
  durationDays: number;
  dailyBudget: number;
  estimatedReach: number;
  status: 'Active' | 'Draft';
}
