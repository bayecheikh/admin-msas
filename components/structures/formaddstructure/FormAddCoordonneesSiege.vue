<template>
    <div>
        <h2 class="mb-5 primary custom-title-h2">Coordonnées siège</h2>
        <v-card flat class="mx-auto mb-5 pl-10 pt-10 pr-10 pb-5">
       
          <v-row>
            <v-col md="4" lg="4" sm="12" v-if="this.$store.state.structures.showadressestructure">
              <v-text-field
                label="Adresse structure"
                outlined
                dense
                v-model="model.adresse_structure"
                @change="(event) => updateFormDataCoordonneesSiege('adresse_structure', event)"
                :rules="this.$store.state.structures.showadressestructure?rules.adresseRules:null"
              ></v-text-field>
            </v-col>
            <v-col md="4" lg="4" sm="12">
              <v-text-field
                label="Téléphone structure"
                outlined
                dense
                v-model="model.telephone_structure"
                @change="(event) => updateFormDataCoordonneesSiege('telephone_structure', event)"
                :rules="rules.telephoneRules"
              ></v-text-field>
            </v-col>
            <v-col md="4" lg="4" sm="12">
              <v-text-field
                label="E-mail structure"
                outlined
                dense
                v-model="model.email_structure"
                @change="(event) => updateFormDataCoordonneesSiege('email_structure', event)"
                :rules="rules.emailRules"
              ></v-text-field>
            </v-col>
          </v-row>
       
        </v-card>
    </div>
  </template>
  
  <script>
  
    export default {
      methods: {
        updateFormDataCoordonneesSiege(field, value) {
          this.$store.commit('structures/updateFormDataCoordonneesSiege', { field, value })
        }
      },
      data: () => ({
        message:null,
        color:null,
        valid: true,
        showStructure: false,
        showTypeSource: false,
        showAdresseStructure: false,
        model: {
          nom_structure:'',
          adresse_structure:'',
          telephone_structure:'',
          email_structure:'',
        },
        rules:{
          emailRules: [
            v => !!v || 'L\'adresse e-mail est obligatoire',
            v => /.+@.+\..+/.test(v) || 'L\'adresse e-mail doit être valide',
          ],
          telephoneRules: [
          v => !!v || 'Le numéro de téléphone est obligatoire',
          (v) => /^[0-9+ ]+$/.test(v) || "Le numéro de téléphone ne doit contenir que des chiffres, des espaces et des +",
          (v) => (v && v.length >= 8 && v.length <= 20) || "Le numéro de téléphone doit contenir entre 8 et 20 chiffres"
          ],
          adresseRules: [
            v => !!v || 'L\'adresse est obligatoire',
            v => (v && v.length <= 100) || 'L\'adresse doit etre inférieure à 100 caractères',
          ],
        
        },
       
      }),
    }
  </script>
  
  <style scoped>
  .errorcustom{
    color:#dd2c00 !important;
    background-color: white !important;
  }
  </style>