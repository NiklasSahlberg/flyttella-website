// FeatureBoxes: Compact, modern row of benefit boxes for under the form
// Includes animation for insurance (Trygg Hansa & FORA)
import { useEffect, useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";

const insuranceLogos = [
  <svg key="trygghansa" width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="20" cy="20" r="20" fill="#E30613" />
    <text x="50%" y="55%" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="bold" dy=".3em">TH</text>
  </svg>,
  <svg key="fora" width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="40" height="40" rx="8" fill="#009FE3" />
    <text x="50%" y="55%" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="bold" dy=".3em">FORA</text>
  </svg>,
];

const features = [
  {
    key: "insurance",
    labelKey: "features.insurance",
    animated: true,
  },
  {
    key: "pack-garanti",
    labelKey: "features.packGuarantee",
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="#10B981" strokeWidth="2"><rect x="4" y="7" width="16" height="13" rx="2"/><path d="M8 7V5a4 4 0 1 1 8 0v2"/></svg>
    ),
  },
  {
    key: "kundgaranti",
    labelKey: "features.customerGuarantee",
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="#10B981" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M9 12l2 2 4-4"/></svg>
    ),
  },
  {
    key: "rut-avdrag",
    labelKey: "features.rutDeduction",
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="#10B981" strokeWidth="2"><rect x="3" y="11" width="18" height="10" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
    ),
  },
  {
    key: "fri-avbokning",
    labelKey: "features.freeCancellation",
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="#10B981" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
    ),
  },
  {
    key: "kartonger",
    labelKey: "features.freeBoxes",
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="#10B981" strokeWidth="2"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M16 3v4M8 3v4"/></svg>
    ),
  },
];

// Shimmer loader component
function ShimmerBox() {
  return (
    <div className="w-full h-8 mb-2 rounded bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer" style={{backgroundSize: '200% 100%'}} />
  );
}

export default function FeatureBoxes() {
  const [logoIndex, setLogoIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const { t } = useLanguage();
  useEffect(() => {
    const interval = setInterval(() => {
      setLogoIndex((prev) => (prev + 1) % insuranceLogos.length);
    }, 1800);
    // Loading animation for 1.2s
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 my-8">
      {features.map((feature, _idx) => (
        <div
          key={feature.key}
          className="flex flex-col items-center justify-center bg-white rounded-xl shadow border border-gray-100 px-2 py-4 min-h-[80px] transition-transform hover:scale-105 duration-200"
        >
          {loading ? (
            <ShimmerBox />
          ) : feature.animated ? (
            <div className="mb-2 h-8 flex items-center justify-center transition-all duration-500 animate-fade-in">
              {insuranceLogos[logoIndex]}
            </div>
          ) : (
            <div className="mb-2 h-8 flex items-center justify-center transition-all duration-500 animate-fade-in">{feature.icon}</div>
          )}
          <span className={`font-semibold text-[#0F172A] text-center text-xs leading-tight transition-opacity duration-500 ${loading ? 'opacity-0' : 'opacity-100 animate-fade-in'}`}>
            {t(feature.labelKey)}
          </span>
        </div>
      ))}
    </div>
  );
} 