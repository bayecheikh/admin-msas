<template>
  <v-card class="custom-card-user border-grey">                   
    <v-card-text>
      <v-row>
        <v-col md="12" sm="12" lg="12" text-md-left>
          <div class="row">
              <div class="col-md-4 my-0 py-0">
                  <p class="info-profil"><span>Dénomination : </span>{{detailinvestissement.nom_investissement}}</p>
              </div>
              <div class="col-md-4 my-0 py-0" v-if="detailinvestissement.adresse_investissement">
                  <p class="info-profil"><span>Adresse : </span>{{detailinvestissement.adresse_investissement}}</p>
              </div>
              <div class="col-md-4 my-0 py-0" v-if="detailinvestissement.source_financements">
                  <p class="info-profil"><span>Source de financement : </span>{{detailinvestissement.source_financements[0].libelle_source}}</p>
              </div>
              <div class="col-md-4 my-0 py-0" v-if="detailinvestissement.type_sources">
                  <p class="info-profil"><span>Type source : </span>{{detailinvestissement.type_sources[0].libelle_type_source}}</p>
              </div>
              <div class="col-md-4 my-0 py-0" v-if="detailinvestissement.numero_agrement">
                  <p class="info-profil"><span>Numéro agrément : </span>{{detailinvestissement.numero_agrement}}</p>
              </div>
              <div class="col-md-4 my-0 py-0" v-if="detailinvestissement.numero_agrement">
                  <p class="info-profil"><span>Numéro autorisation : </span>{{detailinvestissement.numero_agrement}}</p>
              </div>
              <div class="col-md-4 my-0 py-0" v-if="detailinvestissement.telephone_investissement">
                  <p class="info-profil"><span>Téléphone : </span>{{detailinvestissement.telephone_investissement}}</p>
              </div>
              <div class="col-md-4 my-0 py-0" v-if="detailinvestissement.email_investissement">
                  <p class="info-profil"><span>Email : </span>{{detailinvestissement.email_investissement}}</p>
              </div>
              <div class="col-md-4 my-0 py-0" v-if="detailinvestissement.type_zone_interventions">
                  <p class="info-profil"><span>Zone d'intervention : </span>{{detailinvestissement.type_zone_interventions[0].libelle_zone}}</p>
              </div>
          </div>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
  export default {
    mounted: function() {
      this.getDetail(this.id)
    },
    computed: mapGetters({
      detailinvestissement: 'investissements/detailinvestissement'
    }),
    data () {
      return {
        id : this.$nuxt._route.params.id,
      }
    },
    methods: {
      getDetail(id){
          this.progress=true
          this.$msasApi.$get('/investissements/'+id)
        .then(async (response) => {
            console.log('Detail ++++++++++',response)
            this.$store.dispatch('investissements/getDetail',response.data)
        }).catch((error) => {
             this.$toast.error(error?.response?.data?.message).goAway(3000)
            console.log('Code error ++++++: ', error?.response?.data?.message)
        }).finally(() => {
            console.log('Requette envoyé ')
        });
        //console.log('total items++++++++++',this.paginationinvestissement)
      },
      submitForm(){
        alert('Formulaire soumis')
      },
      retour(){       
          this.$router.push('/investissements');
      },
    },
  }
</script>
