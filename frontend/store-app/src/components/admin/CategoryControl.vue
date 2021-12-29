<template>
  <div class="category-control">
    <form class="form-control-category">
      <div class="mb-3" id="InputCode">
        <label for="InputCode" class="form-label">Código</label>
        <input type="text" class="form-control" v-model="category.code" :readonly="mode === 'remove'"/>
      </div>
      <div class="mb-3" id="InputCategory" >
        <label for="InputCategory" class="form-label">Categoria</label>
        <input type="text" class="form-control" v-model="category.description" :readonly="mode === 'remove'" placeholder="Informe a categoria..."/>
      </div>
        <button type="button" class="btn btn-primary me-3 btn-category" @click="createCategory" v-if="mode === 'save'">
          Enviar
        </button>
        <button type="button" class="btn btn-warning me-3 btn-category" @click="updateCategory" v-if="mode === 'update'">
          Atualizar
        </button>
        <button type="button" class="btn btn-danger me-3 btn-category" @click="deleteCategory" v-if="mode === 'remove'">
          Excluir
        </button>
        <button type="button" class="btn btn-secondary btn-category" @click="reset">
          Cancelar
        </button>
    </form>
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">Código</th>
          <th scope="col">Descrição</th>
          <th scope="col">Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(category, index) in categories" :key="category.id">
          <td>
            {{ categories[index].code }}
          </td>
          <td>
            {{ categories[index].description }}
          </td>
          <td>
            <div class="wrapper">
              <div class="icon edit" @click="loadCategory(categories[index], 'update')">
                <div class="tooltip">Editar</div>
                <span><i class="fas fa-edit"></i></span>
              </div>
              <div class="icon delete" @click="loadCategory(categories[index], 'remove')">
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

export default {
  name: "Category Control",
  props: {
    isActive: String,
  },
  data() {
    return {
      mode: "save",
      category: {},
      categories: [],
    };
  },
  methods: {
    loadCategories() {
      const url = `${baseApiUrl}/api/categories`;
      axios.get(url).then((res) => {
        this.categories = res.data.categoryList;
      });
    },
    createCategory() {
      axios
        .post(`${baseApiUrl}/api/categories`, this.category)
        .then((XMLHttpRequest) => {
          alert(XMLHttpRequest.data);
        })
        .catch((XMLHttpRequest) => {
          alert(XMLHttpRequest.response.data);
        });
    },
    loadCategory(category, mode = "save") {
      this.mode = mode;
      this.category = { ...category };
    },
    reset() {
      this.mode = "save";
      this.category = {};
      this.loadCategories();
    },
    deleteCategory() {
      const id = this.category._id;
      axios
        .delete(`${baseApiUrl}/api/categories/${id}`)
        .then((XMLHttpRequest) => {
          alert(XMLHttpRequest.data);
          this.reset();
        })
        .catch((XMLHttpRequest) => {
          alert(XMLHttpRequest.response.data);
        });
    },
    updateCategory() {
      const id = this.category._id;
      axios
        .patch(`${baseApiUrl}/api/categories/${id}`, this.category)
        .then((XMLHttpRequest) => {
          alert(XMLHttpRequest.data);
          this.reset();
        })
        .catch((XMLHttpRequest) => {
          alert(XMLHttpRequest.response.data);
        });
    },
  },
  mounted() {
    this.loadCategories();
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

.category-control {
  position: relative;
  width: 95vw;
  left: -20vw;
  padding: 10px;
  border: 1px solid #dee2e6;
}

.form-control-category {
    display: flex;
}

#InputCode {
    width: 15vw;
    margin-right: 10px;
}

#InputCategory {
    width: 75vw;
    margin-right: 10px;
}

.form-control > div {
  margin-right: 10px;
}

.btn-category {
  width: 15%;
  height: 50%;
  align-self: center;
  margin-top: 18px;
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
