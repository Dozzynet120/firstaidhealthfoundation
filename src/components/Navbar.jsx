import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/about/logo.svg";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
   const [open, setOpen] = useState(false);
   const [homeHover, setHomeHover] = useState(false);
   const [scrolled, setScrolled] = useState(false);

   const location = useLocation();

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
            <Link to="/" className="flex items-center gap-3">
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
                           className="absolute left-0 mt-3 w-[420px] bg-white shadow-2xl rounded-xl p-5 grid gap-4"
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

            {/* MOBILE BUTTON */}
            <button
               className="md:hidden text-2xl"
               onClick={() => setOpen(!open)}
            >
               ☰
            </button>
         </div>

         {/* MOBILE MENU */}
         <AnimatePresence>
            {open && (
               <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="md:hidden flex flex-col gap-4 mt-4 px-6 pb-4 bg-white/90 backdrop-blur"
               >
                  <Link to="/" onClick={() => setOpen(false)}>Home</Link>
                  <Link to="/about" onClick={() => setOpen(false)}>About</Link>
                  <Link to="/services" onClick={() => setOpen(false)}>Services</Link>
                  <Link to="/blog" onClick={() => setOpen(false)}>Blog</Link>
                  <Link to="/gallery" onClick={() => setOpen(false)}>Gallery</Link>
                  <Link to="/faq" onClick={() => setOpen(false)}>FAQ</Link>
                  <Link to="/contact" onClick={() => setOpen(false)}>Contact</Link>
                  <Link to="/volunteer" onClick={() => setOpen(false)}>Volunteer</Link>

                  <Link
                     to="/donate"
                     className="bg-green-600 text-white px-4 py-2 rounded-lg w-fit"
                     onClick={() => setOpen(false)}
                  >
                     Donate
                  </Link>
               </motion.div>
            )}
         </AnimatePresence>
      </motion.nav>
   );
}