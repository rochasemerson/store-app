<template>
  <div class="homeProduct">
    <div class="picture">
      <img :src="picture_url" />
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
        min-width: 30vw;
        min-height: 30vh;
        margin: 25px;
    }

    .picture img {
        min-height: 80px;
        min-width: 80px;
    }

    /* .product-name {
        display: grid;
        grid-area: description;
        font-size: 1.5rem;
    }

    .product-price {
        display: grid;
        grid-area: price;
    } */
</style>
