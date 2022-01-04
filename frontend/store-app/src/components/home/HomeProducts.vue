<template>
  <div class="card-home">
  <img :src="imgUrl" v-if="imgUrl" class="card-img" alt="not-found">
  <img src="@/assets/not-found.gif" v-if="!imgUrl" class="card-img" alt="not-found">
  <div class="card-body">
    <h5 class="card-title">{{price}}</h5>
    <p class="card-text">{{name}}</p>
    <a href="#" class="btn btn-primary"><i class="fas fa-cart-plus me-2"></i>Adicionar</a>
  </div>
</div>
</template>

<script>
export default {
  name: "HomeProducts",
  props: ["name", "price", 'imgUrl'],
}
</script>

<style>
    .card-home {
      display: flex;
      flex-direction: column;
      align-items: center;
      flex-basis: 100%;
    }

    .card-body {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .card-img {
      height: 40%;
      max-height: 15rem;
    }

    .card-title,
    .card-text {
      text-align: center;
    }

    .card-title::before {
      content: 'R$';
      margin-right: 0.75rem;
    }

</style>
