import { Button } from "flowbite-react";
import { motion } from "framer-motion";
import HeroBG from "../assets/images.jpeg";

const HeroSection = () => {
  return (
    <div
      className="relative w-full h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${HeroBG})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70"></div>

      {/* Content */}
      <motion.div
        className="relative z-10 text-center px-6 max-w-4xl"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg">
          🌿 AI-Powered Plant Health Check
        </h1>
        <p className="mt-6 text-lg md:text-2xl text-gray-200 leading-relaxed">
          Upload a photo of your plant and let our smart AI detect diseases in
          seconds. Get{" "}
          <span className="font-semibold text-green-300">
            real-time insights
          </span>{" "}
          and
          <span className="font-semibold text-green-300">
            {" "}
            expert recommendations
          </span>{" "}
          to keep your plants thriving!
        </p>

        <div className="mt-10">
          <Button
            href="/upload-image"
            size="xl"
            className="bg-green-500 hover:bg-green-600 text-white font-semibold px-8 py-3 rounded-2xl shadow-lg transition-all duration-300 hover:scale-105"
          >
            🌱 Scan Your Plant Now
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default HeroSection;
