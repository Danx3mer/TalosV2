import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import express from 'express'

// https://vite.dev/config/
export default defineConfig({
	server: {
		port: 8000,
		strictPort: false
	},
	plugins: [react(),
		{
			name: 'express-backend',
			configureServer(server) {
				const app = express();

				// Use standard Express body parsers
				app.use(express.json());

				// Define your POST handler
				app.post('/api/submit', (req, res) => {
					console.log('Received via Express:', req.body);
					res.json({ status: 'success', data: req.body });
				});

				// Inject Express safely into Vite's Connect layer
				server.middlewares.use((req, res, next) => {
					app(req, res, next);
				});
			},
		}
	],
})
