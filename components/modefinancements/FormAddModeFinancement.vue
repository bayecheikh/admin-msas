<template>
  <div>
    <v-form class="text-sm-left" v-model="valid" ref="form">
      <v-row>
        <v-col md="4" lg="4" sm="12">
          <v-text-field
            label="Libellé"
            outlined dense
            v-model="model.libelle"
            :rules="rules.libelleRules"
          ></v-text-field>
        </v-col>
        <v-col md="4" lg="4" sm="12">
          <v-text-field
            label="Slug"
            outlined dense
            v-model="model.slug"
            :rules="rules.slugRules"
          ></v-text-field>
        </v-col>
        <v-col md="4" lg="4" sm="12">
          <v-checkbox
            v-model="model.predefini"
            label="Champ prédéfini"
            :value="true"
          ></v-checkbox>
        </v-col>
      </v-row>
      <v-btn
      :loading="loading"
        :disabled="!valid"
        depressed
        class="mr-4 text-white" color="primary"
        @click="submitForm"
      >
        Enregistrer
      </v-btn>
    </v-form>
  </div>
</template>

<script>
import Notification from '@/components/Notification'
  export default {
    components: {
      Notification
    },
    data: () => ({
      loading: false,
      message:null,
      color:null,
      valid: true,
      selectedItem: 0,
      valid: true,
      model: {
        libelle: '',
        slug: '',
        predefini:false
      },
      rules:{
        libelleRules: [
        (v) => !!v || 'Le libellé est obligatoire',
        (v) => (v && v.length <= 100) || "Le libellé ne doit pas dépasser 100 caractères",
        (v) => (v && v.length >= 2) || "Le libellé doit contenir au moins 2 caractères"
        ],
        slugRules: [
          v => !!v || 'Le slug est obligatoire',
          (v) => (v && v.length >= 2) || "Le slug doit contenir au moins 2 caractères",
          (v) => (v && v.length <= 100) || "Le slug ne doit pas dépasser 100 caractères",
        ],
      },
    }),
    methods: {
      submitForm () {
        this.loading = true;
        let validation = this.$refs.form.validate()
        console.log('Donées formulaire ++++++ : ',{...this.model})
        
        validation && this.$msasApi.post('/ligne_mode_investissements', {...this.model})
          .then((res) => {    
            this.$store.dispatch('toast/getMessage',{type:'success',text:res.data.message || 'Ajout réussi'})
            this.$router.push('/modefinancements');
            
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