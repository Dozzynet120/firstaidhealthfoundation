import { Helmet } from "react-helmet-async";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
   FaPlus,
   FaEdit,
   FaTrash,
   FaSearch,
   FaEye,
   FaHeart,
   FaComment,
   FaTag,
   FaCheck,
   FaTimes,
   FaArrowLeft,
   FaSave,
   FaImage,
   FaStar,
   FaChartBar,
   FaNewspaper,
   FaSignOutAlt,
   FaBars,
   FaTimes as FaTimesIcon,
   FaChevronLeft,
   FaChevronRight,
   FaFilter
} from "react-icons/fa";

// Import blog data
import { blogs as initialBlogs } from "../data/blogData";

// ============================================
// ADMIN DASHBOARD COMPONENT
// ============================================
export default function AdminDashboard() {
   // State Management
   const [blogs, setBlogs] = useState(initialBlogs);
   const [view, setView] = useState("dashboard"); // dashboard, list, create, edit
   const [searchQuery, setSearchQuery] = useState("");
   const [selectedCategory, setSelectedCategory] = useState("All");
   const [currentPage, setCurrentPage] = useState(1);
   const [sidebarOpen, setSidebarOpen] = useState(true);
   const [showDeleteModal, setShowDeleteModal] = useState(false);
   const [blogToDelete, setBlogToDelete] = useState(null);
   const [notification, setNotification] = useState(null);

   const POSTS_PER_PAGE = 10;

   // Form state for create/edit
   const [formData, setFormData] = useState({
      id: null,
      title: "",
      excerpt: "",
      content: "",
      category: "Medical Outreach",
      author: "",
      date: new Date().toISOString().split("T")[0],
      readTime: "5 min read",
      views: 0,
      likes: 0,
      comments: 0,
      featured: false,
      tags: "",
      image: null
   });

   // Categories list
   const categoryOptions = [
      "Medical Outreach",
      "Surgery",
      "Maternal Health",
      "Immunization",
      "Mental Health",
      "Emergency Response",
      "Health Education",
      "Volunteer Stories",
      "Partnerships",
      "Dental Care",
      "Nutrition",
      "Innovation",
      "Awareness",
      "Reports"
   ];

   // Filtered blogs
   const filteredBlogs = useMemo(() => {
      let result = [...blogs];

      if (searchQuery) {
         const query = searchQuery.toLowerCase();
         result = result.filter(b =>
            b.title.toLowerCase().includes(query) ||
            b.author.toLowerCase().includes(query) ||
            b.category.toLowerCase().includes(query)
         );
      }

      if (selectedCategory !== "All") {
         result = result.filter(b => b.category === selectedCategory);
      }

      result.sort((a, b) => new Date(b.date) - new Date(a.date));
      return result;
   }, [blogs, searchQuery, selectedCategory]);

   const totalPages = Math.ceil(filteredBlogs.length / POSTS_PER_PAGE);
   const paginatedBlogs = filteredBlogs.slice(
      (currentPage - 1) * POSTS_PER_PAGE,
      currentPage * POSTS_PER_PAGE
   );

   // Stats
   const stats = useMemo(() => ({
      totalPosts: blogs.length,
      totalViews: blogs.reduce((sum, b) => sum + b.views, 0),
      totalLikes: blogs.reduce((sum, b) => sum + b.likes, 0),
      totalComments: blogs.reduce((sum, b) => sum + b.comments, 0),
      featuredPosts: blogs.filter(b => b.featured).length,
      categories: [...new Set(blogs.map(b => b.category))].length
   }), [blogs]);

   // Show notification
   const showNotification = (message, type = "success") => {
      setNotification({ message, type });
      setTimeout(() => setNotification(null), 3000);
   };

   // Handle create new blog
   const handleCreate = () => {
      setFormData({
         id: null,
         title: "",
         excerpt: "",
         content: "",
         category: "Medical Outreach",
         author: "",
         date: new Date().toISOString().split("T")[0],
         readTime: "5 min read",
         views: 0,
         likes: 0,
         comments: 0,
         featured: false,
         tags: "",
         image: null
      });
      setView("create");
   };

   // Handle edit blog
   const handleEdit = (blog) => {
      setFormData({
         ...blog,
         tags: blog.tags.join(", ")
      });
      setView("edit");
   };

   // Handle delete confirmation
   const confirmDelete = (blog) => {
      setBlogToDelete(blog);
      setShowDeleteModal(true);
   };

   // Handle actual delete
   const handleDelete = () => {
      if (blogToDelete) {
         setBlogs(prev => prev.filter(b => b.id !== blogToDelete.id));
         setShowDeleteModal(false);
         setBlogToDelete(null);
         showNotification("Blog post deleted successfully!");
      }
   };

   // Handle form submit (create or update)
   const handleSubmit = (e) => {
      e.preventDefault();

      const newBlog = {
         ...formData,
         tags: formData.tags.split(",").map(tag => tag.trim()).filter(tag => tag),
         id: formData.id || Date.now(),
         authorAvatar: formData.image || "https://via.placeholder.com/100",
         image: formData.image || "https://via.placeholder.com/800x400"
      };

      if (view === "create") {
         setBlogs(prev => [newBlog, ...prev]);
         showNotification("Blog post created successfully!");
      } else {
         setBlogs(prev => prev.map(b => b.id === newBlog.id ? newBlog : b));
         showNotification("Blog post updated successfully!");
      }

      setView("list");
      setCurrentPage(1);
   };

   // Handle input change
   const handleChange = (e) => {
      const { name, value, type, checked } = e.target;
      setFormData(prev => ({
         ...prev,
         [name]: type === "checkbox" ? checked : value
      }));
   };

   // Handle image upload simulation
   const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (file) {
         const reader = new FileReader();
         reader.onloadend = () => {
            setFormData(prev => ({ ...prev, image: reader.result }));
         };
         reader.readAsDataURL(file);
      }
   };

   const formatDate = (dateStr) => {
      return new Date(dateStr).toLocaleDateString("en-US", {
         year: "numeric",
         month: "short",
         day: "numeric"
      });
   };

   return (
      <>
         <Helmet>
            <title>Admin Dashboard | RightAid Health Foundation</title>
         </Helmet>

         <div className="min-h-screen bg-gray-100 flex">

            {/* Sidebar */}
            <aside className={`${sidebarOpen ? "w-64" : "w-20"} bg-green-800 text-white transition-all duration-300 flex-shrink-0 fixed h-full z-20`}>
               <div className="p-6 flex items-center justify-between">
                  {sidebarOpen && (
                     <div>
                        <h1 className="text-xl font-bold">RightAid</h1>
                        <p className="text-green-200 text-xs">Admin Panel</p>
                     </div>
                  )}
                  <button
                     onClick={() => setSidebarOpen(!sidebarOpen)}
                     className="p-2 hover:bg-green-700 rounded-lg transition"
                  >
                     {sidebarOpen ? <FaTimesIcon /> : <FaBars />}
                  </button>
               </div>

               <nav className="mt-6 px-3 space-y-2">
                  <button
                     onClick={() => setView("dashboard")}
                     className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${view === "dashboard" ? "bg-green-600" : "hover:bg-green-700"}`}
                  >
                     <FaChartBar />
                     {sidebarOpen && <span>Dashboard</span>}
                  </button>
                  <button
                     onClick={() => setView("list")}
                     className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${view === "list" || view === "create" || view === "edit" ? "bg-green-600" : "hover:bg-green-700"}`}
                  >
                     <FaNewspaper />
                     {sidebarOpen && <span>Blog Posts</span>}
                  </button>
                  <button
                     onClick={handleCreate}
                     className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-green-700 transition"
                  >
                     <FaPlus />
                     {sidebarOpen && <span>New Post</span>}
                  </button>
               </nav>

               <div className="absolute bottom-0 left-0 right-0 p-4">
                  <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-green-700 transition text-green-200">
                     <FaSignOutAlt />
                     {sidebarOpen && <span>Logout</span>}
                  </button>
               </div>
            </aside>

            {/* Main Content */}
            <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? "ml-64" : "ml-20"}`}>

               {/* Top Header */}
               <header className="bg-white shadow-sm px-8 py-4 flex items-center justify-between sticky top-0 z-10">
                  <h2 className="text-2xl font-bold text-gray-800">
                     {view === "dashboard" && "Dashboard Overview"}
                     {view === "list" && "All Blog Posts"}
                     {view === "create" && "Create New Post"}
                     {view === "edit" && "Edit Post"}
                  </h2>
                  <div className="flex items-center gap-4">
                     <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold">
                        AD
                     </div>
                     <div>
                        <p className="text-sm font-medium text-gray-800">Admin User</p>
                        <p className="text-xs text-gray-500">Super Admin</p>
                     </div>
                  </div>
               </header>

               {/* Notification */}
               <AnimatePresence>
                  {notification && (
                     <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className={`fixed top-20 right-8 px-6 py-3 rounded-lg shadow-lg z-50 flex items-center gap-2 ${notification.type === "success" ? "bg-green-600 text-white" : "bg-red-500 text-white"
                           }`}
                     >
                        <FaCheck />
                        {notification.message}
                     </motion.div>
                  )}
               </AnimatePresence>

               <div className="p-8">

                  {/* DASHBOARD VIEW */}
                  {view === "dashboard" && (
                     <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                     >
                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                           <div className="bg-white rounded-xl shadow-sm p-6 flex items-center gap-4">
                              <div className="w-14 h-14 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center text-2xl">
                                 <FaNewspaper />
                              </div>
                              <div>
                                 <p className="text-gray-500 text-sm">Total Posts</p>
                                 <p className="text-3xl font-bold text-gray-800">{stats.totalPosts}</p>
                              </div>
                           </div>
                           <div className="bg-white rounded-xl shadow-sm p-6 flex items-center gap-4">
                              <div className="w-14 h-14 rounded-xl bg-green-100 text-green-600 flex items-center justify-center text-2xl">
                                 <FaEye />
                              </div>
                              <div>
                                 <p className="text-gray-500 text-sm">Total Views</p>
                                 <p className="text-3xl font-bold text-gray-800">{stats.totalViews.toLocaleString()}</p>
                              </div>
                           </div>
                           <div className="bg-white rounded-xl shadow-sm p-6 flex items-center gap-4">
                              <div className="w-14 h-14 rounded-xl bg-red-100 text-red-600 flex items-center justify-center text-2xl">
                                 <FaHeart />
                              </div>
                              <div>
                                 <p className="text-gray-500 text-sm">Total Likes</p>
                                 <p className="text-3xl font-bold text-gray-800">{stats.totalLikes.toLocaleString()}</p>
                              </div>
                           </div>
                           <div className="bg-white rounded-xl shadow-sm p-6 flex items-center gap-4">
                              <div className="w-14 h-14 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center text-2xl">
                                 <FaComment />
                              </div>
                              <div>
                                 <p className="text-gray-500 text-sm">Total Comments</p>
                                 <p className="text-3xl font-bold text-gray-800">{stats.totalComments.toLocaleString()}</p>
                              </div>
                           </div>
                           <div className="bg-white rounded-xl shadow-sm p-6 flex items-center gap-4">
                              <div className="w-14 h-14 rounded-xl bg-yellow-100 text-yellow-600 flex items-center justify-center text-2xl">
                                 <FaStar />
                              </div>
                              <div>
                                 <p className="text-gray-500 text-sm">Featured Posts</p>
                                 <p className="text-3xl font-bold text-gray-800">{stats.featuredPosts}</p>
                              </div>
                           </div>
                           <div className="bg-white rounded-xl shadow-sm p-6 flex items-center gap-4">
                              <div className="w-14 h-14 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center text-2xl">
                                 <FaTag />
                              </div>
                              <div>
                                 <p className="text-gray-500 text-sm">Categories</p>
                                 <p className="text-3xl font-bold text-gray-800">{stats.categories}</p>
                              </div>
                           </div>
                        </div>

                        {/* Recent Posts */}
                        <div className="bg-white rounded-xl shadow-sm p-6">
                           <div className="flex items-center justify-between mb-6">
                              <h3 className="text-lg font-bold text-gray-800">Recent Posts</h3>
                              <button
                                 onClick={() => setView("list")}
                                 className="text-green-600 text-sm font-medium hover:underline"
                              >
                                 View All
                              </button>
                           </div>
                           <div className="overflow-x-auto">
                              <table className="w-full">
                                 <thead>
                                    <tr className="text-left text-gray-500 text-sm border-b border-gray-100">
                                       <th className="pb-3 font-medium">Post</th>
                                       <th className="pb-3 font-medium">Author</th>
                                       <th className="pb-3 font-medium">Category</th>
                                       <th className="pb-3 font-medium">Views</th>
                                       <th className="pb-3 font-medium">Date</th>
                                       <th className="pb-3 font-medium">Actions</th>
                                    </tr>
                                 </thead>
                                 <tbody>
                                    {blogs.slice(0, 5).map(blog => (
                                       <tr key={blog.id} className="border-b border-gray-50 hover:bg-gray-50 transition">
                                          <td className="py-4">
                                             <div className="flex items-center gap-3">
                                                <img src={blog.image} alt="" className="w-10 h-10 rounded-lg object-cover" />
                                                <span className="font-medium text-gray-800 text-sm line-clamp-1 max-w-xs">{blog.title}</span>
                                             </div>
                                          </td>
                                          <td className="py-4 text-sm text-gray-600">{blog.author}</td>
                                          <td className="py-4">
                                             <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">{blog.category}</span>
                                          </td>
                                          <td className="py-4 text-sm text-gray-600">{blog.views.toLocaleString()}</td>
                                          <td className="py-4 text-sm text-gray-500">{formatDate(blog.date)}</td>
                                          <td className="py-4">
                                             <div className="flex items-center gap-2">
                                                <button
                                                   onClick={() => handleEdit(blog)}
                                                   className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                                                >
                                                   <FaEdit />
                                                </button>
                                                <button
                                                   onClick={() => confirmDelete(blog)}
                                                   className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                                                >
                                                   <FaTrash />
                                                </button>
                                             </div>
                                          </td>
                                       </tr>
                                    ))}
                                 </tbody>
                              </table>
                           </div>
                        </div>
                     </motion.div>
                  )}

                  {/* LIST VIEW */}
                  {view === "list" && (
                     <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                     >
                        {/* Filters */}
                        <div className="bg-white rounded-xl shadow-sm p-4 mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
                           <div className="relative flex-1 max-w-md">
                              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                              <input
                                 type="text"
                                 placeholder="Search posts..."
                                 value={searchQuery}
                                 onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                                 className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                              />
                           </div>
                           <div className="flex items-center gap-3">
                              <div className="relative">
                                 <FaFilter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                 <select
                                    value={selectedCategory}
                                    onChange={(e) => { setSelectedCategory(e.target.value); setCurrentPage(1); }}
                                    className="pl-10 pr-8 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 appearance-none bg-white"
                                 >
                                    <option value="All">All Categories</option>
                                    {categoryOptions.map(cat => (
                                       <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                 </select>
                              </div>
                              <button
                                 onClick={handleCreate}
                                 className="bg-green-600 text-white px-4 py-2.5 rounded-lg font-medium hover:bg-green-700 transition flex items-center gap-2"
                              >
                                 <FaPlus /> New Post
                              </button>
                           </div>
                        </div>

                        {/* Posts Table */}
                        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                           <div className="overflow-x-auto">
                              <table className="w-full">
                                 <thead>
                                    <tr className="bg-gray-50 text-left text-gray-600 text-sm">
                                       <th className="px-6 py-4 font-semibold">Post</th>
                                       <th className="px-6 py-4 font-semibold">Author</th>
                                       <th className="px-6 py-4 font-semibold">Category</th>
                                       <th className="px-6 py-4 font-semibold">Engagement</th>
                                       <th className="px-6 py-4 font-semibold">Date</th>
                                       <th className="px-6 py-4 font-semibold">Status</th>
                                       <th className="px-6 py-4 font-semibold">Actions</th>
                                    </tr>
                                 </thead>
                                 <tbody>
                                    {paginatedBlogs.map(blog => (
                                       <tr key={blog.id} className="border-t border-gray-100 hover:bg-gray-50 transition">
                                          <td className="px-6 py-4">
                                             <div className="flex items-center gap-3">
                                                <img src={blog.image} alt="" className="w-12 h-12 rounded-lg object-cover" />
                                                <div>
                                                   <p className="font-medium text-gray-800 text-sm line-clamp-1 max-w-xs">{blog.title}</p>
                                                   <p className="text-xs text-gray-500">{blog.readTime}</p>
                                                </div>
                                             </div>
                                          </td>
                                          <td className="px-6 py-4 text-sm text-gray-600">{blog.author}</td>
                                          <td className="px-6 py-4">
                                             <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full font-medium">{blog.category}</span>
                                          </td>
                                          <td className="px-6 py-4">
                                             <div className="flex items-center gap-3 text-sm text-gray-500">
                                                <span className="flex items-center gap-1"><FaEye className="text-green-500" /> {blog.views}</span>
                                                <span className="flex items-center gap-1"><FaHeart className="text-red-400" /> {blog.likes}</span>
                                                <span className="flex items-center gap-1"><FaComment className="text-blue-400" /> {blog.comments}</span>
                                             </div>
                                          </td>
                                          <td className="px-6 py-4 text-sm text-gray-500">{formatDate(blog.date)}</td>
                                          <td className="px-6 py-4">
                                             {blog.featured ? (
                                                <span className="bg-yellow-100 text-yellow-700 text-xs px-3 py-1 rounded-full font-medium flex items-center gap-1 w-fit">
                                                   <FaStar /> Featured
                                                </span>
                                             ) : (
                                                <span className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full font-medium">Standard</span>
                                             )}
                                          </td>
                                          <td className="px-6 py-4">
                                             <div className="flex items-center gap-2">
                                                <button
                                                   onClick={() => handleEdit(blog)}
                                                   className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                                                   title="Edit"
                                                >
                                                   <FaEdit />
                                                </button>
                                                <button
                                                   onClick={() => confirmDelete(blog)}
                                                   className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                                                   title="Delete"
                                                >
                                                   <FaTrash />
                                                </button>
                                             </div>
                                          </td>
                                       </tr>
                                    ))}
                                 </tbody>
                              </table>
                           </div>

                           {paginatedBlogs.length === 0 && (
                              <div className="text-center py-12">
                                 <FaSearch className="text-gray-300 text-5xl mx-auto mb-4" />
                                 <p className="text-gray-500">No posts found matching your criteria.</p>
                              </div>
                           )}

                           {/* Pagination */}
                           {totalPages > 1 && (
                              <div className="flex items-center justify-center gap-2 p-6 border-t border-gray-100">
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
                     </motion.div>
                  )}

                  {/* CREATE / EDIT FORM */}
                  {(view === "create" || view === "edit") && (
                     <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                     >
                        <button
                           onClick={() => setView("list")}
                           className="flex items-center gap-2 text-gray-600 hover:text-green-600 transition mb-6"
                        >
                           <FaArrowLeft /> Back to Posts
                        </button>

                        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-8 max-w-4xl">
                           <div className="grid md:grid-cols-2 gap-6">

                              {/* Title */}
                              <div className="md:col-span-2">
                                 <label className="block text-sm font-medium text-gray-700 mb-2">Post Title *</label>
                                 <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter post title..."
                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                                 />
                              </div>

                              {/* Excerpt */}
                              <div className="md:col-span-2">
                                 <label className="block text-sm font-medium text-gray-700 mb-2">Excerpt *</label>
                                 <textarea
                                    name="excerpt"
                                    value={formData.excerpt}
                                    onChange={handleChange}
                                    required
                                    rows="2"
                                    placeholder="Brief summary of the post..."
                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                                 ></textarea>
                              </div>

                              {/* Content */}
                              <div className="md:col-span-2">
                                 <label className="block text-sm font-medium text-gray-700 mb-2">Content *</label>
                                 <textarea
                                    name="content"
                                    value={formData.content}
                                    onChange={handleChange}
                                    required
                                    rows="12"
                                    placeholder="Write your full blog content here..."
                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 resize-y font-mono text-sm"
                                 ></textarea>
                                 <p className="text-xs text-gray-500 mt-1">Use new lines to separate paragraphs.</p>
                              </div>

                              {/* Category */}
                              <div>
                                 <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                                 <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
                                 >
                                    {categoryOptions.map(cat => (
                                       <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                 </select>
                              </div>

                              {/* Author */}
                              <div>
                                 <label className="block text-sm font-medium text-gray-700 mb-2">Author *</label>
                                 <input
                                    type="text"
                                    name="author"
                                    value={formData.author}
                                    onChange={handleChange}
                                    required
                                    placeholder="Author name..."
                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                                 />
                              </div>

                              {/* Date */}
                              <div>
                                 <label className="block text-sm font-medium text-gray-700 mb-2">Publish Date *</label>
                                 <input
                                    type="date"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                                 />
                              </div>

                              {/* Read Time */}
                              <div>
                                 <label className="block text-sm font-medium text-gray-700 mb-2">Read Time</label>
                                 <input
                                    type="text"
                                    name="readTime"
                                    value={formData.readTime}
                                    onChange={handleChange}
                                    placeholder="e.g., 5 min read"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                                 />
                              </div>

                              {/* Tags */}
                              <div className="md:col-span-2">
                                 <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
                                 <input
                                    type="text"
                                    name="tags"
                                    value={formData.tags}
                                    onChange={handleChange}
                                    placeholder="Enter tags separated by commas..."
                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                                 />
                              </div>

                              {/* Featured Toggle */}
                              <div className="md:col-span-2">
                                 <label className="flex items-center gap-3 cursor-pointer">
                                    <input
                                       type="checkbox"
                                       name="featured"
                                       checked={formData.featured}
                                       onChange={handleChange}
                                       className="w-5 h-5 text-green-600 rounded focus:ring-green-500"
                                    />
                                    <span className="text-sm font-medium text-gray-700">Mark as Featured Post</span>
                                    <FaStar className={`${formData.featured ? "text-yellow-500" : "text-gray-300"}`} />
                                 </label>
                              </div>

                              {/* Image Upload */}
                              <div className="md:col-span-2">
                                 <label className="block text-sm font-medium text-gray-700 mb-2">Featured Image</label>
                                 <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-500 transition">
                                    {formData.image ? (
                                       <div className="relative inline-block">
                                          <img src={formData.image} alt="Preview" className="max-h-48 rounded-lg" />
                                          <button
                                             type="button"
                                             onClick={() => setFormData(prev => ({ ...prev, image: null }))}
                                             className="absolute -top-2 -right-2 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs hover:bg-red-600"
                                          >
                                             <FaTimes />
                                          </button>
                                       </div>
                                    ) : (
                                       <label className="cursor-pointer">
                                          <FaImage className="text-4xl text-gray-300 mx-auto mb-2" />
                                          <p className="text-sm text-gray-500">Click to upload image</p>
                                          <input
                                             type="file"
                                             accept="image/*"
                                             onChange={handleImageChange}
                                             className="hidden"
                                          />
                                       </label>
                                    )}
                                 </div>
                              </div>
                           </div>

                           {/* Submit Buttons */}
                           <div className="flex items-center justify-end gap-4 mt-8 pt-6 border-t border-gray-100">
                              <button
                                 type="button"
                                 onClick={() => setView("list")}
                                 className="px-6 py-2.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition"
                              >
                                 Cancel
                              </button>
                              <button
                                 type="submit"
                                 className="px-6 py-2.5 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 transition flex items-center gap-2"
                              >
                                 <FaSave /> {view === "create" ? "Publish Post" : "Update Post"}
                              </button>
                           </div>
                        </form>
                     </motion.div>
                  )}
               </div>
            </main>
         </div>

         {/* Delete Confirmation Modal */}
         <AnimatePresence>
            {showDeleteModal && (
               <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
               >
                  <motion.div
                     initial={{ scale: 0.9, opacity: 0 }}
                     animate={{ scale: 1, opacity: 1 }}
                     exit={{ scale: 0.9, opacity: 0 }}
                     className="bg-white rounded-xl p-6 max-w-md w-full"
                  >
                     <div className="w-14 h-14 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-2xl mx-auto mb-4">
                        <FaTrash />
                     </div>
                     <h3 className="text-xl font-bold text-gray-800 text-center mb-2">Delete Post?</h3>
                     <p className="text-gray-600 text-center mb-6">
                        Are you sure you want to delete "{blogToDelete?.title}"? This action cannot be undone.
                     </p>
                     <div className="flex gap-3">
                        <button
                           onClick={() => setShowDeleteModal(false)}
                           className="flex-1 px-4 py-2.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition"
                        >
                           Cancel
                        </button>
                        <button
                           onClick={handleDelete}
                           className="flex-1 px-4 py-2.5 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition"
                        >
                           Delete
                        </button>
                     </div>
                  </motion.div>
               </motion.div>
            )}
         </AnimatePresence>
      </>
   );
}