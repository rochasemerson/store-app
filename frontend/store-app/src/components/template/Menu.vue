<template>
    <aside class="menu">
            <CategoryList />
    </aside>
</template>

<script>
import CategoryList from "../home/CategoryList";

export default {
  name: "Menu",
  components: { CategoryList }
};
</script>

<style>
.menu {
  grid-area: menu;
  background: linear-gradient(to right, #eef2f3, #8e9eab);

  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}
</style>