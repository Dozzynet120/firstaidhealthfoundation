import { Helmet } from "react-helmet-async";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import {
   FaCalendarAlt,
   FaClock,
   FaTag,
   FaArrowLeft,
   FaBookmark,
   FaComment,
   FaEye,
   FaHeart,
   FaShareAlt,
   FaFacebook,
   FaTwitter,
   FaLinkedin,
   FaWhatsapp,
   FaUser,
   FaChevronRight
} from "react-icons/fa";

// Import the same blog data (in a real app, this would come from an API/context)
// For now, we'll import from a shared data file
import { blogs } from "../data/blogData";

export default function BlogDetail() {
   const { id } = useParams();
   const navigate = useNavigate();
   const [isBookmarked, setIsBookmarked] = useState(false);
   const [liked, setLiked] = useState(false);
   const [likeCount, setLikeCount] = useState(0);
   const [showShareMenu, setShowShareMenu] = useState(false);

   const blog = useMemo(() => {
      return blogs.find(b => b.id === parseInt(id));
   }, [id]);

   // Related posts (same category, excluding current)
   const relatedPosts = useMemo(() => {
      if (!blog) return [];
      return blogs
         .filter(b => b.category === blog.category && b.id !== blog.id)
         .slice(0, 3);
   }, [blog]);

   // Popular posts (excluding current)
   const popularPosts = useMemo(() => {
      if (!blog) return [];
      return [...blogs]
         .filter(b => b.id !== blog.id)
         .sort((a, b) => b.views - a.views)
         .slice(0, 5);
   }, [blog]);

   useEffect(() => {
      if (blog) {
         window.scrollTo(0, 0);
      }
   }, [blog]);

   const handleLike = () => {
      if (liked) {
         setLikeCount(prev => prev - 1);
      } else {
         setLikeCount(prev => prev + 1);
      }
      setLiked(!liked);
   };

   const handleShare = (platform) => {
      const url = window.location.href;
      const text = blog ? blog.title : "";

      const shareUrls = {
         facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
         twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
         linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
         whatsapp: `https://wa.me/?text=${encodeURIComponent(text + " " + url)}`
      };

      if (shareUrls[platform]) {
         window.open(shareUrls[platform], "_blank", "width=600,height=400");
      }
      setShowShareMenu(false);
   };

   const formatDate = (dateStr) => {
      return new Date(dateStr).toLocaleDateString("en-US", {
         year: "numeric",
         month: "long",
         day: "numeric"
      });
   };

   if (!blog) {
      return (
         <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-center">
               <h2 className="text-2xl font-bold text-gray-800 mb-4">Blog Post Not Found</h2>
               <p className="text-gray-600 mb-6">The article you're looking for doesn't exist or has been removed.</p>
               <Link
                  to="/blog"
                  className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition inline-flex items-center gap-2"
               >
                  <FaArrowLeft /> Back to Blog
               </Link>
            </div>
         </div>
      );
   }

   return (
      <>
         <Helmet>
            <title>{blog.title} | RightAid Health Foundation</title>
            <meta name="description" content={blog.excerpt} />
         </Helmet>

         <div className="min-h-screen bg-gray-50">
            {/* Navigation Breadcrumb */}
            <div className="bg-white border-b border-gray-200">
               <div className="max-w-6xl mx-auto px-6 py-4">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                     <Link to="/" className="hover:text-green-600 transition">Home</Link>
                     <FaChevronRight className="text-xs" />
                     <Link to="/blog" className="hover:text-green-600 transition">Blog</Link>
                     <FaChevronRight className="text-xs" />
                     <span className="text-gray-800 font-medium truncate max-w-xs">{blog.title}</span>
                  </div>
               </div>
            </div>

            {/* Hero Image */}
            <div className="relative h-[400px] md:h-[500px] overflow-hidden">
               <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

               <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
                  <div className="max-w-4xl mx-auto">
                     <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                     >
                        <span className="bg-green-600 text-white text-sm font-bold px-4 py-1.5 rounded-full mb-4 inline-block">
                           {blog.category}
                        </span>
                        <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
                           {blog.title}
                        </h1>
                        <div className="flex flex-wrap items-center gap-6 text-white/90">
                           <div className="flex items-center gap-2">
                              <img
                                 src={blog.authorAvatar}
                                 alt={blog.author}
                                 className="w-10 h-10 rounded-full object-cover border-2 border-white"
                              />
                              <div>
                                 <p className="font-medium text-sm">{blog.author}</p>
                                 <p className="text-xs text-white/70">Author</p>
                              </div>
                           </div>
                           <div className="flex items-center gap-2">
                              <FaCalendarAlt />
                              <span>{formatDate(blog.date)}</span>
                           </div>
                           <div className="flex items-center gap-2">
                              <FaClock />
                              <span>{blog.readTime}</span>
                           </div>
                        </div>
                     </motion.div>
                  </div>
               </div>
            </div>

            {/* Main Content */}
            <div className="max-w-6xl mx-auto px-6 py-12">
               <div className="flex flex-col lg:flex-row gap-8">

                  {/* Article Content */}
                  <motion.article
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ duration: 0.5, delay: 0.2 }}
                     className="lg:w-2/3"
                  >
                     {/* Engagement Bar */}
                     <div className="bg-white rounded-xl shadow-sm p-4 mb-6 flex items-center justify-between">
                        <div className="flex items-center gap-6">
                           <button
                              onClick={handleLike}
                              className={`flex items-center gap-2 transition ${liked ? "text-red-500" : "text-gray-500 hover:text-red-500"}`}
                           >
                              <FaHeart className={liked ? "fill-current" : ""} />
                              <span className="font-medium">{likeCount}</span>
                           </button>
                           <span className="flex items-center gap-2 text-gray-500">
                              <FaEye className="text-green-500" />
                              <span className="font-medium">{blog.views.toLocaleString()}</span>
                           </span>
                           <span className="flex items-center gap-2 text-gray-500">
                              <FaComment className="text-blue-400" />
                              <span className="font-medium">{blog.comments}</span>
                           </span>
                        </div>
                        <div className="flex items-center gap-3">
                           <button
                              onClick={() => setIsBookmarked(!isBookmarked)}
                              className={`p-2 rounded-full transition ${isBookmarked ? "bg-green-100 text-green-600" : "text-gray-400 hover:text-green-600"}`}
                           >
                              <FaBookmark />
                           </button>
                           <div className="relative">
                              <button
                                 onClick={() => setShowShareMenu(!showShareMenu)}
                                 className="p-2 rounded-full text-gray-400 hover:text-green-600 transition"
                              >
                                 <FaShareAlt />
                              </button>

                              {/* Share Menu Dropdown */}
                              {showShareMenu && (
                                 <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="absolute right-0 top-full mt-2 bg-white rounded-xl shadow-xl p-3 z-20 min-w-[180px] border border-gray-100"
                                 >
                                    <p className="text-xs font-bold text-gray-500 uppercase mb-2 px-2">Share via</p>
                                    <button onClick={() => handleShare("facebook")} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 text-gray-700 transition">
                                       <FaFacebook className="text-blue-600" /> Facebook
                                    </button>
                                    <button onClick={() => handleShare("twitter")} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 text-gray-700 transition">
                                       <FaTwitter className="text-sky-500" /> Twitter
                                    </button>
                                    <button onClick={() => handleShare("linkedin")} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 text-gray-700 transition">
                                       <FaLinkedin className="text-blue-700" /> LinkedIn
                                    </button>
                                    <button onClick={() => handleShare("whatsapp")} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 text-gray-700 transition">
                                       <FaWhatsapp className="text-green-500" /> WhatsApp
                                    </button>
                                 </motion.div>
                              )}
                           </div>
                        </div>
                     </div>

                     {/* Blog Body */}
                     <div className="bg-white rounded-xl shadow-sm p-8 md:p-12">
                        {/* Excerpt */}
                        <p className="text-xl text-gray-600 italic border-l-4 border-green-500 pl-6 mb-8 leading-relaxed">
                           {blog.excerpt}
                        </p>

                        {/* Full Content */}
                        <div className="prose prose-lg max-w-none">
                           <div className="text-gray-700 leading-relaxed space-y-6">
                              {blog.content.split("\n\n").map((paragraph, index) => (
                                 <p key={index} className="text-base md:text-lg leading-8">
                                    {paragraph}
                                 </p>
                              ))}
                           </div>
                        </div>

                        {/* Tags */}
                        <div className="mt-10 pt-8 border-t border-gray-100">
                           <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                              <FaTag className="text-green-600" /> Tags
                           </h3>
                           <div className="flex flex-wrap gap-2">
                              {blog.tags.map((tag, index) => (
                                 <Link
                                    key={index}
                                    to={`/blog?tag=${encodeURIComponent(tag)}`}
                                    className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm hover:bg-green-100 hover:text-green-700 transition"
                                 >
                                    #{tag}
                                 </Link>
                              ))}
                           </div>
                        </div>

                        {/* Author Bio */}
                        <div className="mt-10 bg-gray-50 rounded-xl p-6 flex items-start gap-4">
                           <img
                              src={blog.authorAvatar}
                              alt={blog.author}
                              className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md"
                           />
                           <div>
                              <h4 className="font-bold text-gray-800">{blog.author}</h4>
                              <p className="text-sm text-green-600 font-medium mb-2">Contributor at RightAid Health Foundation</p>
                              <p className="text-gray-600 text-sm leading-relaxed">
                                 Dedicated healthcare professional working to improve medical access in underserved communities across Nigeria.
                              </p>
                           </div>
                        </div>
                     </div>

                     {/* Comments Section */}
                     <div className="bg-white rounded-xl shadow-sm p-8 mt-6">
                        <h3 className="font-bold text-xl text-gray-800 mb-6 flex items-center gap-2">
                           <FaComment className="text-green-600" /> Comments ({blog.comments})
                        </h3>

                        {/* Comment Form */}
                        <div className="mb-8">
                           <textarea
                              placeholder="Share your thoughts on this article..."
                              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none h-32"
                           ></textarea>
                           <div className="flex justify-end mt-3">
                              <button className="bg-green-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-green-700 transition">
                                 Post Comment
                              </button>
                           </div>
                        </div>

                        {/* Sample Comments */}
                        <div className="space-y-6">
                           <div className="flex gap-4">
                              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                                 <FaUser className="text-green-600" />
                              </div>
                              <div className="flex-1">
                                 <div className="flex items-center gap-2 mb-1">
                                    <span className="font-bold text-gray-800">Sarah Johnson</span>
                                    <span className="text-xs text-gray-500">2 days ago</span>
                                 </div>
                                 <p className="text-gray-600 text-sm leading-relaxed">
                                    This is such an inspiring initiative. The work being done in rural communities is truly life-changing.
                                 </p>
                              </div>
                           </div>
                           <div className="flex gap-4">
                              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                                 <FaUser className="text-blue-600" />
                              </div>
                              <div className="flex-1">
                                 <div className="flex items-center gap-2 mb-1">
                                    <span className="font-bold text-gray-800">Michael Adeyemi</span>
                                    <span className="text-xs text-gray-500">5 days ago</span>
                                 </div>
                                 <p className="text-gray-600 text-sm leading-relaxed">
                                    As someone from Kano State, I can attest to how much this campaign helped my community. Thank you RightAid!
                                 </p>
                              </div>
                           </div>
                        </div>
                     </div>
                  </motion.article>

                  {/* Sidebar */}
                  <aside className="lg:w-1/3 space-y-6">
                     {/* Back to Blog */}
                     <div className="bg-white rounded-xl shadow-sm p-6">
                        <button
                           onClick={() => navigate(-1)}
                           className="flex items-center gap-2 text-green-600 font-medium hover:text-green-700 transition"
                        >
                           <FaArrowLeft /> Back to All Articles
                        </button>
                     </div>

                     {/* Author Card */}
                     <div className="bg-white rounded-xl shadow-sm p-6 text-center">
                        <img
                           src={blog.authorAvatar}
                           alt={blog.author}
                           className="w-20 h-20 rounded-full object-cover mx-auto mb-4 border-4 border-green-50"
                        />
                        <h3 className="font-bold text-gray-800">{blog.author}</h3>
                        <p className="text-sm text-green-600 mb-3">Medical Contributor</p>
                        <p className="text-gray-600 text-sm mb-4">
                           Writing about healthcare innovations and medical outreach programs across Nigeria.
                        </p>
                        <button className="w-full bg-green-50 text-green-700 py-2 rounded-lg text-sm font-medium hover:bg-green-100 transition">
                           View All Posts
                        </button>
                     </div>

                     {/* Related Posts */}
                     {relatedPosts.length > 0 && (
                        <div className="bg-white rounded-xl shadow-sm p-6">
                           <h3 className="font-bold text-gray-800 mb-4">Related Articles</h3>
                           <div className="space-y-4">
                              {relatedPosts.map((post) => (
                                 <Link
                                    key={post.id}
                                    to={`/blog/${post.id}`}
                                    className="flex gap-3 group"
                                 >
                                    <img
                                       src={post.image}
                                       alt={post.title}
                                       className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                                    />
                                    <div>
                                       <span className="text-xs text-green-600 font-medium">{post.category}</span>
                                       <h4 className="text-sm font-medium text-gray-800 group-hover:text-green-600 transition line-clamp-2">
                                          {post.title}
                                       </h4>
                                       <span className="text-xs text-gray-500">{post.readTime}</span>
                                    </div>
                                 </Link>
                              ))}
                           </div>
                        </div>
                     )}

                     {/* Popular Posts */}
                     <div className="bg-white rounded-xl shadow-sm p-6">
                        <h3 className="font-bold text-gray-800 mb-4">Most Popular</h3>
                        <div className="space-y-4">
                           {popularPosts.map((post, index) => (
                              <Link
                                 key={post.id}
                                 to={`/blog/${post.id}`}
                                 className="flex gap-3 group"
                              >
                                 <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-sm font-bold flex-shrink-0">
                                    {index + 1}
                                 </div>
                                 <div>
                                    <h4 className="text-sm font-medium text-gray-800 group-hover:text-green-600 transition line-clamp-2">
                                       {post.title}
                                    </h4>
                                    <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                                       <FaEye />
                                       <span>{post.views.toLocaleString()} views</span>
                                    </div>
                                 </div>
                              </Link>
                           ))}
                        </div>
                     </div>

                     {/* Newsletter */}
                     <div className="bg-green-600 rounded-xl shadow-sm p-6 text-white">
                        <h3 className="font-bold mb-2">Stay Updated</h3>
                        <p className="text-green-100 text-sm mb-4">
                           Get the latest stories delivered to your inbox.
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
                  </aside>
               </div>
            </div>
         </div>
      </>
   );
}