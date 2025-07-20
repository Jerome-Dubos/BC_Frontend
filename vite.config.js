import react from "@vitejs/plugin-react";
import { defineConfig, splitVendorChunkPlugin } from "vite";
import compression from "vite-plugin-compression";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    compression({
      algorithm: "brotli",
      ext: ".br",
    }),
    compression({
      algorithm: "gzip",
      ext: ".gz",
    }),
    splitVendorChunkPlugin(),
    ViteImageOptimizer({
      jpg: {
        quality: 80,
        progressive: true,
      },
      png: {
        quality: 80,
        progressive: true,
      },
      webp: {
        lossless: true,
      },
    }),
    // VitePWA({
    //   registerType: "autoUpdate",
    //   includeAssets: ["vite.svg", "robots.txt"],
    //   manifest: {
    //     name: "Bon Cours",
    //     short_name: "BonCours",
    //     description: "Plateforme d'apprentissage des langues",
    //     theme_color: "#2563eb",
    //     background_color: "#ffffff",
    //     display: "standalone",
    //     icons: [
    //       {
    //         src: "/vite.svg",
    //         sizes: "32x32",
    //         type: "image/svg+xml",
    //       },
    //       {
    //         src: "/icons/icon-192x192.png",
    //         sizes: "192x192",
    //         type: "image/png",
    //         purpose: "any",
    //       },
    //       {
    //         src: "/icons/icon-512x512.png",
    //         sizes: "512x512",
    //         type: "image/png",
    //         purpose: "maskable",
    //       },
    //     ],
    //   },
    //   workbox: {
    //     globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
    //     runtimeCaching: [
    //       {
    //             urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
    //             handler: "CacheFirst",
    //             options: {
    //               cacheName: "google-fonts-cache",
    //               expiration: {
    //                 maxEntries: 10,
    //                 maxAgeSeconds: 60 * 60 * 24 * 365, // 1 an
    //               },
    //               cacheableResponse: {
    //                 statuses: [0, 200],
    //               },
    //             },
    //           },
    //           {
    //             urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
    //             handler: "CacheFirst",
    //             options: {
    //               cacheName: "gstatic-fonts-cache",
    //               expiration: {
    //                 maxEntries: 10,
    //                 maxAgeSeconds: 60 * 60 * 24 * 365, // 1 an
    //               },
    //               cacheableResponse: {
    //                 statuses: [0, 200],
    //               },
    //             },
    //           },
    //         ],
    //       },
    //     }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          "react-vendor": ["react", "react-dom", "react-router-dom"],
          "ui-vendor": ["framer-motion"],
          "i18n-vendor": ["i18next", "react-i18next"],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: [
          "console.log",
          "console.info",
          "console.debug",
          "console.trace",
        ],
      },
    },
    cssMinify: true,
    cssCodeSplit: true,
    sourcemap: false,
    reportCompressedSize: false,
    assetsInlineLimit: 4096,
  },
  server: {
    port: 5173,
    host: "localhost",
    strictPort: true,
    hmr: {
      port: 5173,
      host: "localhost",
      overlay: true,
      clientPort: 5173
    },
    headers: {
      "Cache-Control": "no-cache, no-store, must-revalidate",
      "Pragma": "no-cache", 
      "Expires": "0",
      "X-Content-Type-Options": "nosniff",
      "X-Frame-Options": "DENY",
      "X-XSS-Protection": "1; mode=block",
    },
  },
  optimizeDeps: {
    include: ["react", "react-dom", "react-router-dom", "framer-motion"],
    exclude: ["@vite/client", "@vite/env"],
  },
});
