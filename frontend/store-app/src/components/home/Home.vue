<template>
    <div class="home">
        <PageTitle icon="fa fa-home" main="Seja Bem Vindo"
            sub="Ofertas"/>
        <div class="homeProducts">
            <HomeProducts :name="stat.description" :price="stat.price"
            :picture_url='imgSources[0]'/>
            <HomeProducts :name="stat.description" :price="stat.price" 
            :picture_url='imgSources[1]'/>
            <HomeProducts :name="stat.description" :price="stat.price" 
            :picture_url='imgSources[2]'/>
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
            stat: {},
            imgSources
        }
    },
    methods: {
        getProductInfo() {
            axios.get(`${baseApiUrl}/api/products`)
                .then(res => this.stat = (res.data.products[0]))
        }
    },
    mounted() {
        this.getProductInfo()
    }
}
</script>

<style>
    .homeProducts {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    }
</style>