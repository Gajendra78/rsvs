'use client';

import { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import Image from 'next/image';

const TESTIMONIALS = [
  {
    id: 1,
    name: 'Priya Sharma',
    role: 'UKSSSC Aspirant',
    image: 'https://picsum.photos/seed/priya/100/100',
    text: "The structured content and mock tests helped me crack the exam in my first attempt. The faculty is extremely supportive!",
    rating: 5,
  },
  {
    id: 2,
    name: 'Rahul Verma',
    role: 'SSC CGL Selected',
    image: 'https://picsum.photos/seed/rahul/100/100',
    text: "RSVS Academy's live classes are interactive and very detailed. The doubt clearing sessions were a game changer for me.",
    rating: 5,
  },
  {
    id: 3,
    name: 'Anjali Gupta',
    role: 'Banking PO',
    image: 'https://picsum.photos/seed/anjali/100/100',
    text: "I highly recommend their test series. It's very close to the actual exam pattern. Great value for money.",
    rating: 4,
  },
  {
    id: 4,
    name: 'Vikram Singh',
    role: 'JE Civil',
    image: 'https://picsum.photos/seed/vikram/100/100',
    text: "Technical concepts were explained beautifully. The recorded sessions allowed me to learn at my own pace.",
    rating: 5,
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const next = () => setCurrent((prev) => (prev + 1) % TESTIMONIALS.length);
  const prev = () => setCurrent((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);

  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Student Success Stories</h2>
          <p className="mt-4 text-gray-600">Hear from our students who achieved their dreams</p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden rounded-2xl bg-slate-50 border border-gray-100 p-8 md:p-12 shadow-sm">
            <div className="flex flex-col items-center text-center">
              <div className="mb-6 relative h-20 w-20 mx-auto">
                <div className="absolute -top-4 -left-4 text-blue-200 z-0">
                  <Quote className="h-12 w-12 rotate-180" />
                </div>
                <Image 
                  src={TESTIMONIALS[current].image} 
                  alt={TESTIMONIALS[current].name} 
                  fill
                  className="rounded-full object-cover border-4 border-white shadow-md relative z-10"
                  referrerPolicy="no-referrer"
                />
              </div>
              
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-5 w-5 ${i < TESTIMONIALS[current].rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                  />
                ))}
              </div>

              <p className="text-xl text-gray-800 font-medium italic mb-8 leading-relaxed">
                &quot;{TESTIMONIALS[current].text}&quot;
              </p>

              <div>
                <h4 className="text-lg font-bold text-gray-900">{TESTIMONIALS[current].name}</h4>
                <p className="text-sm text-blue-600 font-medium">{TESTIMONIALS[current].role}</p>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <button 
            onClick={prev}
            className="absolute top-1/2 -left-4 md:-left-12 -translate-y-1/2 p-2 rounded-full bg-white shadow-lg text-gray-600 hover:text-blue-600 hover:scale-110 transition-all"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button 
            onClick={next}
            className="absolute top-1/2 -right-4 md:-right-12 -translate-y-1/2 p-2 rounded-full bg-white shadow-lg text-gray-600 hover:text-blue-600 hover:scale-110 transition-all"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {TESTIMONIALS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  current === idx ? 'w-8 bg-blue-600' : 'w-2 bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
