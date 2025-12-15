<template>
    <span :class="['status-badge', statusClass]">
        <i :class="statusIcon"></i>
        {{ statusText }}
    </span>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
    status: String
})

const statusText = computed(() => {
    switch (props.status) {
        case 'pending': return 'Pending'
        case 'processing': return 'Processing'
        case 'shipped': return 'Shipped'
        case 'delivered': return 'Delivered'
        case 'cancelled': return 'Cancelled'
        default: return props.status
    }
})

const statusClass = computed(() => {
    switch (props.status) {
        case 'pending': return 'status-pending'
        case 'processing': return 'status-processing'
        case 'shipped': return 'status-shipped'
        case 'delivered': return 'status-delivered'
        case 'cancelled': return 'status-cancelled'
        default: return 'status-default'
    }
})

const statusIcon = computed(() => {
    switch (props.status) {
        case 'pending': return 'fas fa-clock'
        case 'processing': return 'fas fa-cog fa-spin'
        case 'shipped': return 'fas fa-shipping-fast'
        case 'delivered': return 'fas fa-check-circle'
        case 'cancelled': return 'fas fa-times-circle'
        default: return 'fas fa-info-circle'
    }
})
</script>

<style scoped>
.status-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-size: 0.85rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.status-pending {
    background: linear-gradient(135deg, #ffd166 0%, #ffb347 100%);
    color: #333;
    border: 2px solid #ffb347;
}

.status-processing {
    background: linear-gradient(135deg, #118ab2 0%, #06d6a0 100%);
    color: white;
    border: 2px solid #06d6a0;
}

.status-shipped {
    background: linear-gradient(135deg, #4cc9f0 0%, #4361ee 100%);
    color: white;
    border: 2px solid #4361ee;
}

.status-delivered {
    background: linear-gradient(135deg, #06d6a0 0%, #118ab2 100%);
    color: white;
    border: 2px solid #118ab2;
}

.status-cancelled {
    background: linear-gradient(135deg, #ef476f 0%, #ff9a5a 100%);
    color: white;
    border: 2px solid #ef476f;
}

.status-default {
    background: linear-gradient(135deg, #6c757d 0%, #495057 100%);
    color: white;
    border: 2px solid #495057;
}

.fa-spin {
    animation: spin 2s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>