<script setup>
import { ref, onMounted, watch } from "vue";
import {
    collection, query, where,
    getDocs, limit, orderBy,
    or, serverTimestamp, doc,
    setDoc, deleteDoc, addDoc,
    updateDoc, getCountFromServer,
    getAggregateFromServer,
    count
} from "firebase/firestore";
import db from "../firebase/init.js";
import Documents from "../components/Document.vue";
import { useRoute } from "vue-router";

const products = ref([]);
const title = ref("");
const route = useRoute();

async function getQuery() {
    let qryId = route.params.id;
    products.value = [];
    let qry = null;
    if (qryId == 1) {
        title.value = "1.Product That have Category is mobile";
        const productRef = collection(db, "products");
        qry = query(productRef, where("price", "==", 39900), limit(10));
    }
   
    


    
    const querySnap = await getDocs(qry);
    querySnap.forEach((doc) => {
        let data = doc.data();
        data.id = doc.id;
        products.value.push(data);
    });
}

watch(() => route.params.id, getQuery);

onMounted(() => {
    getQuery();
});
</script>
<template>
    <Documents :title="title" :data="products" />
</template>

<style></style>
