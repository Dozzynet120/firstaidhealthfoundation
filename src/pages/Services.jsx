import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import {
   FaStethoscope,
   FaProcedures,
   FaTooth,
   FaBullhorn,
   FaHeartbeat,
   FaUsers,
   FaMapMarkerAlt,
   FaFileAlt,
   FaAmbulance,
   FaSyringe,
   FaBaby,
   FaBrain,
   FaEye,
   FaHandHoldingHeart,
   FaUserNurse,
   FaPhoneAlt,
   FaCalendarCheck,
   FaArrowRight,
   FaCheckCircle,
   FaQuoteLeft,
   FaQuoteRight,
   FaRegClock,
   FaShieldAlt,
   FaRegHospital,
   FaChild,
   FaHandsHelping,
   FaGlobeAfrica,
   FaChartLine,
   FaPills,
   FaWheelchair,
   FaLungs,
} from "react-icons/fa";

import { motion } from "framer-motion";

// Import your local images (10 images from src/assets/about/)
import aboutImg1 from "../assets/about/1.jpg";
import aboutImg2 from "../assets/about/2.jpg";
import aboutImg3 from "../assets/about/3.jpg";
import aboutImg4 from "../assets/about/4.jpg";
import aboutImg5 from "../assets/about/5.jpg";
import aboutImg6 from "../assets/about/6.jpg";
import aboutImg7 from "../assets/about/7.jpg";
import aboutImg8 from "../assets/about/8.jpg";
import aboutImg9 from "../assets/about/9.jpg";
import aboutImg10 from "../assets/about/10.jpg";

export default function Services() {

   const infoBlocks = [
      {
         title: "Mission & Vision",
         icon: <FaHeartbeat />,
         text: "At Right Aid Health Foundation, we are committed to delivering world-class charitable surgical and anaethesia services in low-resource communities. Our focus spans General Surgery, Paediatrics, Urology, Obstetrics, and Gynaecology, ensuring comprehensive care for those in need. We prioritize training healthcare professionals in perioperative care and strive to provide critical pain relief during surgery and labor, empowering communities with sustainable medical solutions.",
      },
      {
         title: "Who We Are",
         icon: <FaUsers />,
         text: "A humanitarian NGO focused on healthcare outreach and surgical support.",
      },
      {
         title: "What We Do",
         icon: <FaStethoscope />,
         text: "Medical outreach, emergency care, and surgical assistance programs.",
      },
      {
         title: "Where We Work",
         icon: <FaMapMarkerAlt />,
         text: "Rural and underserved communities across Nigeria.",
      },
      {
         title: "Resources",
         icon: <FaFileAlt />,
         text: "Reports, health guides, and community education materials.",
      },
   ];

   const services = [
      {
         title: "General Medical Consultation & Counselling",
         icon: <FaStethoscope />,
         img: aboutImg1,
      },
      {
         title: "Surgical Outreach Programs",
         icon: <FaProcedures />,
         img: aboutImg2,
      },
      {
         title: "Pharmacy",
         icon: <FaTooth />,
         img: aboutImg3,
      },
      {
         title: "Med. Lab/ Diagnostic Services",
         icon: <FaBullhorn />,
         img: aboutImg4,
      },
      {
         title: "Cervical screening",
         icon: <FaPills />,
         img: aboutImg5,
      },
      {
         title: "Health Education",
         icon: <FaWheelchair />,
         img: aboutImg6,
      },
      {
         title: "Eye Cataract",
         icon: <FaEye />,
         img: aboutImg7,
      },
      {
         title: "Fibroid",
         icon: <FaLungs />,
         img: aboutImg8,
      },
      {
         title: "Goitre",
         icon: <FaHeartbeat />,
         img: aboutImg9,
      },
      {
         title: "Breast Cancer",
         icon: <FaSyringe />,
         img: aboutImg10,
      },
   ];

   const detailedServices = [
      {
         title: "Primary Healthcare Services",
         icon: <FaStethoscope className="text-4xl text-green-600" />,
         description: "Comprehensive health screenings, diagnosis, and treatment for common illnesses including malaria, typhoid, hypertension, and diabetes in remote communities.",
         features: ["General health checkups", "Chronic disease management", "Medication dispensing", "Referral services"],
         stats: "15,000+ patients treated"
      },
      {
         title: "Emergency Medical Response",
         icon: <FaAmbulance className="text-4xl text-green-600" />,
         description: "Rapid deployment of mobile medical units during health crises, natural disasters, and disease outbreaks with fully equipped emergency teams.",
         features: ["24/7 emergency hotline", "Mobile clinics", "Trauma care", "Ambulance services"],
         stats: "500+ emergencies handled"
      },
      {
         title: "Immunization & Vaccination",
         icon: <FaSyringe className="text-4xl text-green-600" />,
         description: "Large-scale vaccination drives for children and adults to prevent polio, measles, hepatitis, COVID-19, and other preventable diseases.",
         features: ["Childhood immunization", "Adult vaccination", "COVID-19 vaccines", "Health record tracking"],
         stats: "8,000+ vaccines administered"
      },
      {
         title: "Maternal & Child Health",
         icon: <FaBaby className="text-4xl text-green-600" />,
         description: "Complete care for mothers and children including antenatal services, safe delivery support, postnatal care, and pediatric screenings.",
         features: ["Antenatal care", "Skilled birth attendance", "Postnatal support", "Pediatric nutrition"],
         stats: "2,500+ safe deliveries"
      },
      {
         title: "Mental Health Support",
         icon: <FaBrain className="text-4xl text-green-600" />,
         description: "Counseling, therapy sessions, and community mental health programs addressing depression, anxiety, trauma, and substance abuse.",
         features: ["Individual counseling", "Group therapy", "Crisis intervention", "Community awareness"],
         stats: "1,200+ sessions conducted"
      },
      {
         title: "Eye Care & Vision Services",
         icon: <FaEye className="text-4xl text-green-600" />,
         description: "Comprehensive eye examinations, cataract surgeries, prescription glasses distribution, and treatment for common eye conditions.",
         features: ["Eye screenings", "Cataract removal", "Free eyeglasses", "Glaucoma treatment"],
         stats: "3,000+ eye surgeries"
      }
   ];

   const surgicalPrograms = [
      {
         category: "General Surgery",
         procedures: ["Hernia repairs", "Appendectomies", "Tumor removals", "Wound debridement"],
         icon: <FaProcedures className="text-3xl text-green-600" />
      },
      {
         category: "Ophthalmic Surgery",
         procedures: ["Cataract extraction", "Pterygium removal", "Glaucoma surgery", "Trauma repair"],
         icon: <FaEye className="text-3xl text-green-600" />
      },
      {
         category: "Obstetric & Gynecological",
         procedures: ["Cesarean sections", "Fibroid removal", "Cervical cancer screening", "Family planning"],
         icon: <FaRegHospital className="text-3xl text-green-600" />
      },
      {
         category: "Pediatric Surgery",
         procedures: ["Cleft lip/palate repair", "Congenital defect correction", "Burn reconstruction", "Hydrocele repair"],
         icon: <FaChild className="text-3xl text-green-600" />
      }
   ];

   const processSteps = [
      {
         step: "01",
         title: "Community Assessment",
         desc: "We conduct needs assessments to identify healthcare gaps in target communities.",
         icon: <FaMapMarkerAlt className="text-2xl" />
      },
      {
         step: "02",
         title: "Program Planning",
         desc: "Our medical team designs tailored intervention programs based on community needs.",
         icon: <FaCalendarCheck className="text-2xl" />
      },
      {
         step: "03",
         title: "Mobilization",
         desc: "We deploy medical personnel, equipment, and supplies to the target location.",
         icon: <FaAmbulance className="text-2xl" />
      },
      {
         step: "04",
         title: "Service Delivery",
         desc: "Direct healthcare services are provided to community members on-site.",
         icon: <FaUserNurse className="text-2xl" />
      },
      {
         step: "05",
         title: "Follow-up Care",
         desc: "We ensure continuity of care through referrals and post-treatment monitoring.",
         icon: <FaPhoneAlt className="text-2xl" />
      }
   ];

   const testimonials = [
      {
         quote: "RightAid's surgical team saved my father's life with a free hernia operation. We had no money for hospital bills.",
         name: "Grace Emmanuel",
         role: "Beneficiary",
         location: "Benue State",
         img: aboutImg5,
      },
      {
         quote: "The vaccination program protected all the children in our village. No child has had measles since their visit.",
         name: "Alhaji Musa Ibrahim",
         role: "Community Leader",
         location: "Katsina State",
         img: aboutImg6,
      },
      {
         quote: "As a volunteer nurse, I've seen how RightAid transforms communities. Their approach is professional and compassionate.",
         name: "Nurse Fatima Bello",
         role: "Volunteer",
         location: "Kaduna State",
         img: aboutImg7,
      }
   ];

   const impactHighlights = [
      { number: "25,000+", label: "Patients Treated", icon: <FaStethoscope /> },
      { number: "500+", label: "Surgeries Completed", icon: <FaProcedures /> },
      { number: "150+", label: "Medical Missions", icon: <FaAmbulance /> },
      { number: "50+", label: "Communities Served", icon: <FaMapMarkerAlt /> },
      { number: "8,000+", label: "Vaccines Given", icon: <FaSyringe /> },
      { number: "2,500+", label: "Safe Deliveries", icon: <FaBaby /> }
   ];

   const eligibilityCriteria = [
      "Residents of underserved or rural communities",
      "Low-income families without health insurance",
      "Persons with chronic conditions requiring ongoing care",
      "Pregnant women in need of antenatal and delivery services",
      "Children requiring immunization or pediatric care",
      "Emergency cases in disaster-affected areas"
   ];

   return (
      <>
         {/* SEO */}
         <Helmet>
            <title>Services | RightAid Health Foundation</title>
            <meta
               name="description"
               content="Healthcare outreach, surgeries, and humanitarian medical services across Nigeria."
            />
         </Helmet>

         <section className="min-h-screen bg-gray-50">

            {/* HERO SECTION */}
            <div className="bg-green-700 text-white py-24 px-6">
               <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="max-w-5xl mx-auto text-center"
               >
                  <h1 className="text-5xl font-bold mb-6">
                     Our Services & Impact
                  </h1>
                  <p className="text-lg text-green-100 max-w-3xl mx-auto leading-relaxed">
                     We deliver comprehensive healthcare, education, and life-saving outreach to underserved communities across Nigeria. From routine checkups to complex surgeries, our programs are designed to reach those who need care the most.
                  </p>
                  <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                     <Link
                        to="/donate"
                        className="bg-white text-green-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition inline-flex items-center gap-2"
                     >
                        Support Our Mission <FaArrowRight />
                     </Link>
                     <Link
                        to="/contact"
                        className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-700 transition"
                     >
                        Request Outreach
                     </Link>
                  </div>
               </motion.div>
            </div>

            {/* INFO CARDS */}
            <div className="px-6 py-20">
               <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">

                  {infoBlocks.map((item, i) => (
                     <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1, duration: 0.5 }}
                        className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl hover:-translate-y-1 transition"
                     >
                        <div className="text-green-600 text-3xl">
                           {item.icon}
                        </div>

                        <h3 className="mt-3 font-bold text-green-700 text-lg">
                           {item.title}
                        </h3>

                        <p className="mt-2 text-gray-600 text-sm">
                           {item.text}
                        </p>
                     </motion.div>
                  ))}

               </div>
            </div>

            {/* SERVICES GRID - 10 IMAGES */}
            <div className="px-6 pb-20">
               <div className="max-w-6xl mx-auto">
                  <motion.div
                     initial={{ opacity: 0, y: 30 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true }}
                     className="text-center mb-12"
                  >
                     <h2 className="text-4xl font-bold text-gray-800 mb-4">Core Service Areas</h2>
                     <p className="text-gray-600 max-w-2xl mx-auto">
                        Our flagship programs addressing the most critical healthcare needs in rural Nigeria.
                     </p>
                  </motion.div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

                     {services.map((s, i) => (
                        <motion.div
                           key={i}
                           initial={{ opacity: 0, scale: 0.95 }}
                           whileInView={{ opacity: 1, scale: 1 }}
                           viewport={{ once: true }}
                           transition={{ delay: i * 0.1 }}
                           className="relative rounded-xl overflow-hidden shadow-lg group aspect-[4/3]"
                        >

                           <img
                              src={s.img}
                              alt={s.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                           />

                           <div className="absolute inset-0 bg-black/50 group-hover:bg-black/70 transition"></div>

                           <div className="absolute bottom-0 p-5 text-white">

                              <div className="text-green-300 text-2xl mb-2">
                                 {s.icon}
                              </div>

                              <h2 className="text-lg font-bold">
                                 {s.title}
                              </h2>

                              <p className="text-sm text-gray-200 mt-1 line-clamp-2">
                                 {s.desc}
                              </p>

                           </div>

                        </motion.div>
                     ))}

                  </div>
               </div>
            </div>

            {/* DETAILED SERVICES */}
            <div className="bg-white px-6 py-20">
               <div className="max-w-6xl mx-auto">
                  <motion.div
                     initial={{ opacity: 0, y: 30 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true }}
                     className="text-center mb-14"
                  >
                     <h2 className="text-4xl font-bold text-gray-800 mb-4">Comprehensive Healthcare Programs</h2>
                     <p className="text-gray-600 max-w-3xl mx-auto">
                        Beyond our core services, we run specialized programs targeting specific health needs in underserved populations.
                     </p>
                  </motion.div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                     {detailedServices.map((service, index) => (
                        <motion.div
                           key={index}
                           initial={{ opacity: 0, y: 30 }}
                           whileInView={{ opacity: 1, y: 0 }}
                           viewport={{ once: true }}
                           transition={{ duration: 0.5, delay: index * 0.1 }}
                           className="bg-gray-50 rounded-xl p-8 border border-gray-100 hover:shadow-lg transition"
                        >
                           <div className="mb-4">{service.icon}</div>
                           <h3 className="text-xl font-bold text-gray-800 mb-3">{service.title}</h3>
                           <p className="text-gray-600 text-sm leading-relaxed mb-4">{service.description}</p>
                           <ul className="space-y-2 mb-6">
                              {service.features.map((feature, fIndex) => (
                                 <li key={fIndex} className="flex items-center gap-2 text-sm text-gray-700">
                                    <FaCheckCircle className="text-green-500 text-xs flex-shrink-0" />
                                    {feature}
                                 </li>
                              ))}
                           </ul>
                           <div className="pt-4 border-t border-gray-200">
                              <span className="text-green-600 font-bold text-sm flex items-center gap-2">
                                 <FaChartLine /> {service.stats}
                              </span>
                           </div>
                        </motion.div>
                     ))}
                  </div>
               </div>
            </div>

            {/* SURGICAL PROGRAMS */}
            <div className="bg-green-50 px-6 py-20">
               <div className="max-w-6xl mx-auto">
                  <motion.div
                     initial={{ opacity: 0, y: 30 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true }}
                     className="text-center mb-14"
                  >
                     <FaProcedures className="mx-auto text-5xl text-green-600 mb-4" />
                     <h2 className="text-4xl font-bold text-gray-800 mb-4">Surgical Outreach Programs</h2>
                     <p className="text-gray-600 max-w-3xl mx-auto">
                        Our mobile surgical teams bring life-saving operations to communities without access to surgical facilities. All procedures are performed by certified surgeons with full anesthesia and post-operative care.
                     </p>
                  </motion.div>

                  <div className="grid md:grid-cols-2 gap-8">
                     {surgicalPrograms.map((program, index) => (
                        <motion.div
                           key={index}
                           initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                           whileInView={{ opacity: 1, x: 0 }}
                           viewport={{ once: true }}
                           transition={{ duration: 0.5, delay: index * 0.1 }}
                           className="bg-white p-8 rounded-xl shadow-md"
                        >
                           <div className="flex items-center gap-4 mb-4">
                              {program.icon}
                              <h3 className="text-xl font-bold text-gray-800">{program.category}</h3>
                           </div>
                           <ul className="space-y-3">
                              {program.procedures.map((proc, pIndex) => (
                                 <li key={pIndex} className="flex items-center gap-3 text-gray-600">
                                    <FaCheckCircle className="text-green-500 flex-shrink-0" />
                                    {proc}
                                 </li>
                              ))}
                           </ul>
                        </motion.div>
                     ))}
                  </div>
               </div>
            </div>

            {/* HOW IT WORKS */}
            <div className="bg-white px-6 py-20">
               <div className="max-w-6xl mx-auto">
                  <motion.div
                     initial={{ opacity: 0, y: 30 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true }}
                     className="text-center mb-14"
                  >
                     <h2 className="text-4xl font-bold text-gray-800 mb-4">How Our Programs Work</h2>
                     <p className="text-gray-600 max-w-2xl mx-auto">
                        From planning to execution, every outreach follows a structured process to ensure maximum impact and quality care.
                     </p>
                  </motion.div>

                  <div className="grid md:grid-cols-5 gap-4">
                     {processSteps.map((step, index) => (
                        <motion.div
                           key={index}
                           initial={{ opacity: 0, y: 30 }}
                           whileInView={{ opacity: 1, y: 0 }}
                           viewport={{ once: true }}
                           transition={{ duration: 0.5, delay: index * 0.1 }}
                           className="text-center"
                        >
                           <div className="w-16 h-16 bg-green-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white">
                              {step.icon}
                           </div>
                           <span className="text-green-600 font-bold text-sm">{step.step}</span>
                           <h3 className="font-bold text-gray-800 mt-2 mb-2">{step.title}</h3>
                           <p className="text-gray-600 text-sm leading-relaxed">{step.desc}</p>
                           {index < processSteps.length - 1 && (
                              <div className="hidden md:block absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2">
                                 <FaArrowRight className="text-green-300" />
                              </div>
                           )}
                        </motion.div>
                     ))}
                  </div>
               </div>
            </div>

            {/* IMPACT STATS */}
            <div className="bg-green-700 text-white px-6 py-20">
               <div className="max-w-6xl mx-auto">
                  <motion.div
                     initial={{ opacity: 0, y: 30 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true }}
                     className="text-center mb-14"
                  >
                     <h2 className="text-4xl font-bold mb-4">Our Impact in Numbers</h2>
                     <p className="text-green-100 max-w-2xl mx-auto">
                        Every number represents a life touched, a family helped, and a community strengthened.
                     </p>
                  </motion.div>

                  <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-8 text-center">
                     {impactHighlights.map((item, index) => (
                        <motion.div
                           key={index}
                           initial={{ opacity: 0, scale: 0.9 }}
                           whileInView={{ opacity: 1, scale: 1 }}
                           viewport={{ once: true }}
                           transition={{ duration: 0.4, delay: index * 0.1 }}
                        >
                           <div className="text-green-300 text-3xl mb-3">{item.icon}</div>
                           <h3 className="text-3xl font-bold mb-1">{item.number}</h3>
                           <p className="text-green-100 text-sm">{item.label}</p>
                        </motion.div>
                     ))}
                  </div>
               </div>
            </div>

            {/* ELIGIBILITY */}
            <div className="bg-gray-50 px-6 py-20">
               <div className="max-w-4xl mx-auto">
                  <motion.div
                     initial={{ opacity: 0, y: 30 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true }}
                     className="text-center mb-14"
                  >
                     <h2 className="text-4xl font-bold text-gray-800 mb-4">Who Can Access Our Services?</h2>
                     <p className="text-gray-600 max-w-2xl mx-auto">
                        Our programs are designed to serve the most vulnerable. Here is who qualifies for our free and subsidized healthcare services.
                     </p>
                  </motion.div>

                  <div className="bg-white rounded-xl shadow-md p-8">
                     <div className="grid md:grid-cols-2 gap-4">
                        {eligibilityCriteria.map((criteria, index) => (
                           <motion.div
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.4, delay: index * 0.1 }}
                              className="flex items-center gap-3 p-3"
                           >
                              <FaCheckCircle className="text-green-600 flex-shrink-0" />
                              <span className="text-gray-700">{criteria}</span>
                           </motion.div>
                        ))}
                     </div>
                  </div>
               </div>
            </div>

            {/* TESTIMONIALS WITH IMAGES */}
            <div className="bg-white px-6 py-20">
               <div className="max-w-6xl mx-auto">
                  <motion.div
                     initial={{ opacity: 0, y: 30 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true }}
                     className="text-center mb-14"
                  >
                     <h2 className="text-4xl font-bold text-gray-800 mb-4">Stories from the Field</h2>
                     <p className="text-gray-600 max-w-2xl mx-auto">
                        Hear from the communities and volunteers who have experienced our work firsthand.
                     </p>
                  </motion.div>

                  <div className="grid md:grid-cols-3 gap-8">
                     {testimonials.map((item, index) => (
                        <motion.div
                           key={index}
                           initial={{ opacity: 0, y: 30 }}
                           whileInView={{ opacity: 1, y: 0 }}
                           viewport={{ once: true }}
                           transition={{ duration: 0.5, delay: index * 0.15 }}
                           className="bg-gray-50 rounded-xl border border-gray-100 overflow-hidden"
                        >
                           <div className="h-48 overflow-hidden">
                              <img
                                 src={item.img}
                                 alt={item.name}
                                 className="w-full h-full object-cover"
                              />
                           </div>
                           <div className="p-6">
                              <FaQuoteLeft className="text-green-200 text-2xl mb-4" />
                              <p className="text-gray-700 italic leading-relaxed mb-6">
                                 {item.quote}
                              </p>
                              <FaQuoteRight className="text-green-200 text-2xl ml-auto mb-4" />
                              <div className="pt-4 border-t border-gray-200">
                                 <h4 className="font-bold text-gray-800">{item.name}</h4>
                                 <p className="text-green-600 text-sm">{item.role}</p>
                                 <div className="flex items-center gap-2 text-gray-500 text-sm mt-1">
                                    <FaMapMarkerAlt />
                                    <span>{item.location}</span>
                                 </div>
                              </div>
                           </div>
                        </motion.div>
                     ))}
                  </div>
               </div>
            </div>

            {/* TRUST BADGES */}
            <div className="bg-green-50 px-6 py-16">
               <div className="max-w-6xl mx-auto">
                  <div className="grid md:grid-cols-4 gap-8 text-center">
                     {[
                        { icon: <FaShieldAlt />, title: "Certified Medical Team", desc: "Licensed doctors & nurses" },
                        { icon: <FaRegClock />, title: "Rapid Response", desc: "24-48 hour deployment" },
                        { icon: <FaHandsHelping />, title: "Community Driven", desc: "Local volunteer networks" },
                        { icon: <FaGlobeAfrica />, title: "Nationwide Reach", desc: "All 36 states + FCT" }
                     ].map((badge, index) => (
                        <motion.div
                           key={index}
                           initial={{ opacity: 0, y: 20 }}
                           whileInView={{ opacity: 1, y: 0 }}
                           viewport={{ once: true }}
                           transition={{ duration: 0.4, delay: index * 0.1 }}
                           className="flex flex-col items-center"
                        >
                           <div className="text-green-600 text-3xl mb-3">{badge.icon}</div>
                           <h3 className="font-bold text-gray-800">{badge.title}</h3>
                           <p className="text-gray-600 text-sm mt-1">{badge.desc}</p>
                        </motion.div>
                     ))}
                  </div>
               </div>
            </div>

            {/* CTA */}
            <motion.div
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="text-center py-20 px-6 bg-green-700"
            >
               <div className="max-w-3xl mx-auto">
                  <h2 className="text-3xl font-bold text-white mb-4">Ready to Make a Difference?</h2>
                  <p className="text-green-100 mb-8">
                     Whether you want to donate, volunteer, or request a medical outreach for your community, we're here to help.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                     <Link
                        to="/donate"
                        className="bg-white text-green-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition inline-flex items-center justify-center gap-2"
                     >
                        Donate Now <FaHandHoldingHeart />
                     </Link>
                     <Link
                        to="/volunteer"
                        className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-700 transition inline-flex items-center justify-center gap-2"
                     >
                        Become a Volunteer <FaUsers />
                     </Link>
                  </div>
               </div>
            </motion.div>

         </section>
      </>
   );
}