<template>

  <v-container p-6>
    <page-header :items="headerItems" class="pb-4"></page-header>
    <v-card class="mx-auto">  
      <v-container pl-10 pt-10 pb-10 pr-10>
          <v-row align="center"
            justify="center">
            <v-col cols="12" md="12" lg="12" sm="12">
              <info-utilisateur></info-utilisateur>
            </v-col>
            <v-col cols="12" md="12" lg="12" sm="12">
              <actions-utilisateur></actions-utilisateur>
            </v-col>
          </v-row>
      </v-container>        
    </v-card>
  </v-container>
  
</template>

<script>
import LeftMenu from '@/components/LeftMenu';
import PageHeader from '@/components/PageHeader';
import InfoUtilisateur from '@/components/utilisateurs/detail/InfoUtilisateur';
import ActionsUtilisateur from '@/components/utilisateurs/detail/ActionsUtilisateur';
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
          { text: 'Ajouter un utilisateur', icon: 'mdi-account-plus-outline',link:'/utilisateurs/addUser',position:0 },
          { text: 'Liste des utilisateurs', icon: 'mdi-account-group',link:'/utilisateurs',position:1  }
        ],
        headerItems: [
        {
          text: 'Utilisateurs',
          disabled: false,
          to: '/utilisateurs',
          exact: true
        },
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
