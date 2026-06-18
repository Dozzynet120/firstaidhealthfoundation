export default function ProgramsSection() {
   return (
      <section className="py-20 px-6 bg-white">
         <div className="max-w-6xl mx-auto text-center">

            {/* Heading */}
            <h2 className="text-3xl font-bold text-green-700">
               Our Programs & Services
            </h2>

            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
               We focus on delivering healthcare solutions that directly impact lives
               in underserved communities across Nigeria.
            </p>

            {/* Program Cards */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">

               {/* Card 1 */}
               <div className="bg-green-50 p-6 rounded-xl shadow-sm">
                  <h3 className="text-xl font-bold text-green-700">
                     Medical Outreach
                  </h3>
                  <p className="mt-3 text-gray-600">
                     We organize community health outreaches providing free medical
                     consultations, diagnosis, and basic treatment.
                  </p>
               </div>

               {/* Card 2 */}
               <div className="bg-green-50 p-6 rounded-xl shadow-sm">
                  <h3 className="text-xl font-bold text-green-700">
                     Surgical Support
                  </h3>
                  <p className="mt-3 text-gray-600">
                     We assist patients who require life-changing surgeries but cannot
                     afford medical expenses.
                  </p>
               </div>

               {/* Card 3 */}
               <div className="bg-green-50 p-6 rounded-xl shadow-sm">
                  <h3 className="text-xl font-bold text-green-700">
                     Emergency Care Assistance
                  </h3>
                  <p className="mt-3 text-gray-600">
                     We provide urgent medical support for critical health conditions
                     and emergency interventions.
                  </p>
               </div>

            </div>

         </div>
      </section>
   );
}