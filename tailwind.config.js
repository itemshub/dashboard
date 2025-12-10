/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ['class'],
	content: [
		'./pages/**/*.{ts,tsx}',
		'./components/**/*.{ts,tsx}',
		'./app/**/*.{ts,tsx}',
		'./src/**/*.{ts,tsx}',
	],
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px',
			},
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: '#2a2a2a',
					foreground: '#ffffff',
				},
				secondary: {
					DEFAULT: '#1e1e1e',
					foreground: '#b0b0b0',
				},
				tertiary: {
					DEFAULT: '#363636',
					foreground: '#808080',
				},
				accent: {
					DEFAULT: '#4a9eff',
					foreground: '#ffffff',
				},
				success: {
					DEFAULT: '#22c55e',
					foreground: '#ffffff',
				},
				warning: {
					DEFAULT: '#f59e0b',
					foreground: '#ffffff',
				},
				error: {
					DEFAULT: '#ef4444',
					foreground: '#ffffff',
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))',
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))',
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))',
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))',
				},
				// 新拟物风格专用颜色
				neumorphic: {
					light: '#404040',
					dark: '#1a1a1a',
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
				'neumorphic': '16px',
				'neumorphic-sm': '12px',
				'neumorphic-lg': '24px',
			},
			keyframes: {
				'accordion-down': {
					from: { height: 0 },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: 0 },
				},
				'fade-in-up': {
					'0%': {
						opacity: '0',
						transform: 'translateY(20px)',
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)',
					},
				},
				'pulse-slow': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.7' },
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in-up': 'fade-in-up 0.6s ease-out',
				'pulse-slow': 'pulse-slow 3s ease-in-out infinite',
			},
			boxShadow: {
				'neumorphic': '8px 8px 16px #1a1a1a, -8px -8px 16px #404040',
				'neumorphic-sm': '6px 6px 12px #1a1a1a, -6px -6px 12px #404040',
				'neumorphic-lg': '12px 12px 24px #1a1a1a, -12px -12px 24px #404040',
				'neumorphic-inset': 'inset 8px 8px 16px #1a1a1a, inset -8px -8px 16px #404040',
				'neumorphic-pressed': 'inset 4px 4px 8px #1a1a1a, inset -4px -4px 8px #404040',
			},
			backdropBlur: {
				'neumorphic': '10px',
			}
		},
	},
	plugins: [require('tailwindcss-animate')],
}