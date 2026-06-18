import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useState, useMemo } from "react";
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
   FaBullhorn
} from "react-icons/fa";

// ============================================
// BLOG DATA (20+ Posts)
// ============================================
const blogs = [
   {
      id: 1,
      title: "Combating Malaria in Rural Nigeria: Our 2025 Outreach Results",
      excerpt: "A comprehensive look at how our medical teams reached over 5,000 patients in malaria-endemic regions, providing testing, treatment, and prevention education.",
      content: "Malaria remains one of the leading causes of death in Nigeria, particularly in rural communities with limited access to healthcare...",
      image: "https://images.unsplash.com/photo-1584515933487-779824d29309?w=800",
      category: "Medical Outreach",
      author: "Dr. Chinedu Okonkwo",
      authorAvatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100",
      date: "2025-05-15",
      readTime: "8 min read",
      views: 1240,
      likes: 89,
      comments: 23,
      featured: true,
      tags: ["Malaria", "Rural Health", "Prevention"]
   },
   {
      id: 2,
      title: "Free Cataract Surgery Campaign Restores Vision to 300 Nigerians",
      excerpt: "Our ophthalmic surgical team completed a landmark 2-week campaign in Kano State, performing free cataract removals for elderly patients.",
      content: "Vision loss from cataracts affects millions of Nigerians over 60, yet simple surgery can restore sight within minutes...",
      image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800",
      category: "Surgery",
      author: "Dr. Amina Ibrahim",
      authorAvatar: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=100",
      date: "2025-04-28",
      readTime: "6 min read",
      views: 2100,
      likes: 156,
      comments: 41,
      featured: true,
      tags: ["Eye Care", "Surgery", "Elderly Care"]
   },
   {
      id: 3,
      title: "The State of Maternal Health in Northern Nigeria",
      excerpt: "Exploring the challenges facing pregnant women in remote communities and how RightAid is working to reduce maternal mortality rates.",
      content: "Nigeria accounts for nearly 20% of global maternal deaths, with northern states bearing the highest burden...",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800",
      category: "Maternal Health",
      author: "Nurse Fatima Bello",
      authorAvatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100",
      date: "2025-04-10",
      readTime: "10 min read",
      views: 980,
      likes: 67,
      comments: 18,
      featured: false,
      tags: ["Maternal Health", "Northern Nigeria", "Safe Delivery"]
   },
   {
      id: 4,
      title: "Volunteer Spotlight: Meet the Doctors Saving Lives in Borno",
      excerpt: "An inside look at the dedicated medical volunteers working in conflict-affected regions of Northeast Nigeria.",
      content: "Dr. Emmanuel Ojo and his team have spent the last 18 months providing critical care in IDP camps across Borno State...",
      image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=800",
      category: "Volunteer Stories",
      author: "Grace Emmanuel",
      authorAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
      date: "2025-03-22",
      readTime: "7 min read",
      views: 1560,
      likes: 112,
      comments: 34,
      featured: false,
      tags: ["Volunteers", "Borno", "IDP Camps"]
   },
   {
      id: 5,
      title: "COVID-19 Vaccination Drive: Reaching the Unreached",
      excerpt: "How our mobile vaccination teams brought COVID-19 vaccines to remote villages with zero prior access to immunization services.",
      content: "When the COVID-19 vaccine became available in Nigeria, urban centers were prioritized, leaving rural communities behind...",
      image: "https://images.unsplash.com/photo-1584551246675-2b6525d76e37?w=800",
      category: "Immunization",
      author: "Dr. Chinedu Okonkwo",
      authorAvatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100",
      date: "2025-03-08",
      readTime: "5 min read",
      views: 1890,
      likes: 134,
      comments: 29,
      featured: true,
      tags: ["COVID-19", "Vaccination", "Rural Access"]
   },
   {
      id: 6,
      title: "Mental Health in Nigerian Communities: Breaking the Silence",
      excerpt: "Addressing the stigma around mental illness and expanding access to counseling services in underserved areas.",
      content: "Mental health remains one of the most neglected areas of healthcare in Nigeria, with less than 10% of those in need receiving care...",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800",
      category: "Mental Health",
      author: "Dr. Amina Ibrahim",
      authorAvatar: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=100",
      date: "2025-02-20",
      readTime: "9 min read",
      views: 760,
      likes: 95,
      comments: 45,
      featured: false,
      tags: ["Mental Health", "Stigma", "Counseling"]
   },
   {
      id: 7,
      title: "Dental Health Outreach: Smiles Restored in Oyo State",
      excerpt: "Our dental team provided free extractions, fillings, and oral health education to over 800 patients in rural Oyo communities.",
      content: "Tooth decay and gum disease are prevalent in communities without access to dental care, leading to pain, infection, and lost productivity...",
      image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800",
      category: "Dental Care",
      author: "Dr. Tunde Bakare",
      authorAvatar: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=100",
      date: "2025-02-14",
      readTime: "5 min read",
      views: 640,
      likes: 52,
      comments: 12,
      featured: false,
      tags: ["Dental", "Oyo", "Oral Health"]
   },
   {
      id: 8,
      title: "Emergency Response: How We Handled the 2024 Cholera Outbreak",
      excerpt: "A case study in rapid deployment and effective intervention during a public health emergency in Katsina State.",
      content: "When cholera cases began surging in Katsina in August 2024, our emergency response team was activated within 12 hours...",
      image: "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=800",
      category: "Emergency Response",
      author: "Dr. Chinedu Okonkwo",
      authorAvatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100",
      date: "2025-01-30",
      readTime: "11 min read",
      views: 2340,
      likes: 178,
      comments: 56,
      featured: true,
      tags: ["Cholera", "Emergency", "Outbreak Response"]
   },
   {
      id: 9,
      title: "Training Community Health Workers: A Sustainable Approach",
      excerpt: "Why investing in local health workers creates lasting impact beyond any single medical mission.",
      content: "Every community has individuals passionate about health. Our training program equips them with skills to serve their neighbors long after we leave...",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800",
      category: "Health Education",
      author: "Nurse Fatima Bello",
      authorAvatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100",
      date: "2025-01-15",
      readTime: "7 min read",
      views: 890,
      likes: 71,
      comments: 19,
      featured: false,
      tags: ["Training", "Community Workers", "Sustainability"]
   },
   {
      id: 10,
      title: "Pediatric Surgery: Giving Children a Second Chance",
      excerpt: "Our pediatric surgical program has corrected congenital defects for over 200 children from low-income families.",
      content: "Children born with cleft lips, hernias, and other correctable conditions often face lifelong stigma and health complications...",
      image: "https://images.unsplash.com/photo-1581056771107-24ca5f033842?w=800",
      category: "Surgery",
      author: "Dr. Amina Ibrahim",
      authorAvatar: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=100",
      date: "2024-12-20",
      readTime: "6 min read",
      views: 1120,
      likes: 98,
      comments: 27,
      featured: false,
      tags: ["Pediatrics", "Surgery", "Children"]
   },
   {
      id: 11,
      title: "Nutrition and Malnutrition: Feeding Programs in IDP Camps",
      excerpt: "Addressing severe acute malnutrition among displaced children through therapeutic feeding and nutrition education.",
      content: "In IDP camps across Borno, Adamawa, and Yobe, malnutrition rates among children under 5 exceed emergency thresholds...",
      image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800",
      category: "Nutrition",
      author: "Grace Emmanuel",
      authorAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
      date: "2024-12-05",
      readTime: "8 min read",
      views: 730,
      likes: 63,
      comments: 15,
      featured: false,
      tags: ["Nutrition", "IDP", "Malnutrition"]
   },
   {
      id: 12,
      title: "The Role of Technology in Rural Healthcare Delivery",
      excerpt: "How telemedicine, mobile health apps, and digital records are transforming our ability to serve remote communities.",
      content: "Technology is bridging the gap between urban specialists and rural patients. Our telemedicine program connects village clinics with Lagos-based specialists...",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800",
      category: "Innovation",
      author: "Dr. Tunde Bakare",
      authorAvatar: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=100",
      date: "2024-11-18",
      readTime: "9 min read",
      views: 1450,
      likes: 120,
      comments: 38,
      featured: false,
      tags: ["Technology", "Telemedicine", "Innovation"]
   },
   {
      id: 13,
      title: "World Health Day 2024: Our Commitment to Universal Health Coverage",
      excerpt: "Reflecting on our progress toward health for all and the road ahead for Nigeria's underserved populations.",
      content: "This World Health Day, we renewed our pledge to leave no community behind in the pursuit of quality healthcare...",
      image: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=800",
      category: "Awareness",
      author: "Dr. Chinedu Okonkwo",
      authorAvatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100",
      date: "2024-11-07",
      readTime: "4 min read",
      views: 560,
      likes: 44,
      comments: 11,
      featured: false,
      tags: ["WHO", "Awareness", "Universal Health"]
   },
   {
      id: 14,
      title: "Hernia Repair Campaign: 150 Surgeries in One Week",
      excerpt: "Our general surgery team set a new record during a week-long campaign in Niger State, transforming lives with simple procedures.",
      content: "Hernias are common in communities where heavy manual labor is the norm, yet surgical repair is often unaffordable...",
      image: "https://images.unsplash.com/photo-1551076805-e1869033e561?w=800",
      category: "Surgery",
      author: "Dr. Tunde Bakare",
      authorAvatar: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=100",
      date: "2024-10-25",
      readTime: "6 min read",
      views: 870,
      likes: 76,
      comments: 22,
      featured: false,
      tags: ["Hernia", "Surgery", "Niger State"]
   },
   {
      id: 15,
      title: "Hygiene Education: Preventing Disease at the Source",
      excerpt: "How teaching proper handwashing and sanitation practices reduced diarrheal diseases by 60% in target communities.",
      content: "Prevention is always better than cure. Our hygiene education program has reached over 10,000 community members...",
      image: "https://images.unsplash.com/photo-1584515933487-779824d29309?w=800",
      category: "Health Education",
      author: "Nurse Fatima Bello",
      authorAvatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100",
      date: "2024-10-12",
      readTime: "5 min read",
      views: 520,
      likes: 41,
      comments: 9,
      featured: false,
      tags: ["Hygiene", "Prevention", "Education"]
   },
   {
      id: 16,
      title: "Partner Spotlight: Collaborating with WHO Nigeria",
      excerpt: "How our partnership with the World Health Organization amplifies our impact and extends our reach to the most vulnerable.",
      content: "Since 2021, our collaboration with WHO Nigeria has enabled us to access funding, technical expertise, and global best practices...",
      image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800",
      category: "Partnerships",
      author: "Grace Emmanuel",
      authorAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
      date: "2024-09-28",
      readTime: "7 min read",
      views: 680,
      likes: 58,
      comments: 14,
      featured: false,
      tags: ["WHO", "Partnerships", "Collaboration"]
   },
   {
      id: 17,
      title: "Sickle Cell Awareness: Screening and Support Programs",
      excerpt: "Expanding newborn screening and creating support networks for families affected by sickle cell disease in Nigeria.",
      content: "Nigeria has the highest burden of sickle cell disease in the world. Early diagnosis and comprehensive care can dramatically improve outcomes...",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800",
      category: "Awareness",
      author: "Dr. Amina Ibrahim",
      authorAvatar: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=100",
      date: "2024-09-15",
      readTime: "8 min read",
      views: 920,
      likes: 87,
      comments: 31,
      featured: false,
      tags: ["Sickle Cell", "Screening", "Genetic Disorders"]
   },
   {
      id: 18,
      title: "Mobile Clinic Deployment: Healthcare on Wheels",
      excerpt: "Inside our fleet of fully equipped mobile clinics bringing diagnostics, treatment, and pharmacy services to remote areas.",
      content: "Our mobile clinics are hospitals on wheels, equipped with examination rooms, diagnostic equipment, and pharmacy supplies...",
      image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=800",
      category: "Medical Outreach",
      author: "Dr. Tunde Bakare",
      authorAvatar: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=100",
      date: "2024-08-30",
      readTime: "6 min read",
      views: 1050,
      likes: 93,
      comments: 25,
      featured: false,
      tags: ["Mobile Clinic", "Rural Access", "Diagnostics"]
   },
   {
      id: 19,
      title: "Annual Report 2023: A Year of Milestones",
      excerpt: "Reviewing our achievements, challenges, and lessons learned as we expanded to serve 50+ communities across Nigeria.",
      content: "2023 was a transformative year for RightAid Health Foundation. We reached more patients, performed more surgeries, and trained more health workers than ever before...",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800",
      category: "Reports",
      author: "Grace Emmanuel",
      authorAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
      date: "2024-08-10",
      readTime: "12 min read",
      views: 3100,
      likes: 245,
      comments: 67,
      featured: true,
      tags: ["Annual Report", "2023", "Milestones"]
   },
   {
      id: 20,
      title: "Youth Health Ambassadors: Empowering the Next Generation",
      excerpt: "Our school-based health education program trains young people to become health advocates in their communities.",
      content: "Adolescents and young adults are powerful agents of change. Our Youth Health Ambassador program equips them with knowledge and leadership skills...",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800",
      category: "Health Education",
      author: "Nurse Fatima Bello",
      authorAvatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100",
      date: "2024-07-22",
      readTime: "6 min read",
      views: 480,
      likes: 39,
      comments: 8,
      featured: false,
      tags: ["Youth", "Education", "Advocacy"]
   }
];

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

            {/* HERO SECTION */}
            <section className="bg-green-700 text-white py-20 px-6">
               <div className="max-w-6xl mx-auto text-center">
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