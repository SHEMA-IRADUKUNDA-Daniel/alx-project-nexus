import React from "react";


export default function Footer() {
  return (
    <footer className="w-full bg-gray-800 text-white shadow-inner relative">
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row md:items-center md:justify-between space-y-6 md:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-blue-500">Movie App</h2>
          <p className="mt-2 text-sm text-gray-400 max-w-100">
            <strong className="text-blue-500">Movie App</strong> - Discover your
            next favorite film with our movie-recommendation app. Get
            personalized picks based on your tastes, explore trending titles,
            and save favorites to watch later. We don’t host or stream
            movies—our goal is to help you decide what to watch next by curating
            information from trusted sources.
          </p>
        </div>

        <div className="flex space-x-4 justify-center">
          <a href="#" className="hover:text-blue-500" aria-label="Twitter">
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19.633 7.997c.013.176.013.353.013.53 0 5.41-4.117 11.64-11.64 11.64A11.57 11.57 0 010 18.29c.276.033.54.046.829.046a8.23 8.23 0 005.096-1.756 4.105 4.105 0 01-3.832-2.845c.25.04.5.066.763.066.367 0 .734-.046 1.077-.132A4.1 4.1 0 012.86 9.18v-.05a4.14 4.14 0 001.852.516 4.1 4.1 0 01-1.27-5.477 11.63 11.63 0 008.45 4.29 4.627 4.627 0 01-.102-.94 4.1 4.1 0 014.1-4.1 4.07 4.07 0 012.995 1.295 8.17 8.17 0 002.605-.996 4.09 4.09 0 01-1.803 2.27 8.2 8.2 0 002.357-.635 8.75 8.75 0 01-2.051 2.13z" />
            </svg>
          </a>
          <a href="#" className="hover:text-blue-500" aria-label="Facebook">
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22.675 0h-21.35C.596 0 0 .596 0 1.325v21.351C0 23.403.596 24 1.325 24h11.49v-9.294H9.691v-3.622h3.124V8.413c0-3.1 1.894-4.788 4.659-4.788 1.325 0 2.463.099 2.794.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.403 24 24 23.403 24 22.676V1.325C24 .596 23.403 0 22.675 0z" />
            </svg>
          </a>
        </div>
      </div>

      <div className="mt-6 border-t border-gray-700 pt-4 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Movie App. All rights reserved.
      </div>
    </footer>
  );
}
