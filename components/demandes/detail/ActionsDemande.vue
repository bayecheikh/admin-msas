<template>
  <v-row
    align="center"
    justify="space-around"
  >
    <v-btn
      flat
      outlined
      rounded
      color="primary"
      v-on:click="retour()"
    >
      <v-icon left>
        mdi-arrow-left
      </v-icon>
      Retour à la liste
    </v-btn>
    <v-btn
      flat
      rounded
      outlined
      v-on:click="modifier()"
    >
      <v-icon left>
        mdi-pencil
      </v-icon>
      Modifier la demande
    </v-btn>
    <v-btn
      flat
      rounded
      outlined
      color="green"
      v-on:click="exporter()"
    >
      <v-icon left>
        mdi-export
      </v-icon>
      Exporter un recepisse
    </v-btn>
  </v-row>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
  export default {
    computed: mapGetters({
      detailDemande: 'demandes/detaildemande'
    }),
    data: () => ({

    }),
    methods: {
      retour(){       
        this.$router.push('/demandes');
      },
      modifier(){ 
        //this.$router.push('/demandes/modifier/'+this.detailDemande.id);      
      },
      exporter(){  
        alert('Exporter')     
      },
    },
  }
</script>