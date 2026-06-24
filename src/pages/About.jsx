import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

import {
   FaHeartbeat,
   FaHandsHelping,
   FaUserMd,
   FaGlobeAfrica,
   FaBullseye,
   FaEye,
   FaHistory,
   FaUsers,
   FaAward,
   FaHandHoldingHeart,
   FaStethoscope,
   FaClinicMedical,
   FaSyringe,
   FaBaby,
   FaAmbulance,
   FaBookMedical,
   FaQuoteLeft,
   FaQuoteRight,
   FaCheckCircle,
   FaMapMarkerAlt,
   FaChevronLeft,
   FaChevronRight
} from "react-icons/fa";

// local images (src/about/)
import aboutImg1 from "../assets/about/doc5.jfif";
import aboutImg2 from "../assets/about/doc4.jfif";
import aboutImg3 from "../assets/about/doc6.jfif";

export default function About() {

   const images = [aboutImg1, aboutImg2, aboutImg3];

   const [currentImage, setCurrentImage] = useState(0);

   useEffect(() => {
      if (images.length === 0) return;

      const interval = setInterval(() => {
         setCurrentImage((prev) =>
            prev === images.length - 1 ? 0 : prev + 1
         );
      }, 3000);

      return () => clearInterval(interval);
   }, [images.length]);

   const nextImage = () => {
      setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
   };

   const prevImage = () => {
      setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
   };

   const services = [
      {
         icon: <FaStethoscope className="text-4xl text-green-600" />,
         title: "Primary Healthcare",
         description: "Comprehensive health screenings, diagnosis, and treatment for common illnesses in remote communities."
      },
      {
         icon: <FaSyringe className="text-4xl text-green-600" />,
         title: "Immunization Programs",
         description: "Vaccination drives for children and adults to prevent preventable diseases and epidemics."
      },
      {
         icon: <FaClinicMedical className="text-4xl text-green-600" />,
         title: "Surgical Outreach",
         description: "Free and subsidized surgical procedures including cataract removal, hernia repairs, and emergency surgeries."
      },
      {
         icon: <FaBaby className="text-4xl text-green-600" />,
         title: "Maternal & Child Health",
         description: "Antenatal care, safe delivery support, postnatal care, and pediatric services for mothers and children."
      },
      {
         icon: <FaAmbulance className="text-4xl text-green-600" />,
         title: "Emergency Response",
         description: "Rapid medical response during health crises, natural disasters, and disease outbreaks."
      },
      {
         icon: <FaBookMedical className="text-4xl text-green-600" />,
         title: "Health Education",
         description: "Community training on hygiene, nutrition, disease prevention, and healthy lifestyle practices."
      }
   ];

   const testimonials = [
      {
         quote: "RightAid saved my daughter's life during their outreach in Kano. They provided free surgery that we could never have afforded.",
         name: "Amina Ibrahim",
         location: "Kano State, Nigeria"
      },
      {
         quote: "As a volunteer doctor, I've seen firsthand the incredible impact RightAid makes in underserved communities.",
         name: "Dr. Chinedu Okonkwo",
         location: "Lagos State, Nigeria"
      },
      {
         quote: "The health education program transformed our village. We now understand the importance of clean water and sanitation.",
         name: "Emmanuel Ojo",
         location: "Oyo State, Nigeria"
      }
   ];

   const timeline = [
      { year: "2015", event: "RightAid Health Foundation founded in Lagos with a team of 5 volunteer doctors." },
      { year: "2017", event: "Expanded operations to 3 states, reaching over 5,000 patients through medical outreaches." },
      { year: "2019", event: "Launched surgical support program, completing first 100 free surgeries." },
      { year: "2021", event: "Partnered with international health organizations to scale impact across Nigeria." },
      { year: "2023", event: "Reached milestone of 20,000 patients served and 100+ medical missions completed." },
      { year: "2025", event: "Expanded to 50+ communities with dedicated emergency response teams." }
   ];

   const partners = [
      "Ministry of Health Nigeria",
      "WHO Nigeria",
      "UNICEF",
      "Doctors Without Borders",
      "Local Government Health Departments",
      "Private Healthcare Providers"
   ];

   return (
      <>
         <Helmet>
            <title>About Us | RightAid Health Foundation</title>
            <meta
               name="description"
               content="Learn about RightAid Health Foundation, our mission, vision, healthcare outreach programs, and impact across Nigeria."
            />
         </Helmet>

         {/* HERO */}
         <section className="bg-green-700 text-white py-24">
            <div className="container mx-auto px-6 text-center">
               <h1 className="text-5xl font-bold mb-6">
                  About RightAid Health Foundation
               </h1>

               <p className="max-w-3xl mx-auto text-lg text-green-100">
                  Dedicated to improving healthcare access and saving lives in underserved communities across Nigeria.
               </p>
            </div>
         </section>

         {/* WHO WE ARE */}
         <section className="py-20">
            <div className="container mx-auto px-6">
               <div className="grid md:grid-cols-2 gap-12 items-center">

                  {/* IMAGE SLIDER */}
                  <motion.div
                     initial={{ opacity: 0, x: -50 }}
                     whileInView={{ opacity: 1, x: 0 }}
                     viewport={{ once: true }}
                     transition={{ duration: 0.6 }}
                  >
                     <div className="relative overflow-hidden rounded-xl shadow-lg">

                        <img
                           src={images[currentImage]}
                           alt="About RightAid"
                           className="w-full h-[500px] object-cover transition-all duration-700"
                        />

                        {/* Navigation Arrows */}
                        <button
                           onClick={prevImage}
                           className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full transition"
                        >
                           <FaChevronLeft />
                        </button>
                        <button
                           onClick={nextImage}
                           className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full transition"
                        >
                           <FaChevronRight />
                        </button>

                        {/* dots */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                           {images.map((_, index) => (
                              <button
                                 key={index}
                                 onClick={() => setCurrentImage(index)}
                                 className={`w-3 h-3 rounded-full transition ${currentImage === index
                                    ? "bg-white"
                                    : "bg-white/50"
                                    }`}
                              />
                           ))}
                        </div>

                     </div>
                  </motion.div>

                  {/* TEXT */}
                  <motion.div
                     initial={{ opacity: 0, x: 50 }}
                     whileInView={{ opacity: 1, x: 0 }}
                     viewport={{ once: true }}
                     transition={{ duration: 0.6 }}
                  >
                     <h2 className="text-4xl font-bold mb-6">
                        Who We Are
                     </h2>

                     <p className="text-gray-600 leading-relaxed mb-4">
                        RightAid Health Foundation is a humanitarian NGO focused on delivering healthcare services, medical outreach, emergency care, and surgical assistance to underserved communities.
                     </p>

                     <p className="text-gray-600 leading-relaxed">
                        Through partnerships with healthcare professionals, volunteers, and donors, we bring life-saving medical interventions to people who need them most.
                     </p>

                     <div className="mt-8 grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-3">
                           <FaCheckCircle className="text-green-600 text-xl" />
                           <span className="text-gray-700 font-medium">Registered NGO</span>
                        </div>
                        <div className="flex items-center gap-3">
                           <FaCheckCircle className="text-green-600 text-xl" />
                           <span className="text-gray-700 font-medium">ISO Certified</span>
                        </div>
                        <div className="flex items-center gap-3">
                           <FaCheckCircle className="text-green-600 text-xl" />
                           <span className="text-gray-700 font-medium">Tax Exempt</span>
                        </div>
                        <div className="flex items-center gap-3">
                           <FaCheckCircle className="text-green-600 text-xl" />
                           <span className="text-gray-700 font-medium">WHO Partner</span>
                        </div>
                     </div>
                  </motion.div>

               </div>
            </div>
         </section>

         {/* MISSION & VISION */}
         <section className="bg-gray-50 py-20">
            <div className="container mx-auto px-6">
               <div className="grid md:grid-cols-2 gap-8">

                  <div className="bg-white p-8 rounded-xl shadow-md">
                     <FaBullseye className="text-green-600 text-5xl mb-4" />
                     <h3 className="text-2xl font-bold mb-3">Our Mission</h3>
                     <p className="text-gray-600">
                        At Right Aid Health Foundation, we are committed to delivering world-class charitable surgical and anaethesia services in low-resource communities. Our focus spans General Surgery, Paediatrics, Urology, Obstetrics, and Gynaecology, ensuring comprehensive care for those in need. We prioritize training healthcare professionals in perioperative care and strive to provide critical pain relief during surgery and labor, empowering communities with sustainable medical solutions.
                     </p>
                  </div>

                  <div className="bg-white p-8 rounded-xl shadow-md">
                     <FaEye className="text-green-600 text-5xl mb-4" />
                     <h3 className="text-2xl font-bold mb-3">Our Vision</h3>
                     <p className="text-gray-600">
                        A future where quality healthcare is accessible to everyone regardless of location, income, or social status.
                     </p>
                  </div>

               </div>
            </div>
         </section>

         {/* WHAT WE DO - SERVICES */}
         <section className="py-20 bg-white">
            <div className="container mx-auto px-6">
               <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="text-center mb-14"
               >
                  <h2 className="text-4xl font-bold mb-4">What We Do</h2>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                     We deliver comprehensive healthcare solutions through targeted programs designed to address the most pressing medical needs in underserved communities.
                  </p>
               </motion.div>

               <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {services.map((service, index) => (
                     <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="bg-gray-50 p-8 rounded-xl shadow hover:shadow-lg transition border border-gray-100"
                     >
                        <div className="mb-4">{service.icon}</div>
                        <h3 className="text-xl font-bold mb-3 text-gray-800">{service.title}</h3>
                        <p className="text-gray-600 leading-relaxed">{service.description}</p>
                     </motion.div>
                  ))}
               </div>
            </div>
         </section>

         {/* IMPACT */}
         <section className="py-20">
            <div className="container mx-auto px-6">
               <h2 className="text-4xl font-bold text-center mb-14">
                  Our Impact
               </h2>

               <div className="grid md:grid-cols-4 gap-8 text-center">

                  <div className="bg-white p-8 rounded-xl shadow">
                     <h3 className="text-4xl font-bold text-green-600">25K+</h3>
                     <p className="mt-2 text-gray-600">Patients Reached</p>
                  </div>

                  <div className="bg-white p-8 rounded-xl shadow">
                     <h3 className="text-4xl font-bold text-green-600">150+</h3>
                     <p className="mt-2 text-gray-600">Medical Missions</p>
                  </div>

                  <div className="bg-white p-8 rounded-xl shadow">
                     <h3 className="text-4xl font-bold text-green-600">500+</h3>
                     <p className="mt-2 text-gray-600">Surgeries Supported</p>
                  </div>

                  <div className="bg-white p-8 rounded-xl shadow">
                     <h3 className="text-4xl font-bold text-green-600">50+</h3>
                     <p className="mt-2 text-gray-600">Communities Served</p>
                  </div>

               </div>
            </div>
         </section>

         {/* VALUES */}
         <section className="bg-green-50 py-20">
            <div className="container mx-auto px-6">
               <h2 className="text-4xl font-bold text-center mb-14">
                  Our Core Values
               </h2>

               <div className="grid md:grid-cols-4 gap-8">

                  <div className="bg-white p-8 rounded-xl shadow text-center">
                     <FaHeartbeat className="mx-auto text-5xl text-green-600 mb-4" />
                     <h3 className="font-bold">Compassion</h3>
                  </div>

                  <div className="bg-white p-8 rounded-xl shadow text-center">
                     <FaHandsHelping className="mx-auto text-5xl text-green-600 mb-4" />
                     <h3 className="font-bold">Service</h3>
                  </div>

                  <div className="bg-white p-8 rounded-xl shadow text-center">
                     <FaUserMd className="mx-auto text-5xl text-green-600 mb-4" />
                     <h3 className="font-bold">Professionalism</h3>
                  </div>

                  <div className="bg-white p-8 rounded-xl shadow text-center">
                     <FaGlobeAfrica className="mx-auto text-5xl text-green-600 mb-4" />
                     <h3 className="font-bold">Community Impact</h3>
                  </div>

               </div>
            </div>
         </section>

         {/* OUR HISTORY - TIMELINE */}
         <section className="py-20 bg-white">
            <div className="container mx-auto px-6">
               <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="text-center mb-14"
               >
                  <FaHistory className="mx-auto text-5xl text-green-600 mb-4" />
                  <h2 className="text-4xl font-bold mb-4">Our Journey</h2>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                     From a small volunteer group to a nationwide health foundation, our journey has been defined by commitment, growth, and lives transformed.
                  </p>
               </motion.div>

               <div className="max-w-4xl mx-auto">
                  {timeline.map((item, index) => (
                     <motion.div
                        key={index}
                        initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="flex gap-6 mb-8 last:mb-0"
                     >
                        <div className="flex flex-col items-center">
                           <div className="w-4 h-4 bg-green-600 rounded-full"></div>
                           {index !== timeline.length - 1 && (
                              <div className="w-0.5 h-full bg-green-200 mt-2"></div>
                           )}
                        </div>
                        <div className="pb-8">
                           <span className="inline-block bg-green-600 text-white px-3 py-1 rounded-full text-sm font-bold mb-2">
                              {item.year}
                           </span>
                           <p className="text-gray-700 leading-relaxed">{item.event}</p>
                        </div>
                     </motion.div>
                  ))}
               </div>
            </div>
         </section>

         {/* TESTIMONIALS */}
         <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-6">
               <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="text-center mb-14"
               >
                  <h2 className="text-4xl font-bold mb-4">Stories of Impact</h2>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                     Real stories from real people whose lives have been touched by our work.
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
                        className="bg-white p-8 rounded-xl shadow-md relative"
                     >
                        <FaQuoteLeft className="text-green-200 text-3xl mb-4" />
                        <p className="text-gray-700 italic leading-relaxed mb-6">
                           {item.quote}
                        </p>
                        <FaQuoteRight className="text-green-200 text-3xl ml-auto" />
                        <div className="mt-6 pt-6 border-t border-gray-100">
                           <h4 className="font-bold text-gray-800">{item.name}</h4>
                           <div className="flex items-center gap-2 text-gray-500 text-sm mt-1">
                              <FaMapMarkerAlt />
                              <span>{item.location}</span>
                           </div>
                        </div>
                     </motion.div>
                  ))}
               </div>
            </div>
         </section>

         {/* TEAM PREVIEW */}
         <section className="py-20 bg-white">
            <div className="container mx-auto px-6">
               <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="text-center mb-14"
               >
                  <FaUsers className="mx-auto text-5xl text-green-600 mb-4" />
                  <h2 className="text-4xl font-bold mb-4">Our Leadership</h2>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                     Guided by experienced healthcare professionals and dedicated administrators committed to our mission.
                  </p>
               </motion.div>

               <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                  {[
                     { role: "Founder & Executive Director", name: "Dr. [Name]", desc: "Public health specialist with 15+ years in community medicine." },
                     { role: "Medical Director", name: "Dr. [Name]", desc: "Lead surgeon overseeing all surgical outreach programs." },
                     { role: "Operations Director", name: "[Name]", desc: "Manages logistics, partnerships, and field operations." }
                  ].map((member, index) => (
                     <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="bg-gray-50 p-8 rounded-xl text-center border border-gray-100"
                     >
                        <div className="w-20 h-20 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                           <FaUserMd className="text-3xl text-green-600" />
                        </div>
                        <h3 className="font-bold text-lg text-gray-800">{member.name}</h3>
                        <p className="text-green-600 font-medium text-sm mb-3">{member.role}</p>
                        <p className="text-gray-600 text-sm">{member.desc}</p>
                     </motion.div>
                  ))}
               </div>
            </div>
         </section>

         {/* PARTNERS & COLLABORATIONS */}
         <section className="py-20 bg-green-50">
            <div className="container mx-auto px-6">
               <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="text-center mb-14"
               >
                  <FaAward className="mx-auto text-5xl text-green-600 mb-4" />
                  <h2 className="text-4xl font-bold mb-4">Our Partners</h2>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                     We collaborate with government agencies, international organizations, and private sector partners to maximize our impact.
                  </p>
               </motion.div>

               <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
                  {partners.map((partner, index) => (
                     <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className="bg-white p-6 rounded-xl shadow flex items-center gap-4"
                     >
                        <FaHandHoldingHeart className="text-2xl text-green-600 flex-shrink-0" />
                        <span className="font-medium text-gray-700">{partner}</span>
                     </motion.div>
                  ))}
               </div>
            </div>
         </section>

         {/* WHY CHOOSE US */}
         <section className="py-20 bg-white">
            <div className="container mx-auto px-6">
               <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="text-center mb-14"
               >
                  <h2 className="text-4xl font-bold mb-4">Why RightAid?</h2>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                     We combine medical expertise with deep community understanding to deliver sustainable healthcare solutions.
                  </p>
               </motion.div>

               <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                  {[
                     { title: "Community-First Approach", desc: "We work within communities, not just for them. Local volunteers and leaders are integral to every program." },
                     { title: "Sustainable Programs", desc: "We don't just treat; we train. Our health education ensures lasting impact beyond each visit." },
                     { title: "Transparent Operations", desc: "Every donation and resource is accounted for. We publish annual impact reports for full transparency." },
                     { title: "Rapid Response Capability", desc: "Our mobile medical units can deploy within 24 hours to emergency situations anywhere in Nigeria." }
                  ].map((item, index) => (
                     <motion.div
                        key={index}
                        initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="flex gap-4"
                     >
                        <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                           <FaCheckCircle className="text-green-600 text-xl" />
                        </div>
                        <div>
                           <h3 className="font-bold text-lg text-gray-800 mb-2">{item.title}</h3>
                           <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                        </div>
                     </motion.div>
                  ))}
               </div>
            </div>
         </section>

         {/* CTA */}
         <section className="bg-green-800 text-white py-20">
            <div className="container mx-auto px-6 text-center">

               <h2 className="text-4xl font-bold mb-4">
                  Join Our Mission
               </h2>

               <p className="max-w-2xl mx-auto mb-8 text-green-100">
                  Together we can bring healthcare, hope, and healing to vulnerable communities.
               </p>

               <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="bg-white text-green-700 px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition">
                     Become a Partner
                  </button>
                  <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold hover:bg-white hover:text-green-700 transition">
                     Donate Now
                  </button>
               </div>

            </div>
         </section>
      </>
   );
}