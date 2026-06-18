import { Helmet } from "react-helmet-async";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
   FaSearch,
   FaTimes,
   FaChevronLeft,
   FaChevronRight,
   FaDownload,
   FaShareAlt,
   FaExpand,
   FaFilter,
   FaImages,
   FaStethoscope,
   FaSyringe,
   FaBaby,
   FaAmbulance,
   FaUsers,
   FaHeartbeat,
   FaMapMarkerAlt,
   FaCalendarAlt,
   FaCamera,
   FaHeart,
} from "react-icons/fa";

// ============================================
// LOCAL IMAGES from src/about/
// ============================================
import galleryImg1 from "../assets/about/img1.jpg";
import galleryImg2 from "../assets/about/img2.jpg";
import galleryImg3 from "../assets/about/medcon.jpg";
import galleryImg4 from "../assets/about/socialmedia.jpg";
import galleryImg5 from "../assets/about/img5.jpg";
import galleryImg6 from "../assets/about/img6.jpg";
import galleryImg7 from "../assets/about/img7.jpg";
import galleryImg8 from "../assets/about/dentcare.jpg";
import galleryImg9 from "../assets/about/surgout.jpg";
import galleryImg10 from "../assets/about/medcon.jpg";
import galleryImg11 from "../assets/about/surgout.jpg";
import galleryImg12 from "../assets/about/img7.jpg";
import galleryImg13 from "../assets/about/surgout.jpg";
import galleryImg14 from "../assets/about/img1.jpg";
import galleryImg15 from "../assets/about/medcon.jpg";
import galleryImg16 from "../assets/about/img5.jpg";
import galleryImg17 from "../assets/about/socialmedia.jpg";
import galleryImg18 from "../assets/about/img3.jpg";
import galleryImg19 from "../assets/about/dentcare.jpg";
import galleryImg20 from "../assets/about/img6.jpg";
import galleryImg21 from "../assets/about/dentcare.jpg";
import galleryImg22 from "../assets/about/img5.jpg";
import galleryImg23 from "../assets/about/socialmedia.jpg";
import galleryImg24 from "../assets/about/img3.jpg";
import galleryImg25 from "../assets/about/img2.jpg";
import galleryImg26 from "../assets/about/img4.jpg";
import galleryImg27 from "../assets/about/medcon.jpg";
import galleryImg28 from "../assets/about/surgout.jpg";
import galleryImg29 from "../assets/about/img7.jpg";
import galleryImg30 from "../assets/about/img1.jpg";

// ============================================
// GALLERY DATA (30 Images - All Lagos State)
// ============================================
const galleryImages = [
   {
      id: 1,
      src: galleryImg1,
      thumbnail: galleryImg1,
      title: "Malaria Screening in Lagos",
      description: "Medical team conducting rapid diagnostic tests for malaria in a rural community health center in Lagos.",
      category: "Medical Outreach",
      location: "Lagos State, Nigeria",
      date: "March 2025",
      likes: 234,
      featured: true
   },
   {
      id: 2,
      src: galleryImg2,
      thumbnail: galleryImg2,
      title: "Cataract Surgery Campaign",
      description: "Ophthalmic surgeon performing free cataract removal restoring sight to an elderly patient in Lagos.",
      category: "Surgery",
      location: "Lagos State, Nigeria",
      date: "April 2025",
      likes: 456,
      featured: true
   },
   {
      id: 3,
      src: galleryImg3,
      thumbnail: galleryImg3,
      title: "Antenatal Care Session",
      description: "Nurse providing antenatal counseling to expectant mothers in a community clinic in Lagos.",
      category: "Maternal Health",
      location: "Lagos State, Nigeria",
      date: "February 2025",
      likes: 189,
      featured: true
   },
   {
      id: 4,
      src: galleryImg4,
      thumbnail: galleryImg4,
      title: "Volunteer Medical Team",
      description: "Our dedicated volunteer doctors preparing for a day of outreach in remote villages in Lagos.",
      category: "Volunteers",
      location: "Lagos State, Nigeria",
      date: "January 2025",
      likes: 312,
      featured: false
   },
   {
      id: 5,
      src: galleryImg5,
      thumbnail: galleryImg5,
      title: "COVID-19 Vaccination Drive",
      description: "Mobile vaccination team administering COVID-19 vaccines in a rural community in Lagos.",
      category: "Immunization",
      location: "Lagos State, Nigeria",
      date: "March 2025",
      likes: 278,
      featured: false
   },
   {
      id: 6,
      src: galleryImg6,
      thumbnail: galleryImg6,
      title: "Mental Health Counseling",
      description: "Counselor providing one-on-one mental health support to a community member in Lagos.",
      category: "Mental Health",
      location: "Lagos State, Nigeria",
      date: "February 2025",
      likes: 145,
      featured: false
   },
   {
      id: 7,
      src: galleryImg7,
      thumbnail: galleryImg7,
      title: "Dental Checkup for Children",
      description: "Pediatric dentist examining a child's teeth during a school health program in Lagos.",
      category: "Dental Care",
      location: "Lagos State, Nigeria",
      date: "February 2025",
      likes: 198,
      featured: false
   },
   {
      id: 8,
      src: galleryImg8,
      thumbnail: galleryImg8,
      title: "Cholera Response Team",
      description: "Emergency response team distributing clean water and oral rehydration salts during outbreak in Lagos.",
      category: "Emergency Response",
      location: "Lagos State, Nigeria",
      date: "August 2024",
      likes: 367,
      featured: true
   },
   {
      id: 9,
      src: galleryImg9,
      thumbnail: galleryImg9,
      title: "Community Health Worker Training",
      description: "Training session for local community health workers on basic first aid and disease recognition in Lagos.",
      category: "Training",
      location: "Lagos State, Nigeria",
      date: "January 2025",
      likes: 156,
      featured: false
   },
   {
      id: 10,
      src: galleryImg10,
      thumbnail: galleryImg10,
      title: "Pediatric Surgery Success",
      description: "Young patient recovering after successful cleft lip repair surgery in Lagos.",
      category: "Surgery",
      location: "Lagos State, Nigeria",
      date: "December 2024",
      likes: 523,
      featured: true
   },
   {
      id: 11,
      src: galleryImg11,
      thumbnail: galleryImg11,
      title: "Nutrition Program for Children",
      description: "Therapeutic feeding program for malnourished children in a community in Lagos.",
      category: "Nutrition",
      location: "Lagos State, Nigeria",
      date: "December 2024",
      likes: 289,
      featured: false
   },
   {
      id: 12,
      src: galleryImg12,
      thumbnail: galleryImg12,
      title: "Telemedicine Consultation",
      description: "Rural patient consulting with a specialist doctor via telemedicine link in Lagos.",
      category: "Innovation",
      location: "Lagos State, Nigeria",
      date: "November 2024",
      likes: 178,
      featured: false
   },
   {
      id: 13,
      src: galleryImg13,
      thumbnail: galleryImg13,
      title: "World Health Day Celebration",
      description: "Community health awareness event marking World Health Day 2024 in Lagos.",
      category: "Awareness",
      location: "Lagos State, Nigeria",
      date: "April 2024",
      likes: 245,
      featured: false
   },
   {
      id: 14,
      src: galleryImg14,
      thumbnail: galleryImg14,
      title: "Hernia Repair Surgery",
      description: "General surgeon performing hernia repair during a week-long surgical campaign in Lagos.",
      category: "Surgery",
      location: "Lagos State, Nigeria",
      date: "October 2024",
      likes: 198,
      featured: false
   },
   {
      id: 15,
      src: galleryImg15,
      thumbnail: galleryImg15,
      title: "Handwashing Education",
      description: "Children learning proper handwashing techniques to prevent disease in Lagos.",
      category: "Health Education",
      location: "Lagos State, Nigeria",
      date: "October 2024",
      likes: 312,
      featured: false
   },
   {
      id: 16,
      src: galleryImg16,
      thumbnail: galleryImg16,
      title: "Partnership Meeting",
      description: "Collaboration meeting with health representatives to plan joint health initiatives in Lagos.",
      category: "Partnerships",
      location: "Lagos State, Nigeria",
      date: "September 2024",
      likes: 167,
      featured: false
   },
   {
      id: 17,
      src: galleryImg17,
      thumbnail: galleryImg17,
      title: "Sickle Cell Screening",
      description: "Newborn screening for sickle cell disease at a community health center in Lagos.",
      category: "Awareness",
      location: "Lagos State, Nigeria",
      date: "September 2024",
      likes: 234,
      featured: false
   },
   {
      id: 18,
      src: galleryImg18,
      thumbnail: galleryImg18,
      title: "Mobile Clinic in Action",
      description: "Fully equipped mobile clinic providing diagnostics and treatment in a remote area of Lagos.",
      category: "Medical Outreach",
      location: "Lagos State, Nigeria",
      date: "August 2024",
      likes: 289,
      featured: false
   },
   {
      id: 19,
      src: galleryImg19,
      thumbnail: galleryImg19,
      title: "Annual Report Launch 2023",
      description: "Team celebrating the release of our 2023 annual impact report in Lagos.",
      category: "Reports",
      location: "Lagos State, Nigeria",
      date: "August 2024",
      likes: 178,
      featured: false
   },
   {
      id: 20,
      src: galleryImg20,
      thumbnail: galleryImg20,
      title: "Youth Health Ambassadors",
      description: "Young health advocates leading a peer education session in their school in Lagos.",
      category: "Health Education",
      location: "Lagos State, Nigeria",
      date: "July 2024",
      likes: 267,
      featured: false
   },
   {
      id: 21,
      src: galleryImg21,
      thumbnail: galleryImg21,
      title: "Blood Pressure Screening",
      description: "Free blood pressure checks for adults during a community health fair in Lagos.",
      category: "Medical Outreach",
      location: "Lagos State, Nigeria",
      date: "June 2024",
      likes: 145,
      featured: false
   },
   {
      id: 22,
      src: galleryImg22,
      thumbnail: galleryImg22,
      title: "Eye Examination Camp",
      description: "Comprehensive eye exams and prescription glasses distribution for community members in Lagos.",
      category: "Surgery",
      location: "Lagos State, Nigeria",
      date: "May 2024",
      likes: 198,
      featured: false
   },
   {
      id: 23,
      src: galleryImg23,
      thumbnail: galleryImg23,
      title: "Safe Delivery Training",
      description: "Traditional birth attendants receiving training on safe delivery practices in Lagos.",
      category: "Maternal Health",
      location: "Lagos State, Nigeria",
      date: "May 2024",
      likes: 234,
      featured: false
   },
   {
      id: 24,
      src: galleryImg24,
      thumbnail: galleryImg24,
      title: "Medical Supply Distribution",
      description: "Distributing essential medicines and medical supplies to a rural health post in Lagos.",
      category: "Medical Outreach",
      location: "Lagos State, Nigeria",
      date: "April 2024",
      likes: 156,
      featured: false
   },
   {
      id: 25,
      src: galleryImg25,
      thumbnail: galleryImg25,
      title: "Post-Surgery Follow-up",
      description: "Nurse conducting follow-up visit for a patient after successful surgery in Lagos.",
      category: "Surgery",
      location: "Lagos State, Nigeria",
      date: "March 2024",
      likes: 189,
      featured: false
   },
   {
      id: 26,
      src: galleryImg26,
      thumbnail: galleryImg26,
      title: "Community Nutrition Workshop",
      description: "Teaching mothers about balanced diets and child nutrition in Lagos.",
      category: "Nutrition",
      location: "Lagos State, Nigeria",
      date: "March 2024",
      likes: 278,
      featured: false
   },
   {
      id: 27,
      src: galleryImg27,
      thumbnail: galleryImg27,
      title: "First Aid Training",
      description: "Community members learning basic first aid and emergency response skills in Lagos.",
      category: "Training",
      location: "Lagos State, Nigeria",
      date: "February 2024",
      likes: 312,
      featured: false
   },
   {
      id: 28,
      src: galleryImg28,
      thumbnail: galleryImg28,
      title: "Emergency Medical Camp",
      description: "Emergency medical services provided to communities in need in Lagos.",
      category: "Emergency Response",
      location: "Lagos State, Nigeria",
      date: "January 2024",
      likes: 445,
      featured: true
   },
   {
      id: 29,
      src: galleryImg29,
      thumbnail: galleryImg29,
      title: "Health Awareness March",
      description: "Community members marching to raise awareness about preventable diseases in Lagos.",
      category: "Awareness",
      location: "Lagos State, Nigeria",
      date: "December 2023",
      likes: 198,
      featured: false
   },
   {
      id: 30,
      src: galleryImg30,
      thumbnail: galleryImg30,
      title: "Surgical Instruments Sterilization",
      description: "Ensuring all surgical equipment is properly sterilized before procedures in Lagos.",
      category: "Surgery",
      location: "Lagos State, Nigeria",
      date: "November 2023",
      likes: 134,
      featured: false
   }
];

const categories = [
   { name: "All", icon: <FaImages /> },
   { name: "Medical Outreach", icon: <FaStethoscope /> },
   { name: "Surgery", icon: <FaHeartbeat /> },
   { name: "Maternal Health", icon: <FaBaby /> },
   { name: "Immunization", icon: <FaSyringe /> },
   { name: "Emergency Response", icon: <FaAmbulance /> },
   { name: "Training", icon: <FaUsers /> },
   { name: "Nutrition", icon: <FaHeart /> },
   { name: "Awareness", icon: <FaCamera /> },
   { name: "Partnerships", icon: <FaMapMarkerAlt /> }
];

export default function Gallery() {
   const [selectedCategory, setSelectedCategory] = useState("All");
   const [lightboxOpen, setLightboxOpen] = useState(false);
   const [currentIndex, setCurrentIndex] = useState(0);
   const [searchQuery, setSearchQuery] = useState("");
   const [likedImages, setLikedImages] = useState(new Set());
   const [layout, setLayout] = useState("masonry");

   const filteredImages = galleryImages.filter(img => {
      const matchesCategory = selectedCategory === "All" || img.category === selectedCategory;
      const matchesSearch = !searchQuery ||
         img.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
         img.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
         img.location.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
   });

   const openLightbox = (index) => {
      setCurrentIndex(index);
      setLightboxOpen(true);
   };

   const closeLightbox = () => {
      setLightboxOpen(false);
      document.body.style.overflow = "auto";
   };

   const navigateLightbox = useCallback((direction) => {
      setCurrentIndex(prev => {
         if (direction === "next") {
            return prev === filteredImages.length - 1 ? 0 : prev + 1;
         }
         return prev === 0 ? filteredImages.length - 1 : prev - 1;
      });
   }, [filteredImages.length]);

   const toggleLike = (id, e) => {
      e.stopPropagation();
      setLikedImages(prev => {
         const next = new Set(prev);
         if (next.has(id)) next.delete(id);
         else next.add(id);
         return next;
      });
   };

   useEffect(() => {
      const handleKeyDown = (e) => {
         if (!lightboxOpen) return;
         if (e.key === "Escape") closeLightbox();
         if (e.key === "ArrowRight") navigateLightbox("next");
         if (e.key === "ArrowLeft") navigateLightbox("prev");
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
   }, [lightboxOpen, navigateLightbox]);

   const currentImage = filteredImages[currentIndex];

   return (
      <>
         <Helmet>
            <title>Gallery | RightAid Health Foundation</title>
            <meta
               name="description"
               content="Explore photos from RightAid Health Foundation's medical outreaches, surgeries, and community health programs in Lagos State, Nigeria."
            />
         </Helmet>

         <div className="min-h-screen bg-gray-50">

            {/* HERO */}
            <section className="bg-green-700 text-white py-20 px-6 relative overflow-hidden">
               <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-10 left-10 w-32 h-32 border-4 border-white rounded-full"></div>
                  <div className="absolute bottom-10 right-10 w-48 h-48 border-4 border-white rounded-full"></div>
                  <div className="absolute top-1/2 left-1/2 w-24 h-24 border-4 border-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
               </div>
               <div className="max-w-6xl mx-auto text-center relative z-10">
                  <motion.div
                     initial={{ opacity: 0, y: 30 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ duration: 0.6 }}
                  >
                     <div className="flex items-center justify-center gap-3 mb-6">
                        <FaCamera className="text-4xl text-green-300" />
                     </div>
                     <h1 className="text-5xl font-bold mb-6">Our Gallery</h1>
                     <p className="text-lg text-green-100 max-w-3xl mx-auto leading-relaxed">
                        A visual journey through our medical outreaches, surgical programs, and community health initiatives across Lagos State, Nigeria. Every image tells a story of hope, healing, and impact.
                     </p>

                     {/* Search */}
                     <div className="mt-10 max-w-xl mx-auto relative">
                        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                           type="text"
                           placeholder="Search by title, description, or location..."
                           value={searchQuery}
                           onChange={(e) => setSearchQuery(e.target.value)}
                           className="w-full pl-12 pr-4 py-4 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-300"
                        />
                     </div>
                  </motion.div>
               </div>
            </section>

            {/* STATS BAR */}
            <section className="bg-white py-8 px-6 border-b border-gray-200">
               <div className="max-w-6xl mx-auto">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                     {[
                        { number: "30+", label: "Gallery Images", icon: <FaImages /> },
                        { number: "10", label: "Categories", icon: <FaFilter /> },
                        { number: "Lagos", label: "State Focus", icon: <FaMapMarkerAlt /> },
                        { number: "5+", label: "Years of Impact", icon: <FaCalendarAlt /> }
                     ].map((stat, index) => (
                        <motion.div
                           key={index}
                           initial={{ opacity: 0, y: 20 }}
                           whileInView={{ opacity: 1, y: 0 }}
                           viewport={{ once: true }}
                           transition={{ delay: index * 0.1 }}
                           className="flex flex-col items-center"
                        >
                           <div className="text-green-600 text-2xl mb-2">{stat.icon}</div>
                           <div className="text-3xl font-bold text-gray-800">{stat.number}</div>
                           <div className="text-gray-500 text-sm">{stat.label}</div>
                        </motion.div>
                     ))}
                  </div>
               </div>
            </section>

            {/* CATEGORY FILTERS */}
            <section className="py-8 px-6 bg-white sticky top-0 z-30 shadow-sm">
               <div className="max-w-6xl mx-auto">
                  <div className="flex items-center gap-2 mb-4 md:hidden">
                     <FaFilter className="text-green-600" />
                     <span className="font-bold text-gray-800">Filter by Category</span>
                  </div>
                  <div className="flex flex-wrap gap-2 justify-center">
                     {categories.map((cat) => (
                        <button
                           key={cat.name}
                           onClick={() => setSelectedCategory(cat.name)}
                           className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition ${selectedCategory === cat.name
                              ? "bg-green-600 text-white shadow-lg"
                              : "bg-gray-100 text-gray-600 hover:bg-green-50 hover:text-green-600"
                              }`}
                        >
                           {cat.icon}
                           <span className="hidden sm:inline">{cat.name}</span>
                        </button>
                     ))}
                  </div>

                  {/* Layout Toggle */}
                  <div className="flex justify-center mt-4 gap-2">
                     <button
                        onClick={() => setLayout("masonry")}
                        className={`px-3 py-1 rounded-lg text-xs font-medium transition ${layout === "masonry" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-600"}`}
                     >
                        Masonry
                     </button>
                     <button
                        onClick={() => setLayout("grid")}
                        className={`px-3 py-1 rounded-lg text-xs font-medium transition ${layout === "grid" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-600"}`}
                     >
                        Grid
                     </button>
                  </div>
               </div>
            </section>

            {/* GALLERY GRID */}
            <section className="py-12 px-6">
               <div className="max-w-7xl mx-auto">
                  {filteredImages.length > 0 ? (
                     <div className={layout === "masonry"
                        ? "columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4"
                        : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                     }>
                        {filteredImages.map((image, index) => (
                           <motion.div
                              key={image.id}
                              initial={{ opacity: 0, y: 30 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.4, delay: (index % 8) * 0.05 }}
                              className={`group relative overflow-hidden rounded-xl cursor-pointer bg-white shadow-md hover:shadow-xl transition ${layout === "masonry" ? "break-inside-avoid mb-4" : ""
                                 }`}
                              onClick={() => openLightbox(index)}
                           >
                              <div className="relative overflow-hidden">
                                 <img
                                    src={image.thumbnail}
                                    alt={image.title}
                                    className="w-full object-cover group-hover:scale-110 transition duration-700"
                                    style={{ height: layout === "masonry" ? `${200 + (image.id % 4) * 60}px` : "280px" }}
                                    loading="lazy"
                                 />
                                 <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition duration-300"></div>

                                 {/* Overlay Content */}
                                 <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition duration-300">
                                    <h3 className="text-white font-bold text-lg mb-1">{image.title}</h3>
                                    <p className="text-green-300 text-xs mb-2">{image.category}</p>
                                    <div className="flex items-center justify-between">
                                       <div className="flex items-center gap-1 text-white/80 text-xs">
                                          <FaMapMarkerAlt />
                                          <span>{image.location}</span>
                                       </div>
                                       <div className="flex items-center gap-3">
                                          <button
                                             onClick={(e) => toggleLike(image.id, e)}
                                             className="text-white hover:text-red-400 transition"
                                          >
                                             <FaHeart className={likedImages.has(image.id) ? "text-red-500" : ""} />
                                          </button>
                                          <FaExpand className="text-white text-sm" />
                                       </div>
                                    </div>
                                 </div>

                                 {/* Featured Badge */}
                                 {image.featured && (
                                    <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                                       <FaHeart className="text-xs" /> Featured
                                    </div>
                                 )}

                                 {/* Like Count */}
                                 <div className="absolute top-3 right-3 bg-black/50 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                                    <FaHeart className={likedImages.has(image.id) ? "text-red-400" : "text-white/60"} />
                                    <span>{image.likes + (likedImages.has(image.id) ? 1 : 0)}</span>
                                 </div>
                              </div>

                              {layout === "grid" && (
                                 <div className="p-4">
                                    <h3 className="font-bold text-gray-800 mb-1 line-clamp-1">{image.title}</h3>
                                    <p className="text-gray-500 text-xs mb-2">{image.date}</p>
                                    <p className="text-gray-600 text-sm line-clamp-2">{image.description}</p>
                                 </div>
                              )}
                           </motion.div>
                        ))}
                     </div>
                  ) : (
                     <div className="text-center py-20">
                        <FaSearch className="text-gray-300 text-6xl mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-gray-600 mb-2">No images found</h3>
                        <p className="text-gray-500">Try adjusting your search or category filter.</p>
                        <button
                           onClick={() => {
                              setSearchQuery("");
                              setSelectedCategory("All");
                           }}
                           className="mt-4 text-green-600 font-medium hover:underline"
                        >
                           Clear all filters
                        </button>
                     </div>
                  )}
               </div>
            </section>

            {/* LIGHTBOX */}
            <AnimatePresence>
               {lightboxOpen && currentImage && (
                  <motion.div
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     exit={{ opacity: 0 }}
                     className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
                     onClick={closeLightbox}
                  >
                     {/* Close Button */}
                     <button
                        onClick={closeLightbox}
                        className="absolute top-6 right-6 text-white/80 hover:text-white z-50 p-2"
                     >
                        <FaTimes className="text-3xl" />
                     </button>

                     {/* Navigation */}
                     <button
                        onClick={(e) => { e.stopPropagation(); navigateLightbox("prev"); }}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white p-3 bg-black/30 rounded-full transition"
                     >
                        <FaChevronLeft className="text-2xl" />
                     </button>
                     <button
                        onClick={(e) => { e.stopPropagation(); navigateLightbox("next"); }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white p-3 bg-black/30 rounded-full transition"
                     >
                        <FaChevronRight className="text-2xl" />
                     </button>

                     {/* Image Container */}
                     <div
                        className="max-w-5xl max-h-[85vh] mx-auto px-4 flex flex-col items-center"
                        onClick={(e) => e.stopPropagation()}
                     >
                        <motion.img
                           key={currentImage.id}
                           initial={{ opacity: 0, scale: 0.9 }}
                           animate={{ opacity: 1, scale: 1 }}
                           exit={{ opacity: 0, scale: 0.9 }}
                           transition={{ duration: 0.3 }}
                           src={currentImage.src}
                           alt={currentImage.title}
                           className="max-w-full max-h-[70vh] object-contain rounded-lg"
                        />

                        {/* Image Info */}
                        <motion.div
                           initial={{ opacity: 0, y: 20 }}
                           animate={{ opacity: 1, y: 0 }}
                           transition={{ delay: 0.2 }}
                           className="mt-6 text-center text-white max-w-2xl"
                        >
                           <h2 className="text-2xl font-bold mb-2">{currentImage.title}</h2>
                           <p className="text-gray-300 mb-4">{currentImage.description}</p>
                           <div className="flex items-center justify-center gap-6 text-sm text-gray-400">
                              <span className="flex items-center gap-2">
                                 <FaMapMarkerAlt /> {currentImage.location}
                              </span>
                              <span className="flex items-center gap-2">
                                 <FaCalendarAlt /> {currentImage.date}
                              </span>
                              <span className="flex items-center gap-2">
                                 {currentImage.category}
                              </span>
                              <span className="flex items-center gap-2">
                                 <FaHeart className={likedImages.has(currentImage.id) ? "text-red-500" : ""} />
                                 {currentImage.likes + (likedImages.has(currentImage.id) ? 1 : 0)} likes
                              </span>
                           </div>
                        </motion.div>

                        {/* Actions */}
                        <div className="flex items-center gap-4 mt-6">
                           <button
                              onClick={(e) => toggleLike(currentImage.id, e)}
                              className={`flex items-center gap-2 px-4 py-2 rounded-full transition ${likedImages.has(currentImage.id)
                                 ? "bg-red-500 text-white"
                                 : "bg-white/10 text-white hover:bg-white/20"
                                 }`}
                           >
                              <FaHeart /> {likedImages.has(currentImage.id) ? "Liked" : "Like"}
                           </button>
                           <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition">
                              <FaShareAlt /> Share
                           </button>
                           <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition">
                              <FaDownload /> Download
                           </button>
                        </div>

                        {/* Thumbnail Strip */}
                        <div className="flex gap-2 mt-6 overflow-x-auto max-w-full pb-2">
                           {filteredImages.map((img, idx) => (
                              <button
                                 key={img.id}
                                 onClick={() => setCurrentIndex(idx)}
                                 className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition ${idx === currentIndex ? "border-green-500" : "border-transparent opacity-50 hover:opacity-100"
                                    }`}
                              >
                                 <img src={img.thumbnail} alt={img.title} className="w-full h-full object-cover" />
                              </button>
                           ))}
                        </div>
                     </div>
                  </motion.div>
               )}
            </AnimatePresence>

            {/* CTA */}
            <section className="bg-green-700 text-white py-16 px-6">
               <div className="max-w-4xl mx-auto text-center">
                  <h2 className="text-3xl font-bold mb-4">Want to See More?</h2>
                  <p className="text-green-100 mb-8 max-w-2xl mx-auto">
                     Follow us on social media for real-time updates from our medical missions and community programs across Lagos State.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                     <button className="bg-white text-green-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition inline-flex items-center justify-center gap-2">
                        <FaShareAlt /> Follow Us
                     </button>
                     <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-700 transition inline-flex items-center justify-center gap-2">
                        <FaCamera /> Submit Photos
                     </button>
                  </div>
               </div>
            </section>
         </div>
      </>
   );
}