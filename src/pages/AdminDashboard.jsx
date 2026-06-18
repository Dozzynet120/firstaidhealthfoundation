import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
   collection,
   query,
   orderBy,
   onSnapshot,
   doc,
   updateDoc,
   deleteDoc,
   addDoc,
   serverTimestamp,
   where,
   getDocs
} from "firebase/firestore";
import { db } from "../assets/firebase/firebase.js";
import {
   FaUsers,
   FaSearch,
   FaFilter,
   FaEnvelope,
   FaMapMarkerAlt,
   FaStethoscope,
   FaHandsHelping,
   FaCamera,
   FaTruck,
   FaCheckCircle,
   FaTimesCircle,
   FaEdit,
   FaTrash,
   FaChartBar,
   FaCalendarAlt,
   FaPhone,
   FaIdCard,
   FaChevronDown,
   FaChevronUp,
   FaDownload,
   FaPaperPlane,
   FaSpinner,
   FaSignOutAlt,
   FaUserShield,
   FaHeartbeat,
   FaDonate,
   FaNewspaper,
   FaEye,
   FaEyeSlash,
   FaExclamationTriangle,
   FaSync,
   FaArrowLeft,
   FaLock
} from "react-icons/fa";

// ============================================
// ADMIN AUTH GUARD (Production: Use Firebase Auth)
// ============================================
const ADMIN_CREDENTIALS = {
   email: "admin@rightaid.org",
   password: "RightAid@2024"
};

function AdminLogin({ onLogin }) {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [showPassword, setShowPassword] = useState(false);
   const [error, setError] = useState("");
   const [loading, setLoading] = useState(false);

   const handleSubmit = (e) => {
      e.preventDefault();
      setError("");
      setLoading(true);

      setTimeout(() => {
         if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
            onLogin({ email, name: "Administrator", role: "super_admin" });
         } else {
            setError("Invalid admin credentials. Please try again.");
         }
         setLoading(false);
      }, 800);
   };

   return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
         <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md border border-gray-100"
         >
            <div className="text-center mb-8">
               <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg"
               >
                  <FaUserShield className="text-3xl text-white" />
               </motion.div>
               <h2 className="text-2xl font-bold text-gray-800">Admin Portal</h2>
               <p className="text-gray-500 text-sm mt-1">RightAid Health Foundation</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
               <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Admin Email</label>
                  <div className="relative">
                     <FaEnvelope className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                     <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="admin@rightaid.org"
                        required
                        className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white"
                     />
                  </div>
               </div>

               <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                  <div className="relative">
                     <FaLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                     <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        required
                        className="w-full pl-11 pr-12 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white"
                     />
                     <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                     >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                     </button>
                  </div>
               </div>

               <AnimatePresence>
                  {error && (
                     <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded-xl flex items-center gap-2"
                     >
                        <FaExclamationTriangle /> {error}
                     </motion.div>
                  )}
               </AnimatePresence>

               <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3.5 rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg shadow-green-200 disabled:opacity-70 flex items-center justify-center gap-2"
               >
                  {loading ? <><FaSpinner className="animate-spin" /> Authenticating...</> : <><FaUserShield /> Login to Dashboard</>}
               </motion.button>
            </form>

            <p className="text-center text-xs text-gray-400 mt-6">
               Secure admin access only. Unauthorized attempts are logged.
            </p>
         </motion.div>
      </div>
   );
}

// ============================================
// STATS CARD COMPONENT
// ============================================
function StatCard({ icon, title, value, subtitle, color, trend }) {
   const colorClasses = {
      green: "from-green-500 to-emerald-600 shadow-green-200",
      blue: "from-blue-500 to-indigo-600 shadow-blue-200",
      amber: "from-amber-500 to-orange-600 shadow-amber-200",
      rose: "from-rose-500 to-pink-600 shadow-rose-200",
   };

   return (
      <motion.div
         whileHover={{ y: -4 }}
         className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 relative overflow-hidden"
      >
         <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${colorClasses[color]} opacity-10 rounded-bl-full`} />
         <div className="flex items-start justify-between relative z-10">
            <div>
               <p className="text-gray-500 text-sm font-medium">{title}</p>
               <p className="text-3xl font-bold text-gray-800 mt-1">{value}</p>
               {subtitle && <p className="text-xs text-gray-400 mt-1">{subtitle}</p>}
               {trend && (
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full mt-2">
                     <FaChartBar /> {trend}
                  </span>
               )}
            </div>
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colorClasses[color]} flex items-center justify-center text-white shadow-lg`}>
               {icon}
            </div>
         </div>
      </motion.div>
   );
}

// ============================================
// VOLUNTEER ROW COMPONENT
// ============================================
function VolunteerRow({ volunteer, onStatusChange, onDelete, onMessage, index }) {
   const [expanded, setExpanded] = useState(false);

   const interestConfig = {
      "Medical Support": { icon: <FaStethoscope />, color: "text-rose-500 bg-rose-50" },
      "Outreach Team": { icon: <FaHandsHelping />, color: "text-blue-500 bg-blue-50" },
      "Media / Awareness": { icon: <FaCamera />, color: "text-purple-500 bg-purple-50" },
      "Admin / Logistics": { icon: <FaTruck />, color: "text-amber-500 bg-amber-50" },
   };

   const config = interestConfig[volunteer.interest] || interestConfig["Outreach Team"];

   return (
      <motion.div
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ delay: index * 0.05 }}
         className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all overflow-hidden"
      >
         <div
            className="p-4 md:p-5 cursor-pointer"
            onClick={() => setExpanded(!expanded)}
         >
            <div className="flex items-center gap-4">
               <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center text-green-700 font-bold text-sm md:text-base flex-shrink-0">
                  {volunteer.name?.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)}
               </div>

               <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                     <h3 className="font-bold text-gray-800 text-sm md:text-base truncate">{volunteer.name}</h3>
                     <span className={`text-[10px] md:text-xs px-2 py-0.5 rounded-full font-medium ${volunteer.status === "active"
                           ? "bg-green-100 text-green-700"
                           : volunteer.status === "inactive"
                              ? "bg-red-100 text-red-700"
                              : "bg-amber-100 text-amber-700"
                        }`}>
                        {volunteer.status || "pending"}
                     </span>
                  </div>
                  <div className="flex items-center gap-3 mt-1 text-xs md:text-sm text-gray-500 flex-wrap">
                     <span className="truncate">{volunteer.volunteerId}</span>
                     <span className="hidden md:inline">•</span>
                     <span className="truncate">{volunteer.email}</span>
                     <span className="hidden md:inline">•</span>
                     <span className="flex items-center gap-1 truncate">
                        <FaMapMarkerAlt className="text-gray-400 text-xs" /> {volunteer.location}
                     </span>
                  </div>
               </div>

               <div className="flex items-center gap-2">
                  <span className={`hidden sm:flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg font-medium ${config.color}`}>
                     {config.icon} {volunteer.interest}
                  </span>
                  {expanded ? <FaChevronUp className="text-gray-400 text-sm" /> : <FaChevronDown className="text-gray-400 text-sm" />}
               </div>
            </div>
         </div>

         <AnimatePresence>
            {expanded && (
               <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="border-t border-gray-100"
               >
                  <div className="p-4 md:p-5 bg-gray-50/50">
                     <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-5">
                        <div className="bg-white p-3 rounded-lg border border-gray-100">
                           <p className="text-xs text-gray-400 mb-1">Phone</p>
                           <p className="text-sm font-medium text-gray-700 flex items-center gap-1.5">
                              <FaPhone className="text-green-500 text-xs" /> {volunteer.phone || "N/A"}
                           </p>
                        </div>
                        <div className="bg-white p-3 rounded-lg border border-gray-100">
                           <p className="text-xs text-gray-400 mb-1">Interest Area</p>
                           <p className="text-sm font-medium text-gray-700">{volunteer.interest || "N/A"}</p>
                        </div>
                        <div className="bg-white p-3 rounded-lg border border-gray-100">
                           <p className="text-xs text-gray-400 mb-1">Joined</p>
                           <p className="text-sm font-medium text-gray-700">{volunteer.joinDate || "N/A"}</p>
                        </div>
                        <div className="bg-white p-3 rounded-lg border border-gray-100">
                           <p className="text-xs text-gray-400 mb-1">Missions</p>
                           <p className="text-sm font-medium text-gray-700">{volunteer.missionsCompleted || 0}</p>
                        </div>
                     </div>

                     <div className="flex flex-wrap gap-2">
                        <motion.button
                           whileHover={{ scale: 1.05 }}
                           whileTap={{ scale: 0.95 }}
                           onClick={(e) => { e.stopPropagation(); onMessage(volunteer); }}
                           className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-100 transition"
                        >
                           <FaEnvelope /> Message
                        </motion.button>
                        <motion.button
                           whileHover={{ scale: 1.05 }}
                           whileTap={{ scale: 0.95 }}
                           onClick={(e) => { e.stopPropagation(); onStatusChange(volunteer.firebaseId, volunteer.status === "active" ? "inactive" : "active"); }}
                           className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition ${volunteer.status === "active"
                                 ? "bg-red-50 text-red-600 hover:bg-red-100"
                                 : "bg-green-50 text-green-600 hover:bg-green-100"
                              }`}
                        >
                           {volunteer.status === "active" ? <><FaTimesCircle /> Deactivate</> : <><FaCheckCircle /> Activate</>}
                        </motion.button>
                        <motion.button
                           whileHover={{ scale: 1.05 }}
                           whileTap={{ scale: 0.95 }}
                           onClick={(e) => { e.stopPropagation(); onDelete(volunteer); }}
                           className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-200 transition ml-auto"
                        >
                           <FaTrash /> Remove
                        </motion.button>
                     </div>
                  </div>
               </motion.div>
            )}
         </AnimatePresence>
      </motion.div>
   );
}

// ============================================
// MESSAGE MODAL
// ============================================
function MessageModal({ volunteer, onClose, onSend }) {
   const [subject, setSubject] = useState("");
   const [body, setBody] = useState("");
   const [sending, setSending] = useState(false);
   const [sent, setSent] = useState(false);

   const handleSend = async () => {
      if (!subject.trim() || !body.trim()) return;
      setSending(true);
      try {
         await onSend(volunteer, subject, body);
         setSent(true);
         setTimeout(() => onClose(), 1500);
      } catch (err) {
         console.error(err);
      }
      setSending(false);
   };

   return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
         <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="bg-white rounded-2xl p-6 md:p-8 w-full max-w-lg shadow-2xl"
         >
            {sent ? (
               <div className="text-center py-8">
                  <motion.div
                     initial={{ scale: 0 }}
                     animate={{ scale: 1 }}
                     className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
                  >
                     <FaCheckCircle className="text-3xl text-green-600" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-gray-800">Message Sent!</h3>
                  <p className="text-gray-500 text-sm mt-2">{volunteer.name} will be notified.</p>
               </div>
            ) : (
               <>
                  <div className="flex items-center gap-3 mb-6">
                     <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <FaEnvelope className="text-blue-600" />
                     </div>
                     <div>
                        <h3 className="text-lg font-bold text-gray-800">Send Message</h3>
                        <p className="text-sm text-gray-500">To: {volunteer.name} ({volunteer.email})</p>
                     </div>
                  </div>

                  <div className="space-y-4">
                     <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Subject</label>
                        <input
                           value={subject}
                           onChange={(e) => setSubject(e.target.value)}
                           placeholder="Mission Update or Announcement"
                           className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 focus:bg-white transition"
                        />
                     </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Message</label>
                        <textarea
                           value={body}
                           onChange={(e) => setBody(e.target.value)}
                           rows={5}
                           placeholder="Type your message here..."
                           className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 focus:bg-white transition resize-none"
                        />
                     </div>
                  </div>

                  <div className="flex gap-3 mt-6">
                     <button
                        onClick={onClose}
                        className="flex-1 py-2.5 border border-gray-200 rounded-xl text-gray-600 font-medium hover:bg-gray-50 transition"
                     >
                        Cancel
                     </button>
                     <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleSend}
                        disabled={sending || !subject.trim() || !body.trim()}
                        className="flex-1 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-medium hover:from-blue-600 hover:to-indigo-700 disabled:opacity-50 transition flex items-center justify-center gap-2 shadow-lg shadow-blue-200"
                     >
                        {sending ? <><FaSpinner className="animate-spin" /> Sending...</> : <><FaPaperPlane /> Send Message</>}
                     </motion.button>
                  </div>
               </>
            )}
         </motion.div>
      </div>
   );
}

// ============================================
// DELETE CONFIRMATION MODAL
// ============================================
function DeleteModal({ volunteer, onClose, onConfirm }) {
   const [deleting, setDeleting] = useState(false);

   const handleDelete = async () => {
      setDeleting(true);
      try {
         console.log("Deleting volunteer:", volunteer.firebaseId);
         await onConfirm(volunteer.firebaseId);
         console.log("Volunteer deleted successfully");
      } catch (err) {
         console.error("Delete error in modal:", err);
         alert("Delete failed: " + (err.message || "Unknown error") + "\n\nTo fix this, update your Firestore rules to allow delete operations.");
      } finally {
         setDeleting(false);
         onClose();
      }
   };

   return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
         <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl p-6 md:p-8 w-full max-w-md shadow-2xl text-center"
         >
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
               <FaExclamationTriangle className="text-3xl text-red-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Remove Volunteer?</h3>
            <p className="text-gray-500 mb-6">
               Are you sure you want to remove <strong>{volunteer.name}</strong>? This action cannot be undone.
            </p>
            <div className="flex gap-3">
               <button
                  onClick={onClose}
                  className="flex-1 py-2.5 border border-gray-200 rounded-xl text-gray-600 font-medium hover:bg-gray-50 transition"
               >
                  Cancel
               </button>
               <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleDelete}
                  disabled={deleting}
                  className="flex-1 py-2.5 bg-gradient-to-r from-red-500 to-rose-600 text-white rounded-xl font-medium hover:from-red-600 hover:to-rose-700 disabled:opacity-50 transition flex items-center justify-center gap-2 shadow-lg shadow-red-200"
               >
                  {deleting ? <><FaSpinner className="animate-spin" /> Removing...</> : <><FaTrash /> Remove</>}
               </motion.button>
            </div>
         </motion.div>
      </div>
   );
}

// ============================================
// MAIN ADMIN DASHBOARD
// ============================================
export default function AdminDashboard() {
   const navigate = useNavigate();
   const [admin, setAdmin] = useState(() => {
      const saved = sessionStorage.getItem("rightaid_admin");
      return saved ? JSON.parse(saved) : null;
   });

   const [volunteers, setVolunteers] = useState([]);
   const [filteredVolunteers, setFilteredVolunteers] = useState([]);
   const [searchTerm, setSearchTerm] = useState("");
   const [filterStatus, setFilterStatus] = useState("all");
   const [filterInterest, setFilterInterest] = useState("all");
   const [loading, setLoading] = useState(true);
   const [refreshing, setRefreshing] = useState(false);
   const [selectedVolunteer, setSelectedVolunteer] = useState(null);
   const [showMessageModal, setShowMessageModal] = useState(false);
   const [showDeleteModal, setShowDeleteModal] = useState(false);
   const [activeTab, setActiveTab] = useState("volunteers");
   const [stats, setStats] = useState({
      total: 0,
      active: 0,
      inactive: 0,
      pending: 0,
      medical: 0,
      outreach: 0,
      media: 0,
      admin: 0
   });

   // Persist admin session
   useEffect(() => {
      if (admin) {
         sessionStorage.setItem("rightaid_admin", JSON.stringify(admin));
      }
   }, [admin]);

   // Real-time Firestore subscription
   useEffect(() => {
      if (!admin) return;

      setLoading(true);
      const q = query(collection(db, "volunteers"), orderBy("createdAt", "desc"));

      const unsubscribe = onSnapshot(q, (snapshot) => {
         const data = snapshot.docs.map(doc => ({
            firebaseId: doc.id,
            ...doc.data()
         }));
         setVolunteers(data);
         setLoading(false);
         setRefreshing(false);
      }, (error) => {
         console.error("Firestore subscription error:", error);
         setLoading(false);
         setRefreshing(false);
      });

      return () => unsubscribe();
   }, [admin]);

   // Calculate stats (exclude soft-deleted volunteers)
   useEffect(() => {
      const activeVolunteers = volunteers.filter(v => !v.isDeleted && v.status !== "deleted");
      setStats({
         total: activeVolunteers.length,
         active: activeVolunteers.filter(v => v.status === "active").length,
         inactive: activeVolunteers.filter(v => v.status === "inactive").length,
         pending: activeVolunteers.filter(v => !v.status || v.status === "pending").length,
         medical: activeVolunteers.filter(v => v.interest === "Medical Support").length,
         outreach: activeVolunteers.filter(v => v.interest === "Outreach Team").length,
         media: activeVolunteers.filter(v => v.interest === "Media / Awareness").length,
         admin: activeVolunteers.filter(v => v.interest === "Admin / Logistics").length,
      });
   }, [volunteers]);

   // Search & filter (exclude soft-deleted)
   useEffect(() => {
      let result = volunteers.filter(v => !v.isDeleted && v.status !== "deleted");

      if (searchTerm.trim()) {
         const term = searchTerm.toLowerCase();
         result = result.filter(v =>
            v.name?.toLowerCase().includes(term) ||
            v.email?.toLowerCase().includes(term) ||
            v.volunteerId?.toLowerCase().includes(term) ||
            v.location?.toLowerCase().includes(term) ||
            v.phone?.toLowerCase().includes(term)
         );
      }

      if (filterStatus !== "all") {
         result = result.filter(v => (v.status || "pending") === filterStatus);
      }

      if (filterInterest !== "all") {
         result = result.filter(v => v.interest === filterInterest);
      }

      setFilteredVolunteers(result);
   }, [searchTerm, filterStatus, filterInterest, volunteers]);

   const handleStatusChange = async (id, newStatus) => {
      try {
         await updateDoc(doc(db, "volunteers", id), {
            status: newStatus,
            updatedAt: serverTimestamp()
         });
      } catch (err) {
         console.error("Status update failed:", err);
         alert("Failed to update volunteer status. Please try again.");
      }
   };

   const handleDelete = async (id) => {
      try {
         console.log("Attempting hard delete for volunteer:", id);
         await deleteDoc(doc(db, "volunteers", id));
         console.log("Hard delete successful for ID:", id);
      } catch (err) {
         console.error("Hard delete failed:", err);

         // Fallback: Soft delete (mark as deleted instead of removing)
         if (err.message?.includes("Missing or insufficient permissions")) {
            console.log("Attempting soft delete (marking as removed)...");
            try {
               await updateDoc(doc(db, "volunteers", id), {
                  status: "deleted",
                  deletedAt: serverTimestamp(),
                  isDeleted: true
               });
               console.log("Soft delete successful - volunteer marked as deleted");
               return; // Don't throw, soft delete worked
            } catch (softErr) {
               console.error("Soft delete also failed:", softErr);
               throw new Error("Both hard and soft delete failed. Check Firestore rules.");
            }
         }

         throw err;
      }
   };

   const handleSendMessage = async (volunteer, subject, body) => {
      const messagesRef = collection(db, "volunteers", volunteer.firebaseId, "messages");
      await addDoc(messagesRef, {
         subject,
         body,
         date: new Date().toISOString().split("T")[0],
         read: false,
         sentAt: serverTimestamp()
      });

      await addDoc(collection(db, "admin_messages"), {
         toVolunteerId: volunteer.volunteerId,
         toName: volunteer.name,
         toEmail: volunteer.email,
         subject,
         body,
         sentBy: admin.email,
         sentAt: serverTimestamp()
      });
   };

   const exportToCSV = () => {
      const headers = ["Volunteer ID", "Name", "Email", "Phone", "Location", "Interest", "Status", "Join Date", "Missions Completed"];
      const rows = filteredVolunteers.map(v => [
         v.volunteerId,
         v.name,
         v.email,
         v.phone || "",
         v.location || "",
         v.interest || "",
         v.status || "pending",
         v.joinDate || "",
         v.missionsCompleted || 0
      ]);

      const csvContent = "\uFEFF" + [headers, ...rows].map(row =>
         row.map(field => `"${String(field).replace(/"/g, '""')}"`).join(",")
      ).join("\n");

      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `rightaid-volunteers-${new Date().toISOString().split("T")[0]}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
   };

   const handleRefresh = () => {
      setRefreshing(true);
      setTimeout(() => setRefreshing(false), 1000);
   };

   const handleLogout = () => {
      sessionStorage.removeItem("rightaid_admin");
      setAdmin(null);
      navigate("/admin");
   };

   if (!admin) {
      return <AdminLogin onLogin={setAdmin} />;
   }

   return (
      <>
         <Helmet>
            <title>Admin Dashboard | RightAid Health Foundation</title>
            <meta name="robots" content="noindex, nofollow" />
         </Helmet>

         <div className="min-h-screen bg-gray-50">
            {/* HEADER */}
            <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
               <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-4">
                  <div className="flex items-center justify-between">
                     <div className="flex items-center gap-3">
                        <div className="w-9 h-9 md:w-10 md:h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-md">
                           <FaHeartbeat className="text-lg md:text-xl text-white" />
                        </div>
                        <div className="hidden sm:block">
                           <h1 className="font-bold text-gray-800 text-sm md:text-base leading-tight">RightAid Admin</h1>
                           <p className="text-[10px] md:text-xs text-gray-400">Health Foundation</p>
                        </div>
                     </div>

                     <div className="flex items-center gap-2 md:gap-4">
                        <div className="hidden md:flex items-center gap-2 text-sm text-gray-500 bg-gray-50 px-3 py-1.5 rounded-lg">
                           <FaUserShield className="text-green-600" />
                           <span className="font-medium text-gray-700">{admin.name}</span>
                           <span className="text-xs px-1.5 py-0.5 bg-green-100 text-green-700 rounded-full">{admin.role}</span>
                        </div>
                        <motion.button
                           whileHover={{ scale: 1.05 }}
                           whileTap={{ scale: 0.95 }}
                           onClick={handleLogout}
                           className="flex items-center gap-1.5 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition font-medium"
                        >
                           <FaSignOutAlt /> <span className="hidden sm:inline">Logout</span>
                        </motion.button>
                     </div>
                  </div>
               </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8">
               {/* STATS GRID */}
               <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mb-6 md:mb-8">
                  <StatCard
                     icon={<FaUsers />}
                     title="Total Volunteers"
                     value={stats.total}
                     subtitle={`${stats.active} active`}
                     color="green"
                  />
                  <StatCard
                     icon={<FaCheckCircle />}
                     title="Active"
                     value={stats.active}
                     subtitle={`${Math.round((stats.active / (stats.total || 1)) * 100)}% rate`}
                     color="blue"
                  />
                  <StatCard
                     icon={<FaStethoscope />}
                     title="Medical Support"
                     value={stats.medical}
                     subtitle="Healthcare professionals"
                     color="amber"
                  />
                  <StatCard
                     icon={<FaHandsHelping />}
                     title="Outreach Team"
                     value={stats.outreach}
                     subtitle="Field operations"
                     color="rose"
                  />
               </div>

               {/* INTEREST BREAKDOWN BAR */}
               <div className="bg-white rounded-xl p-4 md:p-5 shadow-sm border border-gray-100 mb-6">
                  <div className="flex items-center justify-between mb-3">
                     <h3 className="font-semibold text-gray-700 text-sm">Volunteer Distribution by Interest</h3>
                  </div>
                  <div className="flex h-3 rounded-full overflow-hidden bg-gray-100">
                     {stats.total > 0 && (
                        <>
                           <div className="bg-rose-400" style={{ width: `${(stats.medical / stats.total) * 100}%` }} />
                           <div className="bg-blue-400" style={{ width: `${(stats.outreach / stats.total) * 100}%` }} />
                           <div className="bg-purple-400" style={{ width: `${(stats.media / stats.total) * 100}%` }} />
                           <div className="bg-amber-400" style={{ width: `${(stats.admin / stats.total) * 100}%` }} />
                        </>
                     )}
                  </div>
                  <div className="flex flex-wrap gap-3 mt-3 text-xs">
                     <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-rose-400" /> Medical ({stats.medical})</span>
                     <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-400" /> Outreach ({stats.outreach})</span>
                     <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-purple-400" /> Media ({stats.media})</span>
                     <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-400" /> Admin ({stats.admin})</span>
                  </div>
               </div>

               {/* FILTERS & CONTROLS */}
               <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-5 mb-6">
                  <div className="flex flex-col lg:flex-row gap-4">
                     {/* Search */}
                     <div className="flex-1 relative">
                        <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                           type="text"
                           placeholder="Search by name, email, ID, phone or location..."
                           value={searchTerm}
                           onChange={(e) => setSearchTerm(e.target.value)}
                           className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-50 focus:bg-white transition text-sm"
                        />
                     </div>

                     {/* Status Filter */}
                     <div className="flex gap-2 overflow-x-auto pb-1 lg:pb-0">
                        {["all", "active", "inactive", "pending"].map(status => (
                           <button
                              key={status}
                              onClick={() => setFilterStatus(status)}
                              className={`px-3 py-2 rounded-lg text-xs font-semibold capitalize whitespace-nowrap transition ${filterStatus === status
                                    ? "bg-green-600 text-white shadow-md shadow-green-200"
                                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                 }`}
                           >
                              {status}
                           </button>
                        ))}
                     </div>

                     {/* Interest Filter */}
                     <select
                        value={filterInterest}
                        onChange={(e) => setFilterInterest(e.target.value)}
                        className="px-3 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                     >
                        <option value="all">All Interests</option>
                        <option value="Medical Support">Medical Support</option>
                        <option value="Outreach Team">Outreach Team</option>
                        <option value="Media / Awareness">Media / Awareness</option>
                        <option value="Admin / Logistics">Admin / Logistics</option>
                     </select>
                  </div>

                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                     <p className="text-sm text-gray-500">
                        Showing <span className="font-semibold text-gray-700">{filteredVolunteers.length}</span> of <span className="font-semibold text-gray-700">{stats.total}</span> volunteers
                     </p>
                     <div className="flex gap-2">
                        <motion.button
                           whileHover={{ scale: 1.05 }}
                           whileTap={{ scale: 0.95 }}
                           onClick={handleRefresh}
                           className={`flex items-center gap-2 px-3 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-200 transition ${refreshing ? "cursor-wait" : ""}`}
                        >
                           <FaSync className={refreshing ? "animate-spin" : ""} /> Refresh
                        </motion.button>
                        <motion.button
                           whileHover={{ scale: 1.05 }}
                           whileTap={{ scale: 0.95 }}
                           onClick={exportToCSV}
                           className="flex items-center gap-2 px-3 py-2 bg-gray-800 text-white rounded-lg text-sm font-medium hover:bg-gray-900 transition shadow-md"
                        >
                           <FaDownload /> Export CSV
                        </motion.button>
                     </div>
                  </div>
               </div>

               {/* VOLUNTEER LIST */}
               <div className="space-y-3">
                  {loading ? (
                     <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-100">
                        <FaSpinner className="animate-spin text-4xl mx-auto mb-4 text-green-600" />
                        <p className="text-gray-500 font-medium">Loading volunteers...</p>
                     </div>
                  ) : filteredVolunteers.length === 0 ? (
                     <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-100">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                           <FaSearch className="text-2xl text-gray-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-700 mb-1">No volunteers found</h3>
                        <p className="text-gray-500 text-sm">Try adjusting your search or filter criteria.</p>
                     </div>
                  ) : (
                     filteredVolunteers.map((volunteer, index) => (
                        <VolunteerRow
                           key={volunteer.firebaseId}
                           volunteer={volunteer}
                           index={index}
                           onStatusChange={handleStatusChange}
                           onDelete={(v) => {
                              setSelectedVolunteer(v);
                              setShowDeleteModal(true);
                           }}
                           onMessage={(v) => {
                              setSelectedVolunteer(v);
                              setShowMessageModal(true);
                           }}
                        />
                     ))
                  )}
               </div>
            </div>
         </div>

         {/* MODALS */}
         <AnimatePresence>
            {showMessageModal && selectedVolunteer && (
               <MessageModal
                  volunteer={selectedVolunteer}
                  onClose={() => { setShowMessageModal(false); setSelectedVolunteer(null); }}
                  onSend={handleSendMessage}
               />
            )}
            {showDeleteModal && selectedVolunteer && (
               <DeleteModal
                  volunteer={selectedVolunteer}
                  onClose={() => { setShowDeleteModal(false); setSelectedVolunteer(null); }}
                  onConfirm={handleDelete}
               />
            )}
         </AnimatePresence>
      </>
   );
}