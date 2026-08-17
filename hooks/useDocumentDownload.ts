import { useCallback } from 'react';
import { useGoogleAuth, GoogleUser } from '@/contexts/GoogleAuthContext';

export interface StoredUserInfo {
  firstName: string;
  lastName: string;
  email: string;
  organization: string;
  phone: string;
  countryCode: string;
}

const STORAGE_KEY = 'brochure_user_info';

/** Returns stored user info from localStorage, or null if not registered */
export function getStoredUserInfo(): StoredUserInfo | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as StoredUserInfo;
  } catch {
    return null;
  }
}

/** Persists user info to localStorage */
export function saveUserInfo(info: StoredUserInfo): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(info));
  }
}

/**
 * Submit a returning-visitor download record to the Netlify `document-download` form.
 * Fire-and-forget; failures are silently swallowed so the download is never blocked.
 */
async function submitReturningDownload(
  userInfo: StoredUserInfo,
  documentName: string,
  documentPath: string,
): Promise<void> {
  try {
    const body = new URLSearchParams({
      'form-name': 'document-download',
      'bot-field': '',
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
      email: userInfo.email,
      organization: userInfo.organization,
      phone: userInfo.phone,
      documentName,
      documentPath,
      timestamp: new Date().toISOString(),
    }).toString();

    await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
    });
  } catch {
    // Intentionally swallow — never block the download
  }
}

/** Trigger a browser file download */
function triggerDownload(path: string): void {
  const link = document.createElement('a');
  link.href = path;
  link.download = path.split('/').pop() || 'document';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

interface UseDocumentDownloadOptions {
  /** Called to open the registration modal (first-time visitors) */
  onOpenModal: (name: string, path: string, googleUser: GoogleUser) => void;
}

/**
 * Core hook that gates every document download behind:
 *  1. Google Sign-In
 *  2. First-time registration form (if not previously registered)
 *  3. Direct download + Netlify record for returning visitors
 */
export function useDocumentDownload({ onOpenModal }: UseDocumentDownloadOptions) {
  const { googleUser, signIn } = useGoogleAuth();

  const handleDownloadClick = useCallback(
    (documentName: string, documentPath: string) => {
      const proceed = (user: GoogleUser) => {
        const stored = getStoredUserInfo();
        if (stored) {
          // Returning visitor — record full details in Netlify and download immediately
          submitReturningDownload(stored, documentName, documentPath);
          triggerDownload(documentPath);
        } else {
          // First-time visitor — open registration modal
          onOpenModal(documentName, documentPath, user);
        }
      };

      if (googleUser) {
        proceed(googleUser);
      } else {
        // Not signed in — trigger Google popup, then proceed on success
        signIn(proceed);
      }
    },
    [googleUser, signIn, onOpenModal],
  );

  return { handleDownloadClick };
}
