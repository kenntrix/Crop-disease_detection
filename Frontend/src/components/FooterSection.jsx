import LeafGuardLogo from "../assets/LeafGuard AI.png";

const FooterSection = () => {
  return (
    <footer className="bg-gradient-to-r from-green-700 to-emerald-600 text-white py-10 mt-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Logo & Brand */}
        <div>
          <div className="flex items-center gap-3">
            <img
              src={LeafGuardLogo}
              alt="LeafGuard AI Logo"
              className="w-12 h-12 rounded-xl shadow-lg"
            />
            <h2 className="text-2xl font-bold">LeafGuard AI</h2>
          </div>
          <p className="mt-3 text-gray-200 text-sm leading-relaxed">
            Smart plant disease detection powered by AI. Protect your crops with
            confidence.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-gray-200">
            <li>
              <a href="#" className="hover:text-white transition">
                About
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">
                Licensing
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Features */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Features</h3>
          <ul className="space-y-2 text-gray-200">
            <li>✔ AI-powered detection</li>
            <li>✔ Cloud storage</li>
            <li>✔ Real-time insights</li>
            <li>✔ Mobile friendly</li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Stay Updated</h3>
          <p className="text-gray-200 text-sm mb-3">
            Subscribe to get the latest updates and tips.
          </p>
          <div className="flex items-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 w-full rounded-l-md border border-gray-300 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-[#08ab6f] focus:border-[#08ab6f] shadow-sm"
            />

            <button className="bg-yellow-400 px-4 py-2 rounded-r-md font-semibold text-black hover:bg-yellow-500 transition">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-10 border-t border-green-400 pt-5 text-center text-gray-300 text-sm">
        © {new Date().getFullYear()} FrodenZ Labs. All Rights Reserved.
      </div>
    </footer>
  );
};

export default FooterSection;
