import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/about/logo.svg";

// Import your local images
import aishaImg from "../assets/about/doc.png";
import johnImg from "../assets/about/doc1.jfif";
import maryImg from "../assets/about/doc2.jfif";

export default function WhatPeopleSayAboutUs() {

   const testimonials = [
      {
         name: "Aisha Mohammed",
         role: "Beneficiary - Lagos Outreach",
         img: aishaImg,
         text: "RightAid Health Foundation gave me access to life-saving medical care when I had no hope. I am forever grateful.",
      },
      {
         name: "John Okafor",
         role: "Community Member - Surulere",
         img: johnImg,
         text: "Their medical outreach program brought free healthcare to our community. Many lives were saved.",
      },
      {
         name: "Mary Johnson",
         role: "Benefactor Partner",
         img: maryImg,
         text: "Supporting RightAid has been one of the most impactful decisions. Their transparency and results are outstanding.",
      },
   ];

   const [index, setIndex] = useState(0);

   // AUTO ROTATE
   useEffect(() => {
      const interval = setInterval(() => {
         setIndex((prev) => (prev + 1) % testimonials.length);
      }, 5000);

      return () => clearInterval(interval);
   }, []);

   const next = () => {
      setIndex((prev) => (prev + 1) % testimonials.length);
   };

   const prev = () => {
      setIndex((prev) =>
         prev === 0 ? testimonials.length - 1 : prev - 1
      );
   };

   const current = testimonials[index];

   return (
      <section className="py-24 px-6 bg-green-900 relative text-white">

         <div className="max-w-5xl mx-auto text-center relative">

            {/* LOGO (FIXED + RESPONSIVE) */}
            <div className="absolute top-0 right-0 hidden md:block">
               <img
                  src={logo}
                  alt="RightAid Logo"
                  className="w-40 h-40 opacity-90"
               />
            </div>

            {/* HEADER */}
            <h2 className="text-4xl font-bold">
               Stories That Remind Us
            </h2>

            <h3 className="mt-2 text-xl font-semibold">
               Why This Work Matters
            </h3>

            <p className="mt-4 text-green-100 max-w-2xl mx-auto">
               Hear directly from the people whose lives have been touched by our work
               and the partners who support our mission.
            </p>

            {/* CAROUSEL */}
            <div className="mt-12 relative">

               <AnimatePresence mode="wait">

                  <motion.div
                     key={index}
                     initial={{ opacity: 0, x: 80 }}
                     animate={{ opacity: 1, x: 0 }}
                     exit={{ opacity: 0, x: -80 }}
                     transition={{ duration: 0.7, ease: "easeInOut" }}
                     className="bg-white text-gray-800 rounded-xl shadow-xl p-8 max-w-2xl mx-auto"
                  >

                     <img
                        src={current.img}
                        alt={current.name}
                        className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-green-600"
                     />

                     <h3 className="mt-4 font-bold text-green-700 text-xl">
                        {current.name}
                     </h3>

                     <p className="text-sm text-gray-500">
                        {current.role}
                     </p>

                     <p className="mt-6 text-gray-600">
                        "{current.text}"
                     </p>

                  </motion.div>

               </AnimatePresence>

               {/* CONTROLS */}
               <div className="flex justify-center gap-6 mt-8">

                  <button
                     onClick={prev}
                     className="bg-white text-green-700 px-4 py-2 rounded-full font-bold hover:bg-gray-100 transition"
                  >
                     ◀
                  </button>

                  <button
                     onClick={next}
                     className="bg-white text-green-700 px-4 py-2 rounded-full font-bold hover:bg-gray-100 transition"
                  >
                     ▶
                  </button>

               </div>

            </div>

         </div>

      </section>
   );
}