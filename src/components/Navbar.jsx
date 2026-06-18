import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/about/logo.svg";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
   const [open, setOpen] = useState(false);
   const [homeHover, setHomeHover] = useState(false);
   const [scrolled, setScrolled] = useState(false);

   const location = useLocation();

   // Close mobile menu on route change
   useEffect(() => {
      setOpen(false);
   }, [location.pathname]);

   // SHRINK ON SCROLL
   useEffect(() => {
      const handleScroll = () => {
         setScrolled(window.scrollY > 50);
      };

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
   }, []);

   const navClass = scrolled
      ? "py-2 bg-white/70 backdrop-blur-xl shadow-md"
      : "py-4 bg-white/40 backdrop-blur-lg";

   const activeLink = (path) =>
      location.pathname === path
         ? "text-green-700 font-bold"
         : "text-gray-700 hover:text-green-600";

   return (
      <motion.nav
         className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${navClass}`}
      >
         <div className="max-w-6xl mx-auto flex justify-between items-center px-6">

            {/* LOGO */}
            <Link to="/" className="flex items-center gap-3 z-[60] relative">
               <img src={logo} alt="logo" className="w-35 h-16" />
               <div className="text-green-700 font-bold leading-tight text-sm md:text-base">
                  Right Aid Health Foundation
               </div>
            </Link>

            {/* DESKTOP MENU */}
            <div className="hidden md:flex gap-6 items-center relative">

               {/* HOME DROPDOWN */}
               <div
                  className="relative"
                  onMouseEnter={() => setHomeHover(true)}
                  onMouseLeave={() => setHomeHover(false)}
               >
                  <Link to="/" className={activeLink("/")}>
                     Home
                  </Link>

                  <AnimatePresence>
                     {homeHover && (
                        <motion.div
                           initial={{ opacity: 0, y: 10 }}
                           animate={{ opacity: 1, y: 0 }}
                           exit={{ opacity: 0, y: 10 }}
                           transition={{ duration: 0.2 }}
                           className="absolute left-0 mt-3 w-[420px] bg-white shadow-2xl rounded-xl p-5 grid gap-4 z-50"
                        >
                           <div>
                              <h3 className="font-bold text-green-700">Mission & Vision</h3>
                              <p className="text-sm text-gray-600">
                                 To provide accessible healthcare and save lives in underserved communities.
                              </p>
                           </div>

                           <div>
                              <h3 className="font-bold text-green-700">Who We Are</h3>
                              <p className="text-sm text-gray-600">
                                 A humanitarian NGO focused on healthcare outreach and surgical support.
                              </p>
                           </div>

                           <div>
                              <h3 className="font-bold text-green-700">What We Do</h3>
                              <p className="text-sm text-gray-600">
                                 Medical outreach, emergency care, and surgical assistance programs.
                              </p>
                           </div>

                           <div>
                              <h3 className="font-bold text-green-700">Where We Work</h3>
                              <p className="text-sm text-gray-600">
                                 Rural and underserved communities across Nigeria.
                              </p>
                           </div>

                           <div>
                              <h3 className="font-bold text-green-700">Resources</h3>
                              <p className="text-sm text-gray-600">
                                 Reports, health guides, and community education materials.
                              </p>
                           </div>
                        </motion.div>
                     )}
                  </AnimatePresence>
               </div>

               <Link to="/about" className={activeLink("/about")}>About</Link>
               <Link to="/services" className={activeLink("/services")}>Services</Link>
               <Link to="/blog" className={activeLink("/blog")}>Blog</Link>
               <Link to="/gallery" className={activeLink("/gallery")}>Gallery</Link>
               <Link to="/faq" className={activeLink("/faq")}>FAQ</Link>
               <Link to="/contact" className={activeLink("/contact")}>Contact</Link>
               <Link to="/volunteer" className={activeLink("/volunteer")}>Volunteer</Link>

               {/* DONATE BUTTON */}
               <Link
                  to="/donate"
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
               >
                  Donate
               </Link>
            </div>

            {/* MOBILE HAMBURGER BUTTON */}
            <button
               className="md:hidden text-2xl z-[60] relative p-2"
               onClick={() => setOpen(!open)}
               aria-label="Toggle menu"
            >
               {open ? "✕" : "☰"}
            </button>
         </div>

         {/* MOBILE MENU OVERLAY */}
         <AnimatePresence>
            {open && (
               <>
                  {/* Backdrop */}
                  <motion.div
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     exit={{ opacity: 0 }}
                     className="fixed inset-0 bg-black/30 z-40 md:hidden"
                     onClick={() => setOpen(false)}
                  />

                  {/* Mobile Menu Panel */}
                  <motion.div
                     initial={{ opacity: 0, x: "100%" }}
                     animate={{ opacity: 1, x: 0 }}
                     exit={{ opacity: 0, x: "100%" }}
                     transition={{ type: "spring", damping: 25, stiffness: 200 }}
                     className="fixed top-0 right-0 h-full w-[280px] bg-white shadow-2xl z-50 md:hidden flex flex-col pt-20 px-6 pb-6 overflow-y-auto"
                  >
                     <div className="flex flex-col gap-1">
                        <MobileLink to="/" label="Home" activeLink={activeLink} setOpen={setOpen} />
                        <MobileLink to="/about" label="About" activeLink={activeLink} setOpen={setOpen} />
                        <MobileLink to="/services" label="Services" activeLink={activeLink} setOpen={setOpen} />
                        <MobileLink to="/blog" label="Blog" activeLink={activeLink} setOpen={setOpen} />
                        <MobileLink to="/gallery" label="Gallery" activeLink={activeLink} setOpen={setOpen} />
                        <MobileLink to="/faq" label="FAQ" activeLink={activeLink} setOpen={setOpen} />
                        <MobileLink to="/contact" label="Contact" activeLink={activeLink} setOpen={setOpen} />
                        <MobileLink to="/volunteer" label="Volunteer" activeLink={activeLink} setOpen={setOpen} />
                     </div>

                     <div className="mt-6 pt-6 border-t border-gray-200">
                        <Link
                           to="/donate"
                           className="block w-full text-center bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 transition font-semibold"
                           onClick={() => setOpen(false)}
                        >
                           Donate Now
                        </Link>
                     </div>
                  </motion.div>
               </>
            )}
         </AnimatePresence>
      </motion.nav>
   );
}

// Helper component for mobile links to ensure clicks work properly
function MobileLink({ to, label, activeLink, setOpen }) {
   return (
      <Link
         to={to}
         className={`block py-3 px-4 rounded-lg text-base font-medium transition-colors ${activeLink(to)} hover:bg-gray-50`}
         onClick={() => setOpen(false)}
      >
         {label}
      </Link>
   );
}