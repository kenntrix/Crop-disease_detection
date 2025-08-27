import { motion } from "framer-motion";

const services = [
  {
    title: "🌿 AI Disease Detection",
    description:
      "Instantly analyze plant leaf images and identify diseases with our advanced AI model.",
  },
  {
    title: "📊 Detailed Diagnosis & Reports",
    description:
      "Receive comprehensive insights on plant diseases, symptoms, and suggested treatments.",
  },
  {
    title: "💡 Treatment & Prevention Tips",
    description:
      "Get expert-recommended solutions and preventive measures to keep your plants healthy.",
  },
  {
    title: "🌾 Multi-Plant Support",
    description:
      "Supports a wide range of crops, from fruits and vegetables to flowers and cereals.",
  },
  {
    title: "🖥️ User-Friendly Interface",
    description:
      "Easily upload images, get results, and navigate our intuitive platform hassle-free.",
  },
  {
    title: "⏳ 24/7 Access",
    description:
      "Available anytime, anywhere for instant plant health analysis.",
  },
];

const ServicePage = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 py-20">
      {/* Heading Section */}
      <h1 className="text-4xl font-extrabold text-green-700 text-center">
        Our Services
      </h1>
      <p className="text-gray-600 text-lg text-center mt-4 max-w-2xl mx-auto">
        Empowering farmers and plant enthusiasts with AI-driven plant disease
        detection and actionable insights.
      </p>

      {/* Service Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 mt-16">
        {services.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-2xl hover:-translate-y-2 transition"
          >
            <div className="flex items-center justify-center w-16 h-16 mx-auto rounded-full bg-green-100 text-3xl">
              {service.title.split(" ")[0]} {/* Extracts emoji */}
            </div>
            <h2 className="text-xl font-semibold text-green-700 mt-4">
              {service.title.replace(/^[^\w]+/, "")} {/* Removes emoji */}
            </h2>
            <p className="text-gray-600 mt-2">{service.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ServicePage;
