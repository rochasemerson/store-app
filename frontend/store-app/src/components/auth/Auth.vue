<template>
    <div class="auth-content">
        <Error ref="error"/>
        <div class="auth-modal">
            <div class="auth-title">Login</div>
            <label for="user">Usuário</label>
            <input type="text" v-model="user.email" placeholder="Digite o e-mail">
            <label for="password">Senha</label>
            <input type="password" v-model="user.password" placeholder="Digite a senha">
            <button class="btn btn-primary btn-user" type="button" @click="signIn">
                <i class="fas fa-sign-in-alt"></i>
                Entrar
            </button>
            <a href="/" @click.prevent="signUp" >
                <span>Novo usuário? Cadastre-se aqui!</span>
            </a>
        </div>
    </div>
</template>

<script>
import { baseApiUrl, userKey} from '@/global'
import Error from '../template/Error'
import axios from 'axios'
import store from '@/main.js'

export default {
    name: 'Auth',
    components:  { Error },
    data() {
        return {
            user: {}
        }
    },
    methods:{
        signIn() {
            const url = `${baseApiUrl}/api/users/signin`
            const cart = store.currentUser.cart
            axios.post(url, this.user).then(XMLHttpRequest => {
                store.currentUser = XMLHttpRequest.data
                store.currentUser.cart = cart
                localStorage.setItem(userKey, JSON.stringify(XMLHttpRequest.data))
                this.$router.push({path: '/'})
                this.$root.$data.signin = false
            }).catch(XMLHttpRequest => {
                this.$refs.error.errorHandler(true, true, XMLHttpRequest.response.data)
            })
        },
        signUp() {
                this.$router.push({path: '/signup'})
                this.$root.$data.signin = true
        }
    },
    mounted(){
        this.$root.$data.signin = true
    }
}
</script>

<style>
    .auth-title {
        font-size: 2rem;
        font-weight: bolder;
        text-decoration: underline;
    }

    .auth-modal {
        position: absolute;
        top: 15%;
        left: 50%;
        transform: translateX(-50%);
        background-color: #fff;
        width: 350px;
        padding: 20px;
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
    }

    .auth-modal > button {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap: 5px;
        min-width: 8rem;
    }

    .auth-modal > input {
        padding: 3px;
    }

</style>