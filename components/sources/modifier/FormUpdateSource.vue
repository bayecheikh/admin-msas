<template>
<div>
  <v-form class="text-sm-left" v-model="valid" ref="form">
    <v-row>
      <v-col md="6" lg="6" sm="12">
        <v-text-field
          label="Libellé"
          outlined dense
          v-model="model.libelle_source"
          :rules="rules.libelle_sourceRules"
        ></v-text-field>
      </v-col>
      <!-- <v-col md="6" lg="6" sm="12">
        <v-text-field
          label="Rang (Sur la liste)"
          outlined dense
          v-model="model.status"
          :rules="rules.libelle_sourceRules"
        ></v-text-field>
      </v-col> -->
    </v-row>
    <v-row class="my-0">
      <v-col md="12" lg="12" sm="12" class="my-0 py-0">
        <template>
          <v-card-title class="pl-0 pr-0">
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Rechercher un type de source"
              outlined
              dense
              hide-details
              clearable
            ></v-text-field>
          </v-card-title>
          <v-data-table
            v-model="selected"
            :headers="headers"
            :items="listtypesources"
            :loading="listtypesources.length?false:true" 
            loading-text="Loading... Please wait"
            :single-select="singleSelect"
            item-key="libelle_type_source"
            show-select
            class="elevation-1"
            :search="search"
          >
          </v-data-table>
        </template>
      </v-col>
    </v-row>

    <v-btn
      :loading="loading"
      :disabled="!valid"
      depressed
      class="mr-4 text-white mt-4" color="#1B73E8"
      @click="submitForm"
    >
      Enregistrer
    </v-btn>
  </v-form>
</div>
</template>

<script>
import Notification from '@/components/Notification'
import { mapMutations, mapGetters } from 'vuex'
  export default {
    components: {
      Notification
    },
    mounted: function() {
      this.model.id = this.detailsource.id
      this.model.libelle_source = this.detailsource.libelle_source
      this.selected = this.detailsource.type_sources
    },
    computed: mapGetters({
      detailsource:'sources/detailsource',
      listtypesources: 'typesources/listtypesources',
    }),
    data: () => ({
      loading: false,
      message:null,
      color:null,
      valid: true,
      search: '',
      selected: [],
      search:'',
      selectedItem: 0,
      headers : [
        {
            text: 'Type source',
            align: 'start',
            sortable: true,
            value: 'libelle_type_source',
        }
      ],
      valid: true,
      model: {
        id:null,
        libelle_source: '',
        status: '',
        description: ''
      },
      rules:{
        libelle_sourceRules: [
        (v) => !!v || 'Le libellé est obligatoire',
        (v) => (v && v.length <= 100) || "Le libellé ne doit pas dépasser 100 caractères",
        (v) => (v && v.length >= 2) || "Le libellé doit contenir au moins 2 caractères"
        ],
        descriptionRules: [
          v => !!v || 'Nom est obligatoire'
        ],
      },
    }),
    methods: {
      submitForm () {
        //this.loading = true;
        let validation = this.$refs.form.validate()
        let selectedtype_sources = this.selected.map((item)=>{return item.id})
        let id = this.model.id
        console.log('Donées formulaire ++++++ : ',{...this.model,type_sources:selectedtype_sources})
        
        validation && this.$msasApi.put('/source_financements/'+id, {...this.model,type_sources:selectedtype_sources})
          .then((res) => {    
            this.$store.dispatch('toast/getMessage',{type:'success',text:res.data.message || 'Modification réussie'})
            this.$router.push('/sources');
          })
          .catch((error) => {
              console.log('Code error ++++++: ', error)
              this.$store.dispatch('toast/getMessage',{type:'error',text:error || 'Echec de l\'ajout '})
          }).finally(() => {
            this.loading = false;
            console.log('Requette envoyé ')
        });
      },
      resetForm () {
        this.$refs.form.reset()
      },
      resetValidationForm () {
        this.$refs.form.resetValidation()
      },
    }
  }
</script>