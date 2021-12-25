<template>
  <div class="client-control">
    <form class="form-control">
      <div class="mb-3" id="InputName">
        <label for="InputName" class="form-label">Nome</label>
        <input type="text" class="form-control" v-model="user.name" placeholder="Informe o nome..."/>
      </div>
      <div class="mb-3" id="InputAddress">
        <label for="InputAddress" class="form-label">Endereço</label>
        <input type="text" class="form-control" v-model="user.address" placeholder="Informe o endereço..."/>
      </div>
      <div class="mb-3" id="InputAddressDetails">
        <label for="InputAddressDetails" class="form-label">Complemento</label>
        <input type="text" class="form-control" v-model="user.address_detail" placeholder="Informe o complemento..."/>
      </div>
      <div class="mb-3" id="InputArea">
        <label for="InputArea" class="form-label">Bairro</label>
        <input type="text" class="form-control" v-model="user.area" placeholder="Informe o bairro..."/>
      </div>
      <div class="mb-3" id="InputCity">
        <label for="InputCity" class="form-label">Cidade</label>
        <input type="text" class="form-control" v-model="user.city" placeholder="Informe a cidade..."/>
      </div>
      <div class="mb-3" id="InputEmail">
        <label for="InputEmail" class="form-label">E-mail</label>
        <input type="email" class="form-control" v-model="user.email" placeholder="Informe o E-mail..."/>
      </div>
      <div class="mb-3" id="InputPhone">
        <label for="InputPhone" class="form-label">Telefone</label>
        <input type="phone" class="form-control" v-model="user.phone" placeholder="Informe o telefone..."/>
      </div>
      <div class="mb-3" id="InputPassword">
        <label for="InputPassword" class="form-label">Senha</label>
        <input type="password" class="form-control" v-model="user.password" placeholder="Informe a senha..."/>
      </div>
      <!-- <div class="mb-3" id="InputPasswordConfirmation">
        <label for="InputPasswordConfirmation" class="form-label">Confirme sua senha</label>
        <input type="password" class="form-control"  />
      </div> -->
      <div class="mb-3 form-check">
        <input type="checkbox" class="form-check-input" id="adminCheck" v-model="user.admin"/>
        <label class="form-check-label" for="adminCheck">Admin</label>
        <button type="button" class="btn btn-primary me-3" @click="createUser" v-if="mode === 'save'">Enviar</button>
        <button type="button" class="btn btn-danger me-3" @click="deleteUser" v-if="mode === 'remove'">Excluir</button>
        <button type="button" class="btn btn-secondary">Cancelar</button>
      </div>
    </form>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Nome</th>
          <th scope="col">E-mail</th>
          <th scope="col">Telefone</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) in stat" :key="user.id">
          <td>
            {{ stat[index].name }}
          </td>
          <td>
            {{ stat[index].email }}
          </td>
          <td>
            {{ stat[index].phone }}
          </td>
          <td>
            <i class="fas fa-edit" @click="loadUser(stat[index])"></i>
            <i class="fas fa-trash" @click="loadUser(stat[index], 'remove')"></i>
          </td>
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
  props: {
    isActive:String
  },
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
      });
    },
    createUser() {
      axios.post(`${baseApiUrl}/api/users`, this.user).then((XMLHttpRequest) => {
        alert(XMLHttpRequest.data);
      }).catch(XMLHttpRequest => {
        alert(XMLHttpRequest.response.data);
      })
    },
    loadUser(user, mode='save') {
      this.mode = mode
      this.user = { ...user }
      console.log(this.user);
    },
    reset() {
      this.mode = 'save'
      this.user = {}
      this.loadUsers()
    },
    deleteUser() {
      const id = this.user._id
      axios.delete(`${baseApiUrl}/api/users/${id}`)
        .then((XMLHttpRequest) => {
          alert(XMLHttpRequest.data)
          console.log(XMLHttpRequest)
          this.reset()
        }).catch(XMLHttpRequest => {
          alert(XMLHttpRequest.response.data)
          console.log(XMLHttpRequest.response)
        })
    }
  },
  mounted() {
    this.loadUsers();
  },
};
</script>

<style>
.nav-item {
  max-width: 500px;

}

.client-control {
  position: relative;
  left: -100px;
  width: 95vw;
}

.form-control {
  display: grid;
  gap: 10px;
}

.form-control > div {
  margin-right: 10px;

}

#InputName,
#InputAddress {
  grid-column: span 2;
}

button {
  width: 20%;
}

.form-check {
  display: flex;
  align-items: center;
  grid-column: span 2;
}

.form-check-input,
.form-check-label {
  margin-right: 10px;
}

a.nav-link:active {
	border-bottom: 1px solid #dee2e6;
	border-bottom-left-radius: 0.25rem;
}
</style>
