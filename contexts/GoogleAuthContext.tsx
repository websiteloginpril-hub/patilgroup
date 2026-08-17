'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { useGoogleLogin, googleLogout } from '@react-oauth/google';

export interface GoogleUser {
  email: string;
  name: string;
  firstName: string;
  lastName: string;
  picture?: string;
}

interface GoogleAuthContextValue {
  googleUser: GoogleUser | null;
  isSigningIn: boolean;
  signIn: (onSuccess?: (user: GoogleUser) => void) => void;
  signOut: () => void;
}

const GoogleAuthContext = createContext<GoogleAuthContextValue | null>(null);

export function GoogleAuthProvider({ children }: { children: ReactNode }) {
  const [googleUser, setGoogleUser] = useState<GoogleUser | null>(null);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [pendingCallback, setPendingCallback] = useState<((user: GoogleUser) => void) | null>(null);

  const fetchUserInfo = useCallback(async (accessToken: string, onSuccess?: (user: GoogleUser) => void) => {
    try {
      const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (!res.ok) throw new Error('Failed to fetch user info');
      const data = await res.json();

      const parts = (data.name || '').split(' ');
      const firstName = parts[0] || '';
      const lastName = parts.slice(1).join(' ') || '';

      const user: GoogleUser = {
        email: data.email || '',
        name: data.name || '',
        firstName,
        lastName,
        picture: data.picture,
      };

      setGoogleUser(user);
      setIsSigningIn(false);
      onSuccess?.(user);
    } catch {
      setIsSigningIn(false);
    }
  }, []);

  const login = useGoogleLogin({
    onSuccess: (response) => {
      fetchUserInfo(response.access_token, pendingCallback ?? undefined);
      setPendingCallback(null);
    },
    onError: () => {
      setIsSigningIn(false);
      setPendingCallback(null);
    },
    onNonOAuthError: () => {
      setIsSigningIn(false);
      setPendingCallback(null);
    },
  });

  const signIn = useCallback((onSuccess?: (user: GoogleUser) => void) => {
    setIsSigningIn(true);
    setPendingCallback(onSuccess ? () => onSuccess : null);
    login();
  }, [login]);

  const signOut = useCallback(() => {
    googleLogout();
    setGoogleUser(null);
  }, []);

  return (
    <GoogleAuthContext.Provider value={{ googleUser, isSigningIn, signIn, signOut }}>
      {children}
    </GoogleAuthContext.Provider>
  );
}

export function useGoogleAuth() {
  const ctx = useContext(GoogleAuthContext);
  if (!ctx) {
    // Provide a graceful fallback during Next.js prerendering if the provider is not present in the tree yet.
    if (typeof window === 'undefined') {
      return {
        googleUser: null,
        isSigningIn: false,
        signIn: () => {},
        signOut: () => {}
      };
    }
    throw new Error('useGoogleAuth must be used within GoogleAuthProvider');
  }
  return ctx;
}
