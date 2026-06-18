export default function ImpactSection() {
   return (
      <section className="py-20 bg-green-50 px-6">
         <div className="max-w-6xl mx-auto text-center">

            {/* Heading */}
            <h2 className="text-3xl font-bold text-green-700">
               Our Impact in Communities
            </h2>

            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
               Through medical outreach and surgical support, we are improving lives
               and bringing hope to underserved communities across Nigeria.
            </p>

            {/* Stats Grid */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">

               {/* Stat 1 */}
               <div className="bg-white shadow-md rounded-xl p-8">
                  <h3 className="text-4xl font-bold text-green-700">1,000+</h3>
                  <p className="mt-2 text-gray-600">Lives Impacted</p>
               </div>

               {/* Stat 2 */}
               <div className="bg-white shadow-md rounded-xl p-8">
                  <h3 className="text-4xl font-bold text-green-700">500+</h3>
                  <p className="mt-2 text-gray-600">Surgeries Supported</p>
               </div>

               {/* Stat 3 */}
               <div className="bg-white shadow-md rounded-xl p-8">
                  <h3 className="text-4xl font-bold text-green-700">50+</h3>
                  <p className="mt-2 text-gray-600">Communities Reached</p>
               </div>

            </div>

         </div>
      </section>
   );
}