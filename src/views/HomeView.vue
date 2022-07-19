<template>
    <div>
        <navbar></navbar>

        <!-- Container -->
        <div class="container bg-light rounded mt-4">
            <div class="row justify-content-center p-3 shadow">
                <div class="col-12 col-md-8">
                    <h3>Mis articulos</h3>
                </div>
                <div class="col-12 col-md-8 mt-2 mb-2">
                    <div class="card" v-if="articulos">
                      <ul class="list-group list-group-flush rounded" v-for="articulo of articulos" :key="articulo">
                        <li class="list-group-item">
                            <button type="button" class="btn btn-light" v-on:click="buscar(articulo.latitud, articulo.longitud)">Nombre: {{articulo.nombre}}, serie: {{articulo.serie}}, propietario: {{articulo.propietario}}, desaparecido: {{articulo.desaparecido}}</button>
                            </li>
                      </ul>
                    </div>
                </div>
                <div class="col-12 col-md-8 row">
                    <div class="col-md-6 col-10">
                        <button type="button" class="btn btn-success" v-on:click="añadir1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16">
                                <path d="M8 6.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V11a.5.5 0 0 1-1 0V9.5H6a.5.5 0 0 1 0-1h1.5V7a.5.5 0 0 1 .5-.5z"/>
                                <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z"/>

                            </svg>
                        </button>
                        <button type="button" class="btn btn-danger" v-on:click="eliminar1" style="margin-left: 6px;">
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-shield-x" viewBox="0 0 16 16">
                                <path d="M6.854 7.146a.5.5 0 1 0-.708.708L7.293 9l-1.147 1.146a.5.5 0 0 0 .708.708L8 9.707l1.146 1.147a.5.5 0 0 0 .708-.708L8.707 9l1.147-1.146a.5.5 0 0 0-.708-.708L8 8.293 6.854 7.146z"/>
                                <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z"/>
                            </svg>
                        </button>
                    </div>
                </div>

                <!-- Add form -->
                <div class="col-12 col-md-8 mt-2 pt-2 pb-2 row justify-content-start" v-if="add">
                    <div class="p-4 col-12 col-md-6 border shadow">
                        <div class="row col-12 mt-2">
                            <label for="serie" class="mb-1">Serie</label>
                            <input class="mb-2" type="text" name="serie" id="serie" v-model="serie" placeholder="Ingrese la serie de su articulo">
                        </div>
                        <div class="row col-12 mt-2">
                            <label for="propietario" class="mb-1">Propietario</label>
                            <input class="mb-2" type="text" name="serie" id="serie" v-model="propietario" placeholder="¿Quien será su propietario?">
                        </div>
                        <div class="col-12 row">
                            <button type="button" class="btn btn-dark mb-1 mt-2" id="sign" v-on:click="añadir">Añadir</button>
                            <button type="button" class="btn btn-dark mb-1" id="sign" v-on:click="cancelar">Cancelar</button>
                        </div>
                    </div>
                </div>

                <!-- Rmv form -->
                <div class="col-12 col-md-8 mt-2 pt-2 pb-2 row justify-content-start" v-if="rmv">
                    <div class="p-4 col-12 col-md-6 border shadow">
                        <div class="row col-12 mt-2">
                            <label for="serie" class="mb-1">Serie</label>
                            <input class="mb-2" type="text" name="serie" id="serie" v-model="serie" placeholder="Ingrese la serie de su articulo">
                        </div>
                        <div class="col-12 row">
                            <button type="button" class="btn btn-dark mb-1 mt-2" id="sign" v-on:click="eliminar">Eliminar</button>
                            <button type="button" class="btn btn-dark mb-1" id="sign" v-on:click="cancelar">Cancelar</button>
                        </div>
                    </div>
                </div>

                <!-- Map -->
                <div class="col-12 col-md-8 mt-2" v-if="lat">
                    <h3>Rastrea tu articulo</h3>
                    <MapComponent class="mt-2" :lat="lat" :lgn="lgn"></MapComponent>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import navbar from '@/components/NavbarComponent.vue'
import axios from 'axios'
import MapComponent from '@/components/MapComponent.vue'

export default{
    data:()=>({
        articulos:null,
        add: null,
        rmv:null,
        serie: null,
        propietario: null,
        lat: null,
        lgn: null
    }),
    components:{
        navbar,
        MapComponent
    },
    created(){
        document.title = 'Femizoo | Home'
        if(axios.post(window.HOST + '/api/validate').catch(()=>{
            sessionStorage.token = null;
            this.$router.push({path:'/'})
        }));
        axios.get(window.HOST + "/api/misDispositivos").then((result)=>{
            this.articulos = result.data
            this.articulos.forEach(element => {
                if(element.desaparecido == 0){
                    element.desaparecido = "NO";
                }else{
                    element.desaparecido = "SI";
                }
            });
        });
    },
    methods:{
        añadir1(){
            this.serie = "";
            this.propietario = "";
            this.rmv = false;
            this.add = true;
        },
        eliminar1(){
            this.serie="";
            this.add = false;
            this.rmv = true;
        },
        cancelar(){
            this.add = false;
            this.rmv = false; 
        },
        añadir(){
            axios.post(window.HOST + '/api/update/dispositivo',{
                'serie': this.serie,
                'propietario': this.propietario.toUpperCase()
            }).then((result)=>{
                alert(result.data.msg);
                axios.get(window.HOST + "/api/misDispositivos").then((result)=>{
                    this.articulos = result.data
                });
            }).catch(()=>{
                alert('No se pudo registrar el articulo')
            });
        },
        eliminar(){
            axios.post(window.HOST + '/api/eliminar/dispositvo',{
                'serie': this.serie
            }).then((result)=>{
                alert(result.data.msg);
                axios.get(window.HOST + "/api/misDispositivos").then((result)=>{
                    this.articulos = result.data
                });
            }).catch(()=>{
                alert('No se pudo eliminar el articulo')
            });
        },
        buscar(lat, lgn){
            if(lat == null){
                alert('El articulo aún no ha enviado las cordenadas.')
            }else{
                this.lat = lat;
                this.lgn = lgn;
            }
        }
    }
}
</script>

<style>

</style>