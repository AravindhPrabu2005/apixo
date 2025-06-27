import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white flex flex-col">
      <header className="w-full px-8 py-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-green-400">apixo</h1>
        <div className="space-x-4">
          <button
            onClick={() => navigate("/login")}
            className="bg-transparent border border-green-400 text-green-400 px-5 py-2 rounded-xl font-medium hover:bg-green-500 hover:text-white"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="bg-green-500 text-white px-5 py-2 rounded-xl font-medium hover:bg-green-600"
          >
            Sign Up
          </button>
        </div>
      </header>

      <main className="flex-grow flex flex-col-reverse lg:flex-row items-center justify-center px-8 py-16 gap-12">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-xl"
        >
          <h2 className="text-4xl font-extrabold text-green-300 leading-snug mb-6">
            Monitor your server like a pro.
          </h2>
          <p className="text-gray-300 text-lg mb-6">
            apixo helps developers track, manage and analyze backend server health with simple, elegant dashboards.
            Set up your monitors and get peace of mind today.
          </p>
          <button
            onClick={() => navigate("/signup")}
            className="bg-green-500 text-white px-6 py-3 rounded-xl text-base font-medium hover:bg-green-600 transition"
          >
            Get Started
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-xl lg:max-w-lg lg:translate-x-6"
        >
          <img
            src="/8510591.png"
            alt="Dashboard preview"
            className="h-auto rounded-2xl shadow-xl"
          />
        </motion.div>
      </main>

      <footer className="text-center text-gray-400 text-sm py-6">
        © {new Date().getFullYear()} apixo. All rights reserved.
      </footer>
    </div>
  );
}
