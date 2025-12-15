<template>
    <nav class="navbar">
        <div class="nav-container">
            <div class="nav-brand">
                <i class="fas fa-fire nav-logo"></i>
                <span class="nav-title">Firestore Dashboard</span>
                <span class="nav-subtitle">Real-time Data Explorer</span>
            </div>

            <div class="nav-links">
                <router-link to="/" class="nav-link" active-class="active">
                    <i class="fas fa-home"></i>
                    <span>Home</span>
                </router-link>

               

                <div class="nav-divider"></div>

                <a href="#" class="nav-link">
                    <i class="fas fa-cog"></i>
                    <span>Settings</span>
                </a>

                <a href="#" class="nav-link">
                    <i class="fas fa-question-circle"></i>
                    <span>Help</span>
                </a>
            </div>

            <div class="nav-actions">
                <div class="status-indicator">
                    <div class="status-dot online"></div>
                    <span>Connected to Firestore</span>
                </div>
                <button class="nav-profile">
                    <i class="fas fa-user-circle"></i>
                </button>
            </div>
        </div>
    </nav>
</template>

<style scoped>
.navbar {
    background: linear-gradient(135deg, #2d3748 0%, #1a202c 100%);
    color: white;
    padding: 0 2rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    position: sticky;
    top: 0;
    z-index: 1000;
}

.nav-container {
    max-width: 1400px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 70px;
}

.nav-brand {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.nav-logo {
    font-size: 1.8rem;
    color: #4facfe;
}

.nav-title {
    font-size: 1.4rem;
    font-weight: 700;
    letter-spacing: 0.5px;
}

.nav-subtitle {
    font-size: 0.8rem;
    opacity: 0.7;
    margin-left: 0.5rem;
    padding-left: 0.5rem;
    border-left: 1px solid rgba(255, 255, 255, 0.2);
}

.nav-links {
    display: flex;
    align-items: center;
    gap: 1.5rem;
}

.nav-link {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: rgba(255, 255, 255, 0.7);
    text-decoration: none;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    transition: all 0.3s ease;
    font-weight: 500;
}

.nav-link:hover {
    background: rgba(255, 255, 255, 0.1);
    color: white;
}

.nav-link.active {
    background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
    color: white;
    box-shadow: 0 4px 15px rgba(79, 172, 254, 0.3);
}

.nav-divider {
    width: 1px;
    height: 30px;
    background: rgba(255, 255, 255, 0.2);
    margin: 0 0.5rem;
}

.nav-actions {
    display: flex;
    align-items: center;
    gap: 1.5rem;
}

.status-indicator {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.85rem;
    color: rgba(255, 255, 255, 0.7);
}

.status-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
}

.status-dot.online {
    background: #06d6a0;
    box-shadow: 0 0 10px rgba(6, 214, 160, 0.5);
    animation: pulse 2s infinite;
}

@keyframes pulse {
    0% {
        opacity: 1;
    }

    50% {
        opacity: 0.5;
    }

    100% {
        opacity: 1;
    }
}

.nav-profile {
    background: none;
    border: none;
    color: rgba(255, 255, 255, 0.7);
    font-size: 1.8rem;
    cursor: pointer;
    padding: 0.25rem;
    border-radius: 50%;
    transition: all 0.3s ease;
}

.nav-profile:hover {
    color: white;
    background: rgba(255, 255, 255, 0.1);
}

@media (max-width: 992px) {
    .nav-subtitle {
        display: none;
    }

    .nav-links {
        gap: 0.75rem;
    }

    .nav-link span {
        display: none;
    }

    .nav-link {
        padding: 0.5rem;
        font-size: 1.2rem;
    }
}

@media (max-width: 768px) {
    .navbar {
        padding: 0 1rem;
    }

    .nav-container {
        height: 60px;
    }

    .nav-title {
        font-size: 1.2rem;
    }

    .nav-logo {
        font-size: 1.5rem;
    }

    .status-indicator span {
        display: none;
    }
}
</style>