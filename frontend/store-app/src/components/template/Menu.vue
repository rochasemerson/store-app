<template>
    <aside class="menu">
        <div v-for="(category) in categories" :key='category.code'>
            <CategoryList 
                :description='category.description'     
            />
        </div>        
    </aside>
</template>

<script>
import axios from "axios";
import { baseApiUrl } from "@/global";
import CategoryList from "../home/CategoryList";

export default {
  name: "Menu",
  components: { CategoryList },
  data: function () {
    return {
      categories: {},
    };
  },
  methods: {
    getCategories() {
      axios
        .get(`${baseApiUrl}/api/categories`)
        .then((res) => (this.categories = res.data.categoryList));
    }
  },
  mounted() {
    this.getCategories();
  },
};
</script>

<style>
.menu {
  grid-area: menu;
  background: linear-gradient(to right, #eef2f3, #8e9eab);

  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}
</style>