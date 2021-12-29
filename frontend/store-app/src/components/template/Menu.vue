<template>
  <aside class="menu">
    <CategoryList />
    <button class="toggle-btn" v-if="!hidden">
      <i class="fas fa-arrow-circle-right"></i>
    </button>
  </aside>
</template>

<script>
import CategoryList from "../home/CategoryList";

export default {
  name: "Menu",
  components: { CategoryList },
  data() {
    return {
      hidden: true,
    }
  },
  methods: {
    hideMenu () {
      const menu = document.getElementsByClassName('menu-toggle')
      menu[0].classList.toggle('hidden')
      this.hidden = !this.hidden
    }
  }
};
</script>

<style>
.menu {
  grid-area: menu;
  background-color: rgba(205, 213, 219);

  display: flex;
  align-items: center;
  flex-direction: column;
  flex-wrap: wrap;
}

.menu > button {
  overflow: visible;
}

.menu .menu-filter {
  display: flex;
  justify-content: center;
  align-items: center;

  margin: 20px;
  border-bottom: 1px solid #aaa;
}

.menu .menu-filter i {
  color: #aaa;
}

.menu input {
  color: black;
  font-size: 0.7rem;

  border: 0;
  outline: 0;
  width: 100%;
  background-color: transparent;
}

.toggle-btn {
  align-self: flex-end;
  position: fixed;
  right: -40px;
  border-radius: 50%;
  cursor: pointer;
  background: transparent;
  outline: none;
  border: none;
}
</style>