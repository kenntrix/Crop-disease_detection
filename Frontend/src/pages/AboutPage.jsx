import { motion } from "framer-motion";

const aboutInfo = [
  {
    title: "🌱 Mission",
    description:
      "Helping farmers detect plant diseases early, reduce crop losses, and improve food security through cutting-edge AI technology.",
  },
  {
    title: "🌍 Vision",
    description:
      "A world where agriculture and technology merge seamlessly to create healthier crops, higher yields, and sustainable farming practices.",
  },
  {
    title: "📩 Contact",
    description:
      "Reach us at support@leafguardai.com for any questions or collaboration opportunities.",
  },
  {
    title: "🤝 Partnerships",
    description:
      "We collaborate with research institutes, universities, and NGOs to bring the latest innovations to the agricultural community.",
  },
  {
    title: "💡 Innovation",
    description:
      "Continuously improving our AI models to ensure more accuracy, reliability, and faster disease detection for farmers worldwide.",
  },
  {
    title: "🌐 Accessibility",
    description:
      "Making plant disease detection accessible to farmers everywhere, regardless of location, internet access, or device type.",
  },
];

const AboutPage = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 py-20">
      {/* Heading */}
      <h1 className="text-4xl font-extrabold text-green-700 text-center">
        About LeafGuard AI
      </h1>
      <p className="text-gray-600 text-lg text-center mt-4 max-w-2xl mx-auto">
        Revolutionizing plant health monitoring with{" "}
        <span className="font-semibold">AI-powered disease detection</span>. Get
        fast, accurate, and reliable diagnoses to protect your crops and
        maximize yield.
      </p>

      {/* About Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 mt-16">
        {aboutInfo.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-2xl hover:-translate-y-2 transition"
          >
            <div className="flex items-center justify-center w-16 h-16 mx-auto rounded-full bg-green-100 text-3xl">
              {item.title.split(" ")[0]} {/* Extracts emoji */}
            </div>
            <h2 className="text-xl font-semibold text-green-700 mt-4">
              {item.title.replace(/^[^\w]+/, "")} {/* Removes emoji */}
            </h2>
            <p className="text-gray-600 mt-2">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AboutPage;
