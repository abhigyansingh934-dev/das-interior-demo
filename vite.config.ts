import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import fs from "fs";

function frameRewritePlugin(): Plugin {
  return {
    name: "frame-rewrite-middleware",
    configureServer(server) {
      server.middlewares.use((req, _res, next) => {
        if (req.url) {
          // Normalize legacy /hero-frames/ to /frames/desktop/
          if (req.url.startsWith("/hero-frames/")) {
            req.url = req.url.replace(/^\/hero-frames\//, "/frames/desktop/");
          }
          // Normalize sequence 01 / sequence 02 to sequence 1 / sequence 2
          req.url = req.url.replace(/\/sequence%200([12])\//g, "/sequence%20$1/");
          req.url = req.url.replace(/\/sequence 0([12])\//g, "/sequence $1/");
        }
        next();
      });
    },
  };
}

export default defineConfig({
  plugins: [tailwindcss(), react(), frameRewritePlugin()],
  resolve: {
    alias: {
      "@designcodeio/threeui/style.css": path.resolve(__dirname, "src/shaders/threeui.css"),
      "@designcodeio/threeui": path.resolve(__dirname, "src/shaders/landing-pages/LandingPages.tsx"),
    },
  },
});
