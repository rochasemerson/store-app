<template>
    <div class="auth-content">
        <Error ref="error"/>
        <UserControl v-if="showSignup"/>
        <div class="auth-modal" v-if="!showSignup">
            <div class="auth-title">Login</div>
            <label for="user">Usuário</label>
            <input type="text" v-model="user.email" placeholder="Digite o e-mail">
            <label for="password">Senha</label>
            <input type="password" v-model="user.password" placeholder="Digite a senha">
            <button class="btn btn-primary btn-user" type="button" @click="signIn">
                <i class="fas fa-sign-in-alt"></i>
                Entrar
            </button>
            <a href="" @click.prevent="showSignup = !showSignup">
                <span>Novo usuário? Cadastre-se aqui!</span>
            </a>
        </div>
    </div>
</template>

<script>
import { baseApiUrl, userKey} from '@/global'
import Error from '../template/Error'
import UserControl from '../admin/UserControl'
import axios from 'axios'
import store from '@/main.js'

export default {
    name: 'Auth',
    components:  { Error, UserControl },
    data() {
        return {
            showSignup: false,
            user: {}
        }
    },
    methods:{
        signIn() {
            const url = `${baseApiUrl}/api/users/signin`
            axios.post(url, this.user).then(XMLHttpRequest => {
                store.user = XMLHttpRequest.data
                localStorage.setItem(userKey, JSON.stringify(XMLHttpRequest.data))
                this.$router.push({path: '/'})
                this.$root.$data.signin = false
                this.$refs.error.errorHandler(false, true, XMLHttpRequest.data)
            }).catch(XMLHttpRequest => {
                this.$refs.error.errorHandler(true, true, XMLHttpRequest.response.data)
            })
        },
        signUp() {
            const url = `${baseApiUrl}/api/users/signup`
            axios.post(url, this.user)
            .then(() => {
                this.$refs.error.errorHandler(false, true, '')
                this.user = {}
                this.showSignup = false
            }).catch(error => {
                this.$refs.error.errorHandler(true, true, error)
            })
        }
    },
    mounted(){
        this.$root.$data.signin = true
    }
}
</script>

<style>
    /* .auth-content {
        position: absolute;
        top: 15%;
        left: 50%;
        transform: translateX(-50%);
    } */

    .auth-title {
        font-size: 2rem;
        font-weight: bolder;
        text-decoration: underline;
    }

    .auth-modal {
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