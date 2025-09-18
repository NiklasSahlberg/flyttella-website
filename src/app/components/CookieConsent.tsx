'use client';

import { useState } from 'react';
import CookieConsent from 'react-cookie-consent';
import Link from 'next/link';

export default function CookieConsentBanner() {
  const [showDetails, setShowDetails] = useState(true);

  const handleAccept = () => {
    // Accept all cookies
    document.cookie = "flyttella-cookie-consent=true; expires=" + new Date(Date.now() + 150 * 24 * 60 * 60 * 1000).toUTCString() + "; path=/";
    // Hide the banner
    const banner = document.querySelector('[data-cookie-consent]');
    if (banner) {
      banner.style.display = 'none';
    }
  };

  const handleDecline = () => {
    // Decline non-essential cookies
    document.cookie = "flyttella-cookie-consent=false; expires=" + new Date(Date.now() + 150 * 24 * 60 * 60 * 1000).toUTCString() + "; path=/";
    // Hide the banner
    const banner = document.querySelector('[data-cookie-consent]');
    if (banner) {
      banner.style.display = 'none';
    }
  };

  return (
    <CookieConsent
      location="bottom"
      buttonText=""
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
        display: 'none',
      }}
      expires={150}
    >
      <div className="max-w-4xl mx-auto w-full">
        {showDetails && (
          <div className="mb-3 pb-3 border-b border-gray-200">
            <div className="max-h-32 sm:max-h-none overflow-y-auto sm:overflow-visible space-y-3 text-xs text-gray-600">
              <div>
                <h4 className="font-medium text-gray-800">Nödvändiga cookies</h4>
                <p>Dessa cookies är nödvändiga för att webbplatsen ska fungera korrekt. De kan inte stängas av i våra system. De ställs vanligtvis in endast som svar på åtgärder som du vidtar som motsvarar en begäran om tjänster, såsom att ställa in dina integritetsinställningar, logga in eller fylla i formulär.</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-800">Analytiska cookies</h4>
                <p>Dessa cookies tillåter oss att räkna besök och trafikkällor så att vi kan mäta och förbättra prestandan för vår webbplats. De hjälper oss att veta vilka sidor som är mest och minst populära och se hur besökare rör sig runt på webbplatsen.</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-800">Funktionella cookies</h4>
                <p>Dessa cookies möjliggör förbättrad funktionalitet och personalisering, såsom videor och chattfunktioner. De kan ställas in av oss eller av tredje parter vars tjänster vi har lagt till på våra sidor.</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-800">Marknadsföringscookies</h4>
                <p>Dessa cookies kan ställas in genom vår webbplats av våra reklampartners för att bygga en profil av dina intressen och visa dig relevanta annonser på andra webbplatser.</p>
              </div>
              <div className="pt-2 border-t border-gray-200">
                <h4 className="font-medium text-gray-800">Dina rättigheter</h4>
                <p>Du har rätt att välja vilka cookies du accepterar. Du kan ändra dina inställningar när som helst genom att klicka på "Cookie-inställningar" i sidfoten. Mer information finns i vår <Link href="/integritetspolicy" className="text-[#10B981] hover:text-[#059669] underline">integritetspolicy</Link>.</p>
              </div>
            </div>
          </div>
        )}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
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
        <div className="flex items-center gap-3">
          <button
            onClick={handleDecline}
            className="text-sm bg-transparent text-gray-600 hover:text-gray-800 px-4 py-2 rounded-full border border-gray-300 hover:border-gray-400 font-medium transition-colors"
          >
            Neka
          </button>
          <button
            onClick={handleAccept}
            className="text-sm bg-[#10B981] text-white hover:bg-[#059669] px-4 py-2 rounded-full font-medium transition-colors"
          >
            Acceptera alla
          </button>
        </div>
        </div>
      </div>
    </CookieConsent>
  );
}