<template>
  <div class="client-control">
      <table class="table" :items="stat">
  <thead>
    <tr>
      <th scope="col">Nome</th>
      <th scope="col">E-mail</th>
      <th scope="col">Telefone</th>
    </tr>
  </thead>
  <tbody>
    <tr >
        <td v-for="(user) in stat" :key="user.name">{{user.name}}</td>
        <td v-for="(user) in stat" :key="user.email">{{user.email}}</td>
        <td v-for="(user) in stat" :key="user.phone">{{user.phone}}</td>
    </tr>
  </tbody>
</table>
  </div>
</template>

<script>
import axios from "axios";
import { baseApiUrl } from "@/global";

export default {
  name: "Client Control",
  data() {
    return {
      mode: "save",
      user: {},
      stat: [],
    };
  },
  methods: {
    loadUsers() {
      const url = `${baseApiUrl}/api/users`;
      axios.get(url).then((res) => {
        this.stat = res.data.userList;
        console.log(this.stat);
      });
    },
  },
  mounted() {
      this.loadUsers()
  }
};
</script>

<style>
    
</style>
