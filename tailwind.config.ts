import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			background: 'var(--background)',
  			foreground: 'var(--foreground)',
  			acapulco: {
  				'50': '#f4f9f7',
  				'100': '#daede6',
  				'200': '#b4dbcd',
  				'300': '#84c0ad',
  				'400': '#5da490',
  				'500': '#448876',
  				'600': '#346d5f',
  				'700': '#2d584e',
  				'800': '#274841',
  				'900': '#243d37',
  				'950': '#10231f'
  			},
  			highlight: '#ffffff0d'
  		},
  		boxShadow: {
  			'button-bezel': 'inset 0 1px 0 0 hsla(0, 0%, 100%, .1), inset 0 -1px 0 0 rgba(0, 0, 0, .25), 0 2px 6px 0 rgba(0, 0, 0, .1)'
  		},
  		gridTemplateRows: {
  			'input-layout': 'auto auto 1rem'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [
    require('tailwind-scrollbar')({
      nocompatible: true,
      // preferredStrategy: 'pseudoelements',
  }),
      require("tailwindcss-animate")
],
} satisfies Config;
