<template>
  <ul>
    <router-link :to='url' >{{ description }}</router-link>
  </ul>
</template>

<script>
import axios from "axios";
import { baseApiUrl } from "@/global";

export default {
  name: "CategoryList",
  props: ["description"],
  data: function () {
    return {
      categoryList: [],
    };
  },
  methods: {
    getCategories() {
      axios
        .get(`${baseApiUrl}/api/categories`)
        .then(res => res.data.categoryList.forEach(cat => {
            this.categoryList.push(cat.code)
            // console.log(this.categoryList)
        }))
    },
  },
  mounted() {
    this.getCategories();
  },
  computed: {
      url: function() {
          let i = -1
          return `/category/${this.categoryList[++i]}`
      }
  }
};
</script>

<style>
ul {
  list-style: none;
}
</style>