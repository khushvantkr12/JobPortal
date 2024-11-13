import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-3">
      <div className="container mx-auto px-4">
        {/* Footer Main Content */}
        <div className="flex flex-wrap justify-between mb-3">
          {/* Company Info */}
          <div className="w-full md:w-1/4 mb-4 md:mb-0">
            <h4 className="text-lg font-semibold mb-2">Company</h4>
            <ul>
              <li className="text-gray-400 text-sm">About Us</li>
              <li className="text-gray-400 text-sm">Careers</li>
              <li className="text-gray-400 text-sm">Blog</li>
              <li className="text-gray-400 text-sm">Contact Us</li>
            </ul>
          </div>

          {/* Support Info */}
          <div className="w-full md:w-1/4 mb-4 md:mb-0">
            <h4 className="text-lg font-semibold mb-2">Support</h4>
            <ul>
              <li className="text-gray-400 text-sm">Help Center</li>
              <li className="text-gray-400 text-sm">FAQs</li>
              <li className="text-gray-400 text-sm">Terms of Service</li>
              <li className="text-gray-400 text-sm">Privacy Policy</li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div className="w-full md:w-1/4 mb-4 md:mb-0">
            <h4 className="text-lg font-semibold mb-2">Follow Us</h4>
            <ul className="flex space-x-4">
              <li className="text-gray-400 text-sm">Facebook</li>
              <li className="text-gray-400 text-sm">LinkedIn</li>
              <li className="text-gray-400 text-sm">Instagram</li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-700 pt-3">
          <p className="text-center text-gray-400 text-xs">
            &copy; Made by khushvant kumar❤️
          </p>
        </div>
      </div>
    </footer>
  );
}

