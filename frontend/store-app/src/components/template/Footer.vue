<template>
    <footer class="footer">
        <a href="http://www.instagram.com/tiago_lopes_campos/" target="blank">
        <i class="fab fa-instagram"></i>
        Galeria da Bebida
        </a>
        <i class="fab fa-whatsapp">(85)98521-2740</i>
        <div class="address">Rua Abc N° 123, Morte Certa - Fortaleza/Ce</div>
    </footer>
</template>

<script>
export default {
    name: 'Footer'
}
</script>

<style>
    .footer {
        grid-area: footer;
        background: linear-gradient(to right, #136a8a, #267871);

        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        width: 100vw;
        padding: 10px;
        color: coral;
    }

    .footer a,
    .footer i {
        text-decoration: none;
        color: coral;
        max-width: 20vw;
    }

    .address{
        display: flex;
        font-size: 1.5rem;
        align-self: center;
        justify-content: center;
        margin-top: 5px;
    }
</style>