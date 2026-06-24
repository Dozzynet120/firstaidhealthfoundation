import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
   FaFacebook,
   FaInstagram,
   FaTwitter,
   FaYoutube,
   FaWhatsapp,
   FaTiktok
} from "react-icons/fa";

export default function Footer() {
   const [visible, setVisible] = useState(false);

   // FADE-IN ON SCROLL
   useEffect(() => {
      const handleScroll = () => {
         const footer = document.getElementById("footer");
         if (!footer) return;

         const rect = footer.getBoundingClientRect();
         if (rect.top < window.innerHeight - 100) {
            setVisible(true);
         }
      };

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
   }, []);

   return (
      <>

         {/* FOOTER */}
         <footer
            id="footer"
            className={`bg-gray-900 text-white pt-16 pb-8 px-6 transition-all duration-1000
            ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
         >

            <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-10">

               {/* BRAND */}
               <div>
                  <h2 className="text-xl font-bold text-green-400">
                     RightAid Health Foundation
                  </h2>

                  <p className="mt-4 text-gray-300 text-sm">
                     Health Foundation for impoverished communities.
                  </p>

                  <p className="mt-3 text-gray-400 text-sm">
                     We collaborate to deliver life-saving healthcare across Nigeria.
                  </p>

                  {/* SOCIAL ICONS */}
                  <div className="flex gap-4 mt-5 text-xl text-gray-300">
                     <a href="https://facebook.com/yourpage" target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition-colors">
                        <FaFacebook />
                     </a>
                     <a href="https://instagram.com/yourpage" target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition-colors">
                        <FaInstagram />
                     </a>
                     <a href="https://x.com/rightaid17?s=21" target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition-colors">
                        <FaTwitter />
                     </a>
                     <a href="https://www.tiktok.com/@rightaidhealthfoundation" target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition-colors">
                        <FaTiktok />
                     </a>
                     <a href="https://youtube.com/yourchannel" target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition-colors">
                        <FaYoutube />
                     </a>
                  </div>
               </div>

               {/* LINKS */}
               <div>
                  <h3 className="text-lg font-semibold">Quick Links</h3>

                  <ul className="mt-4 space-y-2 text-gray-300 text-sm">
                     <li><Link to="/" className="hover:text-green-400">Home</Link></li>
                     <li><Link to="/about" className="hover:text-green-400">About Us</Link></li>
                     <li><Link to="/services" className="hover:text-green-400">Services</Link></li>
                     <li><Link to="/gallery" className="hover:text-green-400">Gallery</Link></li>
                     <li><Link to="/faq" className="hover:text-green-400">FAQs</Link></li>
                  </ul>
               </div>

               {/* CONTACT */}
               <div>
                  <h3 className="text-lg font-semibold">Contact</h3>

                  <ul className="mt-4 space-y-3 text-gray-300 text-sm">
                     <li>📞 +234 812 365 8741</li>
                     <li>📧 info@rightaidhealthfoundation.com</li>
                     <li>
                        📍 485 Agege Motor Rd, Mafoluku Oshodi,<br />
                        Lagos, Nigeria
                     </li>
                     <li>
                        📍USA address
                        800 Ingleside Avenue, Suute C1 Catonsville Maryland, 21228 USA,<br />
                     </li>
                  </ul>
               </div>

               {/* NEWSLETTER */}
               <div>
                  <h3 className="text-lg font-semibold">Newsletter</h3>

                  <p className="mt-3 text-gray-400 text-sm">
                     Get updates on outreach programs.
                  </p>

                  <input
                     type="email"
                     placeholder="Your email"
                     className="mt-3 w-full px-3 py-2 bg-gray-800 rounded text-white"
                  />

                  <button className="mt-3 bg-green-600 hover:bg-green-700 w-full py-2 rounded">
                     Subscribe
                  </button>
               </div>

            </div>

            {/* BOTTOM */}
            <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-400 text-sm">
               © {new Date().getFullYear()} RightAid Health Foundation - All Rights Reserved.
            </div>

         </footer>

         {/* FLOATING WHATSAPP BUTTON */}
         <a
            href="https://wa.me/2348123658741"
            target="_blank"
            rel="noreferrer"
            className="fixed bottom-5 right-5 bg-green-500 p-4 rounded-full text-white text-2xl shadow-lg hover:scale-110 transition"
         >
            <FaWhatsapp />
         </a>
      </>
   );
}