<template>
<div>
<v-card-title class="col-3 pb-0">
    <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Rechercher"
        outlined
        rounded
        dense
        hide-details
      ></v-text-field>
</v-card-title>
<v-data-table
      v-model="selected"
      :headers="headers"
      :items="tab=='tout'?listDemandes : listDemandes.filter(demande => demande.etat_dossier === tab)"
      :single-select="singleSelect"
      item-key="id"
      show-select 
      :items-per-page="15"
      class="flat pt-4"
      :loading="progress"
      loading-text="Loading... Please wait"
      hide-default-footer
      :search="search"
    >
      <template v-slot:top="">
        <v-row class="mb-1 border-bottom-small d-flex">
          <v-col md="6" sm="12" lg="6" class="pb-0 pt-4">
            <div class="row">
              <!-- <v-btn icon class="col-3" v-on:click="visualiser()">
            <v-icon left class="font-small">
              mdi-file-document-outline
            </v-icon>
            <span class="font-small">Visualiser</span>
          </v-btn> 
          <v-btn icon class="col-3" v-on:click="modifier()">
            <v-icon left class="font-small">
              mdi-square-edit-outline
            </v-icon>
            <span class="font-small">Modifier</span>
          </v-btn>  -->
              <v-btn icon v-if="$hasRole('admin')" class="col-3" v-on:click="supprimer()">
                <v-icon left class="font-small"> mdi-trash-can-outline </v-icon>
                <span class="font-small">Supprimer</span>
              </v-btn>
              <v-btn icon class="col-3" v-on:click="exporter()">
            <v-icon left class="font-small">
              mdi-file-export-outline
            </v-icon>
            <span class="font-small">Exporter</span>
          </v-btn>
            </div>
          </v-col>
         <v-col md="6" sm="12" lg="6" class="pt-0 pb-2 align-right-pagination">
            <v-pagination
              v-model="page"
              :length="totalPages"
              total-visible="6"
              next-icon="mdi-menu-right"
              prev-icon="mdi-menu-left"
              @input="handlePageChange"
            ></v-pagination>
          </v-col>
           <div class="text-center">
      <v-dialog v-model="dialog" width="500">
        <v-card>
          <v-card-title class="text-h5"> Confirmation </v-card-title>
          <v-card-text>Voulez-vous supprimer cet element ?</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary darken-1"
              text
              @click="dialog = false"
              outlined
            >
              Annuler
            </v-btn>
            <v-btn color="red darken-1" text @click="deleteItem" outlined>
              Supprimer définitivement
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
        </v-row>
      </template>

      <template v-slot:[`item.actions`]="{ item }">
        <v-menu bottom left>
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" icon v-bind="attrs" v-on="on">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>

          <v-list shaped>
            <v-item-group>
              <v-list-item @click="visualiserItem(item)" link class="custom-v-list-action pl-2 pr-1">
                <v-list-item-title>
                  <v-icon
                    small
                    class="mr-2"
                    
                  >
                    mdi-information-outline
                  </v-icon>Détail
                </v-list-item-title>
              </v-list-item>
              <v-list-item v-if="$hasRole('admin')" @click="editItem(item)" link class="custom-v-list-action pl-2 pr-1">
                <v-list-item-title> 
                  <v-icon small class="mr-2"> mdi-pencil-outline </v-icon
                  >Modifier
                </v-list-item-title>
              </v-list-item>
              <v-list-item v-if="$hasRole('admin')" @click="opendialog(item)" class="custom-v-list-action pl-2 pr-1" >
                <v-list-item-title>
                  <v-icon small class="mr-2" v-bind="attrs" v-on="on">
                    mdi-delete-outline </v-icon
                  >Supprimer
                </v-list-item-title>
              </v-list-item>
            </v-item-group>
          </v-list>
        </v-menu>
      </template>
    </v-data-table>
</div>
</template>
<script>
import { mapMutations, mapGetters } from 'vuex'
  export default {
    mounted: function() {
      this.getList(1)
    },
    computed: mapGetters({
      listDemandes: 'demandes/listdemandes',
      headers: 'demandes/headerdemandes',
      detailUsager: 'usagers/detailusager'
    }),
    props: ['tab'],
    metaInfo () {
      return {
        tab: this.tab,
      }
    },
    methods: {
      getList(page){
          let idUsager = this.$route.params.id
          let emailUsager = this.detailUsager.email
          let url = ''

          console.log('ID usager ++55555555555555555555555+++ : ', idUsager)
          console.log('email usager ++55555555555555555555555+++ : ', emailUsager)

          if(idUsager!=undefined & emailUsager!=undefined)
          url = '/ess/dossiers/user/'+emailUsager+'?page='+page
          else
          url = '/ess/dossiers?page='+page

          this.progress=true
          this.$essApi.$get(url)
        .then(async (response) => {
          console.log('Reponse données reçu +++++ : ', response.data)
          let totalPages = Math.ceil(response.meta.total / response.meta.per_page)
          this.totalPages=totalPages
          this.$store.dispatch('demandes/getList',response.data)
        }).catch((error) => {
             /* this.$toast.global.my_error().goAway(1500) */ //Using custom toast
             this.$toast.error(error?.response?.data?.message).goAway(3000)
            console.log('Code error ++++++: ', error?.response?.data?.message)
        }).finally(() => {
            console.log('Requette envoyé ')
            this.progress=false
        });
        console.log('total items++++++++++',this.paginationusager)
      },
      handlePageChange(value){
        this.getList(value)
      },
      visualiserItem (item) {   
        this.$store.dispatch('demandes/getDetail',item)
        this.$router.push('/demandes/detail/'+item.id);
      },
      editItem (item) {   
        this.$store.dispatch('demandes/getDetail',item)
        this.$router.push('/demandes/modifier/'+item.id);
      },
      async deleteItem () {
        /* this.$toast.show('Supression en cours ...') */
        this.dialog=false   
        /* this.$store.dispatch('toast/getMessage',{type:'processing',text:'Traitement en cours ...'}) 
        this.$essApi.$delete('/delete-users/'+this.activeItem.id)
        .then(async (response) => { 
            this.$store.dispatch('usagers/deleteUsager',this.activeItem.id)
            this.$store.dispatch('toast/getMessage',{type:'success',text:response || 'Suppression réussie'})
            }).catch((error) => {
              this.$store.dispatch('toast/getMessage',{type:'error',text:error || 'Echec de la suppression'})
              console.log('Code error ++++++: ', error)
            }).finally(() => {
              
            console.log('Requette envoyé ')
        }); */
      },
      opendialog (item) {
        this.dialog=true
        this.activeItem=item
      },
      exporterItem (item) {
        alert('Exporter '+item.username)
      },
      visualiser(){
        if(this.selected.length!=1)
        alert('Veuillez selectionner un element')
        else{
          let demande = this.selected.map(function(value){ return value})[0]
          this.$store.commit('demandes/initdetail',demande)
          this.$router.push('/demandes/detail/'+demande.name);
        }
      },
      modifier(){
        if(this.selected.length!=1)
        alert('Veuillez selectionner un element')
        else{
          let demande = this.selected.map(function(value){ return value})[0]
          this.$store.commit('demandes/initdetail',demande)
          this.$router.push('/demandes/modifier/'+demande.name);
        }
      },
      supprimer(){
        if(this.selected.length>=1)
        alert('Supprimer '+this.selected.map(function(value){ return value.name}))
        else
        alert('Veuillez selectionner un element')
      },
      exporter(){
        if(this.selected.length>=1)
        alert('Exporter '+this.selected.map(function(value){ return value.name}))
        else
        alert('Veuillez selectionner un element')
      }
    },
    data: () => ({
      dialog: false,
      progress:true,
      selected: [],
      search:'',
      items:[],
      page: 1,
      totalPages:1,
      pageCount: '',
      itemsPerPage:'',
      path:'',
      totalItems:0,
      options: {},
      selectedItem:0,
      activeItem:{}
    })
  }
</script>
<style scoped>
.border-bottom-small{
  border-bottom: solid 1px #80808052;
}
</style>