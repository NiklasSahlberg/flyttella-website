'use client';

import Link from "next/link";
import { useLanguage } from "../contexts/LanguageContext";

export default function ThankYouPage() {
  const { locale } = useLanguage();
  return (
    <main className="min-h-screen py-16 bg-gradient-to-r from-[#0F172A]/5 to-[#10B981]/5">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8 md:p-12 text-center">
          <div className="mb-8">
            <svg 
              className="w-16 h-16 text-[#10B981] mx-auto mb-4" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
              />
            </svg>
            <h1 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-4">
              {locale === 'en' ? 'Thank you for your request!' : 'Tack för din förfrågan!'}
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              {locale === 'en' 
                ? 'We have received your quote request and will get back to you as soon as possible.'
                : 'Vi har mottagit din offertförfrågan och kommer att återkomma till dig så snart som möjligt.'
              }
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-[#0F172A] mb-4">
                {locale === 'en' ? 'What happens now?' : 'Vad händer nu?'}
              </h2>
              <ul className="text-left space-y-3 text-gray-600">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-[#10B981] mt-1 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>
                    {locale === 'en' 
                      ? 'We review your request and calculate a detailed quote'
                      : 'Vi granskar din förfrågan och beräknar en detaljerad offert'
                    }
                  </span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-[#10B981] mt-1 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>
                    {locale === 'en' 
                      ? 'One of our moving specialists will contact you shortly'
                      : 'En av våra flyttspecialister kontaktar dig inom kort'
                    }
                  </span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-[#10B981] mt-1 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>
                    {locale === 'en' 
                      ? 'We go through the details and answer your questions'
                      : 'Vi går igenom detaljerna och svarar på dina frågor'
                    }
                  </span>
                </li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/"
                className="px-6 py-3 bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white rounded-lg hover:opacity-90 transition-opacity font-medium"
              >
                {locale === 'en' ? 'Back to homepage' : 'Tillbaka till startsidan'}
              </Link>
              <Link 
                href="/kontakt"
                className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-[#0F172A] font-medium"
              >
                {locale === 'en' ? 'Contact us' : 'Kontakta oss'}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 