import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
  	extend: {
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			},
  			nature: {
  				'50': '#f0fdf4',
  				'100': '#dcfce7',
  				'200': '#bbf7d0',
  				'300': '#86efac',
  				'400': '#4ade80',
  				'500': '#22c55e',
  				'600': '#16a34a',
  				'700': '#15803d',
  				'800': '#166534',
  				'900': '#14532d',
  			},
  			cream: {
  				'50': '#fefdf8',
  				'100': '#fefbf0',
  				'200': '#fef7e0',
  				'300': '#fdecc8',
  				'400': '#fbdba7',
  				'500': '#f8c471',
  				'600': '#f4a261',
  				'700': '#e17055',
  				'800': '#bc5148',
  				'900': '#8b4242',
  			},
  			forest: {
  				'50': '#f0fdf4',
  				'100': '#dcfce7',
  				'200': '#bbf7d0',
  				'300': '#86efac',
  				'400': '#4ade80',
  				'500': '#2e8c49',
  				'600': '#166534',
  				'700': '#15803d',
  				'800': '#14532d',
  				'900': '#0f3d22',
  			}
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
  			},
  			'caret-blink': {
  				'0%,70%,100%': { opacity: '1' },
  				'20%,50%': { opacity: '0' },
  			},
  			'float': {
  				'0%, 100%': { 
  					transform: 'translateY(0px)',
  					opacity: '0.5'
  				},
  				'50%': { 
  					transform: 'translateY(-10px)',
  					opacity: '0.8'
  				},
  			},
  			'leaf-dance': {
  				'0%': { 
  					transform: 'translateY(0px) rotate(0deg)',
  					opacity: '0.3'
  				},
  				'25%': { 
  					transform: 'translateY(-5px) rotate(5deg)',
  					opacity: '0.6'
  				},
  				'50%': { 
  					transform: 'translateY(-10px) rotate(-3deg)',
  					opacity: '0.8'
  				},
  				'75%': { 
  					transform: 'translateY(-5px) rotate(7deg)',
  					opacity: '0.6'
  				},
  				'100%': { 
  					transform: 'translateY(0px) rotate(0deg)',
  					opacity: '0.3'
  				},
  			},
  			'gentle-bounce': {
  				'0%, 100%': { 
  					transform: 'translateY(0%)',
  					animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)'
  				},
  				'50%': { 
  					transform: 'translateY(-5%)',
  					animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)'
  				},
  			},
  			'fade-in-up': {
  				'0%': {
  					opacity: '0',
  					transform: 'translateY(20px)'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'translateY(0)'
  				}
  			},
  			'scale-in': {
  				'0%': {
  					opacity: '0',
  					transform: 'scale(0.9)'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'scale(1)'
  				}
  			},
  			'shimmer': {
  				'0%': {
  					backgroundPosition: '-1000px 0'
  				},
  				'100%': {
  					backgroundPosition: '1000px 0'
  				}
  			},
  			'pulse-gentle': {
  				'0%, 100%': {
  					opacity: '1'
  				},
  				'50%': {
  					opacity: '0.7'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
  			'caret-blink': 'caret-blink 1.25s ease-out infinite',
  			'float': 'float 3s ease-in-out infinite',
  			'leaf-dance': 'leaf-dance 4s ease-in-out infinite',
  			'gentle-bounce': 'gentle-bounce 2s infinite',
  			'fade-in-up': 'fade-in-up 0.6s ease-out',
  			'scale-in': 'scale-in 0.3s ease-out',
  			'shimmer': 'shimmer 2s linear infinite',
  			'pulse-gentle': 'pulse-gentle 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
  		},
  		backgroundImage: {
  			'leaf-pattern': "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%232e8c49' fill-opacity='0.05' fill-rule='evenodd'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E\")"
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;