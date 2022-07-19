<template>
  <div class="container-fluid" id="container">
    <div class="row justify-content-center align-items-center">
      <div class="col-md-4 p-0 d-none d-md-block">
        <!--    img  -->
        <img class="rounded-start shadow-lg bg-body p-3" src="@/assets/Login/femizoo.png" alt="femizoo" style="width:100% ; height:100% ;" v-if="up">
        <img class="rounded-start shadow-lg bg-body p-3" src="@/assets/Login/femizoo2.png" alt="femizoo" style="width:100% ; height:100% ;" v-else>
      </div>
      <div class="col-10 col-md-4 login shadow bg-body rounded-end">
        <!--    Login  -->
        <div class="row justify-content-end mt-3">
          <div class="col-8 col-md-6 mb-2">
            <!-- Botones -->
            <div class="btn-group">
              <a class="btn btn-dark shadow signin" id="btn-1" aria-current="page"
                v-on:click="signIn">Sign In</a
              >
              <a class="btn btn-dark shadow active signup" id="btn-2" v-on:click="signUp">Sign Up</a>
            </div>
          </div>

        <!-- Login form -->
        <div class="col-12">
            <div class="form p-4" v-if="up">
                <h3>Sign Up</h3>
                <div class="row col-10 mt-2">
                    <label for="nombre" class="mb-1">NOMBRE COMPLETO</label>
                    <input class="mb-2" type="text" name="nombre" id="nombre" v-model="nombre" placeholder="Ingresa tu nombre completo">
                </div>

                <div class="row col-10">
                    <label for="celular" class="mb-1">Celular</label>
                    <input type="number" name="celular" id="celular" class="mb-2" placeholder="Ingrese su número de celular" v-model="celular">
                </div>
                
                <div class="row col-10">
                    <label for="email" class="mb-1">E-mail</label>
                    <input class="mb-2" type="text" name="email" id="email" v-model="email" placeholder="ejemplo@correo.com">
                </div>

                <div class="row col-10">
                    <label for="password" class="mb-1">Password</label>
                    <input type="password" name="password" id="password" v-model="password" placeholder="*************">
                </div>

                <div class="row col-12 mt-3 align-items-center">
                    <div class="form-check">
                        <input class="form-check-input checkb" type="checkbox" id="flexCheckDefault">
                        <label class="form-check-label" for="flexCheckDefault" style="font-size:13px;">
                            Estoy de acuerdo con los terminos y condicioines.
                        </label>
                    </div>
                </div>
                <div class="col-12">
                    <button type="button" class="btn btn-dark mb-3" id="sign" v-on:click="btnup">Sign Up</button>
                </div>
            </div>

            <div class="form p-4" v-else>
                <h3>Sign In</h3>
                <div class="row col-10 mt-2">
                    <label for="email" class="mb-1">E-mail</label>
                    <input class="mb-2" type="email" name="email" id="email" v-model="email" placeholder="ejemplo@correo.com">
                </div>
                <div class="row col-10">
                    <label for="password" class="mb-1">Password</label>
                    <input type="password" name="password" id="password" v-model="password" placeholder="*************">
                </div>
                <div class="col-12">
                    <button type="button" class="btn btn-dark mb-3 mt-2" id="sign" v-on:click="btnin">Sign In</button>
                </div>
            </div>
        </div> 
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default{
    data:()=>({
        up: true,
        nombre: null,
        celular: null,
        email:null,
        password:null
    }),
    created(){
        document.title= 'Femizoo | Login or Register';
    },
    methods:{
        signUp(){
            this.up = true;
            window.$('.signup').removeClass("active");
            window.$('.signin').removeClass("active");
            window.$('.signup').addClass("active");
        },
        signIn(){
            this.up = false;
            window.$('.signin').removeClass("active");
            window.$('.signin').addClass("active");
            window.$('.signup').removeClass("active");
        },
        btnup(){
          if(window.$('.checkb').prop('checked')){
            axios.post(window.HOST + '/api/register',{
              'name': this.nombre.toUpperCase(),
              'celular': this.celular,
              'email': this.email,
              'password': this.password.toLowerCase(),
              'accept_term': window.$('.checkb').prop('checked')
            }
          ).then((result)=>{
            alert(result.data.msg);
            this.up = false;
          })
          }else{
            alert('Debe aceptar los terminos y condiciones.')
          }
        },
        btnin(){
          axios.post(window.HOST + '/api/login',{
            'email': this.email,
            'password': this.password
          }).then((result)=>{
            sessionStorage.token = result.data.token;
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.token;
            this.$router.push({path:'/Home'});
          }).catch(()=>{
            alert('El usuario o la contraseña son incorrecto.')
          })
        }
    }
}
</script>

<style>
#container {
  height: 100vh;
}

#btn-1 {
  border-top-left-radius: 40px;
  border-bottom-left-radius: 40px;
}

#btn-2 {
  border-top-right-radius: 40px;
  border-bottom-right-radius: 40px;
}

input{
    border-style: none;
    border-bottom: solid 1px;
    border-radius: 5px;
    outline: none;
}

input:focus{
    border-color: rgb(133, 134, 135);
}

#sign{
    border-radius: 40px;
    box-shadow: 2px 1px rgb(133, 134, 135);
}

.form-check-input{
    background-color: black !important;
}
</style>

<style scoped>
.row {
  height: 100%;
}

#btn-1:hover,
#btn-2:hover,
.active, #sign:hover{
  background-color: rgb(133, 134, 135)!important; 
  border-color: rgb(133, 134, 135)!important;
}
</style>