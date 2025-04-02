'use client';
import Image from 'next/image';

export default function ReviewsWidget() {
  return (
    <section className="section-padding bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-[1400px] mx-auto">
          {/* Badge */}
          <div className="flex justify-center mb-16">
            <div className="relative w-72 h-72">
              <Image
                src="/BadgeFiveYearsNew.png"
                alt="5 Years Badge"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* Reviews Widget */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <iframe 
              src="https://widget.reco.se/v2/widget/4038580?mode=HORIZONTAL_QUOTE&inverted=false&border=true"
              style={{ 
                width: '100%', 
                height: '260px', 
                border: 'none',
                borderRadius: '12px',
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
} 