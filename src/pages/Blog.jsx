import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useState, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
   FaCalendarAlt,
   FaClock,
   FaTag,
   FaSearch,
   FaArrowRight,
   FaBookmark,
   FaComment,
   FaEye,
   FaHeart,
   FaChevronLeft,
   FaChevronRight,
   FaFilter,
   FaFire,
   FaNewspaper,
   FaStethoscope,
   FaHandsHelping,
   FaGlobeAfrica,
   FaHeartbeat,
   FaSyringe,
   FaBaby,
   FaBrain,
   FaProcedures,
   FaBullhorn,
   FaPlay,
   FaPause,
   FaVolumeUp,
   FaVolumeMute
} from "react-icons/fa";

// Import shared blog data
import { blogs } from "../data/blogData";

// Hero video
import heroVideo from "../assets/about/00.mp4";

// ============================================
// UPDATED BLOG PAGE - Uses Shared Data
// ============================================

const categories = [
   { name: "All", icon: <FaNewspaper />, count: blogs.length },
   { name: "Medical Outreach", icon: <FaStethoscope />, count: blogs.filter(b => b.category === "Medical Outreach").length },
   { name: "Surgery", icon: <FaProcedures />, count: blogs.filter(b => b.category === "Surgery").length },
   { name: "Maternal Health", icon: <FaBaby />, count: blogs.filter(b => b.category === "Maternal Health").length },
   { name: "Immunization", icon: <FaSyringe />, count: blogs.filter(b => b.category === "Immunization").length },
   { name: "Mental Health", icon: <FaBrain />, count: blogs.filter(b => b.category === "Mental Health").length },
   { name: "Emergency Response", icon: <FaHeartbeat />, count: blogs.filter(b => b.category === "Emergency Response").length },
   { name: "Health Education", icon: <FaBullhorn />, count: blogs.filter(b => b.category === "Health Education").length },
   { name: "Volunteer Stories", icon: <FaHandsHelping />, count: blogs.filter(b => b.category === "Volunteer Stories").length },
   { name: "Partnerships", icon: <FaGlobeAfrica />, count: blogs.filter(b => b.category === "Partnerships").length },
];

const POSTS_PER_PAGE = 9;

export default function Blog() {
   const [searchQuery, setSearchQuery] = useState("");
   const [selectedCategory, setSelectedCategory] = useState("All");
   const [currentPage, setCurrentPage] = useState(1);
   const [sortBy, setSortBy] = useState("newest");

   // Video controls state
   const videoRef = useRef(null);
   const [isPlaying, setIsPlaying] = useState(false);
   const [isMuted, setIsMuted] = useState(true);

   const togglePlay = () => {
      if (videoRef.current) {
         if (isPlaying) {
            videoRef.current.pause();
         } else {
            videoRef.current.play();
         }
         setIsPlaying(!isPlaying);
      }
   };

   const toggleMute = () => {
      if (videoRef.current) {
         videoRef.current.muted = !isMuted;
         setIsMuted(!isMuted);
      }
   };

   const filteredPosts = useMemo(() => {
      let result = [...blogs];

      if (searchQuery) {
         const query = searchQuery.toLowerCase();
         result = result.filter(b =>
            b.title.toLowerCase().includes(query) ||
            b.excerpt.toLowerCase().includes(query) ||
            b.tags.some(tag => tag.toLowerCase().includes(query)) ||
            b.author.toLowerCase().includes(query)
         );
      }

      if (selectedCategory !== "All") {
         result = result.filter(b => b.category === selectedCategory);
      }

      switch (sortBy) {
         case "newest":
            result.sort((a, b) => new Date(b.date) - new Date(a.date));
            break;
         case "popular":
            result.sort((a, b) => b.views - a.views);
            break;
         case "featured":
            result = result.filter(b => b.featured);
            break;
         default:
            break;
      }

      return result;
   }, [searchQuery, selectedCategory, sortBy]);

   const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
   const paginatedPosts = filteredPosts.slice(
      (currentPage - 1) * POSTS_PER_PAGE,
      currentPage * POSTS_PER_PAGE
   );

   const featuredPosts = blogs.filter(b => b.featured).slice(0, 3);
   const popularPosts = [...blogs].sort((a, b) => b.views - a.views).slice(0, 5);

   const formatDate = (dateStr) => {
      return new Date(dateStr).toLocaleDateString("en-US", {
         year: "numeric",
         month: "long",
         day: "numeric"
      });
   };

   return (
      <>
         <Helmet>
            <title>Blog | RightAid Health Foundation</title>
            <meta
               name="description"
               content="Latest news, stories, and updates from RightAid Health Foundation's medical outreach programs across Nigeria."
            />
         </Helmet>

         <div className="min-h-screen bg-gray-50">

            {/* HERO SECTION WITH VIDEO */}
            <section className="relative bg-green-700 text-white py-20 px-6 overflow-hidden">
               {/* Background Video */}
               <video
                  ref={videoRef}
                  src={heroVideo}
                  className="absolute inset-0 w-full h-full object-cover"
                  loop
                  playsInline
                  muted
                  onClick={togglePlay}
               />
               {/* Dark overlay for text readability */}
               <div className="absolute inset-0 bg-black/50"></div>

               <div className="relative max-w-6xl mx-auto text-center z-10">
                  <motion.div
                     initial={{ opacity: 0, y: 30 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ duration: 0.6 }}
                  >
                     <h1 className="text-5xl font-bold mb-6">Our Blog</h1>
                     <p className="text-lg text-green-100 max-w-3xl mx-auto leading-relaxed">
                        Stories from the field, medical insights, volunteer experiences, and updates on our mission to bring healthcare to every corner of Nigeria.
                     </p>

                     <div className="mt-10 max-w-2xl mx-auto relative">
                        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                           type="text"
                           placeholder="Search articles, topics, authors..."
                           value={searchQuery}
                           onChange={(e) => {
                              setSearchQuery(e.target.value);
                              setCurrentPage(1);
                           }}
                           className="w-full pl-12 pr-4 py-4 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-300"
                        />
                     </div>
                  </motion.div>

                  {/* Video Controls */}
                  <div className="mt-8 flex items-center justify-center gap-4">
                     {/* Play / Pause Button */}
                     <button
                        onClick={togglePlay}
                        className="flex items-center gap-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-5 py-2.5 rounded-full transition border border-white/30"
                     >
                        {isPlaying ? <FaPause /> : <FaPlay />}
                        <span className="text-sm font-medium">{isPlaying ? "Pause" : "Play"}</span>
                     </button>

                     {/* Mute / Unmute Button */}
                     <button
                        onClick={toggleMute}
                        className="flex items-center gap-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-5 py-2.5 rounded-full transition border border-white/30"
                     >
                        {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
                        <span className="text-sm font-medium">{isMuted ? "Unmute" : "Mute"}</span>
                     </button>
                  </div>
               </div>
            </section>

            {/* FEATURED POSTS */}
            {!searchQuery && selectedCategory === "All" && currentPage === 1 && (
               <section className="px-6 py-16">
                  <div className="max-w-6xl mx-auto">
                     <div className="flex items-center gap-3 mb-8">
                        <FaFire className="text-red-500 text-2xl" />
                        <h2 className="text-2xl font-bold text-gray-800">Featured Stories</h2>
                     </div>

                     <div className="grid md:grid-cols-3 gap-6">
                        {featuredPosts.map((post, index) => (
                           <motion.div
                              key={post.id}
                              initial={{ opacity: 0, y: 30 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.5, delay: index * 0.1 }}
                              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition group"
                           >
                              <div className="relative overflow-hidden">
                                 <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-48 object-cover group-hover:scale-110 transition duration-500"
                                 />
                                 <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                                    Featured
                                 </div>
                              </div>
                              <div className="p-6">
                                 <div className="flex items-center gap-2 text-xs text-green-600 font-medium mb-2">
                                    <FaTag />
                                    {post.category}
                                 </div>
                                 <h3 className="font-bold text-lg text-gray-800 mb-2 line-clamp-2 group-hover:text-green-600 transition">
                                    {post.title}
                                 </h3>
                                 <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                                    {post.excerpt}
                                 </p>
                                 <div className="flex items-center justify-between text-xs text-gray-500">
                                    <div className="flex items-center gap-2">
                                       <img src={post.authorAvatar} alt={post.author} className="w-6 h-6 rounded-full object-cover" />
                                       <span>{post.author}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                       <FaClock />
                                       <span>{post.readTime}</span>
                                    </div>
                                 </div>
                              </div>
                           </motion.div>
                        ))}
                     </div>
                  </div>
               </section>
            )}

            {/* MAIN CONTENT */}
            <section className="px-6 py-8">
               <div className="max-w-6xl mx-auto">
                  <div className="flex flex-col lg:flex-row gap-8">

                     {/* SIDEBAR */}
                     <aside className="lg:w-64 flex-shrink-0">
                        <div className="sticky top-8">
                           <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                              <div className="flex items-center gap-2 mb-4">
                                 <FaFilter className="text-green-600" />
                                 <h3 className="font-bold text-gray-800">Categories</h3>
                              </div>
                              <div className="space-y-2">
                                 {categories.map((cat) => (
                                    <button
                                       key={cat.name}
                                       onClick={() => {
                                          setSelectedCategory(cat.name);
                                          setCurrentPage(1);
                                       }}
                                       className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition ${selectedCategory === cat.name
                                          ? "bg-green-600 text-white"
                                          : "text-gray-600 hover:bg-green-50"
                                          }`}
                                    >
                                       <div className="flex items-center gap-2">
                                          <span className={selectedCategory === cat.name ? "text-white" : "text-green-600"}>
                                             {cat.icon}
                                          </span>
                                          <span>{cat.name}</span>
                                       </div>
                                       <span className={`text-xs ${selectedCategory === cat.name ? "text-green-100" : "text-gray-400"}`}>
                                          {cat.count}
                                       </span>
                                    </button>
                                 ))}
                              </div>
                           </div>

                           <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                                 <FaEye className="text-green-600" /> Most Read
                              </h3>
                              <div className="space-y-4">
                                 {popularPosts.map((post) => (
                                    <Link
                                       key={post.id}
                                       to={`/blog/${post.id}`}
                                       className="flex gap-3 group"
                                    >
                                       <img
                                          src={post.image}
                                          alt={post.title}
                                          className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                                       />
                                       <div>
                                          <h4 className="text-sm font-medium text-gray-800 group-hover:text-green-600 transition line-clamp-2">
                                             {post.title}
                                          </h4>
                                          <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                                             <FaEye />
                                             <span>{post.views.toLocaleString()}</span>
                                          </div>
                                       </div>
                                    </Link>
                                 ))}
                              </div>
                           </div>

                           <div className="bg-green-600 rounded-xl shadow-md p-6 text-white">
                              <h3 className="font-bold mb-2">Stay Updated</h3>
                              <p className="text-green-100 text-sm mb-4">
                                 Get the latest stories and updates delivered to your inbox.
                              </p>
                              <input
                                 type="email"
                                 placeholder="Your email address"
                                 className="w-full px-4 py-2 rounded-lg text-gray-800 text-sm mb-3 focus:outline-none"
                              />
                              <button className="w-full bg-white text-green-700 py-2 rounded-lg text-sm font-bold hover:bg-gray-100 transition">
                                 Subscribe
                              </button>
                           </div>
                        </div>
                     </aside>

                     {/* BLOG GRID */}
                     <div className="flex-1">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
                           <div className="text-gray-600">
                              Showing <span className="font-bold text-gray-800">{filteredPosts.length}</span> articles
                              {selectedCategory !== "All" && (
                                 <span> in <span className="text-green-600 font-medium">{selectedCategory}</span></span>
                              )}
                           </div>
                           <div className="flex items-center gap-2">
                              <span className="text-sm text-gray-500">Sort by:</span>
                              <select
                                 value={sortBy}
                                 onChange={(e) => {
                                    setSortBy(e.target.value);
                                    setCurrentPage(1);
                                 }}
                                 className="px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                              >
                                 <option value="newest">Newest First</option>
                                 <option value="popular">Most Popular</option>
                                 <option value="featured">Featured Only</option>
                              </select>
                           </div>
                        </div>

                        <AnimatePresence mode="wait">
                           {paginatedPosts.length > 0 ? (
                              <motion.div
                                 key={`${selectedCategory}-${sortBy}-${currentPage}`}
                                 initial={{ opacity: 0 }}
                                 animate={{ opacity: 1 }}
                                 exit={{ opacity: 0 }}
                                 transition={{ duration: 0.3 }}
                                 className="grid md:grid-cols-2 gap-6"
                              >
                                 {paginatedPosts.map((post, index) => (
                                    <motion.article
                                       key={post.id}
                                       initial={{ opacity: 0, y: 20 }}
                                       animate={{ opacity: 1, y: 0 }}
                                       transition={{ duration: 0.4, delay: index * 0.05 }}
                                       className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition group"
                                    >
                                       <div className="relative overflow-hidden">
                                          <img
                                             src={post.image}
                                             alt={post.title}
                                             className="w-full h-52 object-cover group-hover:scale-110 transition duration-500"
                                          />
                                          <div className="absolute top-4 left-4">
                                             <span className="bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                                                {post.category}
                                             </span>
                                          </div>
                                          {post.featured && (
                                             <div className="absolute top-4 right-4">
                                                <FaBookmark className="text-red-500 text-xl" />
                                             </div>
                                          )}
                                       </div>

                                       <div className="p-6">
                                          <h2 className="font-bold text-xl text-gray-800 mb-3 group-hover:text-green-600 transition line-clamp-2">
                                             {post.title}
                                          </h2>
                                          <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                                             {post.excerpt}
                                          </p>

                                          <div className="flex flex-wrap gap-2 mb-4">
                                             {post.tags.map((tag, tIndex) => (
                                                <span
                                                   key={tIndex}
                                                   className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                                                >
                                                   #{tag}
                                                </span>
                                             ))}
                                          </div>

                                          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                             <div className="flex items-center gap-2">
                                                <img
                                                   src={post.authorAvatar}
                                                   alt={post.author}
                                                   className="w-8 h-8 rounded-full object-cover"
                                                />
                                                <div>
                                                   <p className="text-xs font-medium text-gray-800">{post.author}</p>
                                                   <div className="flex items-center gap-2 text-xs text-gray-500">
                                                      <FaCalendarAlt />
                                                      <span>{formatDate(post.date)}</span>
                                                   </div>
                                                </div>
                                             </div>
                                             <div className="flex items-center gap-3 text-xs text-gray-500">
                                                <span className="flex items-center gap-1">
                                                   <FaClock /> {post.readTime}
                                                </span>
                                             </div>
                                          </div>

                                          <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                                             <div className="flex items-center gap-4 text-sm text-gray-500">
                                                <span className="flex items-center gap-1">
                                                   <FaEye className="text-green-500" /> {post.views.toLocaleString()}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                   <FaHeart className="text-red-400" /> {post.likes}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                   <FaComment className="text-blue-400" /> {post.comments}
                                                </span>
                                             </div>
                                             <Link
                                                to={`/blog/${post.id}`}
                                                className="text-green-600 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition"
                                             >
                                                Read More <FaArrowRight />
                                             </Link>
                                          </div>
                                       </div>
                                    </motion.article>
                                 ))}
                              </motion.div>
                           ) : (
                              <motion.div
                                 initial={{ opacity: 0 }}
                                 animate={{ opacity: 1 }}
                                 className="text-center py-20"
                              >
                                 <FaSearch className="text-gray-300 text-6xl mx-auto mb-4" />
                                 <h3 className="text-xl font-bold text-gray-600 mb-2">No articles found</h3>
                                 <p className="text-gray-500">Try adjusting your search or category filter.</p>
                                 <button
                                    onClick={() => {
                                       setSearchQuery("");
                                       setSelectedCategory("All");
                                       setCurrentPage(1);
                                    }}
                                    className="mt-4 text-green-600 font-medium hover:underline"
                                 >
                                    Clear all filters
                                 </button>
                              </motion.div>
                           )}
                        </AnimatePresence>

                        {totalPages > 1 && (
                           <div className="flex items-center justify-center gap-2 mt-10">
                              <button
                                 onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                 disabled={currentPage === 1}
                                 className="p-2 rounded-lg border border-gray-200 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50 transition"
                              >
                                 <FaChevronLeft />
                              </button>

                              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                 <button
                                    key={page}
                                    onClick={() => setCurrentPage(page)}
                                    className={`w-10 h-10 rounded-lg text-sm font-medium transition ${currentPage === page
                                       ? "bg-green-600 text-white"
                                       : "border border-gray-200 text-gray-600 hover:bg-gray-50"
                                       }`}
                                 >
                                    {page}
                                 </button>
                              ))}

                              <button
                                 onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                 disabled={currentPage === totalPages}
                                 className="p-2 rounded-lg border border-gray-200 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50 transition"
                              >
                                 <FaChevronRight />
                              </button>
                           </div>
                        )}
                     </div>
                  </div>
               </div>
            </section>

            {/* CTA */}
            <section className="bg-green-700 text-white py-16 px-6">
               <div className="max-w-4xl mx-auto text-center">
                  <h2 className="text-3xl font-bold mb-4">Have a Story to Share?</h2>
                  <p className="text-green-100 mb-8 max-w-2xl mx-auto">
                     Are you a volunteer, beneficiary, or partner? We'd love to feature your experience on our blog.
                  </p>
                  <Link
                     to="/contact"
                     className="bg-white text-green-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition inline-flex items-center gap-2"
                  >
                     Submit Your Story <FaArrowRight />
                  </Link>
               </div>
            </section>
         </div>
      </>
   );
}