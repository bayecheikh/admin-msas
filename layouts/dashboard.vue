
<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
      color="grey lighten-4"
    >
      <v-sheet
        color="grey lighten-4"
        class="pa-1"
      >
        <nuxt-link class="customTopNav flex text-sm-left" to="/">
        <img src="@/static/logo.png" width="170" alt="Espace Senegal Service">
      </nuxt-link>
      </v-sheet>

      <v-divider></v-divider>
      <v-list shaped>
      <!-- <v-subheader>MENU</v-subheader> -->
      <v-list-item-group        
        color="primary"
      >
        <v-list-item
          v-for="(item, i) in layout"
          :key="i"
          @click="$router.push({ path: item.href })" link 
          active-class="highlighted"
          :class="item.href === $route.path ? 'highlighted' : ''"
        >
          <v-list-item-icon class="mr-3">
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" class="text-menu"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
    </v-navigation-drawer>

    <v-app-bar elevation="0" color="#fff" app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Plateforme de gestion des financements</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-menu class="hidden-sm-and-down"
          offset-y origin="center center" :nudge-right="140" :nudge-bottom="10" transition="scale-transition"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              icon
              v-bind="attrs"
              v-on="on"
            >
              <v-avatar size="30px">
                <img src="@/static/avatar/default-user.png" alt="avatar"/>
              </v-avatar>
            </v-btn>
          </template>
          <template>
            <div class="pop-user">
              <div class="pop-user-top">
                <v-card
                  class="d-flex align-center flex-column mb-3"
                  flat
                  tile
                >
                    <v-avatar size="60px">
                      <img src="@/static/avatar/default-user.png" alt="avatar"/>
                    </v-avatar>
                </v-card>
                <v-card
                  class="d-flex align-center flex-column"
                  flat
                  tile
                >
                  <div class=""><h5>{{loggedInUser && loggedInUser.name}}</h5> </div>
                  <div class=""><p class="pb-0 mb-2">{{loggedInUser && loggedInUser.email}}</p></div>
                </v-card>
                <v-card
                  class="d-flex align-center flex-column mt-1"
                  flat
                  tile
                >
                  <nuxt-link class="customTopNav pop-user-button flex text-sm-center" to="#">
                  Parametres
                  </nuxt-link>
                </v-card>
              </div>
              <v-card
                class="d-flex align-center flex-column pt-0 pb-0"
                color="border-top"
                flat
                tile
              >
              <v-card-actions v-if="isAuthenticate" class="py-0">
                <v-btn text color="#000" deprmsased @click="logout" :loading="loading">
                  <v-icon left>
                    mdi-logout
                  </v-icon>Deconnexion
                </v-btn>               
              </v-card-actions>
              <!-- <v-card-actions>
                <v-btn flat color="none" @click="logout" :loading="loading">Deconnexion</v-btn>               
              </v-card-actions> -->
                
              </v-card>
            </div>
          </template>
      </v-menu>
    </v-app-bar>
    <v-main>
      <!--  -->
      <nuxt/>
    </v-main>
    <v-footer height="auto" class="white pa-3">
      <span class="caption">&copy; {{ new Date().getFullYear() }}</span>
      <v-spacer></v-spacer>
      <span class="caption mr-1">Ministrère de la santé et de l'action sociale, Tous droits réservés</span>
    </v-footer>
  </v-app>
</template>

<script>
  import AppToolbar from '@/components/AppToolbar'
  export default {
    /* middleware: 'auth', */
    middleware({redirect,$getToken,$getUser,$isLogged,$loggout }) {
      console.log('token: ++++++++++ ',$getToken())
      if ($getToken()==null || $getUser()==null || $isLogged()==null || $isLogged()==false) {
        $loggout()
        return redirect('/login')
      }
    },
    components: {
      AppToolbar
    },
    mounted: function() {
      this.layout= this.$getUserMenu()
      this.isAuthenticate = this.$isLogged()
      this.loggedInUser = this.$getUser() 
    },
    data: () => ({
      layout:[],
      loading: false,
      isAuthenticate:false,
      loggedInUser:null,
      cards: ['Today', 'Yesterday'],
      drawer: null,
      links: [
        ['mdi-inbox-arrow-down', 'Inbox'],
        ['mdi-send', 'Send'],
        ['mdi-delete', 'Trash'],
        ['mdi-alert-octagon', 'Spam'],
      ],
    }),
    methods: {
      async logout() {
        try {
            this.loading = true; 
            //this.$store.dispatch('toast/getMmsasage',{type:'procmsasing',text:'Deconnexion en cours ...'})
            await this.$msasApi.$post('/logout').then(async (response) => { 
            this.$loggout()
            this.loading = false;
            //this.$store.dispatch('toast/getMmsasage',{type:'succmsas',text:'Deconnexion réussie'})   
            this.$router.push('/login');
          })
        } catch (e) {
          this.$store.dispatch('toast/getMmsasage',{type:'error',text:e})
          console.log(e)
          this.loading = false;
        }
      },
    }
  }
</script>

<style scoped>
.container {
    width: 100%;
    padding: 12px;
    margin-right: auto;
    margin-left: auto;
    max-width: 100%;
    background-color: white;
}
.highlighted{
  color: #1976d2 !important;
  background: #1976d22d;
}
.highlighted .v-list-item__icon .v-icon{
  color: #1976d2 !important;
}
.text-menu{
  font-size: 13px !important;
}
</style>