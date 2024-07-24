/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./dist/*.{html,js}",
  ],
  theme: {
    extend: {
      fontFamily: {
        dmsans: ['DM Sans']
      },
      spacing: {
        '100': '110rem',
      }
    },
  },
  plugins: [],
}

