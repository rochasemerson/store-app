<template>
    <div>
        <Page-title icon='fas fa-shopping-cart me-3' main='Carrinho'/>
        <table class="table table-striped">
            <thead>
                <tr>
                    <th scope="col">Produto</th>
                    <th scope="col">Preço Unitário</th>
                    <th scope="col">Preço Total</th>
                    <th scope="col">Quantidade</th>
                    <th scope="col">Ações</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item) in cart" :key="item.name">
                    <td>{{item.productName}}</td>
                    <td class="price">{{item.productPrice}}</td>
                    <td class="price">{{totalProductPrice}}</td>
                    <td><input type="number" min="1"></td>
                    <td>
                        <div class="wrapper">
                          <div class="icon delete" @click="removeItem(item)">
                            <div class="tooltip">Remover</div>
                            <span><i class="fas fa-trash"></i></span>
                          </div>
                        </div>
                    </td>
                </tr>
            </tbody>
            <div class="total">{{totalCart}}</div>
        </table>
    </div>
</template>

<script>
import PageTitle from '../template/PageTitle'
import store from '@/main.js'

export default {
    name: 'Shopping Cart',
    components: { PageTitle },
    data() {
        return {
            user: store.currentUser,
            cart: store.currentUser.cart,
        }
    },
    methods: {
        removeItem(target) {
            console.log(target, this.cart);
        }
    },
    computed: {
        cartTotal() {
            return this.cart.reduce((acumulator, productPrice) => {
                acumulator = acumulator + productPrice
            })
        }
    }
}
</script>

<style>
    .price::before {
        content: 'R$';
        margin-right: 5px;
    }
</style>