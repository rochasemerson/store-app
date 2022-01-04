<template>
  <div class="error-container" v-if="visible">
    <i class="far fa-thumbs-up" v-if="!error"></i>
    <i class="fas fa-exclamation-triangle" v-if="error"></i>
    <button class="error-btn" @click="resetError">OK</button>
    <div class="message">
        {{msg}}
    </div>
  </div>
</template>

<script>
export default {
  name: "Error",
  data() {
      return {
          visible: false,
          error: false,
          msg: ''
      }
  },
  methods: {
    errorHandler(error, visible, msg) {
        this.error = error
        this.visible = visible
        this.msg = msg
    },
    resetError() {
        this.visible = false,
        this.error = false,
        this.msg = ''
    }
  }
};
</script>

<style>
.error-container {
  position: absolute;
  top: 15%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 200px;
  width: 300px;
  border-radius: 25px;
  background-color: rgba(0, 0, 0, 0.5);
  color: blanchedalmond;
  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
}

.error-btn {
    position: relative;
    min-width: 50px;
    top: 145px;
    left: 75px;
    border: none;
    border-radius: 15px;
    outline: none;
    background-color: indigo;
    color: #f9f9f9;
    box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
}

.error-btn:active {
    background-color: rgb(128, 58, 179);
}

.fa-thumbs-up,
.fa-exclamation-triangle {
    position: relative;
    font-size: 2rem;
    left: 120px;
    margin-top: 10px;
}

.message {
    flex-grow: 1;
    margin: 10px;
    height: 100px;
    font-size: 1rem;
    text-align: center;
    overflow: auto;
    scrollbar-width: thin;
    scrollbar-color: grey;
}
</style>