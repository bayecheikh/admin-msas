<template>
    <div>
        <h2 class="mb-5 primary custom-title-h2">Personne responsable</h2>
        <v-card flat class="mx-auto mb-5 pl-10 pt-10 pr-10 pb-5">
          <v-row>
            <v-col md="4" lg="4" sm="12">
              <v-text-field
                label="Fonction du responsable"
                outlined
                dense
                v-model="model.fonction_responsable"
                @change="(event) => updateFormDataPersonneResponsable('fonction_responsable', event)"
                :rules="rules.fonctionResponsableRules"
              ></v-text-field>
            </v-col>
            <v-col md="4" lg="4" sm="12">
              <v-text-field
                label="Prénom du responsable"
                outlined
                dense
                v-model="model.firstname_responsable"
                @change="(event) => updateFormDataPersonneResponsable('firstname_responsable', event)"
                :rules="rules.firstnameResponsableRules"
              ></v-text-field>
            </v-col>
            <v-col md="4" lg="4" sm="12">
              <v-text-field
                label="Nom du responsable"
                outlined
                dense
                v-model="model.lastname_responsable"
                @change="(event) => updateFormDataPersonneResponsable('lastname_responsable', event)"
                :rules="rules.lastnameResponsableRules"
              ></v-text-field>
            </v-col>
            <v-col md="4" lg="4" sm="12">
              <v-text-field
                label="Adresse e-mail du responsable"
                @change="(event) => updateFormDataPersonneResponsable('email_responsable', event)"
                outlined
                dense
                v-model="model.email_responsable"
                :rules="rules.emailRules"
              ></v-text-field>
            </v-col>
            <v-col md="4" lg="4" sm="12">
              <v-text-field
                label="Téléphone du responsable"
                outlined
                dense
                v-model="model.telephone_responsable"
                @change="(event) => updateFormDataPersonneResponsable('telephone_responsable', event)"
                :rules="rules.telephoneRules"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card>
  
       
    </div>
  </template>
  
  <script>

    export default {
      methods: {
        updateFormDataPersonneResponsable(field, value) {
          this.$store.commit('structures/updateFormDataPersonneResponsable', { field, value })
        },
      },
      data: () => ({
        filename : '',
        loading: false,
        message:null,
        color:null,
        valid: true,
        model: {
          firstname_responsable:'',
          lastname_responsable:'',
          email_responsable:'',
          telephone_responsable:'',
          fonction_responsable:'',
        },
        
        rules:{

          firstnameResponsableRules: [
            (v) => !!v || 'Le prénom du responsable est obligatoire',
            (v) => /^[a-zA-ZÀ-ÖØ-öø-ÿ\s'-]+$/.test(v) || "Le prénom ne doit contenir que des caractères alphabétiques et des caractères spéciaux tels que des espaces, des tirets et des apostrophes",
            (v) => (v && v.length <= 50) || "Le prénom ne doit pas dépasser 50 caractères",
            (v) => (v && v.length >= 2) || "Le prénom doit contenir au moins 2 caractères"
          ],
          lastnameResponsableRules: [
            (v) => !!v || 'Le nom du responsable est obligatoire',
            (v) => /^[a-zA-ZÀ-ÖØ-öø-ÿ\s'-]+$/.test(v) || "Le nom ne doit contenir que des caractères alphabétiques et des caractères spéciaux tels que des espaces, des tirets et des apostrophes",
            (v) => (v && v.length <= 50) || "Le nom ne doit pas dépasser 50 caractères",
            (v) => (v && v.length >= 2) || "Le nom doit contenir au moins 2 caractères"
          ],
          fonctionResponsableRules: [
            (v) => !!v || 'La fonction du responsable est obligatoire',
            (v) => (v && v.length >= 2) || "La fonction doit contenir au moins 2 caractères"
          ],
          emailRules: [
            v => !!v || 'L\'adresse e-mail est obligatoire',
            v => /.+@.+\..+/.test(v) || 'L\'adresse e-mail doit être valide',
          ],
         
          telephoneRules: [
          v => !!v || 'Le numéro de téléphone est obligatoire',
          (v) => /^[0-9+ ]+$/.test(v) || "Le numéro de téléphone ne doit contenir que des chiffres, des espaces et des +",
          (v) => (v && v.length >= 8 && v.length <= 20) || "Le numéro de téléphone doit contenir entre 8 et 20 chiffres"
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