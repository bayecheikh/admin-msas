<template>
  <v-container pl-0>
    <v-row>
      <v-col md="2" lg="2" sm="12">
        <v-container pl-0>
          <left-menu :items="leftmenuItems"></left-menu>
        </v-container>
      </v-col>
      <v-col md="9" lg="9" sm="12" class="full-height">
          <page-header :items="headerItems"></page-header>
          <list-user></list-user>
      </v-col>
    </v-row>
  </v-container>
  
</template>

<script>
import LeftMenu from '@/components/LeftMenu';
import PageHeader from '@/components/PageHeader';
import ListUser from '@/components/utilisateurs/ListUser'
import { mapActions} from 'vuex'
  export default {
    layout: "dashboard",
    middleware: function ({redirect,$hasPermission}) {
      if(!$hasPermission('gerer-utilisateurs')){
        return redirect('/')
      }
    },
    components: {
      LeftMenu,
      PageHeader,
      ListUser
    },
    mounted: function() {
      /* this.$store.dispatch('utilisateurs/getList',1) */
    },
    data () {
      return {
        selectedItem: 0,
        leftmenuItems: [
          { text: 'Ajouter un utilisateur', icon: 'mdi-account-plus-outline',link:'/utilisateurs/addUser',position:0 },
          { text: 'Liste des utilisateurs', icon: 'mdi-account-group-outline',link:'/utilisateurs',position:1  },
          /* { text: 'Liste des roles', icon: 'mdi-lock',link:'/roles',position:1  }, */
          /* { text: 'Liste des permissions', icon: 'mdi-lock',link:'/permissions',position:1  } */
        ],
        headerItems: [
          {
            text: 'Liste des utilisateurs',
            disabled: true,
            to: '/utilisateurs',
            exact: true
          }
        ]
      }
    }

  }
</script>

<style scoped>

</style>
