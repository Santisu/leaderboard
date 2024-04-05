/** @type {import('tailwindcss').Config} */
export default {
  content: [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'reddy-purple': '#654a70',
        'reddy-purple-200': '#a78ba8',
        'reddy-cream': '#faf4ed',
        'reddy-white': '#fffaf3',
        'reddy-green': '#56949f',
        'reddy-green-200': '#7597A3',
        'reddy-yellow': '#ea9d34',
        'reddy-yellow-200': '#f7b35a',
      },

    },
  },
  plugins: [],
}

