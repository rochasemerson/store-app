<template>
  <div class="products-by-category">
    <PageTitle icon="far fa-clone me-3"
      :main="category.description"/>
    <ul>
      <li v-for="product in products" :key="product.id" >
      <picture>
        <img :src="product.imgUrl" v-if="product.imgUrl"/>
        <img src="@/assets/not-found.gif" v-if="!product.imgUrl"/>
      </picture>
        {{ product.description }}
        {{ product.price }}
      </li>
    </ul>
  </div>
</template>

<script>
import { baseApiUrl } from '@/global'
import axios from 'axios'
import PageTitle from '../template/PageTitle'

export default {
  name: 'ProductsByCategory',
  components: { PageTitle },
  data() {
    return {
      category: {},
      products: [],
      page: 1,
      max: 6
    }
  },
  methods: {
    getCategory() {
      const url = `${baseApiUrl}/api/categories/${this.category.code}`
      axios
        .get(url).then(res => this.category = res.data)
    },
    getProducts() {
      const url = `${baseApiUrl}/api/products/category/${this.$route.params.code}?page=${this.page}`
      axios
        .get(url).then(res => {
          this.products = res.data.categoryProductList
        })
    },
  },
  watch: {
    $route(to) {
      this.category.code = to.params.code
      this.products = []
      this.filteredProducts = []
      this.page = 1


    this.getCategory()
    this.getProducts()
    }
  },
  mounted() {
    this.category.code = this.$route.params.code
    this.getCategory()
    this.getProducts()
  }
}
</script>

<style>

</style>