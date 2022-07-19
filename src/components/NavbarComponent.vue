<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light p-md-3">
      <div class="container">
        <a class="navbar-brand" href="#"><img src="@/assets/Login/Marca.png" alt="Marca" style="width: 200px; height: 30px;"></a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          </ul>
          <form class="d-flex">
            <ul class="navbar-nav">
              <li class="nav-item">
                <button type="button" class="btn btn-secondary" id="salir" v-on:click="salir">Salir</button>
              </li>
            </ul>
          </form>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import axios from 'axios'

export default{
    props:{
        inicio:String
    },
    methods:{
      salir(){
        axios.post(window.HOST + '/api/logout').then(()=>{
          sessionStorage.token = null;
          axios.defaults.headers.common['Authorization'] = null;
          this.$router.push({path:'/'})
        })
      }
    }
}
</script>

<style scope>
#salir{
  border-radius: 40px;
}
</style>