<template>
  <div id='app' class="menu-toggle shown">
    <Header title="Store App" :hideUserDropdown="false" v-if="!signin"/>
    <Menu ref="menu" @contextmenu.prevent="hideShow" v-if="!signin"></Menu>
    <Content></Content>
    <Footer v-if="!signin"/>
  </div>
</template>

<script>
import axios from 'axios'
import { baseApiUrl, userKey } from '@/global'
import store from '@/main.js'
import Header from '@/components/template/Header'
import Menu from '@/components/template/Menu'
import Content from '@/components/template/Content'
import Footer from '@/components/template/Footer'

export default {
  name: 'App',
  components: {
    Header,
    Menu,
    Content,
    Footer
  },
  data() {
    return {
      signin: false,
      validatingToken: true
    }
  },
  methods: {
    hideShow () {
      this.$refs.menu.hideMenu()
    },
    async validateToken() {
      this.validatingToken = true

      const json = localStorage.getItem(userKey)
      const userData = JSON.parse(json)
      store.currentUser = {}

      if(!userData) {
        this.validatingToken = false
        return
      }

      const res = await axios.post(`${baseApiUrl}/api/users/validateToken`, userData)

      if (res.data) {
        store.currentUser = userData
      } else {
        localStorage.removeItem(userKey)
      }

      this.validatingToken = false
    }
  },
  created() {
    this.validateToken()
  }
}
</script>

<style>
  * {
    font-family: 'Roboto Mono', monospace;
  }

  body {
    margin: 0;
  }

  #app {
    height: 100vh;
    display: grid;
    grid-template-rows: 60px 1fr 60px;
    grid-template-columns: 15vw 1fr;
    grid-template-areas: 
      'header header'
      'menu content'
      'menu footer';
  }

  .hidden {
  transition: ease-in-out, 1s;
  transform: translateX(-15vw);
}

.shown {
  transition: ease-in-out, 1s;
}
</style>
