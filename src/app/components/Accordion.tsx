import React, { useState } from 'react';
import Image from 'next/image';

interface AccordionItem {
  title: string;
  content: React.ReactNode;
  imageSrc?: string;
  imageAlt?: string;
}

interface AccordionProps {
  items: AccordionItem[];
  defaultOpenIndex?: number | null;
}

const Accordion: React.FC<AccordionProps> = ({ items, defaultOpenIndex = null }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpenIndex);

  const handleToggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="space-y-4">
      {items.map((item, idx) => (
        <div key={idx} className="bg-white rounded-2xl shadow border border-gray-100 overflow-hidden">
          <button
            className={`w-full flex items-center px-6 py-5 text-left focus:outline-none transition-colors rounded-2xl
              ${openIndex === idx ? 'bg-white' : 'bg-[#10B981]'}
            `}
            onClick={() => handleToggle(idx)}
            aria-expanded={openIndex === idx}
            aria-controls={`accordion-panel-${idx}`}
            id={`accordion-header-${idx}`}
          >
            <span className="flex-1 text-lg md:text-xl font-medium text-black">{item.title}</span>
            <svg
              className={`h-6 w-6 text-black transform transition-transform duration-200 ${openIndex === idx ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="black"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div
            id={`accordion-panel-${idx}`}
            role="region"
            aria-labelledby={`accordion-header-${idx}`}
            className={`transition-all duration-300 ease-in-out ${openIndex === idx ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}
          >
            <div className="px-6 pb-6 flex flex-col md:flex-row gap-6 items-start">
              {item.imageSrc && (
                <div className="flex-shrink-0 w-full md:w-1/2 flex justify-center items-center">
                  <Image
                    src={item.imageSrc}
                    alt={item.imageAlt || ''}
                    width={600}
                    height={300}
                    className="rounded-xl shadow object-cover w-full h-[300px] max-w-none"
                  />
                </div>
              )}
              <div className="flex-1 text-gray-700 text-base md:text-lg leading-relaxed">{item.content}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Accordion; 