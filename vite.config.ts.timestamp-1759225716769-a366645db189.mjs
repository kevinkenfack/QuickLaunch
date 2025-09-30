// vite.config.ts
import { defineConfig } from "file:///home/project/node_modules/vite/dist/node/index.js";
import react from "file:///home/project/node_modules/@vitejs/plugin-react/dist/index.js";
import { crx } from "file:///home/project/node_modules/@crxjs/vite-plugin/dist/index.mjs";

// manifest.json
var manifest_default = {
  manifest_version: 3,
  name: "QuickLaunch",
  version: "1.0.0",
  author: "Kevin Kenfack",
  homepage_url: "https://github.com/kevinkenfack/QuickLaunch",
  short_name: "QuickLaunch",
  description: "Extension Chromium moderne pour acc\xE9der rapidement \xE0 vos sites favoris via une popup \xE9l\xE9gante et personnalisable",
  permissions: [
    "storage",
    "activeTab"
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAibWFuaWZlc3QuanNvbiJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9ob21lL3Byb2plY3RcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9ob21lL3Byb2plY3Qvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL2hvbWUvcHJvamVjdC92aXRlLmNvbmZpZy50c1wiO2ltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXG5pbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3QnXG5pbXBvcnQgeyBjcnggfSBmcm9tICdAY3J4anMvdml0ZS1wbHVnaW4nXG5pbXBvcnQgbWFuaWZlc3QgZnJvbSAnLi9tYW5pZmVzdC5qc29uJ1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbXG4gICAgcmVhY3QoKSxcbiAgICBjcngoeyBtYW5pZmVzdCB9KVxuICBdLFxuICBidWlsZDoge1xuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIGlucHV0OiB7XG4gICAgICAgIHBvcHVwOiAnc3JjL3BvcHVwL2luZGV4Lmh0bWwnLFxuICAgICAgICBvcHRpb25zOiAnc3JjL29wdGlvbnMvaW5kZXguaHRtbCcsXG4gICAgICAgIGJhY2tncm91bmQ6ICdzcmMvYmFja2dyb3VuZC9pbmRleC50cydcbiAgICAgIH1cbiAgICB9XG4gIH1cbn0pIiwgIntcbiAgXCJtYW5pZmVzdF92ZXJzaW9uXCI6IDMsXG4gIFwibmFtZVwiOiBcIlF1aWNrTGF1bmNoXCIsXG4gIFwidmVyc2lvblwiOiBcIjEuMC4wXCIsXG4gIFwiYXV0aG9yXCI6IFwiS2V2aW4gS2VuZmFja1wiLFxuICBcImhvbWVwYWdlX3VybFwiOiBcImh0dHBzOi8vZ2l0aHViLmNvbS9rZXZpbmtlbmZhY2svUXVpY2tMYXVuY2hcIixcbiAgXCJzaG9ydF9uYW1lXCI6IFwiUXVpY2tMYXVuY2hcIixcbiAgXCJkZXNjcmlwdGlvblwiOiBcIkV4dGVuc2lvbiBDaHJvbWl1bSBtb2Rlcm5lIHBvdXIgYWNjXHUwMEU5ZGVyIHJhcGlkZW1lbnQgXHUwMEUwIHZvcyBzaXRlcyBmYXZvcmlzIHZpYSB1bmUgcG9wdXAgXHUwMEU5bFx1MDBFOWdhbnRlIGV0IHBlcnNvbm5hbGlzYWJsZVwiLFxuICBcInBlcm1pc3Npb25zXCI6IFtcbiAgICBcInN0b3JhZ2VcIixcbiAgICBcImFjdGl2ZVRhYlwiXG4gIF0sXG4gIFwiYmFja2dyb3VuZFwiOiB7XG4gICAgXCJzZXJ2aWNlX3dvcmtlclwiOiBcInNyYy9iYWNrZ3JvdW5kL2luZGV4LnRzXCIsXG4gICAgXCJ0eXBlXCI6IFwibW9kdWxlXCJcbiAgfSxcbiAgXCJjb21tYW5kc1wiOiB7XG4gICAgXCJvcGVuLXF1aWNrbGF1bmNoXCI6IHtcbiAgICAgIFwic3VnZ2VzdGVkX2tleVwiOiB7XG4gICAgICAgIFwiZGVmYXVsdFwiOiBcIkN0cmwrU2hpZnQrUVwiLFxuICAgICAgICBcIm1hY1wiOiBcIkNvbW1hbmQrU2hpZnQrUVwiXG4gICAgICB9LFxuICAgICAgXCJkZXNjcmlwdGlvblwiOiBcIk91dnJpciBRdWlja0xhdW5jaFwiXG4gICAgfVxuICB9LFxuICBcImFjdGlvblwiOiB7XG4gICAgXCJkZWZhdWx0X3BvcHVwXCI6IFwic3JjL3BvcHVwL2luZGV4Lmh0bWxcIixcbiAgICBcImRlZmF1bHRfdGl0bGVcIjogXCJRdWlja0xhdW5jaFwiLFxuICAgIFwiZGVmYXVsdF9pY29uXCI6IHtcbiAgICAgIFwiMTZcIjogXCJpY29ucy9pY29uLTE2LnBuZ1wiLFxuICAgICAgXCIxOVwiOiBcImljb25zL2ljb24tMTkucG5nXCIsXG4gICAgICBcIjMyXCI6IFwiaWNvbnMvaWNvbi0zMi5wbmdcIixcbiAgICAgIFwiMzhcIjogXCJpY29ucy9pY29uLTM4LnBuZ1wiLFxuICAgICAgXCI0OFwiOiBcImljb25zL2ljb24tNDgucG5nXCIsXG4gICAgICBcIjEyOFwiOlwiaWNvbnMvaWNvbi0xMjgucG5nXCJcbiAgICB9XG4gIH0sXG4gIFwiaWNvbnNcIjoge1xuICAgIFwiMTZcIjogXCJpY29ucy9pY29uLTE2LnBuZ1wiLFxuICAgIFwiMTlcIjogXCJpY29ucy9pY29uLTE5LnBuZ1wiLFxuICAgIFwiMzJcIjogXCJpY29ucy9pY29uLTMyLnBuZ1wiLFxuICAgIFwiMzhcIjogXCJpY29ucy9pY29uLTM4LnBuZ1wiLFxuICAgIFwiNDhcIjogXCJpY29ucy9pY29uLTQ4LnBuZ1wiLFxuICAgIFwiMTI4XCI6XCJpY29ucy9pY29uLTEyOC5wbmdcIlxuICB9LFxuICBcIm9wdGlvbnNfcGFnZVwiOiBcInNyYy9vcHRpb25zL2luZGV4Lmh0bWxcIlxufVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUF5TixTQUFTLG9CQUFvQjtBQUN0UCxPQUFPLFdBQVc7QUFDbEIsU0FBUyxXQUFXOzs7QUNGcEI7QUFBQSxFQUNFLGtCQUFvQjtBQUFBLEVBQ3BCLE1BQVE7QUFBQSxFQUNSLFNBQVc7QUFBQSxFQUNYLFFBQVU7QUFBQSxFQUNWLGNBQWdCO0FBQUEsRUFDaEIsWUFBYztBQUFBLEVBQ2QsYUFBZTtBQUFBLEVBQ2YsYUFBZTtBQUFBLElBQ2I7QUFBQSxJQUNBO0FBQUEsRUFDRjtBQUFBLEVBQ0EsWUFBYztBQUFBLElBQ1osZ0JBQWtCO0FBQUEsSUFDbEIsTUFBUTtBQUFBLEVBQ1Y7QUFBQSxFQUNBLFVBQVk7QUFBQSxJQUNWLG9CQUFvQjtBQUFBLE1BQ2xCLGVBQWlCO0FBQUEsUUFDZixTQUFXO0FBQUEsUUFDWCxLQUFPO0FBQUEsTUFDVDtBQUFBLE1BQ0EsYUFBZTtBQUFBLElBQ2pCO0FBQUEsRUFDRjtBQUFBLEVBQ0EsUUFBVTtBQUFBLElBQ1IsZUFBaUI7QUFBQSxJQUNqQixlQUFpQjtBQUFBLElBQ2pCLGNBQWdCO0FBQUEsTUFDZCxNQUFNO0FBQUEsTUFDTixNQUFNO0FBQUEsTUFDTixNQUFNO0FBQUEsTUFDTixNQUFNO0FBQUEsTUFDTixNQUFNO0FBQUEsTUFDTixPQUFNO0FBQUEsSUFDUjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLE9BQVM7QUFBQSxJQUNQLE1BQU07QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLE9BQU07QUFBQSxFQUNSO0FBQUEsRUFDQSxjQUFnQjtBQUNsQjs7O0FEekNBLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLE1BQU07QUFBQSxJQUNOLElBQUksRUFBRSwyQkFBUyxDQUFDO0FBQUEsRUFDbEI7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNMLGVBQWU7QUFBQSxNQUNiLE9BQU87QUFBQSxRQUNMLE9BQU87QUFBQSxRQUNQLFNBQVM7QUFBQSxRQUNULFlBQVk7QUFBQSxNQUNkO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
