<template>
  <v-card class="custom-card-user border-grey">                   
    <v-card-text>
      <v-row>
        <v-col md="12" sm="12" lg="12" text-md-left>
          <div class="row">
            <!--Infos Generales-->
              <div class="col-md-4 my-0 py-0">
                  <p class="info-profil"><span>Dénomination : </span>{{detailstructure.nom_structure}}</p>
              </div>
              <div class="col-md-4 my-0 py-0">
                  <p class="info-profil"><span>Bailleur : </span>{{detailstructure.donneur_receveur_mixte}}</p>
              </div>
              <div class="col-md-4 my-0 py-0" v-if="detailstructure.source_financements">
                  <p class="info-profil"><span>Structure : </span>{{detailstructure.source_financements[0] && detailstructure.source_financements[0].libelle_source}}</p>
              </div>
              <div class="col-md-4 my-0 py-0" v-if="detailstructure.type_sources">
                  <p class="info-profil"><span>Type de structure : </span>{{detailstructure.type_sources[0] && detailstructure.type_sources[0].libelle_type_source}}</p>
              </div>
              <div class="col-md-4 my-0 py-0" v-if="detailstructure.departements && detailstructure.departements.length">
                  <p class="info-profil"><span>Districts : </span>{{detailstructure.departements[0] && detailstructure.departements[0].libelle_departement}}</p>
              </div>
              <div class="col-md-4 my-0 py-0" v-if="detailstructure.numero_autorisation!=null">
                  <p class="info-profil"><span>Numéro autorisation : </span>{{detailstructure.numero_agrement}}</p>
              </div>
              <div class="col-md-4 my-0 py-0" v-if="detailstructure.numero_agrement!=null">
                  <p class="info-profil"><span>Numéro agrément : </span>{{detailstructure.numero_agrement}}</p>
              </div>

            <!--Coordonnees Siege-->
              <div class="col-md-4 my-0 py-0" v-if="detailstructure.adresse_structure">
                  <p class="info-profil"><span>Adresse : </span>{{detailstructure.adresse_structure}}</p>
              </div>
              <div class="col-md-4 my-0 py-0" v-if="detailstructure.telephone_structure">
                  <p class="info-profil"><span>Téléphone : </span>{{detailstructure.telephone_structure}}</p>
              </div>
              <div class="col-md-4 my-0 py-0" v-if="detailstructure.email_structure">
                  <p class="info-profil"><span>E-mail : </span>{{detailstructure.email_structure}}</p>
              </div>
            
            <!--Dimensions-->
            <div class="col-md-4 my-0 py-0" v-if="detailstructure.dimensions">
                  <p class="info-profil"><span>Dimensions : </span>{{detailstructure.dimensions[0] && detailstructure.dimensions[0].libelle_dimension}}</p>
            </div>
             
             <!--Zones d'intervention-->
             <div class="col-md-4 my-0 py-0" v-if="detailstructure.type_zone_interventions && detailstructure.type_zone_interventions.length">
                  <p class="info-profil"><span>Type de zone d'intervention : </span>{{detailstructure.type_zone_interventions[0] && detailstructure.type_zone_interventions[0].libelle_type_zone_intervention}}</p>
              </div>

              <div class="col-md-4 my-0 py-0" v-if="detailstructure.regions && detailstructure.regions.length">
                  <p class="info-profil"><span>Régions : </span>{{detailstructure.regions[0] && detailstructure.regions[0].nom_region}}</p>
            </div>

             <!--Personne responsable-->
             <div class="col-md-4 my-0 py-0" v-if="detailstructure.firstname_responsable">
                  <p class="info-profil"><span>Prénom du responsable : </span>{{detailstructure.firstname_responsable}}</p>
              </div>
              <div class="col-md-4 my-0 py-0" v-if="detailstructure.lastname_responsable">
                  <p class="info-profil"><span>Nom du responsable : </span>{{detailstructure.lastname_responsable}}</p>
              </div>
              <div class="col-md-4 my-0 py-0" v-if="detailstructure.fonction_responsable">
                  <p class="info-profil"><span>Fonction du responsable : </span>{{detailstructure.fonction_responsable}}</p>
              </div>
              <div class="col-md-4 my-0 py-0" v-if="detailstructure.email_responsable">
                  <p class="info-profil"><span>E-mail du responsable : </span>{{detailstructure.email_responsable}}</p>
              </div>
             <div class="col-md-4 my-0 py-0" v-if="detailstructure.telephone_responsable">
                  <p class="info-profil"><span>Téléphone du responsable : </span>{{detailstructure.telephone_responsable}}</p>
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
        showStructure: false,
        showTypeSource: false,
        showNumAutorisation: false,
        showAccordSiege: false,
        showNumAgrement: false,
        showAdresseStructure: false,
        showRegion: false,
      }
    },
    methods: {
      getDetail(id){
          this.progress=true
          this.$msasApi.$get('/structures/'+id)
        .then(async (response) => {
            console.log('Détail ++++++++++',response)
            this.$store.dispatch('structures/getDetail',response.data)
            this.changeSource_financement(response.data?.source)
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
      async changeSource_financement(source) {
        this.showTypeSource=true
        this.selectedSource_financements = source
        this.selectedType_sources = source.type_sources

        switch(source.libelle_source){
          case 'EPS' : {
            console.log('************',this.showNumAutorisation)
            this.showAdresseStructure=true

            this.showNumAutorisation=false
            this.showNumAgrement=false
            this.showAccordSiege=false
            this.showDebutIntervention=false
            this.showFinIntervention=false
          }
          break;
          case 'SPS' : {
            this.showNumAutorisation=true
            this.showAdresseStructure=true

            this.showNumAgrement=false
            this.showAccordSiege=false
            this.showDebutIntervention=false
            this.showFinIntervention=false
          }
          break;
          case 'PTF' : {
            this.showNumAgrement=true
            this.showAccordSiege=true
            this.showNumAutorisation=false
            this.showDebutIntervention=true
            this.showFinIntervention=true
            this.showAdresseStructure=true
          }
          break;
          case 'ONG' : {
            this.showNumAgrement=true
            this.showAdresseStructure=true

            this.showNumAutorisation=false
            this.showAccordSiege=false
            this.showDebutIntervention=false
            this.showFinIntervention=false
          }
          break;
          case 'RSE' : {
            this.showAdresseStructure=true

            this.showNumAutorisation=false
            this.showNumAgrement=false
            this.showAccordSiege=false
            this.showDebutIntervention=false
            this.showFinIntervention=false
          }
          break;
          case 'CT' : {
            this.showAdresseStructure=false

            this.showNumAutorisation=false
            this.showNumAgrement=false
            this.showAccordSiege=false
            this.showDebutIntervention=false
            this.showFinIntervention=false
          }
          break;
        }
        /* let checkSource = this.model.source_financements.filter(item => item.libelle_source === 'EPS').length;
        if(checkRole==1){
          this.showTypeSource=true
        }
        else
        this.showTypeSource=false */
        console.log('************',source)
      },
    },
  }
</script>
