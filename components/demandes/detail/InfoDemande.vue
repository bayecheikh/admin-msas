<template>
  <v-card class="custom-card-user border-grey">                   
    <v-card-text>
      <v-row>
        <v-col md="3" sm="12" lg="3" text-md-center>
          <img width="200" src="@/static/avatar/file.png" class="user-profil" alt="Espace Senegal Service">
        </v-col>
        <v-col md="9" sm="12" lg="9" text-md-left >
          <div class="row">
              <div class="col-md-6 border-left">
                  <p class="info-profil mb-4"><span>{{detailDemande && detailDemande.procedure && detailDemande.procedure.description}}</span>
                  </p>
                  <p class="info-profil"><span>Référence :
                      </span>{{detailDemande && detailDemande.reference_dossier}}
                  </p>
                  <p class="info-profil mb-4"><span>Date de création :
                      </span>24-09-2020
                  </p>
                  <p class="info-profil mb-4"><span>Lieu de traitement : </span>{{detailDemande && detailDemande.maison_traitement && detailDemande.maison_traitement.description}}</p>
                  <p class="info-profil mb-4"><span>Lieu de retrait : </span>{{detailDemande && detailDemande.maison_retrait && detailDemande.maison_retrait.description}}</p>
              </div>
              <div class="col-md-6 border-left">
                  <p class="info-profil mb-4"><span>Détail du dossier : </span>lorum ipsum</p>
                  <p class="info-profil mb-4"><span>Etat paiement: </span>{{detailDemande && detailDemande.etat_paiement}}</p>
                  <p class="info-profil mb-4"><span>Etat livraison : </span>{{detailDemande && detailDemande.etat_livraison}}</p>
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
    computed: mapGetters({
      detailDemande: 'demandes/detaildemande'
    }),
    mounted: function() {
      this.getDetail()
    },
    data: () => ({
      model: {
        user: null,
        ess_retrait: null,        
        ess_traitement:null,
        codeProcedure:'',
        service_traitement_id:null,
      },
    }),
    methods: {
      getDetail(){
        let id = this.$route.params.id
          this.progress=true
          this.$essApi.$get('/ess/dossiers/'+id)
        .then(async (response) => {
          console.log('Reponse données reçu +++++ : ', response.dossier)
          this.$store.commit('demandes/initdetail',response.dossier)
        }).catch((error) => {
            console.log('Code error ++++++: ', error?.response?.data?.message)
        }).finally(() => {
            console.log('Requette envoyé ')
            this.progress=false
        });
      },
      submitForm(){
        alert('Formulaire soumis')
      },
      retour(){       
          this.$router.push('/demandes');
      },
    },
  }
</script>