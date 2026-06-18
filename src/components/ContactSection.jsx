export default function ContactSection() {
   return (
      <section className="py-20 px-6 bg-gray-50">
         <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">

            {/* FORM */}
            <div>
               <h2 className="text-3xl font-bold text-green-700">
                  Contact Us
               </h2>

               <form className="mt-6 space-y-4">
                  <input className="w-full p-3 border rounded" placeholder="Name" />
                  <input className="w-full p-3 border rounded" placeholder="Email" />
                  <textarea className="w-full p-3 border rounded" placeholder="Message"></textarea>

                  <button className="bg-green-600 text-white px-6 py-3 rounded">
                     Send Message
                  </button>
               </form>
            </div>

            {/* MAP */}
            <div className="rounded-xl overflow-hidden shadow">
               <iframe
                  className="w-full h-full min-h-[300px]"
                  src="https://www.google.com/maps/embed?pb=!1m18..."
                  loading="lazy"
               ></iframe>
            </div>

         </div>
      </section>
   );
}