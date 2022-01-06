<template>
  <div class="home">
    <PageTitle icon="fa fa-home me-3" main="Seja Bem Vindo" sub="Ofertas" />
    <div class="homeProducts" v-for="(product) in stat" :key='product.id'>
      <HomeProducts
        :name="product.description"
        :price="product.price"
        :imgUrl="product.imgUrl"
      />
    </div>
  </div>
</template>

<script>
import PageTitle from '../template/PageTitle'
import HomeProducts from './HomeProducts'
import axios from 'axios'
import { baseApiUrl} from '@/global'

export default {
    name: 'Home',
    components: { PageTitle, HomeProducts },
    data: function () {
        return {
            stat: {},
        }
    },
    methods: {
        getProductInfo() {
            axios.get(`${baseApiUrl}/api/products?limit=8`)
                .then(res => this.stat = (res.data.products))
    }
},
    mounted() {
        this.getProductInfo()
    }
}
</script>

<style>
.home {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: space-evenly;
}

.homeProducts {
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  flex-basis: 16rem;
}

</style>