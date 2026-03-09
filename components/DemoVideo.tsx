'use client';

import { useState, useRef, useEffect } from 'react';
import { Play, Lock } from 'lucide-react';
import Link from 'next/link';

export default function DemoVideo() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.pause();
        }
        setShowOverlay(true);
        setIsPlaying(false);
      }, 60000); // 60 seconds
    }
    return () => clearTimeout(timer);
  }, [isPlaying]);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <section className="py-16 bg-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-10">
          <h2 className="text-3xl font-bold">Experience Our Teaching Quality</h2>
          <p className="mt-4 text-gray-400">Watch a free demo class. Join thousands of satisfied students.</p>
        </div>

        <div className="relative mx-auto max-w-4xl aspect-video rounded-2xl overflow-hidden bg-black shadow-2xl border border-gray-800">
          <video
            ref={videoRef}
            className={`w-full h-full object-cover transition-all duration-500 ${showOverlay ? 'blur-md scale-105' : ''}`}
            poster="https://picsum.photos/seed/classroom/800/450"
            controls={isPlaying && !showOverlay}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          >
            <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Initial Play Button */}
          {!isPlaying && !showOverlay && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
              <button 
                onClick={handlePlay}
                className="group flex h-20 w-20 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-transform hover:scale-110"
              >
                <Play className="h-8 w-8 text-white fill-current ml-1" />
              </button>
            </div>
          )}

          {/* Subscription Overlay */}
          {showOverlay && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 z-10 p-6 text-center animate-in fade-in duration-500">
              <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 max-w-md w-full">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-white">
                  <Lock className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Free Preview Ended</h3>
                <p className="text-gray-300 mb-6">Subscribe now to watch the full class and access our complete course library.</p>
                <Link 
                  href="/login" 
                  className="block w-full rounded-lg bg-blue-600 px-6 py-3 text-base font-bold text-white hover:bg-blue-700 transition-colors"
                >
                  Subscribe Now
                </Link>
                <button 
                  onClick={() => {
                    setShowOverlay(false);
                    if(videoRef.current) {
                        videoRef.current.currentTime = 0;
                    }
                  }}
                  className="mt-4 text-sm text-gray-400 hover:text-white underline"
                >
                  Replay Preview
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
