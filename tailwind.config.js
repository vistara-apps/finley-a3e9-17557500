
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        bg: 'hsl(210, 30%, 10%)',
        text: 'hsl(0, 0%, 90%)',
        accent: 'hsl(130, 50%, 60%)',
        border: 'hsl(210, 30%, 25%)',
        primary: 'hsl(210, 40%, 50%)',
        surface: 'hsl(210, 30%, 15%)',
        'secondary-text': 'hsl(0, 0%, 60%)',
      },
      spacing: {
        sm: '8px',
        md: '16px',
        lg: '24px',
      },
      borderRadius: {
        sm: '4px',
        md: '8px',
        lg: '12px',
      },
      boxShadow: {
        card: '0 4px 12px hsla(0, 0%, 0%, 0.2)',
        focus: '0 0 0 3px hsla(130, 50%, 60%, 0.5)',
      },
      animation: {
        'fade-in': 'fadeIn 200ms ease-out',
        'slide-up': 'slideUp 200ms ease-out',
        'pulse-accent': 'pulseAccent 1s ease-in-out infinite',
      },
      transitionDuration: {
        'fast': '100ms',
        'base': '200ms',
        'slow': '300ms',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
}
