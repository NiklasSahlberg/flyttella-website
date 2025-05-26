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
        padding: '1rem',
        boxShadow: '0 -4px 6px -1px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        zIndex: 9999,
      }}
      buttonStyle={{
        background: '#10B981',
        color: 'white',
        fontSize: '14px',
        padding: '0.5rem 1rem',
        borderRadius: '9999px',
        border: 'none',
        cursor: 'pointer',
        fontWeight: 600,
      }}
      expires={150}
    >
      <div className="max-w-4xl mx-auto w-full">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-base font-semibold">Vi använder cookies</h3>
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="text-xs text-[#10B981] hover:text-[#059669] font-medium"
              >
                {showDetails ? 'Dölj detaljer' : 'Visa detaljer'}
              </button>
            </div>
            <p className="text-xs text-gray-600">
              Vi använder cookies för att förbättra din upplevelse. Genom att fortsätta använda vår webbplats godkänner du vår användning av cookies.
            </p>
            {showDetails && (
              <div className="mt-2 space-y-2 text-xs text-gray-600">
                <div>
                  <h4 className="font-medium">Nödvändiga cookies</h4>
                  <p>Dessa cookies är nödvändiga för att webbplatsen ska fungera korrekt.</p>
                </div>
                <div>
                  <h4 className="font-medium">Analytiska cookies</h4>
                  <p>Dessa cookies hjälper oss att förstå hur besökare interagerar med vår webbplats.</p>
                </div>
              </div>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Link 
              href="/integritetspolicy" 
              className="text-xs text-[#10B981] hover:text-[#059669] font-medium"
            >
              Integritetspolicy
            </Link>
            <button
              onClick={() => {
                document.cookie = "flyttella-cookie-consent=rejected; max-age=31536000; path=/";
                window.location.reload();
              }}
              className="px-4 py-1.5 text-xs font-medium text-[#0F172A] hover:text-[#10B981] transition-colors"
            >
              Avvisa
            </button>
            <button
              onClick={() => {
                document.cookie = "flyttella-cookie-consent=accepted; max-age=31536000; path=/";
                window.location.reload();
              }}
              className="px-4 py-1.5 text-xs font-medium text-white bg-[#10B981] rounded-full hover:bg-[#059669] transition-colors"
            >
              Acceptera
            </button>
          </div>
        </div>
      </div>
    </CookieConsent>
  );
} 