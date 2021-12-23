<template>
  <div class="admin-pages">
    <PageTitle
      icon="fa fa-cogs"
      main="Administração do Sistema"
      sub="Cadastros do Sistema"
    />
    <ul class="nav nav-tabs">
      <li class="nav-item">
        <a class="nav-link active" href="#" @click="currentTab">Produtos</a>
        <ProductControl />
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#" @click="currentTab">Usuários</a>
        <UserControl />
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#" @click="currentTab">Categorias</a>
        <CategoryControl />
      </li>
      <li class="nav-item">
        <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true"
          >Vendas</a
        >
      </li>
    </ul>
  </div>
</template>

<script>
import PageTitle from "../template/PageTitle";
import ProductControl from "./ProductControl";
import UserControl from "./UserControl";
import CategoryControl from "./CategoryControl";

export default {
  name: "AdminPages",
  props: {
    activeTab: Boolean
  },
  components: { PageTitle, ProductControl, UserControl, CategoryControl },
  methods: {
    currentTab: function (event) {
      const links = document.getElementsByClassName("nav-link");
      for (let i = 0; i < links.length; i++) {
        links[i].classList.remove('active')
        event.target.classList.add("active")
      }
    },
  },
  // computed: {
  //   active () {
  //     {
  //       return this.activeTab = !this.activeTab
  //     }
  //   }
  // }
};
</script>

<style>
</style>