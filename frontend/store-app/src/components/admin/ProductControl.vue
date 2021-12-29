<template>
  <div class="product-control">
    <Error  ref="error"/>
    <form class="form-control-product">
      <div id="InputDescription" >
        <label for="InputDescription" class="form-label">Descrição</label>
        <input type="text" class="form-control" v-model="product.description" :readonly="mode === 'remove'" placeholder="Informe a descrição do produto..."/>
      </div>
      <div id="InputPrice">
        <label for="InputPrice" class="form-label">Preço</label>
        <input type="text" class="form-control" v-model="product.price" :readonly="mode === 'remove'" placeholder="Informe o preço..."/>
      </div>
      <div id="InputStock">
        <label for="InputStock" class="form-label">Estoque</label>
        <input type="text" class="form-control" v-model="product.stock" :readonly="mode === 'remove'" placeholder="Informe o estoque..."/>
      </div>
      <div id="InputProfit">
        <label for="InputProfit" class="form-label">Lucro</label>
        <input type="text" class="form-control" v-model="product.profit" :readonly="mode === 'remove'"/>
      </div>
      <div id="InputUrl">
        <label for="InputUrl" class="form-label">URL da Imagem <i class="fab fa-google search-btn" @click="googleSearch(product.description)"></i></label>
        <input type="text" class="form-control" v-model="product.imgUrl" :readonly="mode === 'remove'" placeholder="Informe a Url ou use o botão para pesquisar..."/>
      </div>
      <div id="CategorySelect">
        <label for="CategorySelect" class="form-label">Categoria</label>
        <select class="form-control" v-model="product.category" :readonly="mode === 'remove'">
            <option v-for="(category) in categoryList" :key="category.id">
                {{category.code}}
                {{category.description}}
            </option>
        </select>
      </div>
      <div class="btn-container me-3 mt-2">
        <button type="button" class="btn btn-primary me-3 btn-product" @click="createProduct" v-if="mode === 'save'">
          Enviar
        </button>
        <button type="button" class="btn btn-warning me-3 btn-product" @click="updateProduct" v-if="mode === 'update'">
          Atualizar
        </button>
        <button type="button" class="btn btn-danger me-3 btn-product" @click="deleteProduct" v-if="mode === 'remove'">
          Excluir
        </button>
        <button type="button" class="btn btn-secondary btn-product" @click="reset">
          Cancelar
        </button>
      <div class="mandatory mt-2">Items marcados com '*' são obrigatórios</div>
      </div>
    </form>
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">Descrição</th>
          <th scope="col">Preço</th>
          <th scope="col">Estoque</th>
          <th scope="col">Categoria</th>
          <th scope="col">Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product, index) in products" :key="product.id">
          <td>
            {{ products[index].description }}
          </td>
          <td>
            {{ products[index].price }}
          </td>
          <td>
            {{ products[index].stock }}
          </td>
          <td>
            {{ products[index].category }}
          </td>
          <td>
            <div class="wrapper">
              <div class="icon edit" @click="loadProduct(products[index], 'update')">
                <div class="tooltip">Editar</div>
                <span><i class="fas fa-edit"></i></span>
              </div>
              <div class="icon delete" @click="loadProduct(products[index], 'remove')">
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
  name: "Product Control",
  components: { Error },
  data() {
    return {
      mode: "save",
      product: {},
      products: [],
      categoryList: []
    };
  },
  methods: {
    loadProducts() {
      const url = `${baseApiUrl}/api/products`;
      axios.get(url).then((res) => {
        this.products = res.data.products;
      });
    },
    loadCategories() {
      const url = `${baseApiUrl}/api/categories`;
      axios.get(url).then((res) => {
        this.categoryList = res.data.categoryList;
      });
    },
    createProduct() {
        if (this.product.category == undefined) 
        throw(this.$refs.error.errorHandler(false, true, "Selecione uma categoria"))
        this.product.category = this.product.category[0]
      axios
        .post(`${baseApiUrl}/api/products`, this.product)
        .then((XMLHttpRequest) => {
        this.$refs.error.errorHandler(false, true, XMLHttpRequest.data);
        this.reset()
        })
        .catch((XMLHttpRequest) => {
          this.$refs.error.errorHandler(true, true, XMLHttpRequest.response.data);
          console.log(XMLHttpRequest);
        });
    },
    loadProduct(product, mode = "save") {
      this.mode = mode;
      this.product = { ...product };
    },
    reset() {
      this.mode = "save";
      this.product = {};
      this.loadProducts();
    },
    deleteProduct() {
      const id = this.product._id;
      axios
        .delete(`${baseApiUrl}/api/products/${id}`)
        .then((XMLHttpRequest) => {
          this.$refs.error.errorHandler(false, true, XMLHttpRequest.data);
          this.reset();
        })
        .catch((XMLHttpRequest) => {
          this.$refs.error.errorHandler(true, true, XMLHttpRequest.response.data);
        });
    },
    updateProduct() {
      const id = this.product._id;
      axios
        .patch(`${baseApiUrl}/api/products/${id}`, this.product)
        .then((XMLHttpRequest) => {
          this.$refs.error.errorHandler(false, true, XMLHttpRequest.data);
          this.reset();
        })
        .catch((XMLHttpRequest) => {
          this.$refs.error.errorHandler(true, true, XMLHttpRequest.response.data);
        });
    },
    googleSearch(description) {
      if (this.product.description == undefined) return
      window.open("http://www.google.com/search?hl=pt&q=" + escape(description));
 }
  },
  mounted() {
    this.loadProducts();
    this.loadCategories()
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

.product-control {
  position: relative;
  width: 95vw;
  left: 0;
  padding: 10px;
  border: 1px solid #dee2e6;
}

.form-control-product {
  display: grid;
  grid-template-columns: 50% 50%;
  gap: 10px
}

.form-control > div {
  margin-right: 10px;
}

#InputProfit,
#InputPrice,
#CategorySelect {
  margin-right: 10px;
}

#InputDescription::before,
#InputPrice::before,
#InputStock::before,
#CategorySelect::before {
  content: "*";
}

.mandatory {
  font-size: 0.6rem;
  color: gray;
}

.btn-product {
  width: 30%;
  margin-top: 10px;
}

.search-btn {
  cursor: pointer;
  padding: 5px;
  border-radius: 50%;
  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
}

.search-btn:hover {
  background-color: rgba(0, 0, 0, 0.1);
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
