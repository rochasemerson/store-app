<template>
  <div class="client-control">
    <Error ref="error" />
    <form class="form-control-user">
      <div id="InputName" >
        <label for="InputName" class="form-label">Nome</label>
        <input
          type="text"
          class="form-control"
          v-model="user.name"
          :readonly="mode === 'remove'"
          placeholder="Informe o nome..."
        />
      </div>
      <div id="InputAddress">
        <label for="InputAddress" class="form-label">Endereço</label>
        <input
          type="text"
          class="form-control"
          v-model="user.address"
          :readonly="mode === 'remove'"
          placeholder="Informe o endereço..."
        />
      </div>
      <div id="InputAddressDetails">
        <label for="InputAddressDetails" class="form-label">Complemento</label>
        <input
          type="text"
          class="form-control"
          v-model="user.address_detail"
          :readonly="mode === 'remove'"
          placeholder="Informe o complemento..."
        />
      </div>
      <div id="InputArea">
        <label for="InputArea" class="form-label">Bairro</label>
        <input
          type="text"
          class="form-control"
          v-model="user.area"
          :readonly="mode === 'remove'"
          placeholder="Informe o bairro..."
        />
      </div>
      <div id="InputCity">
        <label for="InputCity" class="form-label">Cidade</label>
        <input
          type="text"
          class="form-control"
          v-model="user.city"
          :readonly="mode === 'remove'"
          placeholder="Informe a cidade..."
        />
      </div>
      <div id="InputEmail">
        <label for="InputEmail" class="form-label">E-mail</label>
        <input
          type="email"
          class="form-control"
          v-model="user.email"
          :readonly="mode === 'remove'"
          placeholder="Informe o E-mail..."
        />
      </div>
      <div id="InputPhone">
        <label for="InputPhone" class="form-label">Telefone</label>
        <input
          type="phone"
          class="form-control"
          v-model="user.phone"
          :readonly="mode === 'remove'"
          placeholder="Informe o telefone..."
        />
      </div>
      <div id="InputPassword">
        <label for="InputPassword" class="form-label">Senha</label>
        <input
          type="password"
          class="form-control"
          v-model="user.password"
          :readonly="mode === 'remove'"
          placeholder="Informe a senha..."
        />
      </div>
      <!-- <div id="InputPasswordConfirmation">
        <label for="InputPasswordConfirmation" class="form-label">Confirme sua senha</label>
        <input type="password" class="form-control"  />
      </div> -->
      <div class="mb-3 form-check" >
        <input
          type="checkbox"
          class="form-check-input"
          id="adminCheck"
          v-model="user.admin"
          v-if="mode === 'save'"
        />
        <label class="form-check-label" for="adminCheck" v-if="mode === 'save'">Admin</label>
        <button
          type="button"
          class="btn btn-primary me-3 btn-user"
          @click="createUser"
          v-if="mode === 'save'"
        >
          Enviar
        </button>
        <button
          type="button"
          class="btn btn-warning me-3 btn-user"
          @click="updateUser"
          v-if="mode === 'update'"
        >
          Atualizar
        </button>
        <button
          type="button"
          class="btn btn-danger me-3 btn-user"
          @click="deleteUser"
          v-if="mode === 'remove'"
        >
          Excluir
        </button>
        <button type="button" class="btn btn-secondary btn-user" @click="reset">
          Cancelar
        </button>
      </div>
      <div class="mandatory">Items marcados com '*' são obrigatórios</div>
    </form>
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">Nome</th>
          <th scope="col">E-mail</th>
          <th scope="col">Telefone</th>
          <th scope="col">Ações</th>
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
            <div class="wrapper">
              <div class="icon edit" @click="loadUser(stat[index], 'update')">
                <div class="tooltip">Editar</div>
                <span><i class="fas fa-edit"></i></span>
              </div>
              <div class="icon delete" @click="loadUser(stat[index], 'remove')">
                <div class="tooltip">Deletar</div>
                <span><i class="fas fa-trash"></i></span>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";
import { baseApiUrl } from "@/global";
import Error from '../template/Error'

export default {
  name: "Client Control",
  components: { Error },
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
      axios
        .post(`${baseApiUrl}/api/users`, this.user)
        .then((XMLHttpRequest) => {
          this.$refs.error.errorHandler(false, true, XMLHttpRequest.data);
          this.reset()
        })
        .catch((XMLHttpRequest) => {
          this.$refs.error.errorHandler(true, true, XMLHttpRequest.response.data);
        });
    },
    loadUser(user, mode = "save") {
      this.mode = mode;
      this.user = { ...user };
    },
    reset() {
      this.mode = "save";
      this.user = {};
      this.loadUsers();
    },
    deleteUser() {
      const id = this.user._id;
      axios
        .delete(`${baseApiUrl}/api/users/${id}`)
        .then((XMLHttpRequest) => {
          this.$refs.error.errorHandler(false, true, XMLHttpRequest.data);
          this.reset();
        })
        .catch((XMLHttpRequest) => {
        this.$refs.error.errorHandler(true, true, XMLHttpRequest.response.data);
        });
    },
    updateUser() {
      const id = this.user._id;
      axios
        .patch(`${baseApiUrl}/api/users/${id}`, this.user)
        .then((XMLHttpRequest) => {
          this.$refs.error.errorHandler(false, true, XMLHttpRequest.data);
          this.reset();
        })
        .catch((XMLHttpRequest) => {
        this.$refs.error.errorHandler(true, true, XMLHttpRequest.response.data);
        });
    },
  },
  mounted() {
    this.loadUsers();
    console.log(this.$refs.error);
  },
};
</script>

<style>
.table > tbody, tr {
  vertical-align: middle;
  text-align: center;
}

i {
  margin: 0;
}

.nav-item {
  width: 10vw;
}

.client-control {
  position: relative;
  width: 95vw;
  left: -10vw;
  padding: 10px;
  border: 1px solid #dee2e6;
}


.form-control-user {
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

#InputName::before,
#InputEmail::before,
#InputPhone::before,
#InputPassword::before {
  content: "*";
}

.mandatory {
  font-size: 0.6rem;
  color: gray;
}

.btn-user {
  width: 20%;
  margin-top: 10px;
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

.wrapper {
  display: inline-flex;
}

.wrapper .icon {
  position: relative;
  background-color: #ffffff;
  border-radius: 50%;
  padding: 15px;
  margin: 10px;
  width: 40px;
  height: 40px;
  font-size: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.wrapper .tooltip {
  position: absolute;
  top: 0;
  font-size: 14px;
  background-color: #ffffff;
  color: #ffffff;
  padding: 5px 8px;
  border-radius: 5px;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
  opacity: 0;
  pointer-events: none;
  transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.wrapper .tooltip::before {
  position: absolute;
  content: "";
  height: 8px;
  width: 8px;
  background-color: #ffffff;
  bottom: -3px;
  left: 50%;
  transform: translate(-50%) rotate(45deg);
  transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.wrapper .icon:hover .tooltip {
  top: -45px;
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
}

.wrapper .icon:hover span,
.wrapper .icon:hover .tooltip {
  text-shadow: 0px -1px 0px rgba(0, 0, 0, 0.1);
}

.wrapper .edit:hover,
.wrapper .edit:hover .tooltip,
.wrapper .edit:hover .tooltip::before {
  background-color: #3b5999;
  color: #ffffff;
}

.wrapper .delete:hover,
.wrapper .delete:hover .tooltip,
.wrapper .delete:hover .tooltip::before {
  background-color: #46c1f6;
  color: #ffffff;
}
</style>
