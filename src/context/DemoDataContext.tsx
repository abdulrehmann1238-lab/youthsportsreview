import React, { createContext, useContext, useState, useEffect } from 'react';
import { Organization, Review, MarketplaceListing, ClaimRequest, Sport, ReviewResponse } from '../types';
import { INITIAL_ORGANIZATIONS } from '../data/organizations';
import { INITIAL_REVIEWS } from '../data/reviews';
import { INITIAL_LISTINGS } from '../data/listings';

interface DemoDataContextValue {
  organizations: Organization[];
  reviews: Review[];
  listings: MarketplaceListing[];
  savedOrgIds: string[];
  claimRequests: ClaimRequest[];
  activeSport: Sport;
  setActiveSport: (sport: Sport) => void;
  toggleSaveOrg: (orgId: string) => void;
  isOrgSaved: (orgId: string) => boolean;
  addReview: (reviewData: {
    orgId: string;
    orgName: string;
    orgSlug: string;
    authorAnonymousId: string;
    authorRole: string;
    sport: Sport;
    title: string;
    content: string;
    pros?: string;
    cons?: string;
    rating: number;
    categoryScores: {
      coaching: number;
      development: number;
      communication: number;
      management: number;
      safety: number;
      overall: number;
    };
  }) => Review;
  updateReview: (reviewId: string, updates: Partial<Review>) => void;
  deleteReview: (reviewId: string) => void;
  addReviewResponse: (reviewId: string, response: ReviewResponse) => void;
  claimOrganization: (claimData: {
    orgId: string;
    orgName: string;
    fullName: string;
    workEmail: string;
    roleTitle: string;
    verificationMethod: 'Work Email Domain' | 'Official State Registration' | 'Club Website Webmaster Verification';
  }) => ClaimRequest;
  updateOrganization: (orgId: string, updates: Partial<Organization>) => void;
  getOrganizationBySlug: (slug: string) => Organization | undefined;
  getReviewsByOrgSlug: (slug: string) => Review[];
  getListingBySlug: (slug: string) => MarketplaceListing | undefined;
  markReviewHelpful: (reviewId: string) => void;
}

const DemoDataContext = createContext<DemoDataContextValue | undefined>(undefined);

const ORGS_STORAGE_KEY = 'rink_review_orgs_v2';
const REVIEWS_STORAGE_KEY = 'rink_review_reviews_v2';
const LISTINGS_STORAGE_KEY = 'rink_review_listings_v2';
const SAVED_ORGS_KEY = 'rink_review_saved_orgs_v2';
const CLAIMS_STORAGE_KEY = 'rink_review_claims_v2';

export const DemoDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [organizations, setOrganizations] = useState<Organization[]>(() => {
    const saved = localStorage.getItem(ORGS_STORAGE_KEY);
    return saved ? JSON.parse(saved) : INITIAL_ORGANIZATIONS;
  });

  const [reviews, setReviews] = useState<Review[]>(() => {
    const saved = localStorage.getItem(REVIEWS_STORAGE_KEY);
    return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
  });

  const [listings, setListings] = useState<MarketplaceListing[]>(() => {
    const saved = localStorage.getItem(LISTINGS_STORAGE_KEY);
    return saved ? JSON.parse(saved) : INITIAL_LISTINGS;
  });

  const [savedOrgIds, setSavedOrgIds] = useState<string[]>(() => {
    const saved = localStorage.getItem(SAVED_ORGS_KEY);
    return saved ? JSON.parse(saved) : ['org-1', 'org-2', 'org-3'];
  });

  const [claimRequests, setClaimRequests] = useState<ClaimRequest[]>(() => {
    const saved = localStorage.getItem(CLAIMS_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  const [activeSport, setActiveSport] = useState<Sport>('Hockey');

  useEffect(() => {
    localStorage.setItem(ORGS_STORAGE_KEY, JSON.stringify(organizations));
  }, [organizations]);

  useEffect(() => {
    localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem(LISTINGS_STORAGE_KEY, JSON.stringify(listings));
  }, [listings]);

  useEffect(() => {
    localStorage.setItem(SAVED_ORGS_KEY, JSON.stringify(savedOrgIds));
  }, [savedOrgIds]);

  useEffect(() => {
    localStorage.setItem(CLAIMS_STORAGE_KEY, JSON.stringify(claimRequests));
  }, [claimRequests]);

  const toggleSaveOrg = (orgId: string) => {
    setSavedOrgIds((prev) => {
      if (prev.includes(orgId)) {
        return prev.filter((id) => id !== orgId);
      } else {
        return [...prev, orgId];
      }
    });
  };

  const isOrgSaved = (orgId: string) => savedOrgIds.includes(orgId);

  const addReview = (reviewData: {
    orgId: string;
    orgName: string;
    orgSlug: string;
    authorAnonymousId: string;
    authorRole: string;
    sport: Sport;
    title: string;
    content: string;
    pros?: string;
    cons?: string;
    rating: number;
    categoryScores: {
      coaching: number;
      development: number;
      communication: number;
      management: number;
      safety: number;
      overall: number;
    };
  }): Review => {
    const newReview: Review = {
      id: `rev-${Date.now()}`,
      ...reviewData,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      excerpt: reviewData.content.length > 140 ? reviewData.content.substring(0, 140) + '...' : reviewData.content,
      helpfulCount: 0,
      status: 'Pending Moderation', // Initial status per PRD
      isFeatured: false,
      isPremiumOnly: false,
    };

    setReviews((prev) => [newReview, ...prev]);

    // Also update organization review count
    setOrganizations((prev) =>
      prev.map((org) => {
        if (org.id === reviewData.orgId) {
          const newCount = org.reviewCount + 1;
          const newAvg = Number(((org.rating * org.reviewCount + reviewData.rating) / newCount).toFixed(1));
          return {
            ...org,
            reviewCount: newCount,
            rating: newAvg,
          };
        }
        return org;
      })
    );

    return newReview;
  };

  const updateReview = (reviewId: string, updates: Partial<Review>) => {
    setReviews((prev) =>
      prev.map((rev) => (rev.id === reviewId ? { ...rev, ...updates } : rev))
    );
  };

  const deleteReview = (reviewId: string) => {
    setReviews((prev) => prev.filter((rev) => rev.id !== reviewId));
  };

  const addReviewResponse = (reviewId: string, response: ReviewResponse) => {
    setReviews((prev) =>
      prev.map((rev) => (rev.id === reviewId ? { ...rev, organizationResponse: response } : rev))
    );
  };

  const claimOrganization = (claimData: {
    orgId: string;
    orgName: string;
    fullName: string;
    workEmail: string;
    roleTitle: string;
    verificationMethod: 'Work Email Domain' | 'Official State Registration' | 'Club Website Webmaster Verification';
  }): ClaimRequest => {
    const newClaim: ClaimRequest = {
      id: `claim-${Date.now()}`,
      ...claimData,
      submittedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: 'Pending Verification (Demo)',
    };

    setClaimRequests((prev) => [newClaim, ...prev]);

    // Also update org status to claimed in local demo state
    setOrganizations((prev) =>
      prev.map((org) => (org.id === claimData.orgId ? { ...org, claimed: true, verified: true } : org))
    );

    return newClaim;
  };

  const updateOrganization = (orgId: string, updates: Partial<Organization>) => {
    setOrganizations((prev) =>
      prev.map((org) => (org.id === orgId ? { ...org, ...updates } : org))
    );
  };

  const getOrganizationBySlug = (slug: string) => {
    return organizations.find((org) => org.slug === slug);
  };

  const getReviewsByOrgSlug = (slug: string) => {
    return reviews.filter((rev) => rev.orgSlug === slug);
  };

  const getListingBySlug = (slug: string) => {
    return listings.find((item) => item.slug === slug);
  };

  const markReviewHelpful = (reviewId: string) => {
    setReviews((prev) =>
      prev.map((rev) => (rev.id === reviewId ? { ...rev, helpfulCount: rev.helpfulCount + 1 } : rev))
    );
  };

  return (
    <DemoDataContext.Provider
      value={{
        organizations,
        reviews,
        listings,
        savedOrgIds,
        claimRequests,
        activeSport,
        setActiveSport,
        toggleSaveOrg,
        isOrgSaved,
        addReview,
        updateReview,
        deleteReview,
        addReviewResponse,
        claimOrganization,
        updateOrganization,
        getOrganizationBySlug,
        getReviewsByOrgSlug,
        getListingBySlug,
        markReviewHelpful,
      }}
    >
      {children}
    </DemoDataContext.Provider>
  );
};

export const useDemoData = () => {
  const context = useContext(DemoDataContext);
  if (!context) {
    throw new Error('useDemoData must be used within a DemoDataProvider');
  }
  return context;
};
