import { Link } from "react-router-dom";

// ✅ LOCAL IMAGES IMPORTED
import medicalImg from "../assets/about/kidney.jpg";
import surgeryImg from "../assets/about/Medical Outreach.jpg";
import dentalImg from "../assets/about/dentcare.jpg";
import socialImg from "../assets/about/media mana.jpg";

export default function WhatWeDoSection() {

   const services = [
      {
         title: "World Kidney Day April 4, 2025",
         desc: "Free medical assessments, health education, and chronic disease guidance to improve community health outcomes.",
         img: medicalImg,
      },
      {
         title: "Medical Outreach Programs, Nov 12, 2022",
         desc: "Life-saving surgeries delivered directly to communities, covering general surgery and emergency interventions.",
         img: surgeryImg,
      },
      {
         title: "Dental & Oral Health Care",
         desc: "Preventive and corrective dental services, pain relief, and oral health education for all age groups.",
         img: dentalImg,
      },
      {
         title: "Right Aid Health Foundation Annual Health Outreach, August 2024.",
         desc: "Boost engagement and drive conversions with targeted digital outreach and awareness campaigns.",
         img: socialImg,
      },
   ];

   return (
      <section className="py-20 px-6 bg-gray-50">

         <div className="max-w-6xl mx-auto text-center">

            {/* HEADER */}
            <h2 className="text-3xl font-bold text-green-700">
               What We Do
            </h2>

            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
               Comprehensive, compassionate healthcare services designed to meet urgent
               medical needs and strengthen communities.
            </p>

            {/* CARDS */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

               {services.map((service, i) => (
                  <div
                     key={i}
                     className="relative group rounded-xl overflow-hidden shadow-lg"
                  >

                     {/* IMAGE */}
                     <img
                        src={service.img}
                        alt={service.title}
                        className="w-full h-60 object-cover group-hover:scale-110 transition duration-500"
                     />

                     {/* OVERLAY */}
                     <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition duration-500"></div>

                     {/* TEXT */}
                     <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 opacity-0 group-hover:opacity-100 transition duration-500 text-white">

                        <h3 className="text-lg font-bold">
                           {service.title}
                        </h3>

                        <p className="text-sm mt-2">
                           {service.desc}
                        </p>

                     </div>

                  </div>
               ))}

            </div>

            {/* CTA */}
            <div className="mt-12">
               <Link
                  to="/services"
                  className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
               >
                  View More
               </Link>
            </div>

         </div>

      </section>
   );
}