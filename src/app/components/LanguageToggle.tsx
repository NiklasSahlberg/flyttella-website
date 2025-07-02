'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Locale, isValidLocale } from '../i18n';
import Image from 'next/image';

interface LanguageToggleProps {
  currentLocale: Locale;
  onLocaleChange: (locale: Locale) => void;
}

export default function LanguageToggle({ currentLocale, onLocaleChange }: LanguageToggleProps) {
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'sv', name: 'Svenska', flag: '/flags/se.svg', short: 'SV' },
    { code: 'en', name: 'English', flag: '/flags/gb.svg', short: 'EN' }
  ];

  const currentLanguage = languages.find(lang => lang.code === currentLocale);

  const handleLanguageChange = (locale: string) => {
    if (isValidLocale(locale)) {
      onLocaleChange(locale);
      setIsOpen(false);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (isOpen && !target.closest('.language-toggle')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative z-50 language-toggle">
      <motion.button
        onClick={() => {
          console.log('Language toggle clicked!');
          setIsOpen(!isOpen);
        }}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-[#0F172A] hover:bg-white/20 transition-all duration-200 cursor-pointer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        type="button"
      >
        <Image src={currentLanguage?.flag || ''} alt={currentLanguage?.short || ''} width={24} height={18} className="rounded-sm border border-gray-300" />
        <span className="text-base font-semibold ml-1">{currentLanguage?.short}</span>
        <motion.svg
          className="w-4 h-4 ml-1"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </motion.svg>
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: -10, scale: 0.95 }}
        animate={{ 
          opacity: isOpen ? 1 : 0, 
          y: isOpen ? 0 : -10, 
          scale: isOpen ? 1 : 0.95 
        }}
        transition={{ duration: 0.2 }}
        className={`absolute top-full right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-[100] ${
          isOpen ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
      >
        {languages.map((language) => (
          <button
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            className={`flex items-center gap-2 px-4 py-3 w-full text-left hover:bg-gray-50 transition-colors duration-150 ${
              currentLocale === language.code ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
            }`}
          >
            <Image src={language.flag} alt={language.short} width={24} height={18} className="rounded-sm border border-gray-300" />
            <span className="text-base font-semibold ml-1">{language.short}</span>
            <span className="font-medium ml-2">{language.name}</span>
            {currentLocale === language.code && (
              <svg className="w-4 h-4 ml-auto text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            )}
          </button>
        ))}
      </motion.div>
    </div>
  );
} 