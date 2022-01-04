<template>
  <div class="products-by-category">
    <PageTitle icon="far fa-clone me-3" :main="category.description" />
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
import { baseApiUrl } from "@/global";
import axios from "axios";
import PageTitle from "../template/PageTitle";

export default {
  name: "ProductsByCategory",
  components: { PageTitle },
  data() {
    return {
      category: {},
      products: [],
      page: 1,
      max: 6,
    };
  },
  methods: {
    getCategory(code) {
      code = this.$route.params.code;
      const url = `${baseApiUrl}/api/categories/${code || 1}`;
      axios.get(url).then((res) => (this.category = res.data));
    },
    getProducts(code) {
      code = this.$route.params.code;
      const url = `${baseApiUrl}/api/products/category/${code || 1}?page=${
        this.page
      }`;
      axios
        .get(url)
        .then((res) => {
          this.products = res.data.categoryProductList;
        })
        .then(this.getCategory());
    },
  },
  watch: {
    $route(to) {
      this.category.code = to.params.code;
      this.products = [];
      this.filteredProducts = [];
      this.page = 1;

      this.getCategory();
      this.getProducts();
    },
  },
  mounted() {
    this.category.code = this.$route.params.code;
    this.getProducts();
  },
};
</script>

<style>
.products-by-category {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: space-evenly;
}

.card-by-category {
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  flex-basis: 16rem;
}

.card-body {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.card-img {
  height: 60%;
  max-height: 15rem;
}

.card-title,
.card-text {
  text-align: center;
}

.card-title::before {
  content: "R$";
  margin-right: 0.75rem;
}
</style>