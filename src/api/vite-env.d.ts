import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // Default development server port
    open: true, // Automatically opens the browser
    host: true, // Allows access from external devices (e.g., mobile testing)
    strictPort: true, // Ensures the server fails if the port is already in use
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // Simplifies imports with "@"
    },
  },
  define: {
    "process.env": {}, // Ensures compatibility with code depending on process.env
  },
  build: {
    outDir: "dist", // Output directory for production builds
    sourcemap: true, // Generates source maps for debugging
    assetsDir: "assets", // Subfolder for static assets
    rollupOptions: {
      output: {
        assetFileNames: "assets/[name].[hash].[ext]", // Cache-busting filenames
        chunkFileNames: "assets/[name].[hash].js",
        entryFileNames: "assets/[name].[hash].js",
      },
    },
    minify: "esbuild", // Faster minification with esbuild
    target: "esnext", // Modern JavaScript target for optimized builds
  },
  optimizeDeps: {
    include: ["react", "react-dom"], // Prebundles common dependencies for faster dev server
  },
});
