import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import video from "../assets/hero/video10.mp4";

export default function Hero() {
   const videoRef = useRef(null);
   const [isPlaying, setIsPlaying] = useState(true);
   const [showControls, setShowControls] = useState(false);

   // AUTO-PAUSE AFTER 2 MINUTES 3 SECONDS (123,000 ms)
   useEffect(() => {
      const timer = setTimeout(() => {
         if (videoRef.current) {
            videoRef.current.pause();
            setIsPlaying(false);
         }
      }, 123000); // 2 mins 3 secs = 123,000 ms

      return () => clearTimeout(timer);
   }, []);

   // TOGGLE PLAY / PAUSE
   const togglePlay = () => {
      if (videoRef.current) {
         if (videoRef.current.paused) {
            videoRef.current.play();
            setIsPlaying(true);
         } else {
            videoRef.current.pause();
            setIsPlaying(false);
         }
      }
   };

   return (
      <section
         className="relative h-[100vh] w-full overflow-hidden"
         onMouseEnter={() => setShowControls(true)}
         onMouseLeave={() => setShowControls(false)}
      >

         {/* SINGLE BACKGROUND VIDEO WITH AUDIO */}
         <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            muted={false}          // AUDIO ENABLED
            loop={false}           // NO LOOP — plays once
            playsInline
            onClick={togglePlay}   // CLICK VIDEO TO PLAY/PAUSE
         >
            <source src={video} type="video/mp4" />
            Your browser does not support the video tag.
         </video>

         {/* DARK OVERLAY */}
         <div className="absolute inset-0 bg-black/60"></div>

         {/* PLAY / PAUSE CONTROLS (SHOW ON HOVER) */}
         <div className={`absolute inset-0 z-20 flex items-center justify-center transition-opacity duration-300 ${showControls ? "opacity-100" : "opacity-0"}`}>
            <button
               onClick={togglePlay}
               className="bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full p-4 transition-all duration-300 border border-white/30"
               aria-label={isPlaying ? "Pause video" : "Play video"}
            >
               {isPlaying ? (
                  <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                     <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                  </svg>
               ) : (
                  <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                     <path d="M8 5v14l11-7z" />
                  </svg>
               )}
            </button>
         </div>

         {/* CONTENT */}
         <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-6">

            <h1 className="text-4xl md:text-5xl font-bold leading-tight max-w-4xl">
               Bringing Life-Saving Healthcare to Communities in Need
            </h1>

            <p className="mt-6 text-lg text-gray-200 max-w-2xl">
               RightAid Health Foundation delivers surgical support, medical outreach,
               and healthcare access across Nigeria.
            </p>

            <div className="mt-8 flex flex-col md:flex-row gap-4">

               <Link
                  to="/donate"
                  className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg font-semibold transition"
               >
                  Donate Now
               </Link>

               <Link
                  to="/about"
                  className="border border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-black transition"
               >
                  Learn More
               </Link>

            </div>

         </div>

      </section>
   );
}