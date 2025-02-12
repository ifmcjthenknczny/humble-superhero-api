const config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
    theme: {
      extend: {
      colors: {
        'comic-book': {
          DEFAULT: '#eee7d7'
        },
        'superhero': {
          'gold': '#fec108',
          'red': '#ef4444'
        }
      },
      fontFamily: {
        'sans': ['Bangers', 'serif'],
      },
    }
    },
    plugins: []
}

export default config