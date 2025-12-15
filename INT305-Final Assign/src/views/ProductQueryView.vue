<template>
    <div class="product-query-view">
        <div class="page-header">
            <div class="header-content">
                <h2 class="query-title">
                    <i class="fas fa-search query-icon"></i>
                    Query {{ route.params.id }} : {{ title }}
                </h2>
                <p class="query-description">Exploring product data from Firestore</p>
            </div>
            <div class="header-actions">
                <button class="refresh-btn" @click="getQuery" :disabled="loading">
                    <i class="fas fa-redo-alt"></i>
                    Refresh
                </button>
            </div>
        </div>

        <div class="content-container">
            <div v-if="loading" class="loading-state">
                <div class="spinner"></div>
                <p>Executing query...</p>
            </div>

            <div v-else-if="error" class="error-state">
                <i class="fas fa-exclamation-circle error-icon"></i>
                <h3>Error Loading Data</h3>
                <p class="error-message">{{ error }}</p>
                <button class="retry-btn" @click="getQuery">Try Again</button>
            </div>

            <div v-else-if="aggregateCount !== null" class="aggregate-result">
                <div class="count-card">
                    <i class="fas fa-chart-bar count-icon"></i>
                    <div class="count-content">
                        <h3 class="count-title">{{ title }}</h3>
                        <div class="count-value">{{ aggregateCount.toLocaleString() }}</div>
                        <p class="count-description">Products created since 2025</p>
                    </div>
                    <div class="count-badge">
                        <i class="fas fa-database"></i>
                        Aggregate Result
                    </div>
                </div>
                <div class="result-actions">
                    <button class="action-btn export-btn">
                        <i class="fas fa-download"></i>
                        Export Count
                    </button>
                    <button class="action-btn chart-btn">
                        <i class="fas fa-chart-pie"></i>
                        View Chart
                    </button>
                </div>
            </div>

            <div v-else class="results-container">
                <div class="results-header">
                    <div class="results-info">
                        <h3 class="results-count">
                            <i class="fas fa-boxes"></i>
                            {{ products.length }} Product(s) Found
                        </h3>
                        <p class="results-description">Showing filtered product results</p>
                    </div>
                    <div class="view-controls">
                        <button class="view-btn active" @click="viewMode = 'grid'">
                            <i class="fas fa-th"></i>
                        </button>
                        <button class="view-btn" @click="viewMode = 'list'">
                            <i class="fas fa-list"></i>
                        </button>
                        <select class="sort-select" v-model="sortBy">
                            <option value="price">Sort by Price</option>
                            <option value="name">Sort by Name</option>
                            <option value="date">Sort by Date</option>
                        </select>
                    </div>
                </div>

                <div v-if="products.length === 0" class="empty-state">
                    <i class="fas fa-box-open empty-icon"></i>
                    <h4>No Products Found</h4>
                    <p>No products match your query criteria</p>
                </div>

                <div v-else :class="['products-display', viewMode]">
                    <ProductCard v-for="product in sortedProducts" :key="product.id" :product="product"
                        :view-mode="viewMode" />
                </div>

                <div class="results-footer">
                    <div class="summary">
                        <div class="summary-item">
                            <span class="summary-label">Average Price:</span>
                            <span class="summary-value">${{ averagePrice.toLocaleString() }}</span>
                        </div>
                        <div class="summary-item">
                            <span class="summary-label">In Stock:</span>
                            <span class="summary-value">{{ inStockCount }}</span>
                        </div>
                        <div class="summary-item">
                            <span class="summary-label">Categories:</span>
                            <span class="summary-value">{{ uniqueCategories }}</span>
                        </div>
                    </div>
                    <div class="footer-actions">
                        <button class="action-btn secondary-btn">
                            <i class="fas fa-file-export"></i>
                            Export Results
                        </button>
                        <button class="action-btn primary-btn">
                            <i class="fas fa-filter"></i>
                            Add Filter
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from "vue"
import { useRoute } from "vue-router"
import {
    collection,
    query,
    where,
    orderBy,
    limit,
    or,
    getDocs,
    getCountFromServer,
    Timestamp,
} from "firebase/firestore"

import db from "../firebase/init.js"
import ProductCard from "../components/ProductCard.vue"

const route = useRoute()
const products = ref([])
const loading = ref(true)
const error = ref(null)
const title = ref("")
const aggregateCount = ref(null)
const viewMode = ref("grid")
const sortBy = ref("price")

const sortedProducts = computed(() => {
    return [...products.value].sort((a, b) => {
        switch (sortBy.value) {
            case 'price':
                return (a.price || 0) - (b.price || 0)
            case 'name':
                return (a.name || '').localeCompare(b.name || '')
            case 'date':
                return (b.createdAt?.toMillis() || 0) - (a.createdAt?.toMillis() || 0)
            default:
                return 0
        }
    })
})

const averagePrice = computed(() => {
    if (products.value.length === 0) return 0
    const sum = products.value.reduce((acc, p) => acc + (p.price || 0), 0)
    return Math.round(sum / products.value.length)
})

const inStockCount = computed(() => {
    return products.value.filter(p => p.inStock).length
})

const uniqueCategories = computed(() => {
    const categories = new Set(products.value.map(p => p.category).filter(Boolean))
    return categories.size
})

async function getQuery() {
    try {
        loading.value = true
        error.value = null
        aggregateCount.value = null
        products.value = []

        const id = Number(route.params.id)
        const refCol = collection(db, "products")
        let qry

        if (id === 1) {
            title.value = "In-stock Products with Price ≥ 20,000"
            qry = query(
                refCol,
                where("inStock", "==", true),
                where("price", ">=", 20000)
            )
        }

        else if (id === 2) {
            title.value = "Mobile or Tablet Products"
            qry = query(
                refCol,
                where("category", "in", ["mobile", "tablet"])
            )
        }

        else if (id === 3) {
            title.value = "Products Available in Black Color"
            qry = query(
                refCol,
                where("colors", "array-contains", "black")
            )
        }

        else if (id === 4) {
            title.value = "Top 5 Products (30k–50k)"
            qry = query(
                refCol,
                where("price", ">=", 30000),
                where("price", "<=", 50000),
                orderBy("price"),
                limit(5)
            )
        }

        else if (id === 5) {
            title.value = "Products Created Since 2025"
            const date = Timestamp.fromDate(new Date("2025-01-01"))

            const snap = await getCountFromServer(
                query(refCol, where("createdAt", ">=", date))
            )

            aggregateCount.value = snap.data().count
            loading.value = false
            return
        }

        else {
            error.value = "Invalid Query ID"
            loading.value = false
            return
        }

        const snap = await getDocs(qry)
        snap.forEach(d =>
            products.value.push({ id: d.id, ...d.data() })
        )

    } catch (e) {
        error.value = e.message
        console.error("Firestore Query Error:", e)
    } finally {
        loading.value = false
    }
}


watch(() => route.params.id, getQuery)
onMounted(getQuery)
</script>

<style scoped>
.product-query-view {
    max-width: 1400px;
    margin: 0 auto;
    padding: 2rem;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.page-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    padding: 1.5rem;
    background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
    border-radius: 15px;
    color: white;
}

.header-content {
    flex: 1;
}

.query-title {
    font-size: 1.8rem;
    margin: 0;
    display: flex;
    align-items: center;
    gap: 0.75rem;
}

.query-icon {
    font-size: 1.5rem;
}

.query-description {
    margin-top: 0.5rem;
    opacity: 0.9;
    font-size: 0.95rem;
}

.refresh-btn {
    padding: 0.75rem 1.5rem;
    background: rgba(255, 255, 255, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.3);
    color: white;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    transition: all 0.3s ease;
}

.refresh-btn:hover:not(:disabled) {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
}

.refresh-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.content-container {
    background: white;
    border-radius: 15px;
    padding: 2rem;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
}

.loading-state {
    text-align: center;
    padding: 4rem;
}

.spinner {
    width: 50px;
    height: 50px;
    border: 4px solid #f3f3f3;
    border-top: 4px solid #4facfe;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: 0 auto 1.5rem;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

.error-state {
    text-align: center;
    padding: 3rem;
    color: #f5576c;
}

.error-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
}

.error-message {
    margin: 1rem 0;
    color: #666;
    font-family: monospace;
    background: #f8f9fa;
    padding: 1rem;
    border-radius: 8px;
}

.retry-btn {
    padding: 0.75rem 1.5rem;
    background: #f5576c;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 600;
    margin-top: 1rem;
}

.aggregate-result {
    text-align: center;
    padding: 2rem;
}

.count-card {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 3rem;
    border-radius: 15px;
    margin-bottom: 2rem;
    position: relative;
    max-width: 600px;
    margin: 0 auto 2rem;
}

.count-icon {
    font-size: 3rem;
    margin-bottom: 1.5rem;
}

.count-content {
    margin-bottom: 1.5rem;
}

.count-title {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
    opacity: 0.9;
}

.count-value {
    font-size: 4rem;
    font-weight: 700;
    margin: 1rem 0;
}

.count-description {
    opacity: 0.8;
    font-size: 1rem;
}

.count-badge {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: rgba(255, 255, 255, 0.2);
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.result-actions {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-top: 2rem;
}

.action-btn {
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    transition: all 0.3s ease;
}

.export-btn {
    background: #28a745;
    color: white;
}

.chart-btn {
    background: #ffc107;
    color: #333;
}

.results-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    padding-bottom: 1.5rem;
    border-bottom: 2px solid #f0f0f0;
}

.results-info {
    flex: 1;
}

.results-count {
    font-size: 1.3rem;
    color: #333;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin: 0 0 0.5rem;
}

.results-description {
    color: #666;
    font-size: 0.95rem;
}

.view-controls {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.view-btn {
    width: 40px;
    height: 40px;
    border: 2px solid #dee2e6;
    background: white;
    border-radius: 8px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #666;
    transition: all 0.3s ease;
}

.view-btn.active {
    background: #4facfe;
    border-color: #4facfe;
    color: white;
}

.sort-select {
    padding: 0.5rem 1rem;
    border: 2px solid #dee2e6;
    border-radius: 8px;
    background: white;
    color: #333;
    font-size: 0.9rem;
    cursor: pointer;
}

.empty-state {
    text-align: center;
    padding: 4rem;
    color: #999;
}

.empty-icon {
    font-size: 4rem;
    margin-bottom: 1rem;
    opacity: 0.5;
}

.products-display {
    margin-bottom: 2rem;
}

.products-display.grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
}

.products-display.list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.results-footer {
    padding: 1.5rem;
    background: #f8f9fa;
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.summary {
    display: flex;
    gap: 2rem;
}

.summary-item {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
}

.summary-label {
    font-size: 0.9rem;
    color: #666;
}

.summary-value {
    font-size: 1.2rem;
    font-weight: 600;
    color: #333;
}

.footer-actions {
    display: flex;
    gap: 1rem;
}

.secondary-btn {
    background: #6c757d;
    color: white;
}

.primary-btn {
    background: #4facfe;
    color: white;
}

.action-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

@media (max-width: 992px) {
    .products-display.grid {
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    }
}

@media (max-width: 768px) {
    .page-header {
        flex-direction: column;
        gap: 1rem;
        text-align: center;
    }

    .results-header {
        flex-direction: column;
        gap: 1rem;
        text-align: center;
    }

    .results-footer {
        flex-direction: column;
        gap: 1.5rem;
        text-align: center;
    }

    .summary {
        flex-direction: column;
        gap: 1rem;
    }

    .footer-actions {
        flex-direction: column;
        width: 100%;
    }

    .action-btn {
        justify-content: center;
    }
}
</style>