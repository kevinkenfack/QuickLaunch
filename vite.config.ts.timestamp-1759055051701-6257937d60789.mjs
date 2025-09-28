// vite.config.ts
import { defineConfig } from "file:///home/project/node_modules/vite/dist/node/index.js";
import react from "file:///home/project/node_modules/@vitejs/plugin-react/dist/index.js";
import { crx } from "file:///home/project/node_modules/@crxjs/vite-plugin/dist/index.mjs";

// manifest.json
var manifest_default = {
  manifest_version: 3,
  name: "QuickLaunch",
  version: "1.0.0",
  description: "Extension Chromium moderne pour acc\xE9der rapidement \xE0 vos sites favoris via une popup \xE9l\xE9gante et personnalisable",
  permissions: [
    "storage"
  ],
  background: {
    service_worker: "src/background/index.ts",
    type: "module"
  },
  commands: {
    "open-quicklaunch": {
      suggested_key: {
        default: "Ctrl+Shift+Q",
        mac: "Command+Shift+Q"
      },
      description: "Ouvrir QuickLaunch"
    }
  },
  action: {
    default_popup: "src/popup/index.html",
    default_title: "QuickLaunch",
    default_icon: {
      "16": "icons/icon-16.png",
      "19": "icons/icon-19.png",
      "32": "icons/icon-32.png",
      "38": "icons/icon-38.png",
      "48": "icons/icon-48.png",
      "128": "icons/icon-128.png"
    }
  },
  icons: {
    "16": "icons/icon-16.png",
    "19": "icons/icon-19.png",
    "32": "icons/icon-32.png",
    "38": "icons/icon-38.png",
    "48": "icons/icon-48.png",
    "128": "icons/icon-128.png"
  },
  options_page: "src/options/index.html"
};

// vite.config.ts
var vite_config_default = defineConfig({
  plugins: [
    react(),
    crx({ manifest: manifest_default })
  ],
  build: {
    rollupOptions: {
      input: {
        popup: "src/popup/index.html",
        options: "src/options/index.html",
        background: "src/background/index.ts"
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAibWFuaWZlc3QuanNvbiJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9ob21lL3Byb2plY3RcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9ob21lL3Byb2plY3Qvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL2hvbWUvcHJvamVjdC92aXRlLmNvbmZpZy50c1wiO2ltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXG5pbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3QnXG5pbXBvcnQgeyBjcnggfSBmcm9tICdAY3J4anMvdml0ZS1wbHVnaW4nXG5pbXBvcnQgbWFuaWZlc3QgZnJvbSAnLi9tYW5pZmVzdC5qc29uJ1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbXG4gICAgcmVhY3QoKSxcbiAgICBjcngoeyBtYW5pZmVzdCB9KVxuICBdLFxuICBidWlsZDoge1xuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIGlucHV0OiB7XG4gICAgICAgIHBvcHVwOiAnc3JjL3BvcHVwL2luZGV4Lmh0bWwnLFxuICAgICAgICBvcHRpb25zOiAnc3JjL29wdGlvbnMvaW5kZXguaHRtbCcsXG4gICAgICAgIGJhY2tncm91bmQ6ICdzcmMvYmFja2dyb3VuZC9pbmRleC50cydcbiAgICAgIH1cbiAgICB9XG4gIH1cbn0pIiwgIntcbiAgXCJtYW5pZmVzdF92ZXJzaW9uXCI6IDMsXG4gIFwibmFtZVwiOiBcIlF1aWNrTGF1bmNoXCIsXG4gIFwidmVyc2lvblwiOiBcIjEuMC4wXCIsXG4gIFwiZGVzY3JpcHRpb25cIjogXCJFeHRlbnNpb24gQ2hyb21pdW0gbW9kZXJuZSBwb3VyIGFjY1x1MDBFOWRlciByYXBpZGVtZW50IFx1MDBFMCB2b3Mgc2l0ZXMgZmF2b3JpcyB2aWEgdW5lIHBvcHVwIFx1MDBFOWxcdTAwRTlnYW50ZSBldCBwZXJzb25uYWxpc2FibGVcIixcbiAgXCJwZXJtaXNzaW9uc1wiOiBbXG4gICAgXCJzdG9yYWdlXCJcbiAgXSxcbiAgXCJiYWNrZ3JvdW5kXCI6IHtcbiAgICBcInNlcnZpY2Vfd29ya2VyXCI6IFwic3JjL2JhY2tncm91bmQvaW5kZXgudHNcIixcbiAgICBcInR5cGVcIjogXCJtb2R1bGVcIlxuICB9LFxuICBcImNvbW1hbmRzXCI6IHtcbiAgICBcIm9wZW4tcXVpY2tsYXVuY2hcIjoge1xuICAgICAgXCJzdWdnZXN0ZWRfa2V5XCI6IHtcbiAgICAgICAgXCJkZWZhdWx0XCI6IFwiQ3RybCtTaGlmdCtRXCIsXG4gICAgICAgIFwibWFjXCI6IFwiQ29tbWFuZCtTaGlmdCtRXCJcbiAgICAgIH0sXG4gICAgICBcImRlc2NyaXB0aW9uXCI6IFwiT3V2cmlyIFF1aWNrTGF1bmNoXCJcbiAgICB9XG4gIH0sXG4gIFwiYWN0aW9uXCI6IHtcbiAgICBcImRlZmF1bHRfcG9wdXBcIjogXCJzcmMvcG9wdXAvaW5kZXguaHRtbFwiLFxuICAgIFwiZGVmYXVsdF90aXRsZVwiOiBcIlF1aWNrTGF1bmNoXCIsXG4gICAgXCJkZWZhdWx0X2ljb25cIjoge1xuICAgICAgXCIxNlwiOiBcImljb25zL2ljb24tMTYucG5nXCIsXG4gICAgICBcIjE5XCI6IFwiaWNvbnMvaWNvbi0xOS5wbmdcIixcbiAgICAgIFwiMzJcIjogXCJpY29ucy9pY29uLTMyLnBuZ1wiLFxuICAgICAgXCIzOFwiOiBcImljb25zL2ljb24tMzgucG5nXCIsXG4gICAgICBcIjQ4XCI6IFwiaWNvbnMvaWNvbi00OC5wbmdcIixcbiAgICAgIFwiMTI4XCI6XCJpY29ucy9pY29uLTEyOC5wbmdcIlxuICAgIH1cbiAgfSxcbiAgXCJpY29uc1wiOiB7XG4gICAgXCIxNlwiOiBcImljb25zL2ljb24tMTYucG5nXCIsXG4gICAgXCIxOVwiOiBcImljb25zL2ljb24tMTkucG5nXCIsXG4gICAgXCIzMlwiOiBcImljb25zL2ljb24tMzIucG5nXCIsXG4gICAgXCIzOFwiOiBcImljb25zL2ljb24tMzgucG5nXCIsXG4gICAgXCI0OFwiOiBcImljb25zL2ljb24tNDgucG5nXCIsXG4gICAgXCIxMjhcIjpcImljb25zL2ljb24tMTI4LnBuZ1wiXG4gIH0sXG4gIFwib3B0aW9uc19wYWdlXCI6IFwic3JjL29wdGlvbnMvaW5kZXguaHRtbFwiXG59XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXlOLFNBQVMsb0JBQW9CO0FBQ3RQLE9BQU8sV0FBVztBQUNsQixTQUFTLFdBQVc7OztBQ0ZwQjtBQUFBLEVBQ0Usa0JBQW9CO0FBQUEsRUFDcEIsTUFBUTtBQUFBLEVBQ1IsU0FBVztBQUFBLEVBQ1gsYUFBZTtBQUFBLEVBQ2YsYUFBZTtBQUFBLElBQ2I7QUFBQSxFQUNGO0FBQUEsRUFDQSxZQUFjO0FBQUEsSUFDWixnQkFBa0I7QUFBQSxJQUNsQixNQUFRO0FBQUEsRUFDVjtBQUFBLEVBQ0EsVUFBWTtBQUFBLElBQ1Ysb0JBQW9CO0FBQUEsTUFDbEIsZUFBaUI7QUFBQSxRQUNmLFNBQVc7QUFBQSxRQUNYLEtBQU87QUFBQSxNQUNUO0FBQUEsTUFDQSxhQUFlO0FBQUEsSUFDakI7QUFBQSxFQUNGO0FBQUEsRUFDQSxRQUFVO0FBQUEsSUFDUixlQUFpQjtBQUFBLElBQ2pCLGVBQWlCO0FBQUEsSUFDakIsY0FBZ0I7QUFBQSxNQUNkLE1BQU07QUFBQSxNQUNOLE1BQU07QUFBQSxNQUNOLE1BQU07QUFBQSxNQUNOLE1BQU07QUFBQSxNQUNOLE1BQU07QUFBQSxNQUNOLE9BQU07QUFBQSxJQUNSO0FBQUEsRUFDRjtBQUFBLEVBQ0EsT0FBUztBQUFBLElBQ1AsTUFBTTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sT0FBTTtBQUFBLEVBQ1I7QUFBQSxFQUNBLGNBQWdCO0FBQ2xCOzs7QURyQ0EsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsTUFBTTtBQUFBLElBQ04sSUFBSSxFQUFFLDJCQUFTLENBQUM7QUFBQSxFQUNsQjtBQUFBLEVBQ0EsT0FBTztBQUFBLElBQ0wsZUFBZTtBQUFBLE1BQ2IsT0FBTztBQUFBLFFBQ0wsT0FBTztBQUFBLFFBQ1AsU0FBUztBQUFBLFFBQ1QsWUFBWTtBQUFBLE1BQ2Q7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
