'use client';

import { useState } from 'react';
import CookieConsent from 'react-cookie-consent';
import Link from 'next/link';

export default function CookieConsentBanner() {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <CookieConsent
      location="bottom"
      buttonText="Acceptera alla"
      cookieName="flyttella-cookie-consent"
      style={{
        background: 'white',
        color: '#0F172A',
        padding: '0.25rem 0.75rem',
        boxShadow: '0 -2px 4px -1px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: '0.5rem',
        zIndex: 9999,
        fontSize: '12px',
        minHeight: 'auto',
        height: 'auto',
      }}
      buttonStyle={{
        background: '#10B981',
        color: 'white',
        fontSize: '11px',
        padding: '0.3rem 0.6rem',
        borderRadius: '9999px',
        border: 'none',
        cursor: 'pointer',
        fontWeight: 600,
      }}
      expires={150}
    >
      <div className="max-w-4xl mx-auto w-full">
        <div className="flex flex-row items-center justify-between gap-2">
          <div className="flex-1 flex items-center gap-2">
            <h3 className="text-xs font-semibold whitespace-nowrap">Vi använder cookies</h3>
            <p className="text-xs text-gray-600 hidden sm:block">
              Vi använder cookies för att förbättra din upplevelse.
            </p>
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="text-xs text-[#10B981] hover:text-[#059669] font-medium whitespace-nowrap"
            >
              {showDetails ? 'Dölj detaljer' : 'Visa detaljer'}
            </button>
          </div>
        </div>
        {showDetails && (
          <div className="mt-2 pt-2 border-t border-gray-200">
            <div className="space-y-1 text-xs text-gray-600">
              <div>
                <h4 className="font-medium">Nödvändiga cookies</h4>
                <p>Dessa cookies är nödvändiga för att webbplatsen ska fungera korrekt.</p>
              </div>
              <div>
                <h4 className="font-medium">Analytiska cookies</h4>
                <p>Dessa cookies hjälper oss att förstå hur besökare interagerar med vår webbplats.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </CookieConsent>
  );
}