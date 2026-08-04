import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// The harness under tests/harness is the app; components/ is imported from it.
export default defineConfig({
  root: "tests/harness",
  plugins: [react()],
  server: { port: 5173, strictPort: true },
  build: { outDir: "../../dist-harness", emptyOutDir: true },
});
