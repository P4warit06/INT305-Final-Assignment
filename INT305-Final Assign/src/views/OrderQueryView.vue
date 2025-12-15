<template>
    <div class="order-query-view">
        <div class="page-header">
            <div class="header-content">
                <h2 class="query-title">
                    <i class="fas fa-search query-icon"></i>
                    Query {{ route.params.id }} : {{ title }}
                </h2>
                <p class="query-description">Viewing order data from Firestore</p>
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

            <div v-else class="results-container">
                <div class="results-header">
                    <h3 class="results-count">
                        <i class="fas fa-clipboard-list"></i>
                        {{ orders.length }} Order(s) Found
                    </h3>
                    <div class="results-stats">
                        <span class="stat-badge">
                            <i class="fas fa-clock"></i>
                            Real-time Data
                        </span>
                    </div>
                </div>

                <div v-if="orders.length === 0" class="empty-state">
                    <i class="fas fa-inbox empty-icon"></i>
                    <h4>No Orders Found</h4>
                    <p>No data matches your query criteria</p>
                </div>

                <div v-else class="orders-grid">
                    <div v-for="order in orders" :key="order.id" class="order-card">
                        <div class="order-header">
                            <h4 class="order-id">Order #{{ order.id.slice(0, 8) }}</h4>
                            <span class="order-date">
                                <i class="far fa-calendar"></i>
                                {{ formatDate(order.createdAt) }}
                            </span>
                        </div>

                        <div class="order-body">
                            <div class="order-info">
                                <div class="info-item">
                                    <span class="info-label">
                                        <i class="fas fa-receipt"></i>
                                        Total Price:
                                    </span>
                                    <span class="info-value price">${{ formatPrice(order.totalPrice) }}</span>
                                </div>
                                <div class="info-item">
                                    <span class="info-label">
                                        <i class="fas fa-user"></i>
                                        User ID:
                                    </span>
                                    <span class="info-value">{{ order.userId }}</span>
                                </div>
                            </div>

                            <div class="order-status">
                                <OrderStatusBadge :status="order.status" />
                            </div>
                        </div>

                        <div class="order-footer">
                            <button class="detail-btn">
                                <i class="fas fa-eye"></i>
                                View Details
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue"
import { useRoute } from "vue-router"
import {
    collection,
    query,
    where,
    orderBy,
    getDocs,
} from "firebase/firestore"

import db from "../firebase/init.js"
import OrderStatusBadge from "../components/OrderStatusBadge.vue"

const route = useRoute()
const orders = ref([])
const loading = ref(true)
const error = ref(null)
const title = ref("")
const userId = "pwr_sr"

function formatPrice(price) {
    return price ? price.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }) : '0.00'
}

function formatDate(timestamp) {
    if (!timestamp) return 'N/A'
    const date = timestamp.toDate()
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    })
}

async function getQuery() {
    try {
        loading.value = true
        orders.value = []
        error.value = null

        const id = route.params.id
        const refCol = collection(db, "orders")
        let qry = null

        if (id == 1) {
            title.value = "Pending Orders"
            qry = query(refCol, where("status", "==", "pending"))
        }
        else if (id == 2) {
            title.value = "Orders by User"
            qry = query(refCol, where("userId", "==", userId))
        }
        else if (id == 3) {
            title.value = "Latest Orders"
            qry = query(refCol, orderBy("createdAt", "desc"))
        }
        else {
            error.value = "Invalid Query ID"
            loading.value = false
            return
        }

        const snap = await getDocs(qry)
        snap.forEach(d => orders.value.push({ id: d.id, ...d.data() }))

    } catch (e) {
        error.value = e.message
        console.error("Query error:", e)
    } finally {
        loading.value = false
    }
}

watch(() => route.params.id, getQuery)
onMounted(getQuery)
</script>

<style scoped>
.order-query-view {
    max-width: 1200px;
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
    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
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
    border-top: 4px solid #f5576c;
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

.results-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    padding-bottom: 1rem;
    border-bottom: 2px solid #f0f0f0;
}

.results-count {
    font-size: 1.2rem;
    color: #333;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin: 0;
}

.stat-badge {
    background: #e8f4ff;
    color: #667eea;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
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

.orders-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 1.5rem;
}

.order-card {
    background: #f8f9fa;
    border-radius: 12px;
    padding: 1.5rem;
    transition: all 0.3s ease;
    border: 1px solid #e9ecef;
}

.order-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    border-color: #667eea;
}

.order-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
}

.order-id {
    font-size: 1.1rem;
    color: #333;
    margin: 0;
    font-weight: 600;
}

.order-date {
    font-size: 0.9rem;
    color: #666;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.order-body {
    margin: 1.5rem 0;
}

.order-info {
    margin-bottom: 1.5rem;
}

.info-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.75rem;
}

.info-label {
    color: #666;
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.info-value {
    font-weight: 600;
    color: #333;
}

.price {
    color: #28a745;
    font-size: 1.1rem;
}

.order-status {
    display: flex;
    justify-content: center;
}

.order-footer {
    display: flex;
    justify-content: flex-end;
}

.detail-btn {
    padding: 0.5rem 1rem;
    background: #667eea;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    transition: background 0.3s ease;
}

.detail-btn:hover {
    background: #5a67d8;
}

@media (max-width: 768px) {
    .page-header {
        flex-direction: column;
        gap: 1rem;
        text-align: center;
    }

    .orders-grid {
        grid-template-columns: 1fr;
    }

    .results-header {
        flex-direction: column;
        gap: 1rem;
        text-align: center;
    }
}
</style>