'use client';
import Image from 'next/image';
import { motion, useInView, useAnimation } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

interface CounterProps {
  end: number;
  duration?: number;
}

const Counter = ({ end, duration = 2 }: CounterProps) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref);
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      let startTime: number | null = null;
      let animationFrame: number | null = null;

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = (timestamp - startTime) / (duration * 1000);

        if (progress < 1) {
          setCount(Math.floor(end * progress));
          animationFrame = requestAnimationFrame(animate);
        } else {
          setCount(end);
        }
      };

      animationFrame = requestAnimationFrame(animate);

      return () => {
        if (animationFrame) {
          cancelAnimationFrame(animationFrame);
        }
      };
    }
  }, [isInView, end, duration]);

  return <span ref={ref}>{count}</span>;
};

const StarIcon = () => (
  <svg className="w-6 h-6 text-[#10B981]" fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const ReviewIcon = () => (
  <svg className="w-6 h-6 text-[#10B981]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>
);

export default function ReviewsWidget() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[#F8FAFC]">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white" />
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(#10B981 0.5px, transparent 0.5px), radial-gradient(#10B981 0.5px, #F8FAFC 0.5px)`,
          backgroundSize: '20px 20px',
          backgroundPosition: '0 0, 10px 10px',
          opacity: 0.05
        }} />
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="max-w-[1400px] mx-auto">
          {/* Centered Title */}
          <h3 className="text-3xl md:text-4xl font-bold text-[#0F172A] text-center mb-12 mt-2">
            Vad tycker våra kunder om oss?
          </h3>
          {/* Badge */}
          <motion.div 
            className="flex justify-center mb-16"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="relative w-72 h-72 drop-shadow-xl">
                <Image
                  src="/BadgeFiveYearsNew.png"
                  alt="5 Years Badge"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div className="max-w-xl text-center md:text-left">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                  En trygg och professionell flyttupplevelse
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Som en av Sveriges mest rekommenderade flyttfirmor sätter vi kunden i fokus. 
                  Vi förstår att flyttar kan vara stressande, därför strävar vi efter att göra 
                  processen så smidig och trygg som möjligt. Med vår erfarenhet och 
                  dedikerade team ser vi till att din flytt blir en positiv upplevelse 
                  från början till slut.
                </p>
                {/* New: Customer opinions title and arrow */}
                <div className="flex flex-col items-center mt-8 mb-4">
                  <span className="text-xl md:text-2xl font-semibold text-[#0F172A] mb-2 text-center">Läs gärna vad våra kunder säger om oss</span>
                  <motion.svg
                    className="w-12 h-16 text-[#10B981]"
                    fill="none"
                    viewBox="0 0 48 64"
                    stroke="currentColor"
                    initial={{ y: 0 }}
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <path
                      d="M24 4 C24 24, 24 40, 24 56"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                    <path
                      d="M18 48 L24 56 L30 48"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                  </motion.svg>
                </div>
              </div>
            </div>
          </motion.div>

         

          {/* Reviews Widget */}
          <motion.div 
            className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <iframe 
              src="https://widget.reco.se/v2/widget/4038580?mode=HORIZONTAL_QUOTE&inverted=false&border=true"
              style={{ 
                width: '100%', 
                height: '260px', 
                border: 'none',
                borderRadius: '16px',
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
} 