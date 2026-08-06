import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Trailing separator trimmed: the alias is a prefix substitution, so leaving it
// on turns "@/components" into a path with a doubled slash.
const projectRoot = fileURLToPath(new URL(".", import.meta.url)).replace(/[\\/]$/, "");

// The harness under tests/harness is the app; components/ is imported from it.
export default defineConfig({
  root: "tests/harness",
  plugins: [react()],
  // Matches the "@/*" -> "./*" mapping in tsconfig, so shadcn components paste
  // in with their imports intact. Resolved from this file rather than from the
  // Vite root, which points at tests/harness.
  resolve: {
    alias: { "@": projectRoot },
  },
  // Bind IPv4 explicitly. Left as the default "localhost", Vite follows whatever
  // that resolves to — on CI runners that is ::1, so a server polled at
  // 127.0.0.1 never answers and the run dies on a webServer timeout.
  server: { host: "127.0.0.1", port: 5173, strictPort: true },
  build: { outDir: "../../dist-harness", emptyOutDir: true },
});
