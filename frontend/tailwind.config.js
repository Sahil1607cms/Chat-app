/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        sans:['Varela Round','sans-serif']
      }
    },
  },
  plugins:['daisyui'],
  daisyui:{
    themes:["light","dark","synthwave","halloween","cupcake"]
  }
}