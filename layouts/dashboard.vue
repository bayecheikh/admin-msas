<template>
  <v-app id="inspire">
    <app-toolbar class="app--toolbar"></app-toolbar>
    <v-main class="grey lighten-3">
      <nuxt/>
    </v-main>
    <v-footer height="auto" class="white pa-3">
      <span class="caption">&copy; {{ new Date().getFullYear() }}</span>
      <v-spacer></v-spacer>
      <span class="caption mr-1">Sénégal Services Plateforme, Tous droits réservés</span>
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
</style>