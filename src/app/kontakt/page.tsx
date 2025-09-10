'use client';

import { useState, useEffect, Suspense } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'next/navigation';

// Selected files state for attachments
// (keeps track of chosen images to show Swedish status text)
// Note: file upload handling can be wired to FormData on submit

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  },
  hover: {
    scale: 1.02,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

// Separate component to handle search params
function SearchParamsHandler({ onFormTypeChange, onServiceChange }: { 
  onFormTypeChange: (type: string) => void;
  onServiceChange: (service: string) => void;
}) {
  const searchParams = useSearchParams();

  useEffect(() => {
    // Handle URL parameters for scrolling and service pre-selection
    const scrollTo = searchParams.get('scroll');
    const service = searchParams.get('service');
    
    if (scrollTo === 'message') {
      onFormTypeChange('message');
      // Scroll to the "Skicka oss ett meddelande" heading
      setTimeout(() => {
        const messageHeading = document.getElementById('skicka-meddelande');
        if (messageHeading) {
          messageHeading.scrollIntoView({ behavior: 'smooth', block: 'start' });
          // Add a small delay and then scroll up a bit to position the heading higher
        }
      }, 100);
    }
    
    if (service) {
      // Pre-select the service in both forms
      setTimeout(() => {
        const messageServiceSelect = document.getElementById('service') as HTMLSelectElement;
        const callbackServiceSelect = document.getElementById('callback-service') as HTMLSelectElement;
        
        if (messageServiceSelect) {
          messageServiceSelect.value = service;
        }
        if (callbackServiceSelect) {
          callbackServiceSelect.value = service;
        }
        onServiceChange(service);
      }, 200);
    }
  }, [searchParams, onFormTypeChange, onServiceChange]);

  return null; // This component doesn't render anything
}

export default function KontaktPage() {
  const [formType, setFormType] = useState('message'); // 'message' or 'callback'
  const [selectedService, setSelectedService] = useState('');

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Search Params Handler */}
      <Suspense fallback={null}>
        <SearchParamsHandler 
          onFormTypeChange={setFormType}
          onServiceChange={setSelectedService}
        />
      </Suspense>
      
      {/* Hero Section */}
      <section className="relative py-16 md:py-32 overflow-hidden bg-gradient-to-r from-[#0F172A] to-[#10B981]">
        {/* Background image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{
            backgroundImage: 'url(/kontakta_oss_picture.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center 20%'
          }}
        />
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-3xl md:text-6xl font-bold text-white mb-4">
              Kontakta oss
            </h1>
            <p className="text-lg md:text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed">
              Har du frågor eller vill boka en tjänst? Vi finns här för att hjälpa dig. 
              Kontakta oss via telefon, e-post eller använd formuläret nedan.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-6xl mx-auto">
          {/* Contact Methods Grid */}
          <motion.div 
            className="grid md:grid-cols-3 gap-6 mb-12"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {/* Phone */}
            <motion.div 
              className="bg-white p-6 rounded-xl shadow-lg text-center border border-gray-100 hover:shadow-xl transition-all duration-300"
              variants={cardVariants}
              whileHover="hover"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#0F172A] mb-2">Ring oss</h3>
              <p className="text-gray-600 mb-3 text-base">Mån-Fre: 08:00-18:00</p>
              <a 
                href="tel:08-898-301" 
                className="inline-flex items-center text-[#10B981] font-semibold text-lg hover:text-[#0F172A] transition-colors group"
              >
                <span className="mr-2">08-898-301</span>
                <svg className="h-4 w-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
            </motion.div>

            {/* Email */}
            <motion.div 
              className="bg-white p-6 rounded-xl shadow-lg text-center border border-gray-100 hover:shadow-xl transition-all duration-300"
              variants={cardVariants}
              whileHover="hover"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#0F172A] mb-2">E-post</h3>
              <p className="text-gray-600 mb-3 text-base">Svar inom 24 timmar</p>
              <a 
                href="mailto:info@flyttella.se" 
                className="inline-flex items-center text-[#10B981] font-semibold text-base hover:text-[#0F172A] transition-colors group"
              >
                <span className="mr-2">info@flyttella.se</span>
                <svg className="h-4 w-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
            </motion.div>

            {/* Address */}
            <motion.div 
              className="bg-white p-6 rounded-xl shadow-lg text-center border border-gray-100 hover:shadow-xl transition-all duration-300"
              variants={cardVariants}
              whileHover="hover"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-[#0F172A] to-[#10B981] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#0F172A] mb-2">Besök oss</h3>
              <p className="text-[#0F172A] font-medium text-base">
                Lännavägen 64F, Huddinge
              </p>
              <p className="text-[#10B981] font-semibold text-base">
                Flyttella AB
              </p>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            id="contact-form"
            className="bg-white p-6 md:p-8 rounded-xl shadow-lg border border-gray-100 scroll-mt-40"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="text-center mb-8">
              <h2 id="skicka-meddelande" className="text-2xl md:text-3xl font-bold text-[#0F172A] mb-3 scroll-mt-20">
                Skicka oss ett meddelande
              </h2>
              <p className="text-gray-600 text-base max-w-2xl mx-auto">
                Fyll i formuläret nedan så återkommer vi så snart som möjligt
              </p>
            </div>

            <div className="flex justify-center mb-8">
              <div className="inline-flex rounded-lg shadow-sm border border-gray-200" role="group">
                <button
                  type="button"
                  onClick={() => setFormType('message')}
                  className={`px-6 py-2.5 text-sm font-semibold border-r border-gray-200 rounded-l-lg transition-all duration-300 ${
                    formType === 'message'
                      ? 'bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white shadow-lg'
                      : 'text-[#0F172A] hover:bg-gray-50'
                  }`}
                >
                  Skicka meddelande
                </button>
                <button
                  type="button"
                  onClick={() => setFormType('callback')}
                  className={`px-6 py-2.5 text-sm font-semibold rounded-r-lg transition-all duration-300 ${
                    formType === 'callback'
                      ? 'bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white shadow-lg'
                      : 'text-[#0F172A] hover:bg-gray-50'
                  }`}
                >
                  Be om att bli uppringd
                </button>
              </div>
            </div>

            {/* Regular Contact Form */}
            <motion.div 
              id="message-form"
              className={formType === 'message' ? '' : 'hidden'}
              initial={{ opacity: 0 }}
              animate={{ opacity: formType === 'message' ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                      Namn *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent transition-all duration-300 text-base"
                      placeholder="Ditt namn"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                      E-post *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent transition-all duration-300 text-base"
                      placeholder="din.email@example.com"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="service" className="block text-sm font-semibold text-gray-700 mb-2">
                    Tjänst *
                  </label>
                  <select
                    id="service"
                    name="service"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent transition-all duration-300 text-base text-[#0F172A] bg-white appearance-none"
                    required
                  >
                    <option value="">Välj tjänst</option>
                    <option value="bemanning">Bemanning / Underentreprenad</option>
                    <option value="montering">Montering</option>
                    <option value="piano">Piano / Tunglyft</option>
                    <option value="barhjalp">Bärhjälp</option>
                    <option value="bortforsling">Bortforsling</option>
                    <option value="magasinering">Magasinering</option>
                    <option value="annat">Annat</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                    Telefon
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent transition-all duration-300 text-base"
                    placeholder="070-123 45 67"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                    Meddelande *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent transition-all duration-300 text-base resize-none"
                    placeholder="Berätta mer om vad du behöver hjälp med..."
                    required
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Bilder (valfritt)
                  </label>
                  <input
                    type="file"
                    id="attachments"
                    name="attachments"
                    accept="image/*"
                    multiple
                    onChange={(e) => {
                      const files = e.target.files;
                      // @ts-expect-error store on window to avoid unused var warnings if needed
                      window.__files = files;
                      // Using state so we can show Swedish status text
                      // We can't declare hooks here; so we rely on form-level state above
                    }}
                    className="hidden"
                  />
                  <label
                    htmlFor="attachments"
                    className="inline-flex items-center bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity font-semibold cursor-pointer"
                  >
                    Välj filer
                  </label>
                  <span id="attachments-status" className="ml-3 text-sm text-gray-600 align-middle">
                    Inga filer valda
                  </span>
                  <p className="mt-2 text-xs text-gray-500">Du kan ladda upp flera bilder (JPG, PNG). Max 10 MB per bild.</p>
                  <script dangerouslySetInnerHTML={{ __html: `
                    (function(){
                      var input = document.getElementById('attachments');
                      var status = document.getElementById('attachments-status');
                      if(input && status){
                        input.addEventListener('change', function(){
                          var count = input.files ? input.files.length : 0;
                          if(count === 0){ status.textContent = 'Inga filer valda'; return; }
                          if(count === 1){ status.textContent = '1 fil vald'; return; }
                          status.textContent = count + ' filer valda';
                        });
                      }
                    })();
                  ` }} />
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white px-6 py-3 rounded-lg hover:opacity-90 transition-all duration-300 font-semibold text-base shadow-lg hover:shadow-xl"
                  >
                    Skicka meddelande
                  </button>
                </div>
              </form>
            </motion.div>

            {/* Callback Form */}
            <motion.div 
              className={formType === 'callback' ? '' : 'hidden'}
              initial={{ opacity: 0 }}
              animate={{ opacity: formType === 'callback' ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <form className="space-y-6">
                <div>
                  <label htmlFor="callback-name" className="block text-sm font-semibold text-gray-700 mb-2">
                    Namn *
                  </label>
                  <input
                    type="text"
                    id="callback-name"
                    name="callback-name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent transition-all duration-300 text-base"
                    placeholder="Ditt namn"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="callback-service" className="block text-sm font-semibold text-gray-700 mb-2">
                    Tjänst *
                  </label>
                  <select
                    id="callback-service"
                    name="callback-service"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent transition-all duration-300 text-base text-[#0F172A] bg-white appearance-none"
                    required
                  >
                    <option value="">Välj tjänst</option>
                    <option value="bemanning">Bemanning / Underentreprenad</option>
                    <option value="montering">Montering</option>
                    <option value="piano">Piano / Tunglyft</option>
                    <option value="barhjalp">Bärhjälp</option>
                    <option value="bortforsling">Bortforsling</option>
                    <option value="magasinering">Magasinering</option>
                    <option value="annat">Annat</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="callback-phone" className="block text-sm font-semibold text-gray-700 mb-2">
                    Telefonnummer *
                  </label>
                  <input
                    type="tel"
                    id="callback-phone"
                    name="callback-phone"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent transition-all duration-300 text-base"
                    placeholder="070-123 45 67"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="callback-time" className="block text-sm font-semibold text-gray-700 mb-2">
                    När vill du bli uppringd? *
                  </label>
                  <select
                    id="callback-time"
                    name="callback-time"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent transition-all duration-300 text-base text-[#0F172A] bg-white appearance-none"
                    required
                  >
                    <option value="">Välj tid</option>
                    <option value="morning">Förmiddag (08:00 - 12:00)</option>
                    <option value="afternoon">Eftermiddag (12:00 - 15:00)</option>
                    <option value="evening">Sen eftermiddag (15:00 - 18:00)</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="callback-message" className="block text-sm font-semibold text-gray-700 mb-2">
                    Meddelande (valfritt)
                  </label>
                  <textarea
                    id="callback-message"
                    name="callback-message"
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent transition-all duration-300 text-base resize-none"
                    placeholder="Berätta kort vad du behöver hjälp med..."
                  ></textarea>
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white px-6 py-3 rounded-lg hover:opacity-90 transition-all duration-300 font-semibold text-base shadow-lg hover:shadow-xl"
                  >
                    Be om att bli uppringd
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </main>
  );
} 