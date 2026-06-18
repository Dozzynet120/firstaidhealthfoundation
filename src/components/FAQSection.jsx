import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaUsers, FaHeart } from "react-icons/fa";

export default function FAQSection() {

   const faqs = [
      {
         q: "Who can receive care from Right Aid Health Foundation?",
         a: "Anyone in underserved or vulnerable communities who cannot afford quality healthcare services.",
      },
      {
         q: "How are donations used?",
         a: "Donations are used to fund surgeries, medical outreach, medications, and training for healthcare professionals.",
      },
      {
         q: "Can I volunteer or partner with Right Aid Health Foundation?",
         a: "Yes. We welcome volunteers, medical professionals, and partner organizations to join our mission.",
      },
      {
         q: "Is my donation tax-deductible?",
         a: "Depending on your country of residence and applicable laws, donations may qualify for tax benefits.",
      },
   ];

   const [open, setOpen] = useState(null);

   // COUNTERS
   const [volunteers, setVolunteers] = useState(0);
   const [lives, setLives] = useState(0);

   useEffect(() => {
      let v = 0;
      let l = 0;

      const interval = setInterval(() => {
         v += 4;
         l += 250;

         if (v >= 200) v = 200;
         if (l >= 12000) l = 12000;

         setVolunteers(v);
         setLives(l);

         if (v === 200 && l === 12000) clearInterval(interval);
      }, 20);

      return () => clearInterval(interval);
   }, []);

   return (
      <motion.section
         initial={{ opacity: 0, y: 60 }}
         whileInView={{ opacity: 1, y: 0 }}
         viewport={{ once: true }}
         transition={{ duration: 0.8 }}
         className="relative py-24 px-6"
      >

         {/* BACKGROUND IMAGE */}
         <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
               backgroundImage:
                  "url('https://images.unsplash.com/photo-1586773860418-d37222d8fce3')",
               opacity: 0.12,
            }}
         />

         {/* OVERLAY */}
         <div className="absolute inset-0 bg-white/85"></div>

         {/* CONTENT */}
         <div className="relative max-w-5xl mx-auto">

            {/* HEADER */}
            <h2 className="text-3xl font-bold text-green-700 text-center">
               Need Answers?
            </h2>

            <p className="text-center text-gray-600 mt-2">
               Frequently Asked Questions
            </p>

            {/* STATS */}
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 text-center">

               {/* VOLUNTEERS */}
               <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition">
                  <FaUsers className="text-green-600 text-4xl mx-auto" />
                  <h3 className="text-2xl font-bold mt-2 text-green-700">
                     {volunteers}+
                  </h3>
                  <p className="text-gray-600">Volunteers</p>
               </div>

               {/* LIVES IMPACTED */}
               <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition">
                  <FaHeart className="text-red-500 text-4xl mx-auto" />
                  <h3 className="text-2xl font-bold mt-2 text-green-700">
                     {lives.toLocaleString()}+
                  </h3>
                  <p className="text-gray-600">Lives Impacted</p>
               </div>

            </div>

            {/* FAQ LIST */}
            <div className="mt-12 space-y-4">

               {faqs.map((item, i) => (
                  <div
                     key={i}
                     className="bg-white border rounded-lg p-5 hover:shadow-md transition"
                  >

                     <button
                        className="w-full text-left font-semibold text-gray-800 flex justify-between items-center"
                        onClick={() => setOpen(open === i ? null : i)}
                     >
                        {item.q}
                        <span className="text-green-600 text-xl">
                           {open === i ? "−" : "+"}
                        </span>
                     </button>

                     {/* SMOOTH ANIMATION */}
                     <AnimatePresence>
                        {open === i && (
                           <motion.p
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="mt-3 text-gray-600 overflow-hidden"
                           >
                              {item.a}
                           </motion.p>
                        )}
                     </AnimatePresence>

                  </div>
               ))}

            </div>

         </div>

      </motion.section>
   );
}