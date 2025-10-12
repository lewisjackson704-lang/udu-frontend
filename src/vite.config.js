import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // Base alias for the src directory
      "@api": path.resolve(__dirname, "./src/api"), // Alias for API interactions
      "@components": path.resolve(__dirname, "./src/components"), // Alias for reusable components
      "@pages": path.resolve(__dirname, "./src/pages"), // Alias for page-level components
      "@context": path.resolve(__dirname, "./src/context"), // Alias for context providers
      "@styles": path.resolve(__dirname, "./src/styles"), // Alias for global styles
    },
  },
  server: {
    port: 5173, // Default development server port
    open: true, // Automatically opens the browser
    host: true, // Allows access from external devices (e.g., mobile testing)
    strictPort: true, // Ensures the server fails if the port is already in use
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
  define: {
    "process.env": {
      ...process.env, // Dynamically inject environment variables
    },
  },
  optimizeDeps: {
    include: ["react", "react-dom"], // Prebundles common dependencies for faster dev server
  },
});
