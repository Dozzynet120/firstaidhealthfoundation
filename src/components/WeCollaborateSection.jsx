export default function WeCollaborateSection() {

   const partners = [
      {
         name: "Raypower",
         img: "https://upload.wikimedia.org/wikipedia/commons/placeholder.png",
         desc: "Leading private radio broadcasting network in Nigeria supporting awareness campaigns.",
      },
      {
         name: "AIT (Africa Independent Television)",
         img: "https://upload.wikimedia.org/wikipedia/commons/placeholder.png",
         desc: "National television network amplifying humanitarian and health outreach programs.",
      },
      {
         name: "AP (News Agency)",
         img: "https://upload.wikimedia.org/wikipedia/commons/placeholder.png",
         desc: "Global news agency supporting information dissemination and media coverage.",
      },
      {
         name: "Oshodi-Isolo Local Government",
         img: "https://upload.wikimedia.org/wikipedia/commons/placeholder.png",
         desc: "Local government authority supporting community health and outreach initiatives in Lagos.",
      },
   ];

   return (
      <section className="py-20 px-6 bg-gray-50">

         <div className="max-w-6xl mx-auto text-center">

            {/* TITLE */}
            <h2 className="text-3xl font-bold text-green-700">
               We Collaborate With Famous Partners
            </h2>

            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
               We partner with renowned organizations to deliver exceptional results and
               impact lives together.
            </p>

            {/* PARTNERS GRID */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

               {partners.map((p, i) => (
                  <div
                     key={i}
                     className="bg-white rounded-xl shadow hover:shadow-lg transition p-6 text-center"
                  >

                     {/* LOGO PLACEHOLDER */}
                     <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold text-lg">
                        {p.name.charAt(0)}
                     </div>

                     {/* NAME */}
                     <h3 className="font-bold text-green-700">
                        {p.name}
                     </h3>

                     {/* DESCRIPTION */}
                     <p className="text-sm text-gray-600 mt-2">
                        {p.desc}
                     </p>

                  </div>
               ))}

            </div>

         </div>

      </section>
   );
}