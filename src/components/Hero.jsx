import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import video1 from "../assets/hero/video.mp4";
import video2 from "../assets/hero/video1.mp4";
import video3 from "../assets/hero/video2.mp4";
import video4 from "../assets/hero/video8.mp4";
import video5 from "../assets/hero/video4.mp4";
import video6 from "../assets/hero/video5.mp4";
import video7 from "../assets/hero/video6.mp4";
import video8 from "../assets/hero/video7.mp4";

export default function Hero() {

   const videos = [video1, video2, video3, video4, video5, video6, video7, video8];
   const [current, setCurrent] = useState(0);

   // CHANGE VIDEO EVERY 5 SECONDS
   useEffect(() => {
      const interval = setInterval(() => {
         setCurrent((prev) => (prev + 1) % videos.length);
      }, 5000);

      return () => clearInterval(interval);
   }, []);

   return (
      <section className="relative h-[100vh] w-full overflow-hidden">

         {/* BACKGROUND VIDEOS */}
         {videos.map((vid, index) => (
            <video
               key={index}
               className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${index === current ? "opacity-100" : "opacity-0"
                  }`}
               autoPlay
               loop
               muted
               playsInline
            >
               <source src={vid} type="video/mp4" />
            </video>
         ))}

         {/* DARK OVERLAY */}
         <div className="absolute inset-0 bg-black/60"></div>

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