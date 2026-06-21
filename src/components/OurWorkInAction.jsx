import work1 from "../assets/about/1.jpg";
import work2 from "../assets/about/2.jpg";
import work3 from "../assets/about/5.jpg";
import work4 from "../assets/about/6.jpg";

export default function OurWorkInAction() {

   const works = [
      {
         title: "ANNUAL SURGICAL OUTREACH SCREENING 2024",
         img: work1,
      },
      {
         title: "COMMUNITY HEALTH OUTREACH PROGRAM",
         img: work2,
      },
      {
         title: "RURAL MEDICAL EMERGENCY RESPONSE",
         img: work3,
      },
      {
         title: "FREE HEALTH SCREENING CAMPAIGN",
         img: work4,
      },
   ];

   return (
      <section className="py-20 px-6 bg-white">

         <div className="max-w-6xl mx-auto text-center">

            {/* HEADER */}
            <h2 className="text-3xl font-bold text-green-700">
               Our Work in Action
            </h2>

            <h3 className="mt-2 text-xl font-semibold text-gray-700">
               Healthcare Where It’s Needed Most
            </h3>

            <p className="mt-4 text-gray-600 max-w-3xl mx-auto">
               From rural outreach programs to emergency surgical missions, our work
               meets patients where they are—bringing care, expertise, and compassion
               directly to their communities.
            </p>

            {/* GRID */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

               {works.map((item, i) => (
                  <div
                     key={i}
                     className="relative group rounded-xl overflow-hidden shadow-lg"
                  >

                     {/* IMAGE */}
                     <img
                        src={item.img}
                        alt={item.title}
                        className="w-full h-65 object-cover group-hover:scale-110 transition duration-500"
                     />

                     {/* OVERLAY */}
                     <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition duration-500"></div>

                     {/* TEXT */}
                     <div className="absolute inset-0 flex items-center justify-center text-center px-4 opacity-0 group-hover:opacity-100 transition duration-500">

                        <p className="text-white font-bold text-sm md:text-base">
                           {item.title}
                        </p>

                     </div>

                  </div>
               ))}

            </div>

         </div>

      </section>
   );
}