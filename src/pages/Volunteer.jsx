import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "emailjs-com";

import {
   collection,
   addDoc,
   query,
   where,
   getDocs,
   serverTimestamp,
   doc,
   updateDoc,
   onSnapshot
} from "firebase/firestore";
import { db } from "../assets/firebase/firebase.js"; // ← FIXED: Added .js extension
import {
   FaUserPlus,
   FaSignInAlt,
   FaEnvelope,
   FaPhone,
   FaMapMarkerAlt,
   FaStethoscope,
   FaHandsHelping,
   FaCamera,
   FaTruck,
   FaCheckCircle,
   FaLock,
   FaEye,
   FaEyeSlash,
   FaArrowLeft,
   FaBell,
   FaInbox,
   FaCalendarAlt,
   FaHeartbeat,
   FaSpinner,
   FaPaperPlane,
   FaUserMd,
   FaClipboardList,
   FaCommentDots,
   FaExclamationCircle,
   FaChevronRight,
   FaHome,
   FaSignOutAlt,
   FaUserCircle,
} from "react-icons/fa";

// ============================================
// EMAILJS CONFIG
// ============================================
const EMAILJS_SERVICE_ID = "service_lm13ttc";
const EMAILJS_TEMPLATE_ID = "template_g9mzhjt";
const EMAILJS_PUBLIC_KEY = "rv-H8_UbeAXqZZKlo"; // Replace with your actual public key
const EMAILJS_OTP_TEMPLATE_ID = "template_o7my2f7"; // Create this template in EmailJS for OTP

// ============================================
// FIRESTORE REFERENCES
// ============================================
const volunteersRef = collection(db, "volunteers");

// ============================================
// EMAIL FUNCTIONS
// ============================================

// Send OTP Email
const sendOTPEmail = async (email, name, otp) => {
   try {
      await emailjs.send(
         EMAILJS_SERVICE_ID,
         EMAILJS_OTP_TEMPLATE_ID, // You need to create this template
         {
            to_email: email,
            to_name: name,
            otp_code: otp,
            expiry_time: "10 minutes"
         },
         EMAILJS_PUBLIC_KEY
      );
      console.log("OTP email sent to:", email);
      return true;
   } catch (error) {
      console.error("Failed to send OTP:", error);
      // Fallback: log OTP to console for development
      console.log(`DEV OTP for ${email}: ${otp}`);
      return false;
   }
};

// Send Welcome Email with Credentials
const sendWelcomeEmail = async (volunteer) => {
   try {
      await emailjs.send(
         EMAILJS_SERVICE_ID,
         EMAILJS_TEMPLATE_ID,
         {
            to_name: volunteer.name,
            to_email: volunteer.email,
            volunteer_id: volunteer.volunteerId,
            login_email: volunteer.email,
            message: `Welcome to RightAid Health Foundation! Your volunteer ID is ${volunteer.volunteerId}. You can now login to your portal at https://rightaid.org/volunteer using your email and password.`,
         },
         EMAILJS_PUBLIC_KEY
      );
      console.log("Welcome email sent to:", volunteer.email);
      return true;
   } catch (error) {
      console.error("Failed to send welcome email:", error);
      return false;
   }
};

// ============================================
// FIREBASE FUNCTIONS
// ============================================

// Check if email already exists
const checkExistingVolunteer = async (email) => {
   const q = query(volunteersRef, where("email", "==", email));
   const snapshot = await getDocs(q);
   return !snapshot.empty;
};

// Create new volunteer in Firestore
const createVolunteerInDB = async (volunteerData) => {
   const docRef = await addDoc(volunteersRef, {
      ...volunteerData,
      status: "active",
      missionsCompleted: 0,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
   });
   return docRef.id;
};

// Get volunteer by email
const getVolunteerByEmail = async (email) => {
   const q = query(volunteersRef, where("email", "==", email));
   const snapshot = await getDocs(q);
   if (snapshot.empty) return null;
   const doc = snapshot.docs[0];
   return { firebaseId: doc.id, ...doc.data() };
};

// Update volunteer data
const updateVolunteer = async (id, data) => {
   await updateDoc(doc(db, "volunteers", id), {
      ...data,
      updatedAt: serverTimestamp()
   });
};

// Subscribe to volunteer messages (real-time)
const subscribeToMessages = (volunteerId, callback) => {
   const messagesRef = collection(db, "volunteers", volunteerId, "messages");
   return onSnapshot(messagesRef, (snapshot) => {
      const messages = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
      callback(messages);
   });
};

// ============================================
// LOGIN COMPONENT (Returning Volunteers)
// ============================================
function VolunteerLogin({ onLogin, onSwitchToRegister }) {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [showPassword, setShowPassword] = useState(false);
   const [error, setError] = useState("");
   const [loading, setLoading] = useState(false);

   const handleSubmit = async (e) => {
      e.preventDefault();
      setError("");
      setLoading(true);

      try {
         // Fetch volunteer from Firestore
         const volunteer = await getVolunteerByEmail(email);

         if (!volunteer) {
            setError("No volunteer found with this email. Please register first.");
            setLoading(false);
            return;
         }

         // Verify password (in production, use Firebase Auth or bcrypt)
         // For now, we check against stored password (NOT secure - use Auth in production)
         if (volunteer.password !== password) {
            setError("Invalid password. Please try again.");
            setLoading(false);
            return;
         }

         // Update last login
         await updateVolunteer(volunteer.firebaseId, { lastLogin: serverTimestamp() });

         // Remove password before passing to state
         const { password: volunteerWithoutPassword } = volunteer;
         onLogin(volunteerWithoutPassword);

      } catch (err) {
         console.error("Login error:", err);
         setError("Login failed. Please try again.");
      }

      setLoading(false);
   };

   return (
      <motion.div
         initial={{ opacity: 0, x: 30 }}
         animate={{ opacity: 1, x: 0 }}
         exit={{ opacity: 0, x: -30 }}
         transition={{ duration: 0.4 }}
         className="w-full max-w-md"
      >
         <div className="bg-white shadow-2xl rounded-2xl p-8 border-t-4 border-green-600">
            <div className="text-center mb-8">
               <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaSignInAlt className="text-3xl text-green-600" />
               </div>
               <h2 className="text-2xl font-bold text-gray-800">Volunteer Portal Login</h2>
               <p className="text-gray-500 text-sm mt-2">Access your dashboard, messages, and missions</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
               <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <div className="relative">
                     <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                     <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="volunteer@email.com"
                        required
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                     />
                  </div>
               </div>

               <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <div className="relative">
                     <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                     <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        required
                        className="w-full pl-10 pr-12 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                     />
                     <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                     >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                     </button>
                  </div>
               </div>

               {error && (
                  <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg flex items-center gap-2">
                     <FaExclamationCircle /> {error}
                  </div>
               )}

               <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition flex items-center justify-center gap-2 disabled:opacity-70"
               >
                  {loading ? <><FaSpinner className="animate-spin" /> Logging in...</> : <><FaSignInAlt /> Login to Portal</>}
               </button>
            </form>

            <div className="mt-6 text-center">
               <p className="text-gray-500 text-sm">
                  New volunteer?{" "}
                  <button onClick={onSwitchToRegister} className="text-green-600 font-semibold hover:underline">
                     Register here
                  </button>
               </p>
            </div>
         </div>
      </motion.div>
   );
}

// ============================================
// REGISTRATION FLOW (New Volunteers)
// ============================================
function VolunteerRegister({ onComplete, onSwitchToLogin }) {
   const [step, setStep] = useState(1);
   const [form, setForm] = useState({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      location: "",
      interest: "",
      password: "",
      confirmPassword: ""
   });
   const [errors, setErrors] = useState({});
   const [loading, setLoading] = useState(false);
   const [generatedOTP, setGeneratedOTP] = useState("");
   const [otpInput, setOtpInput] = useState(["", "", "", "", "", ""]);
   const [volunteerId, setVolunteerId] = useState("");
   const [countdown, setCountdown] = useState(60);
   const [canResend, setCanResend] = useState(false);

   useEffect(() => {
      if (step === 2 && countdown > 0) {
         const timer = setTimeout(() => setCountdown(c => c - 1), 1000);
         return () => clearTimeout(timer);
      }
      if (countdown === 0) (true);
   }, [countdown, step]);

   const handleChange = (e) => {
      const { name, value } = e.target;
      setForm(prev => ({ ...prev, [name]: value }));
      if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
   };

   const validateStep1 = () => {
      const newErrors = {};
      if (!form.firstName.trim()) newErrors.firstName = "First name is required";
      if (!form.lastName.trim()) newErrors.lastName = "Last name is required";
      if (!form.email.trim()) {
         newErrors.email = "Email is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
         newErrors.email = "Invalid email format";
      }
      if (!form.phone.trim()) newErrors.phone = "Phone number is required";
      if (!form.location.trim()) newErrors.location = "Location is required";
      if (!form.interest) newErrors.interest = "Please select an area of interest";
      if (!form.password) {
         newErrors.password = "Password is required";
      } else if (form.password.length < 8) {
         newErrors.password = "Password must be at least 8 characters";
      }
      if (form.password !== form.confirmPassword) {
         newErrors.confirmPassword = "Passwords do not match";
      }
      return newErrors;
   };

   const handleSubmitForm = async (e) => {
      e.preventDefault();
      const validationErrors = validateStep1();
      if (Object.keys(validationErrors).length > 0) {
         setErrors(validationErrors);
         return;
      }

      setLoading(true);

      try {
         // Check if email already exists
         const exists = await checkExistingVolunteer(form.email);
         if (exists) {
            setErrors({ email: "This email is already registered. Please login instead." });
            setLoading(false);
            return;
         }

         // Generate and send OTP
         const otp = Math.floor(100000 + Math.random() * 900000).toString();
         setGeneratedOTP(otp);

         const emailSent = await sendOTPEmail(form.email, form.firstName, otp);
         if (!emailSent) {
            // For development: show OTP in console and allow proceeding
            console.log("Development OTP:", otp);
         }

         setLoading(false);
         setStep(2);
         setCountdown(60);
         setCanResend(false);

      } catch (err) {
         console.error("Registration error:", err);
         setErrors({ general: "Something went wrong. Please try again." });
         setLoading(false);
      }
   };

   const handleOTPChange = (index, value) => {
      if (value.length > 1) return;
      const newOtp = [...otpInput];
      newOtp[index] = value;
      setOtpInput(newOtp);

      if (value && index < 5) {
         document.getElementById(`otp-${index + 1}`)?.focus();
      }
   };

   const handleVerifyOTP = async (e) => {
      e.preventDefault();
      const enteredOTP = otpInput.join("");
      setLoading(true);

      await new Promise(resolve => setTimeout(resolve, 1500));

      if (enteredOTP === generatedOTP) {
         try {
            const id = "RAHF-" + Date.now().toString().slice(-6);
            setVolunteerId(id);

            // Save to Firestore
            const volunteerData = {
               name: `${form.firstName} ${form.lastName}`,
               email: form.email,
               phone: form.phone,
               location: form.location,
               interest: form.interest,
               password: form.password, // In production, hash this!
               volunteerId: id,
               status: "active",
               missionsCompleted: 0,
               joinDate: new Date().toISOString().split('T')[0],
               messages: [
                  {
                     id: 1,
                     subject: "Welcome to RightAid Health Foundation!",
                     date: new Date().toISOString().split('T')[0],
                     read: false,
                     body: `Dear ${form.firstName}, welcome to the RightAid volunteer family! We're excited to have you on board. Your volunteer ID is ${id}. Please complete your profile and check your dashboard for upcoming missions.`
                  }
               ],
               upcomingMissions: []
            };

            await createVolunteerInDB(volunteerData);

            // Send welcome email
            await sendWelcomeEmail({
               name: volunteerData.name,
               email: volunteerData.email,
               volunteerId: id
            });

            setStep(3);

         } catch (err) {
            console.error("Save error:", err);
            setErrors({ otp: "Failed to complete registration. Please try again." });
         }
      } else {
         setErrors({ otp: "Invalid OTP. Please try again." });
      }
      setLoading(false);
   };

   const handleResendOTP = async () => {
      setCanResend(false);
      setCountdown(60);
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      setGeneratedOTP(otp);
      await sendOTPEmail(form.email, form.firstName, otp);
   };

   if (step === 1) {
      return (
         <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-2xl"
         >
            <div className="bg-white shadow-2xl rounded-2xl p-8 border-t-4 border-green-600">
               <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                     <FaUserPlus className="text-3xl text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">Become a Volunteer</h2>
                  <p className="text-gray-500 text-sm mt-2">Join our mission to bring healthcare to every community</p>
               </div>

               <form onSubmit={handleSubmitForm} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                     <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                        <input
                           name="firstName"
                           value={form.firstName}
                           onChange={handleChange}
                           placeholder="John"
                           className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition ${errors.firstName ? "border-red-300 focus:ring-red-200" : "border-gray-200 focus:ring-green-200 focus:border-green-500"}`}
                        />
                        {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                     </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                        <input
                           name="lastName"
                           value={form.lastName}
                           onChange={handleChange}
                           placeholder="Doe"
                           className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition ${errors.lastName ? "border-red-300 focus:ring-red-200" : "border-gray-200 focus:ring-green-200 focus:border-green-500"}`}
                        />
                        {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                     </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                     <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                        <div className="relative">
                           <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                           <input
                              type="email"
                              name="email"
                              value={form.email}
                              onChange={handleChange}
                              placeholder="john.doe@email.com"
                              className={`w-full pl-10 pr-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition ${errors.email ? "border-red-300 focus:ring-red-200" : "border-gray-200 focus:ring-green-200 focus:border-green-500"}`}
                           />
                        </div>
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                     </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                        <div className="relative">
                           <FaPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                           <input
                              name="phone"
                              value={form.phone}
                              onChange={handleChange}
                              placeholder="+234 800 000 0000"
                              className={`w-full pl-10 pr-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition ${errors.phone ? "border-red-300 focus:ring-red-200" : "border-gray-200 focus:ring-green-200 focus:border-green-500"}`}
                           />
                        </div>
                        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                     </div>
                  </div>

                  <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">Location (City / State) *</label>
                     <div className="relative">
                        <FaMapMarkerAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                           name="location"
                           value={form.location}
                           onChange={handleChange}
                           placeholder="Ikeja, Lagos State"
                           className={`w-full pl-10 pr-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition ${errors.location ? "border-red-300 focus:ring-red-200" : "border-gray-200 focus:ring-green-200 focus:border-green-500"}`}
                        />
                     </div>
                     {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location}</p>}
                  </div>

                  <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">Area of Interest *</label>
                     <div className="grid grid-cols-2 gap-3">
                        {[
                           { value: "Medical Support", icon: <FaStethoscope />, desc: "Doctors, Nurses, Pharmacists" },
                           { value: "Outreach Team", icon: <FaHandsHelping />, desc: "Field operations & logistics" },
                           { value: "Media / Awareness", icon: <FaCamera />, desc: "Photography, social media" },
                           { value: "Admin / Logistics", icon: <FaTruck />, desc: "Coordination & planning" }
                        ].map((option) => (
                           <button
                              key={option.value}
                              type="button"
                              onClick={() => setForm(prev => ({ ...prev, interest: option.value }))}
                              className={`p-3 rounded-lg border-2 text-left transition ${form.interest === option.value
                                 ? "border-green-600 bg-green-50 text-green-700"
                                 : "border-gray-200 hover:border-green-300 text-gray-600"
                                 }`}
                           >
                              <div className="flex items-center gap-2 mb-1">
                                 <span className={form.interest === option.value ? "text-green-600" : "text-gray-400"}>
                                    {option.icon}
                                 </span>
                                 <span className="font-medium text-sm">{option.value}</span>
                              </div>
                              <p className="text-xs opacity-70">{option.desc}</p>
                           </button>
                        ))}
                     </div>
                     {errors.interest && <p className="text-red-500 text-xs mt-1">{errors.interest}</p>}
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                     <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password *</label>
                        <input
                           type="password"
                           name="password"
                           value={form.password}
                           onChange={handleChange}
                           placeholder="Min. 8 characters"
                           className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition ${errors.password ? "border-red-300 focus:ring-red-200" : "border-gray-200 focus:ring-green-200 focus:border-green-500"}`}
                        />
                        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                     </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password *</label>
                        <input
                           type="password"
                           name="confirmPassword"
                           value={form.confirmPassword}
                           onChange={handleChange}
                           placeholder="Repeat password"
                           className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition ${errors.confirmPassword ? "border-red-300 focus:ring-red-200" : "border-gray-200 focus:ring-green-200 focus:border-green-500"}`}
                        />
                        {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
                     </div>
                  </div>

                  {errors.general && (
                     <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg flex items-center gap-2">
                        <FaExclamationCircle /> {errors.general}
                     </div>
                  )}

                  <button
                     type="submit"
                     disabled={loading}
                     className="w-full bg-green-600 text-white py-4 rounded-lg font-semibold hover:bg-green-700 transition flex items-center justify-center gap-2 disabled:opacity-70"
                  >
                     {loading ? <><FaSpinner className="animate-spin" /> Sending OTP...</> : <><FaPaperPlane /> Continue to Verification</>}
                  </button>
               </form>

               <div className="mt-6 text-center">
                  <p className="text-gray-500 text-sm">
                     Already registered?{" "}
                     <button onClick={onSwitchToLogin} className="text-green-600 font-semibold hover:underline">
                        Login to portal
                     </button>
                  </p>
               </div>
            </div>
         </motion.div>
      );
   }

   if (step === 2) {
      return (
         <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md"
         >
            <div className="bg-white shadow-2xl rounded-2xl p-8 border-t-4 border-green-600 text-center">
               <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaEnvelope className="text-3xl text-green-600" />
               </div>
               <h2 className="text-2xl font-bold text-gray-800 mb-2">Verify Your Email</h2>
               <p className="text-gray-500 text-sm mb-6">
                  We've sent a 6-digit OTP to <span className="font-semibold text-green-600">{form.email}</span>. Enter it below to complete your registration.
               </p>

               <form onSubmit={handleVerifyOTP} className="space-y-6">
                  <div className="flex justify-center gap-2">
                     {otpInput.map((digit, index) => (
                        <input
                           key={index}
                           id={`otp-${index}`}
                           type="text"
                           maxLength="1"
                           value={digit}
                           onChange={(e) => handleOTPChange(index, e.target.value)}
                           className="w-12 h-14 text-center text-2xl font-bold border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
                        />
                     ))}
                  </div>

                  {errors.otp && (
                     <p className="text-red-500 text-sm flex items-center justify-center gap-1">
                        <FaExclamationCircle /> {errors.otp}
                     </p>
                  )}

                  <button
                     type="submit"
                     disabled={loading || otpInput.join("").length !== 6}
                     className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                     {loading ? <><FaSpinner className="animate-spin" /> Verifying...</> : <><FaCheckCircle /> Verify & Complete Registration</>}
                  </button>
               </form>

               <div className="mt-6">
                  <p className="text-gray-500 text-sm">
                     Didn't receive the code?{" "}
                     {canResend ? (
                        <button onClick={handleResendOTP} className="text-green-600 font-semibold hover:underline">
                           Resend OTP
                        </button>
                     ) : (
                        <span className="text-gray-400">Resend in {countdown}s</span>
                     )}
                  </p>
               </div>

               <button
                  onClick={() => setStep(1)}
                  className="mt-4 text-gray-500 text-sm hover:text-gray-700 flex items-center justify-center gap-1 mx-auto"
               >
                  <FaArrowLeft /> Go back
               </button>
            </div>
         </motion.div>
      );
   }

   return (
      <motion.div
         initial={{ opacity: 0, scale: 0.9 }}
         animate={{ opacity: 1, scale: 1 }}
         className="w-full max-w-lg"
      >
         <div className="bg-white shadow-2xl rounded-2xl p-8 text-center border-t-4 border-green-600">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
               <FaCheckCircle className="text-5xl text-green-600" />
            </div>

            <h2 className="text-3xl font-bold text-green-700 mb-2">Welcome Aboard! 🎉</h2>
            <p className="text-gray-600 mb-6">
               Congratulations! You are now a registered volunteer with RightAid Health Foundation.
            </p>

            <div className="bg-green-50 rounded-xl p-6 mb-6 text-left">
               <h3 className="font-bold text-green-800 mb-4 flex items-center gap-2">
                  <FaUserCircle /> Your Login Details
               </h3>
               <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                     <span className="text-gray-600">Volunteer ID:</span>
                     <span className="font-bold text-green-700">{volunteerId}</span>
                  </div>
                  <div className="flex justify-between">
                     <span className="text-gray-600">Email:</span>
                     <span className="font-medium text-gray-800">{form.email}</span>
                  </div>
                  <div className="flex justify-between">
                     <span className="text-gray-600">Password:</span>
                     <span className="font-medium text-gray-800">•••••••• (as set by you)</span>
                  </div>
               </div>
            </div>

            <div className="bg-blue-50 rounded-xl p-4 mb-6">
               <p className="text-blue-700 text-sm flex items-start gap-2">
                  <FaEnvelope className="mt-0.5 flex-shrink-0" />
                  <span>A confirmation email with your login credentials has been sent to <strong>{form.email}</strong>. Please check your inbox and spam folder.</span>
               </p>
            </div>

            <div className="space-y-3">
               <button
                  onClick={onComplete}
                  className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition flex items-center justify-center gap-2"
               >
                  <FaSignInAlt /> Login to Your Portal
               </button>
               <button
                  onClick={() => {
                     setStep(1);
                     setForm({
                        firstName: "", lastName: "", email: "", phone: "",
                        location: "", interest: "", password: "", confirmPassword: ""
                     });
                     setOtpInput(["", "", "", "", "", ""]);
                  }}
                  className="w-full border-2 border-gray-200 text-gray-600 py-3 rounded-lg font-semibold hover:border-green-500 hover:text-green-600 transition"
               >
                  Register Another Volunteer
               </button>
            </div>
         </div>
      </motion.div>
   );
}

// ============================================
// VOLUNTEER DASHBOARD
// ============================================
function VolunteerDashboard({ volunteer, onLogout }) {
   const [activeTab, setActiveTab] = useState("overview");
   const [messages, setMessages] = useState(volunteer.messages || []);
   const [showMessageDetail, setShowMessageDetail] = useState(null);
   const [realtimeMessages, setRealtimeMessages] = useState([]);

   useEffect(() => {
      if (volunteer.firebaseId) {
         const unsubscribe = subscribeToMessages(volunteer.firebaseId, (msgs) => {
            setRealtimeMessages(msgs);
         });
         return () => unsubscribe();
      }
   }, [volunteer.firebaseId]);

   const allMessages = realtimeMessages.length > 0 ? realtimeMessages : messages;
   const unreadCount = allMessages.filter(m => !m.read).length;

   const markAsRead = (msgId) => {
      setMessages(prev => prev.map(m => m.id === msgId ? { ...m, read: true } : m));
      setShowMessageDetail(allMessages.find(m => m.id === msgId));
   };

   const tabs = [
      { id: "overview", label: "Overview", icon: <FaHome /> },
      { id: "messages", label: `Messages ${unreadCount > 0 ? `(${unreadCount})` : ""}`, icon: <FaInbox /> },
      { id: "missions", label: "Missions", icon: <FaCalendarAlt /> },
      { id: "profile", label: "Profile", icon: <FaUserCircle /> },
   ];

   return (
      <motion.div
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         className="min-h-screen bg-gray-50"
      >
         <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                     <FaUserMd className="text-2xl text-green-600" />
                  </div>
                  <div>
                     <h2 className="font-bold text-gray-800">{volunteer.name}</h2>
                     <p className="text-sm text-gray-500">ID: {volunteer.volunteerId || volunteer.id} • {volunteer.status}</p>
                  </div>
               </div>
               <div className="flex items-center gap-3">
                  <button className="relative p-2 text-gray-600 hover:text-green-600 transition">
                     <FaBell className="text-xl" />
                     {unreadCount > 0 && (
                        <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                           {unreadCount}
                        </span>
                     )}
                  </button>
                  <button
                     onClick={onLogout}
                     className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition text-sm font-medium"
                  >
                     <FaSignOutAlt /> Logout
                  </button>
               </div>
            </div>
         </header>

         <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="grid lg:grid-cols-4 gap-8">
               <div className="lg:col-span-1">
                  <nav className="bg-white rounded-xl shadow-sm overflow-hidden">
                     {tabs.map(tab => (
                        <button
                           key={tab.id}
                           onClick={() => setActiveTab(tab.id)}
                           className={`w-full flex items-center gap-3 px-6 py-4 text-left transition ${activeTab === tab.id
                              ? "bg-green-50 text-green-700 font-semibold border-l-4 border-green-600"
                              : "text-gray-600 hover:bg-gray-50"
                              }`}
                        >
                           {tab.icon}
                           <span>{tab.label}</span>
                           {tab.id === "messages" && unreadCount > 0 && (
                              <span className="ml-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                                 {unreadCount}
                              </span>
                           )}
                        </button>
                     ))}
                  </nav>

                  <div className="bg-white rounded-xl shadow-sm p-6 mt-6">
                     <h3 className="font-bold text-gray-800 mb-4">Your Impact</h3>
                     <div className="space-y-4">
                        <div className="flex items-center justify-between">
                           <span className="text-gray-600 text-sm">Missions</span>
                           <span className="font-bold text-green-600">{volunteer.missionsCompleted || 0}</span>
                        </div>
                        <div className="flex items-center justify-between">
                           <span className="text-gray-600 text-sm">Status</span>
                           <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-medium">{volunteer.status}</span>
                        </div>
                        <div className="flex items-center justify-between">
                           <span className="text-gray-600 text-sm">Member Since</span>
                           <span className="text-gray-800 text-sm">{volunteer.joinDate || "N/A"}</span>
                        </div>
                     </div>
                  </div>
               </div>

               <div className="lg:col-span-3">
                  <AnimatePresence mode="wait">
                     {activeTab === "overview" && (
                        <motion.div
                           key="overview"
                           initial={{ opacity: 0, y: 20 }}
                           animate={{ opacity: 1, y: 0 }}
                           exit={{ opacity: 0, y: -20 }}
                           className="space-y-6"
                        >
                           <div className="bg-green-600 text-white rounded-2xl p-8 relative overflow-hidden">
                              <div className="relative z-10">
                                 <h3 className="text-2xl font-bold mb-2">Welcome back, {volunteer.name?.split(" ")[0]}!</h3>
                                 <p className="text-green-100">You have {unreadCount} unread message{unreadCount !== 1 ? "s" : ""}.</p>
                              </div>
                              <FaHeartbeat className="absolute right-8 top-1/2 -translate-y-1/2 text-8xl text-white/10" />
                           </div>

                           <div className="bg-white rounded-xl shadow-sm p-6">
                              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                                 <FaCommentDots className="text-green-600" /> Recent Messages
                              </h3>
                              <div className="space-y-2">
                                 {allMessages.slice(0, 3).map(msg => (
                                    <button
                                       key={msg.id}
                                       onClick={() => markAsRead(msg.id)}
                                       className={`w-full text-left p-4 rounded-lg transition flex items-start gap-3 ${msg.read ? "bg-gray-50" : "bg-green-50 border-l-4 border-green-500"
                                          }`}
                                    >
                                       <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${msg.read ? "bg-gray-300" : "bg-green-500"}`} />
                                       <div className="flex-1 min-w-0">
                                          <h4 className={`font-medium text-sm truncate ${msg.read ? "text-gray-700" : "text-gray-900 font-semibold"}`}>
                                             {msg.subject}
                                          </h4>
                                          <p className="text-xs text-gray-500 mt-1">{msg.date}</p>
                                       </div>
                                       {!msg.read && (
                                          <span className="bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full">NEW</span>
                                       )}
                                    </button>
                                 ))}
                              </div>
                           </div>
                        </motion.div>
                     )}

                     {activeTab === "messages" && (
                        <motion.div
                           key="messages"
                           initial={{ opacity: 0, y: 20 }}
                           animate={{ opacity: 1, y: 0 }}
                           exit={{ opacity: 0, y: -20 }}
                        >
                           <div className="bg-white rounded-xl shadow-sm p-6">
                              <div className="flex items-center justify-between mb-6">
                                 <h3 className="font-bold text-gray-800 flex items-center gap-2">
                                    <FaInbox className="text-green-600" /> All Messages
                                 </h3>
                                 <span className="text-sm text-gray-500">{unreadCount} unread</span>
                              </div>

                              {showMessageDetail ? (
                                 <div className="bg-gray-50 rounded-xl p-6">
                                    <button
                                       onClick={() => setShowMessageDetail(null)}
                                       className="text-green-600 text-sm mb-4 flex items-center gap-1 hover:underline"
                                    >
                                       <FaArrowLeft /> Back to messages
                                    </button>
                                    <h4 className="font-bold text-lg text-gray-800 mb-2">{showMessageDetail.subject}</h4>
                                    <p className="text-sm text-gray-500 mb-4">{showMessageDetail.date}</p>
                                    <p className="text-gray-700 leading-relaxed">{showMessageDetail.body}</p>
                                 </div>
                              ) : (
                                 <div className="space-y-2">
                                    {allMessages.map(msg => (
                                       <button
                                          key={msg.id}
                                          onClick={() => markAsRead(msg.id)}
                                          className={`w-full text-left p-4 rounded-lg transition flex items-start gap-3 ${msg.read ? "bg-gray-50 hover:bg-gray-100" : "bg-green-50 border-l-4 border-green-500 hover:bg-green-100"
                                             }`}
                                       >
                                          <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${msg.read ? "bg-gray-300" : "bg-green-500"}`} />
                                          <div className="flex-1 min-w-0">
                                             <div className="flex items-center justify-between">
                                                <h4 className={`font-medium text-sm ${msg.read ? "text-gray-700" : "text-gray-900 font-semibold"}`}>
                                                   {msg.subject}
                                                </h4>
                                                <span className="text-xs text-gray-400">{msg.date}</span>
                                             </div>
                                             <p className="text-xs text-gray-500 mt-1 line-clamp-1">{msg.body}</p>
                                          </div>
                                          {!msg.read && (
                                             <span className="bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full flex-shrink-0">NEW</span>
                                          )}
                                       </button>
                                    ))}
                                 </div>
                              )}
                           </div>
                        </motion.div>
                     )}

                     {activeTab === "missions" && (
                        <motion.div
                           key="missions"
                           initial={{ opacity: 0, y: 20 }}
                           animate={{ opacity: 1, y: 0 }}
                           exit={{ opacity: 0, y: -20 }}
                        >
                           <div className="bg-white rounded-xl shadow-sm p-6">
                              <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2">
                                 <FaClipboardList className="text-green-600" /> My Missions
                              </h3>
                              {volunteer.upcomingMissions?.length > 0 ? (
                                 <div className="space-y-4">
                                    {volunteer.upcomingMissions.map(mission => (
                                       <div key={mission.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition">
                                          <div className="flex items-start justify-between">
                                             <div>
                                                <h4 className="font-bold text-gray-800 text-lg">{mission.title}</h4>
                                                <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                                                   <span className="flex items-center gap-1"><FaCalendarAlt className="text-green-500" /> {mission.date}</span>
                                                   <span className="flex items-center gap-1"><FaMapMarkerAlt className="text-green-500" /> {mission.location}</span>
                                                </div>
                                             </div>
                                             <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                                                {mission.role}
                                             </span>
                                          </div>
                                          <div className="mt-4 flex gap-3">
                                             <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition">
                                                Confirm Attendance
                                             </button>
                                             <button className="border border-gray-200 text-gray-600 px-4 py-2 rounded-lg text-sm font-medium hover:border-green-500 hover:text-green-600 transition">
                                                View Details
                                             </button>
                                          </div>
                                       </div>
                                    ))}
                                 </div>
                              ) : (
                                 <p className="text-gray-500 text-center py-8">No upcoming missions scheduled.</p>
                              )}
                           </div>
                        </motion.div>
                     )}

                     {activeTab === "profile" && (
                        <motion.div
                           key="profile"
                           initial={{ opacity: 0, y: 20 }}
                           animate={{ opacity: 1, y: 0 }}
                           exit={{ opacity: 0, y: -20 }}
                        >
                           <div className="bg-white rounded-xl shadow-sm p-8">
                              <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2">
                                 <FaUserCircle className="text-green-600" /> My Profile
                              </h3>
                              <div className="grid md:grid-cols-2 gap-6">
                                 <div>
                                    <label className="block text-sm font-medium text-gray-500 mb-1">Full Name</label>
                                    <p className="text-gray-800 font-medium">{volunteer.name}</p>
                                 </div>
                                 <div>
                                    <label className="block text-sm font-medium text-gray-500 mb-1">Volunteer ID</label>
                                    <p className="text-gray-800 font-medium">{volunteer.volunteerId || volunteer.id}</p>
                                 </div>
                                 <div>
                                    <label className="block text-sm font-medium text-gray-500 mb-1">Email</label>
                                    <p className="text-gray-800 font-medium">{volunteer.email}</p>
                                 </div>
                                 <div>
                                    <label className="block text-sm font-medium text-gray-500 mb-1">Phone</label>
                                    <p className="text-gray-800 font-medium">{volunteer.phone}</p>
                                 </div>
                                 <div>
                                    <label className="block text-sm font-medium text-gray-500 mb-1">Location</label>
                                    <p className="text-gray-800 font-medium">{volunteer.location}</p>
                                 </div>
                                 <div>
                                    <label className="block text-sm font-medium text-gray-500 mb-1">Area of Interest</label>
                                    <p className="text-gray-800 font-medium">{volunteer.interest}</p>
                                 </div>
                              </div>
                           </div>
                        </motion.div>
                     )}
                  </AnimatePresence>
               </div>
            </div>
         </div>
      </motion.div>
   );
}

// ============================================
// MAIN VOLUNTEER PAGE
// ============================================
export default function Volunteer() {
   const [view, setView] = useState("choice");
   const [loggedInVolunteer, setLoggedInVolunteer] = useState(null);

   const handleLogin = (volunteer) => {
      setLoggedInVolunteer(volunteer);
      setView("dashboard");
   };

   const handleLogout = () => {
      setLoggedInVolunteer(null);
      setView("choice");
   };

   if (view === "dashboard" && loggedInVolunteer) {
      return (
         <>
            <Helmet>
               <title>Volunteer Portal | RightAid Health Foundation</title>
            </Helmet>
            <VolunteerDashboard volunteer={loggedInVolunteer} onLogout={handleLogout} />
         </>
      );
   }

   return (
      <>
         <Helmet>
            <title>Volunteer | RightAid Health Foundation</title>
            <meta
               name="description"
               content="Join RightAid Health Foundation as a volunteer. Register for medical outreaches, community health programs, and humanitarian missions across Nigeria."
            />
         </Helmet>

         <div className="min-h-screen bg-gray-50 py-20 px-6">
            <div className="max-w-6xl mx-auto">
               <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center mb-12"
               >
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                     <FaHandsHelping className="text-4xl text-green-600" />
                  </div>
                  <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Volunteer With Us</h1>
                  <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
                     Join thousands of healthcare professionals and community advocates making a difference across Nigeria.
                  </p>
               </motion.div>

               <AnimatePresence mode="wait">
                  {view === "choice" && (
                     <motion.div
                        key="choice"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
                     >
                        <button
                           onClick={() => setView("register")}
                           className="bg-white rounded-2xl shadow-lg p-8 text-left hover:shadow-xl transition group border-2 border-transparent hover:border-green-500"
                        >
                           <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-green-600 transition">
                              <FaUserPlus className="text-3xl text-green-600 group-hover:text-white transition" />
                           </div>
                           <h3 className="text-2xl font-bold text-gray-800 mb-3">New Volunteer</h3>
                           <p className="text-gray-600 mb-6">
                              Register for the first time. Complete the application, verify your email with OTP, and receive your volunteer credentials.
                           </p>
                           <div className="flex items-center gap-2 text-green-600 font-semibold">
                              Get Started <FaChevronRight className="group-hover:translate-x-1 transition" />
                           </div>
                        </button>

                        <button
                           onClick={() => setView("login")}
                           className="bg-white rounded-2xl shadow-lg p-8 text-left hover:shadow-xl transition group border-2 border-transparent hover:border-green-500"
                        >
                           <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-blue-600 transition">
                              <FaSignInAlt className="text-3xl text-blue-600 group-hover:text-white transition" />
                           </div>
                           <h3 className="text-2xl font-bold text-gray-800 mb-3">Returning Volunteer</h3>
                           <p className="text-gray-600 mb-6">
                              Already registered? Login to your volunteer portal to check messages, view upcoming missions, and manage your profile.
                           </p>
                           <div className="flex items-center gap-2 text-blue-600 font-semibold">
                              Login to Portal <FaChevronRight className="group-hover:translate-x-1 transition" />
                           </div>
                        </button>
                     </motion.div>
                  )}

                  {view === "login" && (
                     <div className="flex justify-center">
                        <VolunteerLogin
                           onLogin={handleLogin}
                           onSwitchToRegister={() => setView("register")}
                        />
                     </div>
                  )}

                  {view === "register" && (
                     <div className="flex justify-center">
                        <VolunteerRegister
                           onComplete={() => setView("login")}
                           onSwitchToLogin={() => setView("login")}
                        />
                     </div>
                  )}
               </AnimatePresence>

               {view === "choice" && (
                  <motion.div
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     transition={{ delay: 0.3 }}
                     className="mt-20 grid md:grid-cols-4 gap-6 max-w-5xl mx-auto"
                  >
                     {[
                        { icon: <FaStethoscope />, title: "Medical Support", desc: "Doctors, nurses, pharmacists" },
                        { icon: <FaHandsHelping />, title: "Outreach Team", desc: "Field operations & logistics" },
                        { icon: <FaCamera />, title: "Media & Awareness", desc: "Photography, social media" },
                        { icon: <FaTruck />, title: "Admin & Logistics", desc: "Coordination & planning" }
                     ].map((item, index) => (
                        <div key={index} className="bg-white rounded-xl p-6 text-center shadow-sm">
                           <div className="text-3xl text-green-600 mb-3">{item.icon}</div>
                           <h4 className="font-bold text-gray-800 mb-1">{item.title}</h4>
                           <p className="text-gray-500 text-sm">{item.desc}</p>
                        </div>
                     ))}
                  </motion.div>
               )}
            </div>
         </div>
      </>
   );
}