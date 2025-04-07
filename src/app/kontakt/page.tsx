'use client';

import { useState } from 'react';

export default function KontaktPage() {
  const [formType, setFormType] = useState('message'); // 'message' or 'callback'

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-[#0F172A] mb-4">Kontakta oss</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Har du frågor eller vill boka en tjänst? Vi finns här för att hjälpa dig. Kontakta oss via telefon, e-post eller använd formuläret nedan.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Contact Methods Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* Phone */}
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <div className="w-12 h-12 bg-[#0F172A] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#0F172A] mb-2">Ring oss</h3>
              <p className="text-gray-600 mb-4">Mån-Fre: 08:00-18:00</p>
              <a href="tel:08-630-07-25" className="text-[#10B981] font-medium hover:text-[#0F172A] transition-colors">
                08-630 07 25
              </a>
            </div>

            {/* Email */}
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <div className="w-12 h-12 bg-[#0F172A] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#0F172A] mb-2">E-post</h3>
              <p className="text-gray-600 mb-4">Svar inom 24 timmar</p>
              <a href="mailto:info@flyttella.se" className="text-[#10B981] font-medium hover:text-[#0F172A] transition-colors">
                info@flyttella.se
              </a>
            </div>

            {/* Address */}
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <div className="w-12 h-12 bg-[#0F172A] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#0F172A] mb-2">Besök oss</h3>
              <p className="text-gray-600 mb-4">Stockholm</p>
              <p className="text-[#10B981] font-medium">
                Flyttella AB
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <div className="flex justify-center mb-8">
              <div className="inline-flex rounded-md shadow-sm" role="group">
                <button
                  type="button"
                  onClick={() => setFormType('message')}
                  className={`px-6 py-2 text-sm font-medium border border-[#0F172A] rounded-l-md transition-colors ${
                    formType === 'message'
                      ? 'bg-[#0F172A] text-white'
                      : 'text-[#0F172A] hover:bg-gray-50'
                  }`}
                >
                  Skicka meddelande
                </button>
                <button
                  type="button"
                  onClick={() => setFormType('callback')}
                  className={`px-6 py-2 text-sm font-medium border border-[#0F172A] rounded-r-md transition-colors ${
                    formType === 'callback'
                      ? 'bg-[#0F172A] text-white'
                      : 'text-[#0F172A] hover:bg-gray-50'
                  }`}
                >
                  Be uppringd
                </button>
              </div>
            </div>

            {/* Regular Contact Form */}
            <div className={formType === 'message' ? '' : 'hidden'}>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Namn
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#10B981] focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      E-post
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#10B981] focus:border-transparent"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Telefon
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#10B981] focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Meddelande
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#10B981] focus:border-transparent"
                    required
                  ></textarea>
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white px-6 py-3 rounded-md hover:opacity-90 transition-opacity font-medium"
                  >
                    Skicka meddelande
                  </button>
                </div>
              </form>
            </div>

            {/* Callback Form */}
            <div className={formType === 'callback' ? '' : 'hidden'}>
              <form className="space-y-6">
                <div>
                  <label htmlFor="callback-name" className="block text-sm font-medium text-gray-700 mb-2">
                    Namn
                  </label>
                  <input
                    type="text"
                    id="callback-name"
                    name="callback-name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#10B981] focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="callback-phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Telefonnummer
                  </label>
                  <input
                    type="tel"
                    id="callback-phone"
                    name="callback-phone"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#10B981] focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="callback-time" className="block text-sm font-medium text-gray-700 mb-2">
                    När vill du bli uppringd?
                  </label>
                  <select
                    id="callback-time"
                    name="callback-time"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#10B981] focus:border-transparent"
                    required
                  >
                    <option value="">Välj tid</option>
                    <option value="morning">Förmiddag (08:00 - 12:00)</option>
                    <option value="afternoon">Eftermiddag (12:00 - 15:00)</option>
                    <option value="evening">Sen eftermiddag (15:00 - 18:00)</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="callback-message" className="block text-sm font-medium text-gray-700 mb-2">
                    Meddelande (valfritt)
                  </label>
                  <textarea
                    id="callback-message"
                    name="callback-message"
                    rows={2}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#10B981] focus:border-transparent"
                  ></textarea>
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white px-6 py-3 rounded-md hover:opacity-90 transition-opacity font-medium"
                  >
                    Be om återuppringning
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 