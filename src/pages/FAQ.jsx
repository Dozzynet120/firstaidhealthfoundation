import { Helmet } from "react-helmet-async";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
   FaSearch,
   FaChevronDown,
   FaChevronUp,
   FaQuestionCircle,
   FaStethoscope,
   FaHandsHelping,
   FaDonate,
   FaMapMarkerAlt,
   FaEnvelope,
   FaPhoneAlt,
   FaArrowRight,
   FaCheckCircle,
   FaGlobeAfrica,
   FaShieldAlt,
   FaUsers,
   FaFileAlt,
   FaRegHospital,
   FaHandHoldingHeart,
   FaCommentDots,
   FaLightbulb
} from "react-icons/fa";

// ============================================
// FAQ DATA (40+ Questions)
// ============================================
const faqData = [
   // GENERAL QUESTIONS
   {
      id: 1,
      category: "General",
      icon: <FaQuestionCircle />,
      question: "What is RightAid Health Foundation?",
      answer: "RightAid Health Foundation is a registered non-governmental organization (NGO) dedicated to improving healthcare access in underserved communities across Nigeria. We provide free and subsidized medical services including consultations, surgeries, immunizations, maternal care, and emergency response through mobile clinics and community health programs."
   },
   {
      id: 2,
      category: "General",
      icon: <FaQuestionCircle />,
      question: "When was RightAid Health Foundation established?",
      answer: "RightAid Health Foundation was founded in 2015 in Lagos, Nigeria. We started with a small team of 5 volunteer doctors and have since grown into a nationwide organization serving over 50 communities with hundreds of volunteers and medical professionals."
   },
   {
      id: 3,
      category: "General",
      icon: <FaQuestionCircle />,
      question: "Is RightAid Health Foundation registered?",
      answer: "Yes, RightAid Health Foundation is fully registered with the Corporate Affairs Commission (CAC) of Nigeria. We are also tax-exempt, ISO certified, and a recognized partner of the World Health Organization (WHO) Nigeria office."
   },
   {
      id: 4,
      category: "General",
      icon: <FaQuestionCircle />,
      question: "Where is RightAid Health Foundation headquartered?",
      answer: "Our headquarters is located in Lagos State, Nigeria. However, we operate medical outreaches and programs across all 36 states and the Federal Capital Territory (FCT), with regional coordinators in key locations."
   },
   {
      id: 5,
      category: "General",
      icon: <FaQuestionCircle />,
      question: "How can I contact RightAid Health Foundation?",
      answer: "You can reach us via email at info@rightaidhealth.org, by phone at +234 [Phone Number], or through our website contact form. Our office hours are Monday to Friday, 8:00 AM to 5:00 PM WAT. For emergencies, we have a 24/7 hotline."
   },

   // SERVICES
   {
      id: 6,
      category: "Services",
      icon: <FaStethoscope />,
      question: "What medical services does RightAid provide?",
      answer: "We offer a comprehensive range of services including: primary healthcare consultations, chronic disease management, immunization and vaccination programs, maternal and child health services, surgical outreach programs (cataract, hernia, cleft lip, etc.), dental care, mental health counseling, emergency medical response, health education, and community health worker training."
   },
   {
      id: 7,
      category: "Services",
      icon: <FaStethoscope />,
      question: "Are your medical services completely free?",
      answer: "Most of our services are provided free of charge to beneficiaries in underserved communities. Some specialized surgical procedures may require a nominal subsidized fee to cover materials and medication costs. No one is ever turned away due to inability to pay."
   },
   {
      id: 8,
      category: "Services",
      icon: <FaStethoscope />,
      question: "Do you provide emergency medical services?",
      answer: "Yes, we have a dedicated Emergency Response Team that can deploy within 24-48 hours to health crises, disease outbreaks, and natural disasters. Our mobile clinics are equipped for trauma care, and we coordinate with local hospitals for referrals when needed."
   },
   {
      id: 9,
      category: "Services",
      icon: <FaStethoscope />,
      question: "What types of surgeries do you perform?",
      answer: "Our surgical outreach programs include: cataract extraction and eye surgeries, hernia repairs, appendectomies, cleft lip and palate repairs, cesarean sections, fibroid removals, tumor removals, hydrocele repairs, and burn reconstruction surgeries. All procedures are performed by certified surgeons."
   },
   {
      id: 10,
      category: "Services",
      icon: <FaStethoscope />,
      question: "Do you offer mental health services?",
      answer: "Yes, we provide mental health counseling, therapy sessions, and community mental health programs. We address depression, anxiety, trauma, substance abuse, and other mental health conditions. Our services are confidential and culturally sensitive."
   },
   {
      id: 11,
      category: "Services",
      icon: <FaStethoscope />,
      question: "Can I get vaccinated at your outreach programs?",
      answer: "Absolutely. We provide vaccinations for polio, measles, hepatitis B, COVID-19, tetanus, yellow fever, and other preventable diseases. Our immunization programs target both children and adults in communities with limited access to healthcare facilities."
   },
   {
      id: 12,
      category: "Services",
      icon: <FaStethoscope />,
      question: "Do you provide dental care?",
      answer: "Yes, our dental outreach programs offer free tooth extractions, fillings, cleanings, and oral health education. We also distribute toothbrushes and toothpaste to children and families during our community visits."
   },

   // ELIGIBILITY & ACCESS
   {
      id: 13,
      category: "Eligibility",
      icon: <FaUsers />,
      question: "Who can access RightAid's services?",
      answer: "Our services are primarily designed for: residents of underserved or rural communities, low-income families without health insurance, pregnant women needing antenatal and delivery services, children requiring immunization or pediatric care, elderly individuals with chronic conditions, and persons affected by health emergencies or natural disasters."
   },
   {
      id: 14,
      category: "Eligibility",
      icon: <FaUsers />,
      question: "Do I need to register before receiving services?",
      answer: "No pre-registration is required for most of our outreach programs. Simply attend the outreach event in your community. For surgical programs, we conduct pre-screening assessments to determine eligibility and schedule procedures. You can also request an outreach for your community through our website."
   },
   {
      id: 15,
      category: "Eligibility",
      icon: <FaUsers />,
      question: "Can I request a medical outreach for my community?",
      answer: "Yes! Community leaders, religious organizations, and local government officials can request a medical outreach by filling out the 'Request Outreach' form on our website or contacting our operations team. We prioritize communities based on healthcare needs, population size, and logistical feasibility."
   },
   {
      id: 16,
      category: "Eligibility",
      icon: <FaUsers />,
      question: "Do you serve urban communities as well?",
      answer: "While our primary focus is on rural and underserved communities, we do conduct programs in urban slums and low-income neighborhoods where residents face barriers to accessing quality healthcare. Our mission is to reach anyone who needs care, regardless of location."
   },

   // VOLUNTEERING
   {
      id: 17,
      category: "Volunteering",
      icon: <FaHandsHelping />,
      question: "How can I volunteer with RightAid?",
      answer: "We welcome medical professionals (doctors, nurses, pharmacists, dentists, optometrists), non-medical volunteers (logistics, photography, data entry, community mobilizers), and students. Apply through our website's volunteer portal or email volunteer@rightaidhealth.org with your CV and area of interest."
   },
   {
      id: 18,
      category: "Volunteering",
      icon: <FaHandsHelping />,
      question: "Do volunteers need to be medical professionals?",
      answer: "Not at all. While we always need doctors and nurses, many of our volunteers are non-medical professionals who help with logistics, community mobilization, patient registration, translation, photography, and administrative tasks. Everyone has a role to play in saving lives."
   },
   {
      id: 19,
      category: "Volunteering",
      icon: <FaHandsHelping />,
      question: "Is there a minimum time commitment for volunteers?",
      answer: "Volunteer commitments vary. Medical professionals can join for single-day outreaches or multi-week campaigns. Non-medical volunteers typically commit to at least one outreach event. International volunteers should plan for a minimum of 2 weeks to maximize impact."
   },
   {
      id: 20,
      category: "Volunteering",
      icon: <FaHandsHelping />,
      question: "Do you provide training for volunteers?",
      answer: "Yes, all volunteers receive orientation and training before participating in programs. Medical volunteers must provide proof of licensure. We also offer specialized training for community health workers who want to continue serving their communities long-term."
   },
   {
      id: 21,
      category: "Volunteering",
      icon: <FaHandsHelping />,
      question: "Are volunteers compensated?",
      answer: "RightAid operates on a volunteer basis. We do not provide salaries, but we cover transportation, meals, and accommodation during outreach programs. Medical volunteers receive certificates of participation, and long-term volunteers may be eligible for recommendation letters."
   },

   // DONATIONS
   {
      id: 22,
      category: "Donations",
      icon: <FaDonate />,
      question: "How can I donate to RightAid?",
      answer: "You can donate through our website's secure donation portal, bank transfer, mobile money, or check. We accept one-time donations, monthly recurring gifts, and corporate sponsorships. Every donation, no matter the size, directly funds medical supplies, equipment, and outreach programs."
   },
   {
      id: 23,
      category: "Donations",
      icon: <FaDonate />,
      question: "Is my donation tax-deductible?",
      answer: "Yes, RightAid Health Foundation is a registered tax-exempt organization in Nigeria. Donors receive official receipts for tax purposes. International donors should consult their local tax regulations regarding donations to foreign NGOs."
   },
   {
      id: 24,
      category: "Donations",
      icon: <FaDonate />,
      question: "How is my donation used?",
      answer: "We maintain full transparency in our operations. Approximately 85% of donations go directly to program costs (medical supplies, equipment, transportation, patient care). The remaining 15% covers administrative and operational expenses. We publish annual financial reports on our website."
   },
   {
      id: 25,
      category: "Donations",
      icon: <FaDonate />,
      question: "Can I donate medical supplies or equipment?",
      answer: "Yes, we gratefully accept donations of medical supplies, equipment, and medications. Contact our logistics team at logistics@rightaidhealth.org to arrange a donation. We particularly need surgical instruments, diagnostic equipment, vaccines, and chronic disease medications."
   },
   {
      id: 26,
      category: "Donations",
      icon: <FaDonate />,
      question: "Can I sponsor a specific outreach or surgery?",
      answer: "Absolutely. We offer sponsorship opportunities for specific programs, such as sponsoring a cataract surgery campaign, a vaccination drive, or a community health worker training. Sponsors receive detailed impact reports and recognition on our website and social media."
   },

   // PARTNERSHIPS
   {
      id: 27,
      category: "Partnerships",
      icon: <FaGlobeAfrica />,
      question: "How can my organization partner with RightAid?",
      answer: "We welcome partnerships with government agencies, international organizations, private companies, and other NGOs. Partnership models include funding support, in-kind donations, technical assistance, joint program implementation, and advocacy collaboration. Contact partnerships@rightaidhealth.org to discuss opportunities."
   },
   {
      id: 28,
      category: "Partnerships",
      icon: <FaGlobeAfrica />,
      question: "Who are your current partners?",
      answer: "We collaborate with the Federal Ministry of Health Nigeria, WHO Nigeria, UNICEF, Doctors Without Borders, state and local government health departments, private healthcare providers, pharmaceutical companies, and international donor organizations. We are always open to new partnerships."
   },
   {
      id: 29,
      category: "Partnerships",
      icon: <FaGlobeAfrica />,
      question: "Do you work with government health programs?",
      answer: "Yes, we actively collaborate with federal, state, and local government health departments to align our programs with national health priorities. We support government immunization campaigns, disease surveillance, and primary healthcare strengthening initiatives."
   },

   // LOCATIONS & SCHEDULE
   {
      id: 30,
      category: "Locations",
      icon: <FaMapMarkerAlt />,
      question: "Which states do you operate in?",
      answer: "RightAid operates across all 36 states of Nigeria and the Federal Capital Territory (FCT). We have regional offices in Lagos, Abuja, Kano, and Port Harcourt, with mobile teams capable of reaching even the most remote communities."
   },
   {
      id: 31,
      category: "Locations",
      icon: <FaMapMarkerAlt />,
      question: "How can I find out about upcoming outreaches in my area?",
      answer: "Follow us on social media (Facebook, Twitter, Instagram, LinkedIn), subscribe to our newsletter, or check the 'Upcoming Events' section on our website. We also announce outreaches through local community leaders, radio stations, and religious institutions."
   },
   {
      id: 32,
      category: "Locations",
      icon: <FaMapMarkerAlt />,
      question: "Do you operate outside Nigeria?",
      answer: "Currently, our operations are focused within Nigeria. However, we are exploring expansion into neighboring West African countries with similar healthcare challenges. Our long-term vision includes pan-African health initiatives."
   },

   // IMPACT & REPORTS
   {
      id: 33,
      category: "Impact",
      icon: <FaFileAlt />,
      question: "How many people has RightAid served?",
      answer: "Since 2015, RightAid has reached over 25,000 patients through medical consultations, completed 500+ surgeries, conducted 150+ medical missions, served 50+ communities, administered 8,000+ vaccines, and supported 2,500+ safe deliveries. These numbers continue to grow."
   },
   {
      id: 34,
      category: "Impact",
      icon: <FaFileAlt />,
      question: "Where can I find your annual reports?",
      answer: "Our annual reports, financial statements, and impact assessments are available in the 'Resources' section of our website. You can also request printed copies by emailing info@rightaidhealth.org. We believe in full transparency and accountability."
   },
   {
      id: 35,
      category: "Impact",
      icon: <FaFileAlt />,
      question: "How do you measure the impact of your programs?",
      answer: "We use a comprehensive monitoring and evaluation framework that tracks: number of patients served, types of services provided, health outcomes, community feedback, cost-effectiveness, and long-term sustainability indicators. We conduct pre- and post-intervention surveys to measure health improvements."
   },

   // TECHNOLOGY & INNOVATION
   {
      id: 36,
      category: "Innovation",
      icon: <FaLightbulb />,
      question: "Do you use telemedicine?",
      answer: "Yes, our telemedicine program connects rural patients with specialist doctors in urban centers via video consultation. This allows us to provide expert diagnosis and treatment recommendations in communities without specialist physicians."
   },
   {
      id: 37,
      category: "Innovation",
      icon: <FaLightbulb />,
      question: "What technology do you use in your mobile clinics?",
      answer: "Our mobile clinics are equipped with portable diagnostic equipment (ultrasound, ECG, blood analyzers), digital health records systems, solar power systems, telemedicine kits, and cold chain storage for vaccines and medications."
   },

   // SAFETY & QUALITY
   {
      id: 38,
      category: "Safety",
      icon: <FaShieldAlt />,
      question: "How do you ensure patient safety during surgeries?",
      answer: "All surgical procedures are performed by licensed, experienced surgeons in sterile conditions. We use high-quality surgical instruments, proper anesthesia, and follow WHO surgical safety checklists. Post-operative care and follow-up visits are mandatory."
   },
   {
      id: 39,
      category: "Safety",
      icon: <FaShieldAlt />,
      question: "Is patient information kept confidential?",
      answer: "Absolutely. We adhere to strict patient confidentiality protocols in line with international medical ethics standards. All patient records are securely stored, and information is only shared with authorized medical personnel directly involved in patient care."
   },
   {
      id: 40,
      category: "Safety",
      icon: <FaShieldAlt />,
      question: "What COVID-19 safety measures do you follow?",
      answer: "We follow all WHO and NCDC guidelines including: mandatory mask-wearing, hand sanitization stations, physical distancing where possible, regular disinfection of equipment, health screening of staff and patients, and vaccination of all medical personnel."
   }
];

const categories = [
   { name: "All", icon: <FaQuestionCircle />, count: faqData.length },
   { name: "General", icon: <FaQuestionCircle />, count: faqData.filter(f => f.category === "General").length },
   { name: "Services", icon: <FaStethoscope />, count: faqData.filter(f => f.category === "Services").length },
   { name: "Eligibility", icon: <FaUsers />, count: faqData.filter(f => f.category === "Eligibility").length },
   { name: "Volunteering", icon: <FaHandsHelping />, count: faqData.filter(f => f.category === "Volunteering").length },
   { name: "Donations", icon: <FaDonate />, count: faqData.filter(f => f.category === "Donations").length },
   { name: "Partnerships", icon: <FaGlobeAfrica />, count: faqData.filter(f => f.category === "Partnerships").length },
   { name: "Locations", icon: <FaMapMarkerAlt />, count: faqData.filter(f => f.category === "Locations").length },
   { name: "Impact", icon: <FaFileAlt />, count: faqData.filter(f => f.category === "Impact").length },
   { name: "Innovation", icon: <FaLightbulb />, count: faqData.filter(f => f.category === "Innovation").length },
   { name: "Safety", icon: <FaShieldAlt />, count: faqData.filter(f => f.category === "Safety").length }
];

export default function FAQ() {
   const [searchQuery, setSearchQuery] = useState("");
   const [selectedCategory, setSelectedCategory] = useState("All");
   const [openItems, setOpenItems] = useState(new Set([1]));
   const [showContactForm, setShowContactForm] = useState(false);

   const filteredFAQs = useMemo(() => {
      let result = [...faqData];

      if (selectedCategory !== "All") {
         result = result.filter(f => f.category === selectedCategory);
      }

      if (searchQuery) {
         const query = searchQuery.toLowerCase();
         result = result.filter(f =>
            f.question.toLowerCase().includes(query) ||
            f.answer.toLowerCase().includes(query)
         );
      }

      return result;
   }, [searchQuery, selectedCategory]);

   const toggleItem = (id) => {
      setOpenItems(prev => {
         const next = new Set(prev);
         if (next.has(id)) next.delete(id);
         else next.add(id);
         return next;
      });
   };

   const expandAll = () => {
      setOpenItems(new Set(filteredFAQs.map(f => f.id)));
   };

   const collapseAll = () => {
      setOpenItems(new Set());
   };

   return (
      <>
         <Helmet>
            <title>FAQ | RightAid Health Foundation</title>
            <meta
               name="description"
               content="Find answers to frequently asked questions about RightAid Health Foundation's services, volunteering, donations, and partnerships."
            />
         </Helmet>

         <div className="min-h-screen bg-gray-50">

            {/* HERO */}
            <section className="bg-green-700 text-white py-20 px-6 relative overflow-hidden">
               <div className="absolute inset-0 opacity-10">
                  <FaQuestionCircle className="absolute top-10 left-10 text-9xl" />
                  <FaQuestionCircle className="absolute bottom-10 right-20 text-8xl" />
                  <FaQuestionCircle className="absolute top-1/2 right-1/4 text-7xl" />
               </div>
               <div className="max-w-4xl mx-auto text-center relative z-10">
                  <motion.div
                     initial={{ opacity: 0, y: 30 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ duration: 0.6 }}
                  >
                     <h1 className="text-5xl font-bold mb-6">Frequently Asked Questions</h1>
                     <p className="text-lg text-green-100 max-w-2xl mx-auto leading-relaxed">
                        Find answers to common questions about our services, volunteering, donations, and how we operate. Can't find what you're looking for? Reach out to us directly.
                     </p>

                     {/* Search */}
                     <div className="mt-10 max-w-2xl mx-auto relative">
                        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                           type="text"
                           placeholder="Search questions or keywords..."
                           value={searchQuery}
                           onChange={(e) => setSearchQuery(e.target.value)}
                           className="w-full pl-12 pr-4 py-4 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-300"
                        />
                     </div>
                  </motion.div>
               </div>
            </section>

            {/* QUICK LINKS */}
            <section className="bg-white py-8 px-6 border-b border-gray-200">
               <div className="max-w-6xl mx-auto">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                     {[
                        { icon: <FaStethoscope />, label: "Our Services", desc: "What we offer" },
                        { icon: <FaHandsHelping />, label: "Volunteer", desc: "Join our team" },
                        { icon: <FaDonate />, label: "Donate", desc: "Support our work" },
                        { icon: <FaEnvelope />, label: "Contact", desc: "Get in touch" }
                     ].map((item, index) => (
                        <motion.div
                           key={index}
                           initial={{ opacity: 0, y: 20 }}
                           whileInView={{ opacity: 1, y: 0 }}
                           viewport={{ once: true }}
                           transition={{ delay: index * 0.1 }}
                           className="flex items-center gap-3 p-4 rounded-xl bg-green-50 hover:bg-green-100 transition cursor-pointer"
                        >
                           <div className="text-green-600 text-2xl">{item.icon}</div>
                           <div>
                              <div className="font-bold text-gray-800 text-sm">{item.label}</div>
                              <div className="text-gray-500 text-xs">{item.desc}</div>
                           </div>
                        </motion.div>
                     ))}
                  </div>
               </div>
            </section>

            {/* CATEGORY FILTERS */}
            <section className="py-8 px-6 bg-white sticky top-0 z-30 shadow-sm">
               <div className="max-w-6xl mx-auto">
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
                           <span className={`text-xs px-1.5 py-0.5 rounded-full ${selectedCategory === cat.name ? "bg-green-500 text-white" : "bg-gray-200 text-gray-500"
                              }`}>
                              {cat.count}
                           </span>
                        </button>
                     ))}
                  </div>
               </div>
            </section>

            {/* FAQ ACCORDION */}
            <section className="py-12 px-6">
               <div className="max-w-4xl mx-auto">
                  {/* Toolbar */}
                  <div className="flex items-center justify-between mb-8">
                     <div className="text-gray-600">
                        Showing <span className="font-bold text-gray-800">{filteredFAQs.length}</span> questions
                        {selectedCategory !== "All" && (
                           <span> in <span className="text-green-600 font-medium">{selectedCategory}</span></span>
                        )}
                     </div>
                     <div className="flex gap-2">
                        <button
                           onClick={expandAll}
                           className="text-sm text-green-600 hover:text-green-700 font-medium px-3 py-1 rounded-lg hover:bg-green-50 transition"
                        >
                           Expand All
                        </button>
                        <button
                           onClick={collapseAll}
                           className="text-sm text-gray-500 hover:text-gray-700 font-medium px-3 py-1 rounded-lg hover:bg-gray-100 transition"
                        >
                           Collapse All
                        </button>
                     </div>
                  </div>

                  {filteredFAQs.length > 0 ? (
                     <div className="space-y-4">
                        {filteredFAQs.map((faq, index) => (
                           <motion.div
                              key={faq.id}
                              initial={{ opacity: 0, y: 20 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.3, delay: (index % 5) * 0.05 }}
                              className="bg-white rounded-xl shadow-md overflow-hidden"
                           >
                              <button
                                 onClick={() => toggleItem(faq.id)}
                                 className="w-full flex items-start gap-4 p-6 text-left hover:bg-gray-50 transition"
                              >
                                 <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 mt-0.5">
                                    {faq.icon}
                                 </div>
                                 <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                       <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                                          {faq.category}
                                       </span>
                                    </div>
                                    <h3 className="font-bold text-gray-800 text-lg pr-8 relative">
                                       {faq.question}
                                       <span className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400">
                                          {openItems.has(faq.id) ? <FaChevronUp /> : <FaChevronDown />}
                                       </span>
                                    </h3>
                                 </div>
                              </button>

                              <AnimatePresence>
                                 {openItems.has(faq.id) && (
                                    <motion.div
                                       initial={{ height: 0, opacity: 0 }}
                                       animate={{ height: "auto", opacity: 1 }}
                                       exit={{ height: 0, opacity: 0 }}
                                       transition={{ duration: 0.3 }}
                                       className="overflow-hidden"
                                    >
                                       <div className="px-6 pb-6 pl-20">
                                          <div className="border-l-2 border-green-200 pl-4">
                                             <p className="text-gray-600 leading-relaxed">
                                                {faq.answer}
                                             </p>
                                          </div>
                                          <div className="mt-4 flex items-center gap-4">
                                             <button className="text-sm text-green-600 hover:text-green-700 flex items-center gap-1 transition">
                                                <FaCheckCircle /> Helpful
                                             </button>
                                             <button
                                                onClick={() => setShowContactForm(true)}
                                                className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1 transition"
                                             >
                                                <FaCommentDots /> Still have questions?
                                             </button>
                                          </div>
                                       </div>
                                    </motion.div>
                                 )}
                              </AnimatePresence>
                           </motion.div>
                        ))}
                     </div>
                  ) : (
                     <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-20"
                     >
                        <FaSearch className="text-gray-300 text-6xl mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-gray-600 mb-2">No questions found</h3>
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
                     </motion.div>
                  )}
               </div>
            </section>

            {/* STILL HAVE QUESTIONS */}
            <section className="bg-green-50 py-16 px-6">
               <div className="max-w-4xl mx-auto">
                  <motion.div
                     initial={{ opacity: 0, y: 30 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true }}
                     className="bg-white rounded-2xl shadow-lg p-8 md:p-12"
                  >
                     <div className="text-center mb-8">
                        <FaCommentDots className="text-5xl text-green-600 mx-auto mb-4" />
                        <h2 className="text-3xl font-bold text-gray-800 mb-2">Still Have Questions?</h2>
                        <p className="text-gray-600 max-w-xl mx-auto">
                           Can't find the answer you're looking for? Our team is here to help. Reach out through any of the channels below.
                        </p>
                     </div>

                     <div className="grid md:grid-cols-3 gap-6 mb-8">
                        <div className="text-center p-6 bg-green-50 rounded-xl">
                           <FaPhoneAlt className="text-3xl text-green-600 mx-auto mb-3" />
                           <h3 className="font-bold text-gray-800 mb-1">Call Us</h3>
                           <p className="text-gray-600 text-sm mb-2">Mon-Fri, 8AM-5PM WAT</p>
                           <a href="tel: +2348123658741" className="text-green-600 font-medium hover:underline">
                              +234 812 365 8741
                           </a>
                        </div>
                        <div className="text-center p-6 bg-green-50 rounded-xl">
                           <FaEnvelope className="text-3xl text-green-600 mx-auto mb-3" />
                           <h3 className="font-bold text-gray-800 mb-1">Email Us</h3>
                           <p className="text-gray-600 text-sm mb-2">We reply within 24 hours</p>
                           <a href="mailto:info@rightaidhealth.org" className="text-green-600 font-medium hover:underline">
                              info@rightaidhealthfoundation.com
                           </a>
                        </div>
                        <div className="text-center p-6 bg-green-50 rounded-xl">
                           <FaMapMarkerAlt className="text-3xl text-green-600 mx-auto mb-3" />
                           <h3 className="font-bold text-gray-800 mb-1">Visit Us</h3>
                           <p className="text-gray-600 text-sm mb-2">485 Agege Motor Rd, Mafoluku Oshodi, Lagos, Nigeria</p>
                           <span className="text-green-600 font-medium">Headquarters</span>
                        </div>
                     </div>

                     {/* Contact Form Toggle */}
                     <div className="text-center">
                        <button
                           onClick={() => setShowContactForm(!showContactForm)}
                           className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition inline-flex items-center gap-2"
                        >
                           {showContactForm ? "Hide Form" : "Send a Message"} <FaArrowRight />
                        </button>
                     </div>

                     <AnimatePresence>
                        {showContactForm && (
                           <motion.form
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.4 }}
                              className="mt-8 overflow-hidden"
                              onSubmit={(e) => e.preventDefault()}
                           >
                              <div className="grid md:grid-cols-2 gap-4 mb-4">
                                 <input
                                    type="text"
                                    placeholder="Your Name"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                                 />
                                 <input
                                    type="email"
                                    placeholder="Your Email"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                                 />
                              </div>
                              <select className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 mb-4 text-gray-600">
                                 <option>Select Topic</option>
                                 <option>General Inquiry</option>
                                 <option>Volunteering</option>
                                 <option>Donations</option>
                                 <option>Partnerships</option>
                                 <option>Request Outreach</option>
                                 <option>Media & Press</option>
                              </select>
                              <textarea
                                 rows="4"
                                 placeholder="Your message..."
                                 className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 mb-4 resize-none"
                              ></textarea>
                              <button
                                 type="submit"
                                 className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
                              >
                                 Send Message
                              </button>
                           </motion.form>
                        )}
                     </AnimatePresence>
                  </motion.div>
               </div>
            </section>

            {/* RELATED RESOURCES */}
            <section className="py-16 px-6 bg-white">
               <div className="max-w-6xl mx-auto">
                  <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Related Resources</h2>
                  <div className="grid md:grid-cols-3 gap-6">
                     {[
                        {
                           icon: <FaFileAlt className="text-3xl text-green-600" />,
                           title: "Annual Reports",
                           desc: "Download our comprehensive annual reports detailing our impact, finances, and future plans.",
                           link: "#"
                        },
                        {
                           icon: <FaRegHospital className="text-3xl text-green-600" />,
                           title: "Service Directory",
                           desc: "A complete guide to all healthcare services we offer and how to access them.",
                           link: "/services"
                        },
                        {
                           icon: <FaHandHoldingHeart className="text-3xl text-green-600" />,
                           title: "Volunteer Handbook",
                           desc: "Everything you need to know about volunteering with RightAid, from application to deployment.",
                           link: "#"
                        }
                     ].map((resource, index) => (
                        <motion.div
                           key={index}
                           initial={{ opacity: 0, y: 20 }}
                           whileInView={{ opacity: 1, y: 0 }}
                           viewport={{ once: true }}
                           transition={{ delay: index * 0.1 }}
                           className="bg-gray-50 p-8 rounded-xl text-center hover:shadow-lg transition"
                        >
                           <div className="mb-4">{resource.icon}</div>
                           <h3 className="font-bold text-lg text-gray-800 mb-2">{resource.title}</h3>
                           <p className="text-gray-600 text-sm mb-4">{resource.desc}</p>
                           <a
                              href={resource.link}
                              className="text-green-600 font-medium text-sm hover:underline inline-flex items-center gap-1"
                           >
                              Learn More <FaArrowRight />
                           </a>
                        </motion.div>
                     ))}
                  </div>
               </div>
            </section>
         </div>
      </>
   );
}