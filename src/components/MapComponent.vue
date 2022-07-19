<template>
  <div v-if="center">
    <GMapMap
      :center="center"
      :zoom="7"
      map-type-id="terrain"
      style="width: 100%; height: 300px"
  >
    <GMapCluster>
      <GMapMarker
          :key="index"
          v-for="(m, index) in markers"
          :position="m.position"
          :clickable="true"
          :draggable="true"
          @click="center=m.position"
      />
    </GMapCluster>
  </GMapMap>
  </div>
</template>
<script>
export default {
    props:{
        lat: Number,
        lgn: Number
    },
  name: 'App',
  data() {
    if(this.lat != null && this.lgn != null){
        return {
      center: {lat: Number(this.lat), lng: Number(this.lgn)},
      markers: [
        {
          position: {
            lat: this.lat, lng: this.lgn
          },
        }
        , // Along list of clusters
      ]
    }
    }
  }
}
</script>


