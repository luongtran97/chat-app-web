// vite.config.js
import { defineConfig } from "file:///C:/Users/luong/OneDrive/Documents/online/chat-app-web/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/luong/OneDrive/Documents/online/chat-app-web/node_modules/@vitejs/plugin-react-swc/index.mjs";
import svgr from "file:///C:/Users/luong/OneDrive/Documents/online/chat-app-web/node_modules/vite-plugin-svgr/dist/index.js";
var vite_config_default = defineConfig({
  define: {
    // eslint-disable-next-line no-undef
    "process.env": process.env
  },
  plugins: [
    react(),
    svgr()
  ],
  server: { port: 3e3 },
  resolve: {
    alias: [
      { find: "~", replacement: "/src" }
    ]
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxsdW9uZ1xcXFxPbmVEcml2ZVxcXFxEb2N1bWVudHNcXFxcb25saW5lXFxcXGNoYXQtYXBwLXdlYlwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcbHVvbmdcXFxcT25lRHJpdmVcXFxcRG9jdW1lbnRzXFxcXG9ubGluZVxcXFxjaGF0LWFwcC13ZWJcXFxcdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL2x1b25nL09uZURyaXZlL0RvY3VtZW50cy9vbmxpbmUvY2hhdC1hcHAtd2ViL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdC1zd2MnXG5pbXBvcnQgc3ZnciBmcm9tICd2aXRlLXBsdWdpbi1zdmdyJ1xuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIGRlZmluZTp7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVuZGVmXG4gICAgJ3Byb2Nlc3MuZW52JzogcHJvY2Vzcy5lbnZcbiAgfSxcbiAgcGx1Z2luczogW1xuICAgIHJlYWN0KCksXG4gICAgc3ZncigpXG4gIF0sXG4gIHNlcnZlcjp7IHBvcnQ6MzAwMCB9LFxuICByZXNvbHZlOntcbiAgICBhbGlhczpbXG4gICAgICB7IGZpbmQ6J34nLCByZXBsYWNlbWVudDonL3NyYycgfVxuICAgIF1cbiAgfVxufSkiXSwKICAibWFwcGluZ3MiOiAiO0FBQStWLFNBQVMsb0JBQW9CO0FBQzVYLE9BQU8sV0FBVztBQUNsQixPQUFPLFVBQVU7QUFFakIsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsUUFBTztBQUFBO0FBQUEsSUFFTCxlQUFlLFFBQVE7QUFBQSxFQUN6QjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsTUFBTTtBQUFBLElBQ04sS0FBSztBQUFBLEVBQ1A7QUFBQSxFQUNBLFFBQU8sRUFBRSxNQUFLLElBQUs7QUFBQSxFQUNuQixTQUFRO0FBQUEsSUFDTixPQUFNO0FBQUEsTUFDSixFQUFFLE1BQUssS0FBSyxhQUFZLE9BQU87QUFBQSxJQUNqQztBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
