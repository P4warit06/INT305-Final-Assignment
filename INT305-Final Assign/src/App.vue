<template>
  <div id="app">
    <Navbar />
    <main class="main-content">
      <router-view />
    </main>
    <footer class="app-footer">
      <div class="footer-content">
        <p>Firestore Query Demo &copy; {{ currentYear }}. Real-time data management powered by Firebase.</p>
        <div class="footer-links">
          <a href="#" class="footer-link">
            <i class="fab fa-github"></i>
            GitHub
          </a>
          <a href="#" class="footer-link">
            <i class="fas fa-book"></i>
            Documentation
          </a>
          <a href="#" class="footer-link">
            <i class="fas fa-code"></i>
            API Reference
          </a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Navbar from './components/Navbar.vue'

const currentYear = ref(new Date().getFullYear())

onMounted(() => {
  // Load Font Awesome if not already loaded
  if (!document.querySelector('#font-awesome')) {
    const link = document.createElement('link')
    link.id = 'font-awesome'
    link.rel = 'stylesheet'
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
    document.head.appendChild(link)
  }
})




</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  min-height: 100vh;
}

.main-content {
  min-height: calc(100vh - 140px);
  padding: 2rem 1rem;
}
#app { 
  display: flex;
    flex-direction: column;
    min-height: 100vh;
}


.app-footer {
  background: linear-gradient(135deg, #2d3748 0%, #1a202c 100%);
  color: white;
  padding: 1.5rem;
  text-align: center;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.footer-links {
  display: flex;
  gap: 1.5rem;
}

.footer-link {
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: color 0.3s ease;
}

.footer-link:hover {
  color: white;
}

@media (max-width: 768px) {
  .footer-content {
    flex-direction: column;
    text-align: center;
  }

  .footer-links {
    justify-content: center;
  }
}
</style>