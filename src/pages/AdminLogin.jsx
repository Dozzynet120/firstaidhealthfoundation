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
      } catch (error) {
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
         >
            {/* LOGO - Using background-image approach */}
            <div className="text-center mb-8">
               <div
                  className="mx-auto mb-4 bg-no-repeat bg-center bg-contain"
                  style={{
                     width: "120px",
                     height: "120px",
                     backgroundImage: "url(/logo.svg?v=4)",
                     backgroundSize: "contain"
                  }}
               />
               <h1 className="text-2xl font-bold text-gray-800">Admin Portal</h1>
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
                     autoComplete="email"
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
                     autoComplete="current-password"
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