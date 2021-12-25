<template>
<div>
  <ul v-for="(category) in categories" :key="category.code">
    <!-- <router-link :to='url' >{{ description }}</router-link> -->
    <li>{{category.name}}</li>
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
      categories: [],
      categoryList: []
    }
  },
  methods: {
    getCategories() {
      axios  
        .get(`${baseApiUrl}/api/categories`)
        .then(res => this.categories = res.data.categoryList)
        // .then(console.log(this.categories))
        // .get(`${baseApiUrl}/api/categories`)
        // .then(res => res.data.categoryList.forEach(cat => {
        //     this.categoryList.push(cat.code)
        //     console.log(this.categoryList)
        // }))
    },
  },
  mounted() {
    this.getCategories();
  },
};
</script>

<style>
ul {
  list-style: none;
}
</style>