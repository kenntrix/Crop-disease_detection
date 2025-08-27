import { FaLeaf, FaCamera, FaBrain } from "react-icons/fa";

const FeaturesSection = () => {
  const features = [
    {
      icon: <FaLeaf />,
      title: "Accurate Detection",
      desc: "Uses AI to detect plant diseases with high accuracy.",
    },
    {
      icon: <FaCamera />,
      title: "Easy to Use",
      desc: "Just upload a leaf image, and get instant results.",
    },
    {
      icon: <FaBrain />,
      title: "AI-Powered",
      desc: "Built with deep learning for smart predictions.",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-green-50 to-white text-center">
      <h2 className="text-4xl font-bold text-green-700 uppercase">
        Why Choose Our App?
      </h2>
      <p className="text-gray-600 mt-2 max-w-xl mx-auto">
        Empowering farmers and researchers with AI-driven plant health
        solutions.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 max-w-6xl mx-auto px-6">
        {features.map((feature, index) => (
          <div
            key={index}
            className="p-6 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition duration-300 transform hover:-translate-y-2"
          >
            <div className="flex justify-center items-center w-16 h-16 mx-auto bg-green-100 text-green-600 rounded-full text-3xl">
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold mt-4 text-gray-800">
              {feature.title}
            </h3>
            <p className="text-gray-600 mt-2 text-sm leading-relaxed">
              {feature.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
