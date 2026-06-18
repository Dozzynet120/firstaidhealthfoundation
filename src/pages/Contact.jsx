import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { motion } from "framer-motion";
import {
   FaMapMarkerAlt,
   FaPhoneAlt,
   FaEnvelope,
   FaClock,
   FaFacebook,
   FaTwitter,
   FaInstagram,
   FaLinkedin,
   FaWhatsapp,
   FaPaperPlane,
   FaUser,
   FaBuilding,
   FaCommentDots,
   FaCheckCircle,
   FaExclamationCircle,
   FaSpinner,
   FaHeart,
   FaHandHoldingHeart,
   FaStethoscope,
   FaGlobeAfrica,
   FaArrowRight
} from "react-icons/fa";

// ============================================
// CONTACT FORM COMPONENT
// ============================================
function ContactForm() {
   const [formData, setFormData] = useState({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      inquiryType: "general"
   });

   const [errors, setErrors] = useState({});
   const [isSubmitting, setIsSubmitting] = useState(false);
   const [isSubmitted, setIsSubmitted] = useState(false);

   const validate = () => {
      const newErrors = {};
      if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
      if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
      if (!formData.email.trim()) {
         newErrors.email = "Email is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
         newErrors.email = "Please enter a valid email";
      }
      if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
      if (!formData.subject.trim()) newErrors.subject = "Subject is required";
      if (!formData.message.trim()) {
         newErrors.message = "Message is required";
      } else if (formData.message.length < 20) {
         newErrors.message = "Message must be at least 20 characters";
      }
      return newErrors;
   };

   const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
      // Clear error when user starts typing
      if (errors[name]) {
         setErrors(prev => ({ ...prev, [name]: "" }));
      }
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      const validationErrors = validate();
      if (Object.keys(validationErrors).length > 0) {
         setErrors(validationErrors);
         return;
      }

      setIsSubmitting(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsSubmitting(false);
      setIsSubmitted(true);
   };

   const resetForm = () => {
      setFormData({
         firstName: "",
         lastName: "",
         email: "",
         phone: "",
         subject: "",
         message: "",
         inquiryType: "general"
      });
      setErrors({});
      setIsSubmitted(false);
   };

   if (isSubmitted) {
      return (
         <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-lg p-8 md:p-12 text-center"
         >
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
               <FaCheckCircle className="text-5xl text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">Message Sent Successfully!</h3>
            <p className="text-gray-600 mb-2">
               Thank you for reaching out, <span className="font-semibold text-green-600">{formData.firstName}</span>.
            </p>
            <p className="text-gray-500 text-sm mb-8 max-w-md mx-auto">
               We've received your message and will get back to you within 24 hours. A confirmation email has been sent to {formData.email}.
            </p>
            <div className="bg-green-50 rounded-xl p-6 mb-8 text-left">
               <h4 className="font-bold text-gray-800 mb-3">What happens next?</h4>
               <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                     <FaCheckCircle className="text-green-500 mt-0.5 flex-shrink-0" />
                     <span>Our team reviews your inquiry within 4 hours</span>
                  </li>
                  <li className="flex items-start gap-2">
                     <FaCheckCircle className="text-green-500 mt-0.5 flex-shrink-0" />
                     <span>A dedicated representative is assigned to your case</span>
                  </li>
                  <li className="flex items-start gap-2">
                     <FaCheckCircle className="text-green-500 mt-0.5 flex-shrink-0" />
                     <span>You'll receive a detailed response via email or phone</span>
                  </li>
                  <li className="flex items-start gap-2">
                     <FaCheckCircle className="text-green-500 mt-0.5 flex-shrink-0" />
                     <span>For urgent matters, call our 24/7 hotline</span>
                  </li>
               </ul>
            </div>
            <button
               onClick={resetForm}
               className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition inline-flex items-center gap-2"
            >
               Send Another Message <FaArrowRight />
            </button>
         </motion.div>
      );
   }

   return (
      <motion.form
         initial={{ opacity: 0, y: 30 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.5 }}
         onSubmit={handleSubmit}
         className="bg-white rounded-2xl shadow-lg p-6 md:p-8"
         noValidate
      >
         <h3 className="text-2xl font-bold text-gray-800 mb-2">Send Us a Message</h3>
         <p className="text-gray-500 text-sm mb-6">
            Fill out the form below and we'll get back to you as soon as possible.
         </p>

         {/* Inquiry Type */}
         <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
               Inquiry Type <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
               {[
                  { value: "general", label: "General Inquiry", icon: <FaCommentDots /> },
                  { value: "volunteer", label: "Volunteer", icon: <FaHeart /> },
                  { value: "donate", label: "Donate", icon: <FaHandHoldingHeart /> },
                  { value: "partnership", label: "Partnership", icon: <FaGlobeAfrica /> },
                  { value: "outreach", label: "Request Outreach", icon: <FaStethoscope /> },
                  { value: "media", label: "Media/Press", icon: <FaBuilding /> }
               ].map((type) => (
                  <button
                     key={type.value}
                     type="button"
                     onClick={() => setFormData(prev => ({ ...prev, inquiryType: type.value }))}
                     className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition border ${formData.inquiryType === type.value
                        ? "bg-green-600 text-white border-green-600"
                        : "bg-gray-50 text-gray-600 border-gray-200 hover:border-green-300"
                        }`}
                  >
                     {type.icon}
                     <span className="hidden sm:inline">{type.label}</span>
                  </button>
               ))}
            </div>
         </div>

         {/* Name Row */}
         <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name <span className="text-red-500">*</span>
               </label>
               <div className="relative">
                  <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                     type="text"
                     name="firstName"
                     value={formData.firstName}
                     onChange={handleChange}
                     placeholder="John"
                     className={`w-full pl-10 pr-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition ${errors.firstName ? "border-red-300 focus:ring-red-200" : "border-gray-200 focus:ring-green-200 focus:border-green-500"
                        }`}
                  />
               </div>
               {errors.firstName && (
                  <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                     <FaExclamationCircle /> {errors.firstName}
                  </p>
               )}
            </div>
            <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name <span className="text-red-500">*</span>
               </label>
               <div className="relative">
                  <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                     type="text"
                     name="lastName"
                     value={formData.lastName}
                     onChange={handleChange}
                     placeholder="Doe"
                     className={`w-full pl-10 pr-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition ${errors.lastName ? "border-red-300 focus:ring-red-200" : "border-gray-200 focus:ring-green-200 focus:border-green-500"
                        }`}
                  />
               </div>
               {errors.lastName && (
                  <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                     <FaExclamationCircle /> {errors.lastName}
                  </p>
               )}
            </div>
         </div>

         {/* Email & Phone */}
         <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address <span className="text-red-500">*</span>
               </label>
               <div className="relative">
                  <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                     type="email"
                     name="email"
                     value={formData.email}
                     onChange={handleChange}
                     placeholder="john.doe@email.com"
                     className={`w-full pl-10 pr-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition ${errors.email ? "border-red-300 focus:ring-red-200" : "border-gray-200 focus:ring-green-200 focus:border-green-500"
                        }`}
                  />
               </div>
               {errors.email && (
                  <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                     <FaExclamationCircle /> {errors.email}
                  </p>
               )}
            </div>
            <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number <span className="text-red-500">*</span>
               </label>
               <div className="relative">
                  <FaPhoneAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                     type="tel"
                     name="phone"
                     value={formData.phone}
                     onChange={handleChange}
                     placeholder="+234 800 000 0000"
                     className={`w-full pl-10 pr-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition ${errors.phone ? "border-red-300 focus:ring-red-200" : "border-gray-200 focus:ring-green-200 focus:border-green-500"
                        }`}
                  />
               </div>
               {errors.phone && (
                  <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                     <FaExclamationCircle /> {errors.phone}
                  </p>
               )}
            </div>
         </div>

         {/* Subject */}
         <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
               Subject <span className="text-red-500">*</span>
            </label>
            <div className="relative">
               <FaCommentDots className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
               <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="How can we help you?"
                  className={`w-full pl-10 pr-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition ${errors.subject ? "border-red-300 focus:ring-red-200" : "border-gray-200 focus:ring-green-200 focus:border-green-500"
                     }`}
               />
            </div>
            {errors.subject && (
               <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                  <FaExclamationCircle /> {errors.subject}
               </p>
            )}
         </div>

         {/* Message */}
         <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
               Message <span className="text-red-500">*</span>
            </label>
            <textarea
               name="message"
               value={formData.message}
               onChange={handleChange}
               rows="5"
               placeholder="Please describe your inquiry in detail (minimum 20 characters)..."
               className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition resize-none ${errors.message ? "border-red-300 focus:ring-red-200" : "border-gray-200 focus:ring-green-200 focus:border-green-500"
                  }`}
            ></textarea>
            <div className="flex justify-between mt-1">
               {errors.message ? (
                  <p className="text-red-500 text-xs flex items-center gap-1">
                     <FaExclamationCircle /> {errors.message}
                  </p>
               ) : (
                  <span></span>
               )}
               <span className="text-xs text-gray-400">{formData.message.length} chars</span>
            </div>
         </div>

         {/* Submit */}
         <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-green-600 text-white py-4 rounded-lg font-semibold hover:bg-green-700 transition flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
         >
            {isSubmitting ? (
               <>
                  <FaSpinner className="animate-spin" /> Sending...
               </>
            ) : (
               <>
                  <FaPaperPlane /> Send Message
               </>
            )}
         </button>

         <p className="text-xs text-gray-400 text-center mt-4">
            By submitting this form, you agree to our privacy policy and terms of service.
         </p>
      </motion.form>
   );
}

// ============================================
// MAIN CONTACT PAGE
// ============================================
export default function Contact() {
   const contactInfo = [
      {
         icon: <FaMapMarkerAlt className="text-3xl" />,
         title: "Headquarters",
         details: ["485 Agege Motor Rd, Mafoluku Oshodi, Lagos, Nigeria"],
         action: "Get Directions",
         actionIcon: <FaMapMarkerAlt />,
         color: "bg-blue-50 text-blue-600"
      },
      {
         icon: <FaPhoneAlt className="text-3xl" />,
         title: "Phone Numbers",
         details: ["+234 812 365 8741 (General)", "+234 812 365 8741 (Emergency)", "+234 812 365 8741(Volunteer)"],
         action: "Call Us Now",
         actionIcon: <FaPhoneAlt />,
         color: "bg-green-50 text-green-600"
      },
      {
         icon: <FaEnvelope className="text-3xl" />,
         title: "Email Addresses",
         details: [" info@rightaidhealthfoundation.org", "volunteer@rightaidhealth.org", "donate@rightaidhealth.org"],
         action: "Send Email",
         actionIcon: <FaEnvelope />,
         color: "bg-purple-50 text-purple-600"
      },
      {
         icon: <FaClock className="text-3xl" />,
         title: "Office Hours",
         details: ["Monday - Friday: 8:00 AM - 5:00 PM", "Saturday: 9:00 AM - 2:00 PM", "Sunday: Closed (Emergency Only)"],
         action: "24/7 Hotline",
         actionIcon: <FaPhoneAlt />,
         color: "bg-orange-50 text-orange-600"
      }
   ];

   const socialLinks = [
      { icon: <FaFacebook />, name: "Facebook", handle: "@RightAidHealth", color: "bg-blue-600", url: "#" },
      { icon: <FaTwitter />, name: "Twitter", handle: "@RightAidHealth", color: "bg-sky-500", url: "#" },
      { icon: <FaInstagram />, name: "Instagram", handle: "@rightaidhealth", color: "bg-pink-600", url: "#" },
      { icon: <FaLinkedin />, name: "LinkedIn", handle: "RightAid Health Foundation", color: "bg-blue-700", url: "#" },
      { icon: <FaWhatsapp />, name: "WhatsApp", handle: "+234 800 123 4567", color: "bg-green-500", url: "#" }
   ];

   const regionalOffices = [
      { city: "Lagos", address: "485 Agege Motor Rd, Mafoluku Oshodi,", phone: "+234 812 365 8741" }
   ];

   return (
      <>
         <Helmet>
            <title>Contact Us | RightAid Health Foundation</title>
            <meta
               name="description"
               content="Get in touch with RightAid Health Foundation. Contact us for volunteering, donations, partnerships, or to request a medical outreach in your community."
            />
         </Helmet>

         <div className="min-h-screen bg-gray-50">

            {/* HERO */}
            <section className="bg-green-700 text-white py-20 px-6 relative overflow-hidden">
               <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-20 left-20 w-40 h-40 border-4 border-white rounded-full"></div>
                  <div className="absolute bottom-20 right-20 w-60 h-60 border-4 border-white rounded-full"></div>
                  <div className="absolute top-1/2 left-1/2 w-32 h-32 border-4 border-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
               </div>
               <div className="max-w-6xl mx-auto text-center relative z-10">
                  <motion.div
                     initial={{ opacity: 0, y: 30 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ duration: 0.6 }}
                  >
                     <h1 className="text-5xl font-bold mb-6">Get In Touch</h1>
                     <p className="text-lg text-green-100 max-w-3xl mx-auto leading-relaxed">
                        Whether you want to volunteer, donate, partner with us, or request a medical outreach for your community — we're here to listen and help. Reach out through any channel below.
                     </p>
                  </motion.div>
               </div>
            </section>

            {/* CONTACT CARDS */}
            <section className="px-6 -mt-16 relative z-20">
               <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {contactInfo.map((info, index) => (
                     <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition"
                     >
                        <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-4 ${info.color}`}>
                           {info.icon}
                        </div>
                        <h3 className="font-bold text-gray-800 mb-3">{info.title}</h3>
                        <ul className="space-y-1 mb-4">
                           {info.details.map((detail, dIndex) => (
                              <li key={dIndex} className="text-gray-600 text-sm">{detail}</li>
                           ))}
                        </ul>
                        <button className="text-green-600 text-sm font-medium hover:underline inline-flex items-center gap-1">
                           {info.actionIcon} {info.action}
                        </button>
                     </motion.div>
                  ))}
               </div>
            </section>

            {/* MAIN CONTENT: FORM + INFO */}
            <section className="py-16 px-6">
               <div className="max-w-6xl mx-auto">
                  <div className="grid lg:grid-cols-5 gap-8">
                     {/* FORM - Takes 3 columns */}
                     <div className="lg:col-span-3">
                        <ContactForm />
                     </div>

                     {/* SIDEBAR - Takes 2 columns */}
                     <div className="lg:col-span-2 space-y-6">
                        {/* Social Media */}
                        <motion.div
                           initial={{ opacity: 0, x: 30 }}
                           whileInView={{ opacity: 1, x: 0 }}
                           viewport={{ once: true }}
                           className="bg-white rounded-xl shadow-md p-6"
                        >
                           <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                              <FaGlobeAfrica className="text-green-600" /> Follow Us
                           </h3>
                           <div className="space-y-3">
                              {socialLinks.map((social, index) => (
                                 <a
                                    key={index}
                                    href={social.url}
                                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition group"
                                 >
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${social.color}`}>
                                       {social.icon}
                                    </div>
                                    <div className="flex-1">
                                       <div className="font-medium text-gray-800 text-sm group-hover:text-green-600 transition">{social.name}</div>
                                       <div className="text-gray-500 text-xs">{social.handle}</div>
                                    </div>
                                    <FaArrowRight className="text-gray-300 group-hover:text-green-600 transition" />
                                 </a>
                              ))}
                           </div>
                        </motion.div>

                        {/* Regional Offices */}
                        <motion.div
                           initial={{ opacity: 0, x: 30 }}
                           whileInView={{ opacity: 1, x: 0 }}
                           viewport={{ once: true }}
                           transition={{ delay: 0.1 }}
                           className="bg-white rounded-xl shadow-md p-6"
                        >
                           <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                              <FaMapMarkerAlt className="text-green-600" /> Regional Offices
                           </h3>
                           <div className="space-y-4">
                              {regionalOffices.map((office, index) => (
                                 <div key={index} className="border-l-2 border-green-200 pl-4">
                                    <h4 className="font-bold text-gray-800 text-sm">{office.city}</h4>
                                    <p className="text-gray-600 text-xs mt-1">{office.address}</p>
                                    <p className="text-green-600 text-xs mt-1 flex items-center gap-1">
                                       <FaPhoneAlt className="text-xs" /> {office.phone}
                                    </p>
                                 </div>
                              ))}
                           </div>
                        </motion.div>

                        {/* Emergency Banner */}
                        <motion.div
                           initial={{ opacity: 0, x: 30 }}
                           whileInView={{ opacity: 1, x: 0 }}
                           viewport={{ once: true }}
                           transition={{ delay: 0.2 }}
                           className="bg-red-50 border border-red-200 rounded-xl p-6"
                        >
                           <h3 className="font-bold text-red-700 mb-2 flex items-center gap-2">
                              <FaPhoneAlt /> Emergency Hotline
                           </h3>
                           <p className="text-red-600 text-sm mb-3">
                              For health emergencies and urgent medical assistance, call our 24/7 emergency line.
                           </p>
                           <a
                              href="+234 812 365 8741"
                              className="text-red-700 font-bold text-lg hover:underline flex items-center gap-2"
                           >
                              <FaPhoneAlt /> +234 812 365 8741
                           </a>
                        </motion.div>

                        {/* Response Time */}
                        <motion.div
                           initial={{ opacity: 0, x: 30 }}
                           whileInView={{ opacity: 1, x: 0 }}
                           viewport={{ once: true }}
                           transition={{ delay: 0.3 }}
                           className="bg-green-50 rounded-xl p-6"
                        >
                           <h3 className="font-bold text-green-800 mb-3 flex items-center gap-2">
                              <FaClock /> Response Times
                           </h3>
                           <ul className="space-y-2 text-sm">
                              <li className="flex justify-between text-green-700">
                                 <span>General Inquiries</span>
                                 <span className="font-bold">24 hours</span>
                              </li>
                              <li className="flex justify-between text-green-700">
                                 <span>Volunteer Applications</span>
                                 <span className="font-bold">48 hours</span>
                              </li>
                              <li className="flex justify-between text-green-700">
                                 <span>Partnership Proposals</span>
                                 <span className="font-bold">72 hours</span>
                              </li>
                              <li className="flex justify-between text-green-700">
                                 <span>Emergency Response</span>
                                 <span className="font-bold">Immediate</span>
                              </li>
                           </ul>
                        </motion.div>
                     </div>
                  </div>
               </div>
            </section>

            {/* MAP SECTION (Placeholder) */}
            <section className="px-6 pb-16">
               <div className="max-w-6xl mx-auto">
                  <motion.div
                     initial={{ opacity: 0, y: 30 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true }}
                     className="bg-white rounded-2xl shadow-lg overflow-hidden"
                  >
                     <div className="p-6 border-b border-gray-100">
                        <h2 className="text-2xl font-bold text-gray-800">Find Us</h2>
                        <p className="text-gray-500 text-sm">Our headquarters is located in the heart of Lagos</p>
                     </div>
                     <div className="h-96 bg-gray-200 relative flex items-center justify-center">
                        {/* Replace this div with an actual map component (Google Maps, Mapbox, etc.) */}
                        <div className="text-center">
                           <FaMapMarkerAlt className="text-6xl text-green-600 mx-auto mb-4" />
                           <p className="text-gray-600 font-medium">Interactive Map</p>
                           <p className="text-gray-500 text-sm mt-2">Integrate Google Maps or Mapbox here</p>
                           <a
                              href="https://maps.google.com/?q=Lagos,Nigeria"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mt-4 inline-flex items-center gap-2 text-green-600 font-medium hover:underline"
                           >
                              <FaMapMarkerAlt /> Open in Google Maps
                           </a>
                        </div>
                     </div>
                  </motion.div>
               </div>
            </section>

            {/* CTA */}
            <section className="bg-green-700 text-white py-16 px-6">
               <div className="max-w-4xl mx-auto text-center">
                  <h2 className="text-3xl font-bold mb-4">Ready to Make a Difference?</h2>
                  <p className="text-green-100 mb-8 max-w-2xl mx-auto">
                     Join thousands of volunteers, donors, and partners who are transforming healthcare in Nigeria. Every action counts.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                     <a
                        href="/volunteer"
                        className="bg-white text-green-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition inline-flex items-center justify-center gap-2"
                     >
                        <FaHeart /> Become a Volunteer
                     </a>
                     <a
                        href="/donate"
                        className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-700 transition inline-flex items-center justify-center gap-2"
                     >
                        <FaHandHoldingHeart /> Donate Now
                     </a>
                  </div>
               </div>
            </section>
         </div>
      </>
   );
}