<template>
  <div class="category-list">
    <div class="menu-filter">
      <i class="fas fa-search me-2"></i>
      <input
        type="search"
        placeholder="Digite para filtrar..."
        v-model="filter"
        @change="onTagSearch"
      />
    </div>
    <ul v-for="category in categoryList" :key="category.description">
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
      categoryList: {},
      searchList: {},
      filter: ''
    };
  },
  methods: {
    getCategories() {
      axios.get(`${baseApiUrl}/api/categories`).then((res) => {
        this.categoryList = res.data.categoryList;
      });
    },
    onNodeSelect(value) {
      this.$router.push({
        name: "byCategory",
        params: { code: value },
      });
    },
    onTagSearch() {
      this.$router.push({
        name: "byTag",
        params: { tag: this.filter }
      })
    },
  },
  watch: {
    filter: function () {
      setTimeout(() => {
        this.filter = ''
      }, 15000);
    }
  },
  mounted() {
    this.getCategories();
  },
};
</script>

<style>
.category-list {
  height: 100%;
  width: 100%;
  font-size: 1.2rem;
  font-weight: bolder;
}

.category-list ul {
  list-style: none;
  cursor: pointer;

}

.category-list ul:hover {
  background-color: blanchedalmond;
}

.category-list li::selection {
  background: none;
  width: 90%;
}

.fa-search {
  font-size: initial;
}
</style>