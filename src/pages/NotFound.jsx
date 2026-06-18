import { Link } from "react-router-dom";

export default function NotFound() {
   return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 bg-gray-50">
         <h1 className="text-6xl font-bold text-green-700">404</h1>

         <p className="mt-4 text-gray-600 text-lg">
            Page not found
         </p>

         <Link
            to="/"
            className="mt-6 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
         >
            Go Home
         </Link>
      </div>
   );
}