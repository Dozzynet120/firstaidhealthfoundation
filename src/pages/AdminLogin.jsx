import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [error, setError] = useState("");
   const [loading, setLoading] = useState(false);

   const navigate = useNavigate();

   const login = async (e) => {
      e.preventDefault();
      setError("");
      setLoading(true);
      try {
         await signInWithEmailAndPassword(auth, email, password);
         navigate("/admin/dashboard");
      } catch {
         setError("Invalid credentials. Please try again.");
      } finally {
         setLoading(false);
      }
   };

   return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 px-6">
         <form
            onSubmit={login}
            className="bg-white p-8 md:p-10 rounded-2xl shadow-2xl w-full max-w-md border border-gray-100"
            autoComplete="off"
         >
            {/* LOGO - Using HTML/CSS instead of SVG text for reliability */}
            <div className="text-center mb-6">
               <div className="flex items-center justify-center gap-3 mb-2">
                  {/* Green circle with white cross */}
                  <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center flex-shrink-0">
                     <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="10" y="4" width="4" height="16" rx="1" fill="white" />
                        <rect x="4" y="10" width="16" height="4" rx="1" fill="white" />
                     </svg>
                  </div>
                  {/* Text logo using HTML - renders everywhere */}
                  <div className="text-left leading-tight">
                     <div className="text-gray-900 font-bold text-lg tracking-wide">RIGHTAID</div>
                     <div className="text-gray-500 text-xs tracking-widest uppercase">Health Foundation</div>
                  </div>
               </div>

               <h1 className="text-2xl font-bold text-gray-800 mt-4">Admin Portal</h1>
               <p className="text-gray-500 text-sm mt-1">RightAid Health Foundation</p>
            </div>

            {error && (
               <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded-lg text-center mb-4">
                  {error}
               </div>
            )}

            <div className="space-y-4">
               <div>
                  <label htmlFor="admin-email" className="block text-sm font-medium text-gray-700 mb-1.5">
                     Email Address
                  </label>
                  <input
                     id="admin-email"
                     name="email"
                     type="email"
                     placeholder="admin@rightaid.org"
                     autoComplete="off"
                     data-lpignore="true"
                     className="w-full border border-gray-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-50 focus:bg-white transition"
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     required
                  />
               </div>
               <div>
                  <label htmlFor="admin-password" className="block text-sm font-medium text-gray-700 mb-1.5">
                     Password
                  </label>
                  <input
                     id="admin-password"
                     name="password"
                     type="password"
                     placeholder="Enter your password"
                     autoComplete="new-password"
                     data-lpignore="true"
                     className="w-full border border-gray-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-50 focus:bg-white transition"
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                     required
                  />
               </div>
            </div>

            <button
               type="submit"
               disabled={loading}
               className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3.5 mt-6 rounded-xl hover:from-green-700 hover:to-emerald-700 transition font-semibold shadow-lg disabled:opacity-70 flex items-center justify-center gap-2"
            >
               {loading ? "Logging in..." : "Login to Dashboard"}
            </button>
         </form>
      </div>
   );
}