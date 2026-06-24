import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { FaPaypal, FaUniversity, FaCreditCard } from "react-icons/fa";

export default function Donate() {
   const [email, setEmail] = useState("");
   const [amount, setAmount] = useState("");
   const [activeTab, setActiveTab] = useState("card");

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

   const copyToClipboard = (text) => {
      navigator.clipboard.writeText(text);
      alert("Copied to clipboard: " + text);
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

         <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6 py-12">

            <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-lg">

               <h1 className="text-2xl font-bold text-green-700 text-center">
                  Support RightAid Health Foundation
               </h1>

               <p className="text-gray-600 text-center mt-2">
                  Your donation helps save lives in Nigeria 🇳🇬
               </p>

               {/* Payment Method Tabs */}
               <div className="flex justify-center mt-6 bg-gray-100 rounded-lg p-1">
                  <button
                     onClick={() => setActiveTab("card")}
                     className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === "card"
                           ? "bg-white text-green-700 shadow-sm"
                           : "text-gray-500 hover:text-gray-700"
                        }`}
                  >
                     <FaCreditCard /> Card
                  </button>
                  <button
                     onClick={() => setActiveTab("paylink")}
                     className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === "paylink"
                           ? "bg-white text-green-700 shadow-sm"
                           : "text-gray-500 hover:text-gray-700"
                        }`}
                  >
                     <FaCreditCard /> AlatPay
                  </button>
                  <button
                     onClick={() => setActiveTab("paypal")}
                     className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === "paypal"
                           ? "bg-white text-green-700 shadow-sm"
                           : "text-gray-500 hover:text-gray-700"
                        }`}
                  >
                     <FaPaypal /> PayPal
                  </button>
                  <button
                     onClick={() => setActiveTab("bank")}
                     className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === "bank"
                           ? "bg-white text-green-700 shadow-sm"
                           : "text-gray-500 hover:text-gray-700"
                        }`}
                  >
                     <FaUniversity /> Bank
                  </button>
               </div>

               {/* Paystack Card Payment */}
               {activeTab === "card" && (
                  <div className="mt-6">
                     <p className="text-sm text-gray-500 text-center mb-4">
                        Pay securely with your debit/credit card
                     </p>
                     <input
                        type="email"
                        placeholder="Enter your email"
                        className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        onChange={(e) => setEmail(e.target.value)}
                     />
                     <input
                        type="number"
                        placeholder="Amount (NGN)"
                        className="w-full border border-gray-300 p-3 mt-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        onChange={(e) => setAmount(e.target.value)}
                     />
                     <button
                        onClick={payWithPaystack}
                        className="w-full bg-green-600 text-white py-3 rounded-lg mt-6 hover:bg-green-700 transition-colors font-medium"
                     >
                        Donate Now
                     </button>
                  </div>
               )}

               {/* AlatPay Link */}
               {activeTab === "paylink" && (
                  <div className="mt-6 text-center">
                     <p className="text-sm text-gray-500 mb-4">
                        Pay securely via AlatPay link
                     </p>
                     <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                        <FaCreditCard className="text-4xl text-green-600 mx-auto mb-3" />
                        <p className="text-gray-700 mb-4">
                           Click below to pay via our secure AlatPay link
                        </p>
                        <a
                           href="https://paylink.alatpay.ng/?reference=lnkUiUgJ9LsxMjy"
                           target="_blank"
                           rel="noopener noreferrer"
                           className="inline-block w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
                        >
                           Pay via AlatPay
                        </a>
                     </div>
                  </div>
               )}

               {/* PayPal */}
               {activeTab === "paypal" && (
                  <div className="mt-6 text-center">
                     <p className="text-sm text-gray-500 mb-4">
                        Donate in USD via PayPal
                     </p>
                     <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                        <FaPaypal className="text-4xl text-blue-600 mx-auto mb-3" />
                        <p className="text-gray-700 mb-2">PayPal Account:</p>
                        <div className="flex items-center justify-center gap-2 bg-white rounded-lg p-3 border">
                           <span className="font-medium text-gray-800">princesstinuola28@yahoo.ca</span>
                           <button
                              onClick={() => copyToClipboard("princesstinuola28@yahoo.ca")}
                              className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200 transition"
                           >
                              Copy
                           </button>
                        </div>
                        <p className="text-xs text-gray-500 mt-3">
                           Send donations to this PayPal email address (USD account)
                        </p>
                     </div>
                  </div>
               )}

               {/* Bank Transfer */}
               {activeTab === "bank" && (
                  <div className="mt-6 text-center">
                     <p className="text-sm text-gray-500 mb-4">
                        Make a direct bank transfer
                     </p>
                     <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                        <FaUniversity className="text-4xl text-yellow-600 mx-auto mb-3" />
                        <div className="text-left space-y-3">
                           <div className="flex justify-between items-center bg-white rounded-lg p-3 border">
                              <div>
                                 <p className="text-xs text-gray-500">Bank Name</p>
                                 <p className="font-medium text-gray-800">Wema Bank</p>
                              </div>
                           </div>
                           <div className="flex justify-between items-center bg-white rounded-lg p-3 border">
                              <div>
                                 <p className="text-xs text-gray-500">Account Number</p>
                                 <p className="font-medium text-gray-800">0126681925</p>
                              </div>
                              <button
                                 onClick={() => copyToClipboard("0126681925")}
                                 className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded hover:bg-yellow-200 transition"
                              >
                                 Copy
                              </button>
                           </div>
                           <div className="flex justify-between items-center bg-white rounded-lg p-3 border">
                              <div>
                                 <p className="text-xs text-gray-500">Account Name</p>
                                 <p className="font-medium text-gray-800">RightAid Health Foundation</p>
                              </div>
                           </div>
                        </div>
                        <p className="text-xs text-gray-500 mt-3">
                           Please send proof of payment to info@rightaidhealthfoundation.com
                        </p>
                     </div>
                  </div>
               )}

               <p className="text-xs text-gray-400 text-center mt-6">
                  All donations are secure and encrypted. Thank you for your support!
               </p>

            </div>

         </div>
      </>
   );
}