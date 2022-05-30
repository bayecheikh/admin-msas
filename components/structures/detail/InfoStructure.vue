<template>
  <v-card class="custom-card-user border-grey">                   
    <v-card-text>
      <v-row>
        <v-col md="12" sm="12" lg="12" text-md-left>
          <div class="row">
              <div class="col-md-6 my-0 py-0">
                  <p class="info-profil"><span>Dénomination : </span>{{detailstructure.nom_structure}}</p>
              </div>
              <div class="col-md-6 my-0 py-0" v-if="detailstructure.source_financements">
                  <p class="info-profil"><span>Source de financement : </span>{{detailstructure.source_financements[0].libelle_source}}</p>
              </div>
              <div class="col-md-6 my-0 py-0" v-if="detailstructure.type_sources">
                  <p class="info-profil"><span>Type source : </span>{{detailstructure.type_sources[0].libelle_type_source}}</p>
              </div>
              <div class="col-md-6 my-0 py-0" v-if="detailstructure.numero_agrement">
                  <p class="info-profil"><span>Numéro agrément : </span>{{detailstructure.numero_agrement}}</p>
              </div>
              <div class="col-md-6 my-0 py-0" v-if="detailstructure.numero_agrement">
                  <p class="info-profil"><span>Numéro autorisation : </span>{{detailstructure.numero_agrement}}</p>
              </div>
              <div class="col-md-6 my-0 py-0" v-if="detailstructure.telephone_structure">
                  <p class="info-profil"><span>Téléphone : </span>{{detailstructure.telephone_structure}}</p>
              </div>
              <div class="col-md-6 my-0 py-0" v-if="detailstructure.email_structure">
                  <p class="info-profil"><span>Email : </span>{{detailstructure.email_structure}}</p>
              </div>
              <div class="col-md-6 my-0 py-0" v-if="detailstructure.type_zone_interventions">
                  <p class="info-profil"><span>Zone d'intervention : </span>{{detailstructure.type_zone_interventions[0].libelle_zone}}</p>
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
      detailstructure: 'structures/detailstructure'
    }),
    data () {
      return {
        id : this.$nuxt._route.params.id,
      }
    },
    methods: {
      getDetail(id){
          this.progress=true
          this.$msasApi.$get('/structures/'+id)
        .then(async (response) => {
            console.log('Detail ++++++++++',response)
            this.$store.dispatch('structures/getDetail',response.data)
        }).catch((error) => {
             this.$toast.error(error?.response?.data?.message).goAway(3000)
            console.log('Code error ++++++: ', error?.response?.data?.message)
        }).finally(() => {
            console.log('Requette envoyé ')
        });
        //console.log('total items++++++++++',this.paginationstructure)
      },
      submitForm(){
        alert('Formulaire soumis')
      },
      retour(){       
          this.$router.push('/structures');
      },
    },
  }
</script>
