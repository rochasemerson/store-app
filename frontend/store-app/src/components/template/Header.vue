<template>
  <header class="header">
    <router-link to="/">
      <img src="@/assets/drink.jpg" alt="drink" />
    </router-link>
    <h1 class="title">
      {{ title }}
    </h1>
    <UserDropdown v-if="!hideUserDropdown"/>
  </header>
</template>

<script>
import UserDropdown from './UserDropdown'

export default {
  name: "Header",
  components: { UserDropdown },
  props: {
    title: String,
    hideUserDropdown: Boolean,
  }
};
</script>

<style>
.header {
  grid-area: header;
  background: linear-gradient(to right, #6441a5, #2a0845);
  color: aliceblue;

  display: flex;
  justify-content: center;
  align-items: center;
}

.title {
  font-size: 1.5rem;
  flex-grow: 1;
  text-align: center;
}

.title a {
  text-decoration: none;
}

header.header > a.toggle {
  width: 60px;
  height: 100%;
  justify-self: flex-start;
  text-decoration: none;

  display: flex;
  justify-content: center;
  align-items: center;
}

header.header > a.toggle:hover {
  background-color: rgba(0, 0, 0, 0.2);
}

img {
  height: 60px;
  width: 60px;
}
</style>