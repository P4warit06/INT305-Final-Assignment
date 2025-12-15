<template>
    <div :class="['product-card', { 'list-view': viewMode === 'list' }, { 'out-of-stock': !product.inStock }]">
        <div class="product-image">
            <div class="image-placeholder" :style="imageStyle">
                <i :class="categoryIcon"></i>
            </div>
            <div v-if="product.category" class="category-badge">
                {{ product.category }}
            </div>
            <div v-if="!product.inStock" class="stock-badge out-of-stock-badge">
                <i class="fas fa-times-circle"></i>
                Out of Stock
            </div>
            <div v-else class="stock-badge in-stock-badge">
                <i class="fas fa-check-circle"></i>
                In Stock
            </div>
        </div>

        <div class="product-content">
            <div class="product-header">
                <h3 class="product-name">{{ product.name }}</h3>
                <button class="favorite-btn">
                    <i class="far fa-heart"></i>
                </button>
            </div>

            <p v-if="product.description" class="product-description">
                {{ truncateDescription(product.description) }}
            </p>

            <div class="product-details">
                <div class="detail-item">
                    <i class="fas fa-tag detail-icon"></i>
                    <span class="detail-label">Price:</span>
                    <span class="price-value">${{ formatPrice(product.price) }}</span>
                </div>



                <div v-if="product.createdAt" class="detail-item">
                    <i class="far fa-calendar detail-icon"></i>
                    <span class="detail-label">Added:</span>
                    <span class="detail-value">{{ formatDate(product.createdAt) }}</span>
                </div>
               

                <div v-if="product.rating" class="detail-item">
                    <i class="fas fa-star detail-icon"></i>
                    <span class="detail-label">Rating:</span>
                    <div class="rating-stars">
                        <i v-for="n in 5" :key="n"
                            :class="['fas', n <= Math.round(product.rating) ? 'fa-star' : 'fa-star-half-alt']"
                            :style="{ color: n <= Math.round(product.rating) ? '#ffc107' : '#dee2e6' }">
                        </i>
                        <span class="rating-value">({{ product.rating }})</span>
                    </div>
                </div>

                <div v-if="product.colors && product.colors.length" class="detail-item colors-item">
                    <i class="fas fa-palette detail-icon"></i>
                    <span class="detail-label">Colors:</span>

                    <div class="color-list">
                        <span v-for="(color, index) in product.colors" :key="index" class="color-chip"
                            :style="{ backgroundColor: mapColor(color) }" :title="color"></span>

                        <span class="color-text">
                            {{ product.colors.join(", ") }}
                        </span>
                    </div>
                </div>


            </div>

            <div class="product-actions">
                <button class="action-btn view-btn">
                    <i class="fas fa-eye"></i>
                    View Details
                </button>
                <button class="action-btn cart-btn" :disabled="!product.inStock">
                    <i class="fas fa-shopping-cart"></i>
                    Add to Cart
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
    product: Object,
    viewMode: {
        type: String,
        default: 'grid'
    }
})
function mapColor(color) {
    const colors = {
        black: "#000000",
        white: "#ffffff",
        silver: "#c0c0c0",
        gray: "#6c757d",
        blue: "#0d6efd",
        red: "#dc3545",
        green: "#198754",
        gold: "#d4af37",
        purple: "#6f42c1"
    }
    return colors[color?.toLowerCase()] || "#adb5bd"
}

const categoryIcon = computed(() => {
    switch (props.product.category) {
        case 'mobile': return 'fas fa-mobile-alt'
        case 'electronics': return 'fas fa-laptop'
        case 'clothing': return 'fas fa-tshirt'
        case 'books': return 'fas fa-book'
        case 'home': return 'fas fa-home'
        default: return 'fas fa-box'
    }
})

const imageStyle = computed(() => {
    const colors = ['#4facfe', '#00f2fe', '#f093fb', '#f5576c', '#96fbc4', '#f9d423']
    const color = colors[props.product.name?.length % colors.length]
    return {
        background: `linear-gradient(135deg, ${color} 0%, ${color}dd 100%)`
    }
})

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
        month: 'short',
        year: 'numeric'
    })
}

function truncateDescription(description) {
    const maxLength = props.viewMode === 'list' ? 150 : 100
    return description.length > maxLength
        ? description.substring(0, maxLength) + '...'
        : description
}
</script>

<style scoped>
.product-card {
    background: white;
    border-radius: 12px;
    overflow: hidden;
    transition: all 0.3s ease;
    border: 1px solid #e9ecef;
}

.product-card.grid-view {
    display: flex;
    flex-direction: column;
    height: 100%;
}

.product-card.list-view {
    display: flex;
    flex-direction: row;
    align-items: stretch;
    min-height: 200px;
}

.product-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    border-color: #4facfe;
}

.product-card.out-of-stock {
    opacity: 0.8;
}

.product-card.out-of-stock:hover {
    border-color: #6c757d;
}

.product-image {
    position: relative;
    overflow: hidden;
}

.grid-view .product-image {
    height: 180px;
}

.list-view .product-image {
    flex: 0 0 200px;
}

.image-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 3rem;
}

.category-badge {
    position: absolute;
    top: 1rem;
    left: 1rem;
    background: rgba(255, 255, 255, 0.9);
    padding: 0.25rem 0.75rem;
    border-radius: 15px;
    font-size: 0.75rem;
    font-weight: 600;
    color: #333;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.stock-badge {
    position: absolute;
    bottom: 1rem;
    right: 1rem;
    padding: 0.25rem 0.75rem;
    border-radius: 15px;
    font-size: 0.75rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 0.25rem;
}

.in-stock-badge {
    background: rgba(40, 167, 69, 0.9);
    color: white;
}

.out-of-stock-badge {
    background: rgba(220, 53, 69, 0.9);
    color: white;
}

.product-content {
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    flex: 1;
}

.grid-view .product-content {
    flex: 1;
}

.list-view .product-content {
    flex: 1;
    padding: 1.5rem 2rem;
}

.product-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 0.75rem;
}

.product-name {
    font-size: 1.25rem;
    font-weight: 600;
    color: #333;
    margin: 0;
    line-height: 1.3;
}

.favorite-btn {
    background: none;
    border: none;
    color: #dee2e6;
    font-size: 1.25rem;
    cursor: pointer;
    padding: 0.25rem;
    transition: color 0.3s ease;
}

.favorite-btn:hover {
    color: #ef476f;
}

.product-description {
    color: #666;
    font-size: 0.9rem;
    line-height: 1.5;
    margin-bottom: 1rem;
    flex: 1;
}

.product-details {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    margin-bottom: 1.5rem;
}

.detail-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.detail-icon {
    color: #4facfe;
    width: 1rem;
}

.detail-label {
    color: #666;
    font-size: 0.85rem;
    min-width: 50px;
}

.price-value {
    font-size: 1.5rem;
    font-weight: 700;
    color: #28a745;
}

.detail-value {
    font-weight: 600;
    color: #333;
}

.rating-stars {
    display: flex;
    align-items: center;
    gap: 0.25rem;
}

.rating-value {
    margin-left: 0.5rem;
    color: #666;
    font-size: 0.85rem;
}

.product-actions {
    display: flex;
    gap: 0.75rem;
    margin-top: auto;
}

.action-btn {
    flex: 1;
    padding: 0.75rem 1rem;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    transition: all 0.3s ease;
    font-size: 0.9rem;
}

.view-btn {
    background: #f8f9fa;
    color: #333;
    border: 2px solid #dee2e6;
}

.cart-btn {
    background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
    color: white;
    border: 2px solid #4facfe;
}

.cart-btn:disabled {
    background: #6c757d;
    border-color: #6c757d;
    cursor: not-allowed;
    opacity: 0.6;
}

.action-btn:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

@media (max-width: 768px) {
    .product-card.list-view {
        flex-direction: column;
    }

    .list-view .product-image {
        flex: 0 0 150px;
    }

    .product-actions {
        flex-direction: column;
    }
}
.colors-item {
    align-items: flex-start;
}

.color-list {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex-wrap: wrap;
}

.color-chip {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    border: 1px solid #dee2e6;
    display: inline-block;
}

.color-text {
    font-size: 0.85rem;
    color: #555;
}

</style>