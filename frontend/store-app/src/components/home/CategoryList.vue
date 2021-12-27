<template>
<div class="category-list">
  <ul v-for="(category) in categoryList" :key="category.description">
    <li @click="onNodeSelect(category.code)">
      {{ category.description }}
    </li>
  </ul>
</div>
</template>

<script>
import axios from "axios";
import { baseApiUrl } from "@/global";

export default {
  name: "CategoryList",
  data: function () {
    return {
      categoryList: {}
    }
  },
  methods: {
    getCategories() {
      axios  
        .get(`${baseApiUrl}/api/categories`)
        .then(res => {
          this.categoryList = res.data.categoryList
        })
    },
    onNodeSelect(value) {
      this.$router.push({
        name: 'byCategory',
        params: { code: value }
      })
    },
  },
  mounted() {
    this.getCategories();
  },
};
</script>

<style>
.category-list ul {
  list-style: none;
  cursor: pointer;
}

.category-list ul:hover {
  background-color: blanchedalmond;
}

</style>