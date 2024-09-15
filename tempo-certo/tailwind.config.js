/** @type {import('tailwindcss').Config} */

export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      backgroundImage: {
        'bg-temp': "url('./src/assets/images/backgrounds/bg-sol.jpg')",
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
