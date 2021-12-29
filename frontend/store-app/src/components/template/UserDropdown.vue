<template>
  <div class="user-dropdown">
    <div class="user-button">
      <i class="fas fa-users-cog"></i>  
      <span>Usuário</span>
      <div class="user-dropdown-img"></div>
      <i class="fa fa-angle-down"></i>
    </div>
    <div class="user-dropdown-content">
        <router-link to="/admin"><i class="fas fa-user"></i>Login</router-link>
        <a href=""><i class="fas fa-sign-out-alt"></i>Sair</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserDropdown",
}
</script>

<style>
    .user-dropdown {
        height: 100%;
    }

    .user-dropdown a {
      text-decoration: none;
    }

    .user-dropdown:hover {
        background-color: rgba(19, 95, 175, 0.25);
    }

    .user-button {
        display: flex;
        align-items: center;
        height: 100%;
        margin-right: 5px;
        cursor: pointer;
    }

    .user-button i {
        margin: 10px;
    }

    .user-dropdown-content {
        box-sizing: border-box;
        position: relative;
        min-width: 100px;
        /* min-height: 160px; */
        background-color: #f9f9f9;
        box-shadow: 0px 8px 16px  rgba(0, 0, 0, 0.2);
        padding: 10px;
        z-index: 1;

        display: flex;
        flex-direction: column;
        align-items: center;
        flex-wrap: wrap;

        visibility: hidden;
        opacity: 0;
        transition:  visibility 0s, opacity 0.5s linear ;
    }

    .user-dropdown:hover .user-dropdown-content {
      visibility: visible;
      opacity: 1;
    }

    .user-dropdown-content a {
      padding: 2px 15px;
    }

    .user-dropdown-content a:hover {
      background-color: rgb(247, 230, 213);
    }

    .user-dropdown-content i {
      margin: 0 5px;
    }
</style>