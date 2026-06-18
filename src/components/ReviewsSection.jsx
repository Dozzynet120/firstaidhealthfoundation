export default function ReviewsSection() {
   const reviews = [
      { name: "John", text: "Amazing NGO, they saved my family.", rating: 5 },
      { name: "Mary", text: "Very impactful work in our community.", rating: 5 },
   ];

   return (
      <section className="py-20 px-6 bg-green-50">
         <div className="max-w-6xl mx-auto text-center">

            <h2 className="text-3xl font-bold text-green-700">
               Community Reviews
            </h2>

            <div className="mt-10 grid md:grid-cols-2 gap-6">

               {reviews.map((r, i) => (
                  <div key={i} className="bg-white p-6 rounded-xl shadow">

                     <p className="text-gray-600">"{r.text}"</p>

                     <div className="mt-3 text-yellow-500">
                        {"★".repeat(r.rating)}
                     </div>

                     <p className="mt-2 font-bold text-green-700">
                        - {r.name}
                     </p>

                  </div>
               ))}

            </div>

         </div>
      </section>
   );
}