import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// The harness under tests/harness is the app; components/ is imported from it.
export default defineConfig({
  root: "tests/harness",
  plugins: [react()],
  // Bind IPv4 explicitly. Left as the default "localhost", Vite follows whatever
  // that resolves to — on CI runners that is ::1, so a server polled at
  // 127.0.0.1 never answers and the run dies on a webServer timeout.
  server: { host: "127.0.0.1", port: 5173, strictPort: true },
  build: { outDir: "../../dist-harness", emptyOutDir: true },
});
