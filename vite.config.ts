import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [sveltekit()],
  // server: {
  //   proxy: {
  //     "/api": "http://localhost:8080",
  //   },
  // },
  // define: {
  //   "import.meta.env.VITE_API_ENDPOINT": JSON.stringify("/api"),
  // },
});
