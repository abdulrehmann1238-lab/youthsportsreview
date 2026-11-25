import React, { createContext, useContext, useState, useEffect } from 'react';
import { DemoRole, UserProfile, Sport } from '../types';
import { DEMO_USER_PROFILE } from '../data/analytics';

interface DemoAuthContextValue {
  role: DemoRole;
  user: UserProfile;
  setRole: (role: DemoRole) => void;
  updateUserProfile: (updates: Partial<UserProfile>) => void;
  loginAs: (role: DemoRole, customName?: string, customEmail?: string) => void;
  logout: () => void;
  isFree: boolean;
  isPremium: boolean;
  isOrgManager: boolean;
}

const DemoAuthContext = createContext<DemoAuthContextValue | undefined>(undefined);

const ROLE_STORAGE_KEY = 'rink_review_demo_role';
const USER_STORAGE_KEY = 'rink_review_demo_user';

export const DemoAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRoleState] = useState<DemoRole>(() => {
    const saved = localStorage.getItem(ROLE_STORAGE_KEY);
    return (saved as DemoRole) || 'free';
  });

  const [user, setUserState] = useState<UserProfile>(() => {
    const saved = localStorage.getItem(USER_STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse stored demo user', e);
      }
    }
    return { ...DEMO_USER_PROFILE, role: 'free' };
  });

  useEffect(() => {
    localStorage.setItem(ROLE_STORAGE_KEY, role);
    setUserState((prev) => {
      const updated = { ...prev, role };
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, [role]);

  const setRole = (newRole: DemoRole) => {
    setRoleState(newRole);
  };

  const updateUserProfile = (updates: Partial<UserProfile>) => {
    setUserState((prev) => {
      const updated = { ...prev, ...updates };
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const loginAs = (targetRole: DemoRole, customName?: string, customEmail?: string) => {
    setRoleState(targetRole);
    if (customName || customEmail) {
      updateUserProfile({
        fullName: customName || user.fullName,
        email: customEmail || user.email,
        role: targetRole,
      });
    }
  };

  const logout = () => {
    setRoleState('free');
  };

  return (
    <DemoAuthContext.Provider
      value={{
        role,
        user,
        setRole,
        updateUserProfile,
        loginAs,
        logout,
        isFree: role === 'free',
        isPremium: role === 'premium',
        isOrgManager: role === 'org_manager',
      }}
    >
      {children}
    </DemoAuthContext.Provider>
  );
};

export const useDemoAuth = () => {
  const context = useContext(DemoAuthContext);
  if (!context) {
    throw new Error('useDemoAuth must be used within a DemoAuthProvider');
  }
  return context;
};
