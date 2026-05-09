/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          DEFAULT: '#e8440a',
          light: '#fff1ed',
          dark: '#b83208',
        },
        ink: {
          DEFAULT: '#16182a',
          deep: '#0b0d1a',
        },
        canvas: '#ffffff',
        surface: '#f5f6fa',
        'surface-soft': '#fafbfe',
        hairline: '#e2e4ef',
        'hairline-soft': '#edf0f7',
        slate: '#5a6080',
        stone: '#8a8fa8',
        muted: '#b0b4c8',
        accent: '#3b5bfc',
        'accent-light': '#eef1ff',
        success: '#00b87c',
        'success-light': '#e6f9f3',
        error: '#e53e3e',
        'error-light': '#fff5f5',
      },
      borderRadius: {
        '3xl': '28px',
        feature: '32px',
      },
      boxShadow: {
        subtle: 'rgba(22, 24, 42, 0.04) 0px 1px 2px 0px',
        card: 'rgba(22, 24, 42, 0.06) 0px 4px 16px 0px',
        mockup: 'rgba(22, 24, 42, 0.08) 0px 12px 32px -4px',
      },
    },
  },
  plugins: [],
}
