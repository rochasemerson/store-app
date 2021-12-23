<template>
  <div class="home">
    <PageTitle main="Frios" sub="" />
    <div class="homeProducts" v-for="(categoryProductList, index) in categoryProductList" :key='categoryProductList.id'>
      <HomeProducts
        :name="categoryProductList.description"
        :price="categoryProductList.price"
        :picture_url="imgSources[index]"
      />
    </div>
  </div>
</template>

<script>
import PageTitle from '../template/PageTitle'
import HomeProducts from './HomeProducts'
import axios from 'axios'
import { baseApiUrl, imgSources } from '@/global'


export default {
    name: 'Home',
    components: { PageTitle, HomeProducts },
    data: function () {
        return {
            categoryProductList: {},
            imgSources
        }
    },
    methods: {
        getProductInfo() {
            axios.get(`${baseApiUrl}/api/products/category/2`)
            .then(res => this.categoryProductList = (res.data.categoryProductList))
    }
},
    mounted() {
        this.getProductInfo()
    }
}
</script>

<style>
.home {
  display: grid;
  grid-template-rows: 20% repeat(30%);
  grid-template-columns: 50% 50%;
  grid-template-areas: 
    'title title'
    'product1 product2'
    'product3 product4'
    'product5 product6';
}

.homeProducts {
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}

</style>