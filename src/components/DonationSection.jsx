import { Link } from "react-router-dom";
import { FaStethoscope, FaSyringe, FaProcedures, FaUsers } from "react-icons/fa";

export default function DonationSection() {

   const tiers = [
      {
         title: "Tier 1",
         amount: "₦25K",
         desc: "Provides medical consultations and basic treatment for multiple patients.",
         icon: <FaStethoscope className="text-green-600 text-3xl" />
      },
      {
         title: "Tier 2",
         amount: "₦50K",
         desc: "Supports safe anaesthesia supplies for a surgical procedure.",
         icon: <FaSyringe className="text-green-600 text-3xl" />
      },
      {
         title: "Tier 3",
         amount: "₦100K",
         desc: "Helps fund a life-saving surgical intervention for a patient in need.",
         icon: <FaProcedures className="text-green-600 text-3xl" />
      },
      {
         title: "Tier 4",
         amount: "₦250K+",
         desc: "Supports an entire community outreach program, including surgeries, training, and follow-up care.",
         icon: <FaUsers className="text-green-600 text-3xl" />
      },
   ];

   return (
      <section className="py-24 px-6 bg-green-700 text-white">

         <div className="max-w-6xl mx-auto text-center">

            {/* MAIN HEADING */}
            <h2 className="text-3xl md:text-4xl font-bold">
               Support Our Mission
            </h2>

            <h3 className="mt-3 text-xl font-semibold text-green-100">
               Your Donation Saves Lives
            </h3>

            {/* DESCRIPTION */}
            <p className="mt-6 text-green-100 max-w-3xl mx-auto">
               Every contribution directly supports free surgeries, safe anaesthesia,
               medical outreach programs, and training for healthcare professionals.
               Your generosity helps ensure that no one is denied care because of cost or location.
            </p>

            {/* TIER CARDS */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

               {tiers.map((tier, i) => (
                  <div
                     key={i}
                     className="bg-white text-gray-800 rounded-xl shadow-lg p-6 hover:scale-105 transition text-center"
                  >

                     {/* ICON */}
                     <div className="flex justify-center mb-3">
                        {tier.icon}
                     </div>

                     <h4 className="text-green-700 font-bold text-lg">
                        {tier.title}
                     </h4>

                     <p className="text-2xl font-bold mt-2">
                        {tier.amount}
                     </p>

                     <p className="text-sm text-gray-600 mt-3">
                        {tier.desc}
                     </p>

                     <Link
                        to="/donate"
                        className="mt-5 inline-block bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                     >
                        Donate Now & Save a Life
                     </Link>

                  </div>
               ))}

            </div>

            {/* MAIN CTA BUTTONS */}
            <div className="mt-12 flex flex-col md:flex-row gap-4 justify-center">

               <Link
                  to="/donate"
                  className="bg-white text-green-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100"
               >
                  Donate Now
               </Link>

               <Link
                  to="/about"
                  className="border border-white px-8 py-3 rounded-lg font-semibold hover:bg-green-800"
               >
                  Learn More
               </Link>

            </div>

         </div>

      </section>
   );
}