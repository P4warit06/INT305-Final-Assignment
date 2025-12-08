<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <div id="header">
    <h2>Reports</h2>
    <RouterLink to="/query/1">
      <div class="QueryExample">
        1. Product That have Category is mobile
      </div>
    </RouterLink>
    
    <RouterLink to="/query/2">
      <div class="QueryExample">
        2. Cities in Flodia (FL)
      </div>
    </RouterLink>




  </div>
  <div id="detail">
    <RouterView />
  </div>
</template>

<style scoped>
.header {
  color: white;
}

a {
  display: block;
}

.QueryExample {
  font-weight: bolder;
  color: #693CBD
}

.QueryPractice {
  font-weight: bolder;
  font-family: sans-serif;
  color: #2B8899;
}
</style>
