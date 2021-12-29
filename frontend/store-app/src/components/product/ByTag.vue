<template>
  <div class="products-by-category">
    <PageTitle icon="fab fa-searchengin me-3"
      :main="tag.toUpperCase()"/>
    <ul>
      <li v-for="product in products" :key="product.id" >
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
      products: [],
      tag: '',
      page: 1,
      max: 6
    }
  },
  methods: {
    filteredSearch () {
      const url = `${baseApiUrl}/api/products/search?tag=${this.$route.params.tag}`
      axios.get(url).then(res => {
        this.products = res.data.productsByTag
      })
    }
  },
  watch: {
    $route(to) {
      this.tag = to.params.tag
      this.products = []
      this.page = 1


    this.filteredSearch()
    }
  },
  mounted() {
    this.filteredSearch()
    this.tag = this.$route.params.tag
  }
}
</script>

<style>

</style>