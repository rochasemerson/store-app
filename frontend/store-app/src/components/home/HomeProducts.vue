<template>
  <div class="homeProduct">
    <div class="picture">
      <picture>
        <img :src="picture_url" v-if="(picture_url)"/>
        <img src="@/assets/not-found.gif" alt="not-found" v-if="(!picture_url)">
      </picture>
    </div>
    <div class="product-info">
      <span class="product-name">{{ name }}</span>
      <span class="product-price">{{ price }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeProducts",
  props: ["name", "price", "picture_url"],
}
</script>

<style>
    .homeProduct {
        display: grid;
        grid-template-columns: 30% 70%;
        grid-template-rows: 70% 30%;
        grid-template-areas: 
        'picture description'
        'picture price';
        min-width: 30vw;
        min-height: 30vh;
        margin: 25px;
    }

    .picture img {
        grid-area: picture;
        height: 100%;
        max-height: 250px;
        width: 100%;
        max-width: 250px;
    }

    .product-info {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
    }

    .product-name {
        grid-area: description;
        font-size: 2.5rem;
    }

    .product-price {
        grid-area: price;
        font-size: 2rem;
    }

    .product-price::before {
      content: 'R$';
      margin-right: 10px;
    }
</style>
