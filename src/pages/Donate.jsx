import { useState } from "react";
import { Helmet } from "react-helmet-async";

export default function Donate() {
   const [email, setEmail] = useState("");
   const [amount, setAmount] = useState("");

   const publicKey = "pk_test_your_paystack_key_here";

   const payWithPaystack = () => {
      if (!email || !amount) {
         alert("Please enter email and amount");
         return;
      }

      const handler = window.PaystackPop.setup({
         key: publicKey,
         email,
         amount: amount * 100,
         currency: "NGN",

         callback: function (response) {
            alert("Payment successful! Ref: " + response.reference);
         },

         onClose: function () {
            alert("Transaction cancelled");
         },
      });

      handler.openIframe();
   };

   return (
      <>
         {/* SEO */}
         <Helmet>
            <title>Donate | Save Lives with RightAid Health Foundation</title>
            <meta
               name="description"
               content="Support RightAid Health Foundation with your donation. Help fund surgeries, medical outreach, and life-saving healthcare in Nigeria."
            />
            <meta name="keywords" content="donate Nigeria NGO, charity donation Nigeria, medical donation Africa, Paystack NGO donation" />
         </Helmet>

         <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">

            <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">

               <h1 className="text-2xl font-bold text-green-700 text-center">
                  Support RightAid Health Foundation
               </h1>

               <p className="text-gray-600 text-center mt-2">
                  Your donation helps save lives in Nigeria 🇳🇬
               </p>

               <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full border p-3 mt-6 rounded-lg"
                  onChange={(e) => setEmail(e.target.value)}
               />

               <input
                  type="number"
                  placeholder="Amount (NGN)"
                  className="w-full border p-3 mt-4 rounded-lg"
                  onChange={(e) => setAmount(e.target.value)}
               />

               <button
                  onClick={payWithPaystack}
                  className="w-full bg-green-600 text-white py-3 rounded-lg mt-6 hover:bg-green-700"
               >
                  Donate Now
               </button>

            </div>

         </div>
      </>
   );
}