import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
   FaExpand,
   FaImages,
   FaArrowRight,
   FaMapMarkerAlt,
   FaCalendarAlt
} from "react-icons/fa";

// Local images from src/about/
import galleryImg1 from "../assets/about/img1.jpg";
import galleryImg2 from "../assets/about/img2.jpg";
import galleryImg3 from "../assets/about/img3.jpg";
import galleryImg4 from "../assets/about/img4.jpg"; // Replace with your actual images
import galleryImg5 from "../assets/about/img5.jpg"; // Replace with your actual images
import galleryImg6 from "../assets/about/img6.jpg";
import galleryImg7 from "../assets/about/img7.jpg";
import galleryImg8 from "../assets/about/img1.jpg"; // Replace with your actual images

export default function GalleryPreview() {
   const [setHoveredIndex] = useState(null);

   const images = [
      {
         src: galleryImg1,
         title: "Medical Outreach in Kano",
         location: "Lagos State",
         date: "March 2025",
         span: "col-span-1 row-span-1"
      },
      {
         src: galleryImg2,
         title: "Cataract Surgery Campaign",
         location: "Lagos State",
         date: "April 2025",
         span: "col-span-1 row-span-2 md:row-span-2"
      },
      {
         src: galleryImg3,
         title: "Antenatal Care Session",
         location: "Lagos State",
         date: "February 2025",
         span: "col-span-1 row-span-1"
      },
      {
         src: galleryImg4,
         title: "Volunteer Medical Team",
         location: "Lagos State",
         date: "January 2025",
         span: "col-span-1 row-span-1"
      },
      {
         src: galleryImg5,
         title: "COVID-19 Vaccination Drive",
         location: "Lagos State",
         date: "March 2025",
         span: "col-span-1 row-span-1"
      },
      {
         src: galleryImg6,
         title: "Community Health Workshop",
         location: "Lagos State",
         date: "December 2024",
         span: "col-span-1 row-span-1"
      },
      {
         src: galleryImg7,
         title: "Community Health Workshop",
         location: "Lagos State",
         date: "December 2024",
         span: "col-span-1 row-span-1"
      },
      {
         src: galleryImg8,
         title: "Community Health Workshop",
         location: "Lagos State",
         date: "December 2024",
         span: "col-span-1 row-span-1"
      }
   ];

   return (
      <section className="py-20 px-6 bg-gray-50">
         <div className="max-w-6xl mx-auto">

            {/* Section Header */}
            <motion.div
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.6 }}
               className="text-center mb-12"
            >
               <div className="flex items-center justify-center gap-3 mb-4">
                  <FaImages className="text-4xl text-green-600" />
               </div>
               <h2 className="text-4xl font-bold text-gray-800 mb-4">
                  Our Gallery
               </h2>
               <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
                  Capturing moments of hope, healing, and impact across Nigeria.
                  Every image tells a story of lives transformed through compassionate healthcare.
               </p>
            </motion.div>

            {/* Masonry Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 auto-rows-[200px] md:auto-rows-[220px]">
               {images.map((image, index) => (
                  <motion.div
                     key={index}
                     initial={{ opacity: 0, y: 30 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true }}
                     transition={{ duration: 0.5, delay: index * 0.1 }}
                     className={`relative group overflow-hidden rounded-2xl shadow-lg cursor-pointer ${image.span} ${index === 1 ? "md:row-span-2" : ""}`}
                     onMouseEnter={() => setHoveredIndex(index)}
                     onMouseLeave={() => setHoveredIndex(null)}
                  >
                     <img
                        src={image.src}
                        alt={image.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                     />

                     {/* Overlay */}
                     <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300"></div>

                     {/* Content */}
                     <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-5 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                        <h3 className="text-white font-bold text-sm md:text-lg mb-1">
                           {image.title}
                        </h3>
                        <div className="flex items-center gap-3 text-green-300 text-xs">
                           <span className="flex items-center gap-1">
                              <FaMapMarkerAlt /> {image.location}
                           </span>
                           <span className="flex items-center gap-1">
                              <FaCalendarAlt /> {image.date}
                           </span>
                        </div>
                     </div>

                     {/* Expand Icon */}
                     <div className="absolute top-3 right-3 w-8 h-8 bg-white/20 backdrop-blur rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100">
                        <FaExpand className="text-white text-sm" />
                     </div>

                     {/* Featured Badge on First Image */}
                     {index === 0 && (
                        <div className="absolute top-3 left-3 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                           Featured
                        </div>
                     )}
                  </motion.div>
               ))}
            </div>

            {/* View Full Gallery CTA */}
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.5, delay: 0.3 }}
               className="text-center mt-12"
            >
               <Link
                  to="/gallery"
                  className="inline-flex items-center gap-3 bg-green-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-green-700 transition shadow-lg hover:shadow-xl group"
               >
                  <FaImages className="text-xl" />
                  <span>View Full Gallery</span>
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
               </Link>
               <p className="text-gray-500 text-sm mt-3">
                  Explore 30+ photos from our medical missions and community programs
               </p>
            </motion.div>
         </div>
      </section>
   );
}