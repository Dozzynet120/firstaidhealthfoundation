import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
   FaCalendarAlt,
   FaUserMd,
   FaArrowRight,
   FaComment,
   FaHeart,
   FaEye,
   FaStethoscope,
   FaNewspaper,
   FaTag,
   FaClock
} from "react-icons/fa";

// Local images from src/assets/about/
import blogImg1 from "../assets/about/1.jpg";
import blogImg2 from "../assets/about/2.jpg";
import blogImg3 from "../assets/about/3.jpg";
import blogImg4 from "../assets/about/4.jpg";

export default function BlogPreview() {
   const posts = [
      {
         id: 1,
         title: "Free Medical Outreach in Lagos",
         desc: "We reached over 300 patients during our recent outreach program, providing free consultations, malaria testing, and essential medications to underserved communities in Ikorodu.",
         image: blogImg1,
         category: "Medical Outreach",
         author: "Dr. Chinedu Okonkwo",
         authorRole: "Lead Medical Officer",
         date: "June 15, 2025",
         readTime: "5 min read",
         views: 1240,
         likes: 89,
         comments: 23,
         tags: ["Outreach", "Lagos", "Primary Care"]
      },
      {
         id: 2,
         title: "Surgical Support Success Story",
         desc: "A life-saving hernia repair surgery was funded for 8-year-old Emmanuel, restoring his health and giving him a chance to return to school and play with his friends again.",
         image: blogImg2,
         category: "Surgery",
         author: "Dr. Amina Ibrahim",
         authorRole: "Pediatric Surgeon",
         date: "June 10, 2025",
         readTime: "7 min read",
         views: 2100,
         likes: 156,
         comments: 41,
         tags: ["Surgery", "Pediatrics", "Success Story"]
      },
      {
         id: 3,
         title: "Community Health Awareness",
         desc: "Our team educated over 500 rural residents in Oyo State on preventive healthcare, hygiene practices, and early disease detection to reduce preventable illnesses.",
         image: blogImg3,
         category: "Health Education",
         author: "Nurse Fatima Bello",
         authorRole: "Community Health Coordinator",
         date: "June 5, 2025",
         readTime: "4 min read",
         views: 980,
         likes: 67,
         comments: 18,
         tags: ["Education", "Prevention", "Rural Health"]
      },
      {
         id: 4,
         title: "Maternal Care in Rural Communities",
         desc: "Our antenatal and safe delivery programs have now reached over 2,500 mothers across 15 communities, significantly reducing maternal and infant mortality rates.",
         image: blogImg4,
         category: "Maternal Health",
         author: "Dr. Ngozi Eze",
         authorRole: "Obstetrician & Gynecologist",
         date: "May 28, 2025",
         readTime: "6 min read",
         views: 1850,
         likes: 132,
         comments: 35,
         tags: ["Maternal Health", "Safe Delivery", "Rural Care"]
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
               className="text-center mb-14"
            >
               <div className="flex items-center justify-center gap-3 mb-4">
                  <FaNewspaper className="text-4xl text-green-600" />
               </div>
               <h2 className="text-4xl font-bold text-gray-800 mb-4">
                  Latest from Our Blog
               </h2>
               <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
                  Stories from the frontlines of healthcare in Nigeria. Discover how your support is transforming lives across communities.
               </p>
            </motion.div>

            {/* Blog Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

               {posts.map((post, index) => (
                  <motion.article
                     key={post.id}
                     initial={{ opacity: 0, y: 30 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true }}
                     transition={{ duration: 0.5, delay: index * 0.15 }}
                     className="bg-white rounded-2xl shadow-md hover:shadow-xl transition group overflow-hidden flex flex-col"
                  >
                     {/* Image */}
                     <div className="relative overflow-hidden h-52">
                        <img
                           src={post.image}
                           alt={post.title}
                           className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                           loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>

                        {/* Category Badge */}
                        <div className="absolute top-4 left-4">
                           <span className="bg-green-600 text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1">
                              <FaStethoscope className="text-xs" /> {post.category}
                           </span>
                        </div>

                        {/* Date Badge */}
                        <div className="absolute bottom-4 right-4">
                           <span className="bg-white/90 backdrop-blur text-gray-700 text-xs font-medium px-3 py-1.5 rounded-full flex items-center gap-1">
                              <FaCalendarAlt className="text-green-600" /> {post.date}
                           </span>
                        </div>
                     </div>

                     {/* Content */}
                     <div className="p-6 flex-1 flex flex-col">
                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-3">
                           {post.tags.map((tag, tIndex) => (
                              <span
                                 key={tIndex}
                                 className="text-xs bg-green-50 text-green-600 px-2 py-1 rounded-full font-medium"
                              >
                                 <FaTag className="inline text-[10px] mr-1" />{tag}
                              </span>
                           ))}
                        </div>

                        {/* Title */}
                        <h3 className="font-bold text-xl text-gray-800 mb-3 group-hover:text-green-600 transition line-clamp-2">
                           {post.title}
                        </h3>

                        {/* Description */}
                        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3 flex-1">
                           {post.desc}
                        </p>

                        {/* Author */}
                        <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
                           <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                              <FaUserMd className="text-green-600" />
                           </div>
                           <div>
                              <p className="font-medium text-gray-800 text-sm">{post.author}</p>
                              <p className="text-gray-500 text-xs">{post.authorRole}</p>
                           </div>
                        </div>

                        {/* Meta Footer */}
                        <div className="flex items-center justify-between text-xs text-gray-500">
                           <div className="flex items-center gap-3">
                              <span className="flex items-center gap-1">
                                 <FaClock className="text-green-500" /> {post.readTime}
                              </span>
                              <span className="flex items-center gap-1">
                                 <FaEye className="text-blue-400" /> {post.views.toLocaleString()}
                              </span>
                           </div>
                           <div className="flex items-center gap-3">
                              <span className="flex items-center gap-1">
                                 <FaHeart className="text-red-400" /> {post.likes}
                              </span>
                              <span className="flex items-center gap-1">
                                 <FaComment className="text-purple-400" /> {post.comments}
                              </span>
                           </div>
                        </div>
                     </div>

                     {/* Read More Link */}
                     <div className="px-6 pb-6">
                        <Link
                           to={`/blog/${post.id}`}
                           className="w-full flex items-center justify-center gap-2 text-green-600 font-semibold text-sm py-3 rounded-xl border-2 border-green-100 hover:bg-green-600 hover:text-white hover:border-green-600 transition group/link"
                        >
                           Read Full Story
                           <FaArrowRight className="group-hover/link:translate-x-1 transition-transform" />
                        </Link>
                     </div>
                  </motion.article>
               ))}

            </div>

            {/* View All CTA */}
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.5, delay: 0.3 }}
               className="text-center mt-14"
            >
               <Link
                  to="/blog"
                  className="inline-flex items-center gap-3 bg-green-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-green-700 transition shadow-lg hover:shadow-xl group"
               >
                  <FaNewspaper className="text-xl" />
                  <span>View All Articles</span>
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
               </Link>
               <p className="text-gray-500 text-sm mt-3">
                  Explore 20+ stories from our medical missions and community programs
               </p>
            </motion.div>
         </div>
      </section>
   );
}