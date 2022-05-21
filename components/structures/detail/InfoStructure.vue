<template>
  <v-card class="custom-card-user border-grey">                   
    <v-card-text>
      <v-row>
        <v-col md="3" sm="12" lg="3" text-md-center>
          <!-- <img src="@/static/avatar/user.png" class="user-profil" alt="Espace Senegal Service"> -->
          <div class="headline">
            <v-avatar v-if="detailstructure.avatar" tile style="border: solid 2px #d8d8d8;" size="150px">
              <img :src="detailstructure.avatar" alt="Avatar"/>
            </v-avatar>
            <v-avatar size="100px" v-else>
              <img src="@/static/avatar/default-user.png" alt="Cheikh Gueye"/>
            </v-avatar>
          </div>
        </v-col>
        <v-col md="9" sm="12" lg="9" text-md-left>
          <div class="row">
              <div class="col-md-6 border-left">
                  <!--<p class="info-profil mb-4"><span>Prénom: </span>{{detailstructure.firstname}}</p>
                  <p class="info-profil mb-4"><span>Nom: </span>{{detailstructure.lastname}}</p>-->
                  <p class="info-profil mb-4"><span>Dénomination structure: </span>{{detailstructure.nom_structure}}</p>
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
      detailstructure: 'structures/detailstructure'
    }),
    data: () => ({

    }),
    methods: {
      submitForm(){
        alert('Formulaire soumis')
      },
      retour(){       
          this.$router.push('/structures');
      },
    },
  }
</script>
