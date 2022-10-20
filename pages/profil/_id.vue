<template>
  <v-container pl-0>
    <v-row>
      <v-col md="12" lg="12" sm="12" class="full-height">
          <page-header :items="headerItems"></page-header>
          <v-row text-align="center"
            justify="center">
            <v-col cols="12" md="12" lg="12" sm="12">
              <info-utilisateur></info-utilisateur>
            </v-col>
            <v-col cols="12" md="12" lg="12" sm="12">
              <actions-utilisateur></actions-utilisateur>
            </v-col>
          </v-row>
      </v-col>
    </v-row>
  </v-container>
  
</template>

<script>
import LeftMenu from '@/components/LeftMenu';
import PageHeader from '@/components/PageHeader';
import InfoUtilisateur from '@/components/profil/detail/InfoUtilisateur';
import ActionsUtilisateur from '@/components/profil/detail/ActionsUtilisateur';
  export default {
    layout: "dashboard",
    components: {
      LeftMenu,
      PageHeader,
      InfoUtilisateur,
      ActionsUtilisateur
    },
    data () {
      return {
        leftmenuItems: [
          //{ text: 'Ajouter un utilisateur', icon: 'mdi-account-plus-outline',link:'/utilisateurs/addUser',position:0 },
          { text: 'Accueil', icon: 'mdi-home-outline',link:'/dashboard',name:'voir_dashboard' },
        ],
        headerItems: [
        {
          text: 'Detail utilisateur',
          disabled: true,
          to: '/utilisateurs/94',
          exact: true
        }
        
      ]

    }
  }

}
</script>

<style scoped>

</style>
