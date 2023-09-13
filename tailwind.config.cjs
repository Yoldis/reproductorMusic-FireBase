/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow:{
        shadowAnimation: '0 0px 10px 1px rgba(0,0,0, 0.3)'
      },
      borderRadius:{
        'procfileRadius' :'50px'
      },
      // #3d3d3d
      colors: {
        'primary': '#141414',
        'secundary': '#f97316',
        'tercer' : '#000000',
        'cuarty' : '#515151',
        'animationBG' : '#fdba74',
        'borderMusic':'#676767',
        'bgProcFile'  :'#2b2b2b',
      },

      translate:{
        'translateProcfile' : '-50%'
      },

      spacing:{
        '30px': '30px',
        // '85%' :'85%'
      }
    },
  },
  plugins: [],
}