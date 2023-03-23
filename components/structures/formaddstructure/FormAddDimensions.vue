<template>
    <div>
        <h2 class="mb-5 primary custom-title-h2">Dimensions</h2>
        <v-card flat class="mx-auto mb-5 pl-10 pt-5 pr-10 pb-5">
          <v-row class="d-flex justify-content-between">
            <v-col
              md="4"
              lg="4"
              sm="12"
              v-for="item in listdimensions"
              :key="item.id"
            >
              <v-checkbox
                v-model="selectedDimensions"
                @change="(event) => updateFormDataDimensions('dimensions', event)"
                :label="item.libelle_dimension"
                :value="item.id"
              ></v-checkbox>
            </v-col>
          </v-row>
          <div v-if="!$v.selectedDimensions.required">
            <span class="errorcustom">La dimension est obligatoire</span>
          </div>
        </v-card>
    </div>
  </template>
  
  <script>
  import { mapGetters } from 'vuex'
  import { required } from 'vuelidate/lib/validators';
  import { validationMixin } from 'vuelidate';
  
    export default {
      mixins: [validationMixin],
      
      methods: {
         updateFormDataDimensions(field, value) {
          this.$store.commit('structures/updateFormDataDimensions', { field, value })
           this.$v.$touch();
          this.$store.commit('structures/setvalidation', this.$v)
        }
      },
      mounted: function() {
        this.model.dimensions = this.dimensions
      },
      computed: {
        ...mapGetters({
            listdimensions: 'dimensions/listdimensions',
      })},
      validations: {
        selectedDimensions: {
            required,
        }, 
        },
      data: () => ({
      
        selectedDimensions: [],
        model: {
           dimensions: ''
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