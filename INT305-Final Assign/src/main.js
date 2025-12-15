// src/main.js
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router"; // ← เพิ่มบรรทัดนี้

// Load Font Awesome (optional)
const loadFontAwesome = () => {
  const linkId = "font-awesome-css";
  if (!document.getElementById(linkId)) {
    const link = document.createElement("link");
    link.id = linkId;
    link.rel = "stylesheet";
    link.href =
      "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css";
    link.crossOrigin = "anonymous";
    document.head.appendChild(link);
  }
};

loadFontAwesome();

const app = createApp(App);

// ใช้ router plugin
app.use(router); // ← เพิ่มบรรทัดนี้

app.mount("#app");
