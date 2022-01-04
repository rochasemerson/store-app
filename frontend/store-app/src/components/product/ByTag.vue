<template>
  <div class="products-by-category">
    <PageTitle icon="fab fa-searchengin me-3"
      :main="tag.toUpperCase()"/>
    <div class="card-by-category" v-for="product in products" :key="product.id">
      <img
        :src="product.imgUrl"
        v-if="product.imgUrl"
        class="card-img"
        alt="not-found"
      />
      <img
        src="@/assets/not-found.gif"
        v-if="!product.imgUrl"
        class="card-img"
        alt="not-found"
      />
      <div class="card-body">
        <h5 class="card-title">{{ product.price }}</h5>
        <p class="card-text">{{ product.description }}</p>
        <a href="#" class="btn btn-primary"
          ><i class="fas fa-cart-plus me-2"></i>Adicionar</a
        >
      </div>
    </div>
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