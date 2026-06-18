import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import video10 from "../assets/about/video10.mp4";
import video5 from "../assets/about/video5.mp4";
import video9 from "../assets/about/video9.mp4";

export default function AboutPreview() {
   const videos = [video10, video5, video9];
   const [currentVideo, setCurrentVideo] = useState(0);

   useEffect(() => {
      const interval = setInterval(() => {
         setCurrentVideo((prev) => (prev + 1) % videos.length);
      }, 10000);

      return () => clearInterval(interval);
   }, []);

   return (
      <section className="py-24 px-6 bg-white">
         <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-14 items-center">

            {/* TEXT SECTION */}
            <div>
               <span className="inline-block bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm font-semibold mb-4">
                  About Us
               </span>

               <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                  About RightAid Health Foundation
               </h2>

               <p className="mt-6 text-lg text-gray-600 leading-relaxed">
                  RightAid Health Foundation is committed to improving healthcare
                  access for vulnerable populations through medical outreach,
                  surgical assistance, health education, and community-based
                  interventions.
               </p>

               <p className="mt-4 text-lg text-gray-600 leading-relaxed">
                  We work tirelessly to ensure that no individual is denied
                  quality healthcare because of poverty, distance, or lack of
                  access to medical resources.
               </p>

               <div className="mt-8">
                  <Link
                     to="/about"
                     className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-semibold shadow-lg transition duration-300"
                  >
                     Learn More About Us
                  </Link>
               </div>
            </div>

            {/* PREMIUM VIDEO SECTION */}
            <div className="flex justify-center items-center">
               <div className="relative w-full max-w-[650px] h-[350px] md:h-[420px] rounded-3xl overflow-hidden shadow-2xl">

                  <video
                     key={currentVideo}
                     className="w-full h-full object-cover"
                     autoPlay
                     muted
                     loop
                     playsInline
                  >
                     <source src={videos[currentVideo]} type="video/mp4" />
                  </video>

                  {/* Premium Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>

                  {/* Optional Badge */}
                  <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-xl shadow-lg">
                     <p className="font-semibold text-green-700">
                        Healthcare Outreach Across Nigeria
                     </p>
                  </div>

               </div>
            </div>

         </div>
      </section>
   );
}