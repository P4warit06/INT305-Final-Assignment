<template>
    <div class="home-page">
        <div class="header">
            <h1 class="title">E-commerce Product Application</h1>
            <p class="subtitle">Interactive Query Dashboard for Products & Orders</p>
        </div>

        <div class="query-sections">
            <section class="query-section">
                <div class="section-header">
                    <i class="fas fa-box icon"></i>
                    <h3 class="section-title">Product Queries</h3>
                    <p class="section-description">Filter and analyze product data</p>
                </div>
                <div class="button-grid">
                    <button class="query-btn product-btn" @click="goProduct(1)">
                        <i class="fas fa-check-circle btn-icon"></i>
                        <span class="btn-text">In-stock Products with Price ≥ 20,000</span>
                    </button>
                    <button class="query-btn product-btn" @click="goProduct(2)">
                        <i class="fas fa-mobile-alt btn-icon"></i>
                        <span class="btn-text">Mobile OR Tablet Products</span>
                    </button>
                    <button class="query-btn product-btn" @click="goProduct(3)">
                        <i class="fas fa-tag btn-icon"></i>
                        <span class="btn-text">Products Available in Black Color</span>
                    </button>
                    <button class="query-btn product-btn" @click="goProduct(4)">
                        <i class="fas fa-clock btn-icon"></i>
                        <span class="btn-text">Top 5  Products(30k-50k)</span>
                    </button>
                    <button class="query-btn product-btn" @click="goProduct(5)">
                        <i class="fas fa-calculator btn-icon"></i>
                        <span class="btn-text">Products Created Since 2025</span>
                    </button>
               
                </div>
            </section>

            <section class="query-section">
                <div class="section-header">
                    <i class="fas fa-shopping-cart icon"></i>
                    <h3 class="section-title">Order Queries</h3>
                    <p class="section-description">Track and monitor order information</p>
                </div>
                <div class="button-grid">
                    <button class="query-btn order-btn" @click="goOrder(1)">
                        <i class="fas fa-hourglass-half btn-icon"></i>
                        <span class="btn-text">Pending Orders</span>
                    </button>
                    <button class="query-btn order-btn" @click="goOrder(2)">
                        <i class="fas fa-user btn-icon"></i>
                        <span class="btn-text">Orders by User</span>
                    </button>
                    <button class="query-btn order-btn" @click="goOrder(3)">
                        <i class="fas fa-history btn-icon"></i>
                        <span class="btn-text">Latest Orders</span>
                    </button>
                </div>
            </section>
        </div>

        <div class="footer">
            <p>Select a query to explore your Firestore data</p>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from "vue-router"
const router = useRouter()

const goProduct = (id) => router.push(`/products/query/${id}`)
const goOrder = (id) => router.push(`/orders/query/${id}`)
</script>

<style scoped>
.home-page {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.header {
    text-align: center;
    margin-bottom: 3rem;
    padding: 2rem;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 15px;
    color: white;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.title {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
    font-weight: 700;
}

.subtitle {
    font-size: 1.1rem;
    opacity: 0.9;
}

.query-sections {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
    gap: 2rem;
    margin-bottom: 2rem;
}

.query-section {
    background: white;
    padding: 2rem;
    border-radius: 15px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.query-section:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.12);
}

.section-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
    border-bottom: 2px solid #f0f0f0;
}

.icon {
    font-size: 1.8rem;
    color: #667eea;
}

.section-title {
    font-size: 1.5rem;
    color: #333;
    margin: 0;
}

.section-description {
    color: #666;
    font-size: 0.9rem;
    margin-top: 0.25rem;
}

.button-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
}

.query-btn {
    padding: 1.2rem 1rem;
    border: none;
    border-radius: 10px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
}

.query-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.product-btn {
    background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
    color: white;
}

.order-btn {
    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
    color: white;
}

.btn-icon {
    font-size: 1.2rem;
}

.footer {
    text-align: center;
    padding: 1.5rem;
    background: #f8f9fa;
    border-radius: 10px;
    color: #666;
    font-size: 0.95rem;
    margin-top: 2rem;
}

@media (max-width: 768px) {
    .query-sections {
        grid-template-columns: 1fr;
    }

    .title {
        font-size: 2rem;
    }

    .query-section {
        padding: 1.5rem;
    }
}
</style>