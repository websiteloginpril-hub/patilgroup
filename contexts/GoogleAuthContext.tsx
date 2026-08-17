'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { useGoogleLogin, googleLogout, GoogleOAuthProvider } from '@react-oauth/google';

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

function GoogleAuthProviderInner({ children }: { children: ReactNode }) {
  const [googleUser, setGoogleUser] = useState<GoogleUser | null>(null);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const pendingCallbackRef = React.useRef<((user: GoogleUser) => void) | null>(null);

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
      fetchUserInfo(response.access_token, pendingCallbackRef.current ?? undefined);
      pendingCallbackRef.current = null;
    },
    onError: () => {
      setIsSigningIn(false);
      pendingCallbackRef.current = null;
    },
    onNonOAuthError: () => {
      setIsSigningIn(false);
      pendingCallbackRef.current = null;
    },
  });

  const signIn = useCallback((onSuccess?: (user: GoogleUser) => void) => {
    setIsSigningIn(true);
    pendingCallbackRef.current = onSuccess || null;
    try {
      login();
    } catch (e) {
      console.error('Google login failed:', e);
      setIsSigningIn(false);
      pendingCallbackRef.current = null;
    }
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

export function GoogleAuthProvider({ children }: { children: ReactNode }) {
  return (
    <GoogleOAuthProvider clientId="1003318748688-gaa53tjotsdipgs7n3vor6bfvn7tr1v6.apps.googleusercontent.com">
      <GoogleAuthProviderInner>
        {children}
      </GoogleAuthProviderInner>
    </GoogleOAuthProvider>
  );
}

export function useGoogleAuth() {
  const ctx = useContext(GoogleAuthContext);
  if (!ctx) {
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
