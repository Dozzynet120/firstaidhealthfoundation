import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { servicesData } from "../data/servicesData";

export default function ServiceDetails() {
   const { id } = useParams();

   const service = servicesData.find(
      (item) => item.id === id
   );

   if (!service) {
      return (
         <div className="text-center py-20">
            Service Not Found
         </div>
      );
   }

   const Icon = service.icon;

   return (
      <>
         <Helmet>
            <title>{service.title} | RightAid Health Foundation</title>

            <meta
               name="description"
               content={service.description}
            />
         </Helmet>

         <section className="bg-white">

            {/* Hero */}

            <div className="relative h-[500px]">

               <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
               />

               <div className="absolute inset-0 bg-black/60"></div>

               <div className="absolute inset-0 flex items-center justify-center text-center text-white px-6">

                  <div>

                     <Icon className="text-5xl mx-auto mb-4 text-green-400" />

                     <h1 className="text-5xl font-bold">
                        {service.title}
                     </h1>

                  </div>

               </div>

            </div>

            {/* Description */}

            <div className="max-w-5xl mx-auto py-20 px-6">

               <h2 className="text-3xl font-bold text-green-700 mb-6">
                  About This Service
               </h2>

               <p className="text-gray-700 leading-relaxed text-lg">
                  {service.description}
               </p>

            </div>

            {/* Before / After Impact */}

            <div className="max-w-6xl mx-auto px-6 pb-20">

               <h2 className="text-3xl font-bold text-center text-green-700 mb-10">
                  Impact Story
               </h2>

               <div className="grid md:grid-cols-2 gap-8">

                  <div className="bg-red-50 p-8 rounded-xl">
                     <h3 className="font-bold text-red-700 text-xl mb-3">
                        Before
                     </h3>

                     <p className="text-gray-700">
                        {service.impact.before}
                     </p>
                  </div>

                  <div className="bg-green-50 p-8 rounded-xl">
                     <h3 className="font-bold text-green-700 text-xl mb-3">
                        After
                     </h3>

                     <p className="text-gray-700">
                        {service.impact.after}
                     </p>
                  </div>

               </div>

            </div>

            {/* CTA */}

            <div className="text-center pb-20">

               <Link
                  to="/donate"
                  className="bg-green-600 text-white px-8 py-4 rounded-lg hover:bg-green-700 transition"
               >
                  Support This Program
               </Link>

            </div>

         </section>
      </>
   );
}