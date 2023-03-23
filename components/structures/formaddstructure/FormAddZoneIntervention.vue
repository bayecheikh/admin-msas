<template>
    <div>
        <h2 class="mb-5 primary custom-title-h2" v-if="this.$store.state.structures.showzoneintervention">Zone d'intervention</h2>
        <v-card flat class="mx-auto mb-5 pl-10 pt-5 pr-10 pb-5" v-if="this.$store.state.structures.showzoneintervention">
          <v-row>
            <v-col md="12" lg="12" sm="12">
              <v-radio-group
                :v-model="selectedType_zone_interventions"
                :rules="this.$store.state.structures.showzoneintervention?rules.zoneInterventionRules:null"
                @change="changeType_zone_intervention"
                row
              >
                <v-radio
                  v-for="item in listtypezones"
                  :key="item.id"
                  :label="item.libelle_zone"
                  :value="item"
                ></v-radio>
              </v-radio-group>
            </v-col>
          </v-row>
          <v-row v-if="showRegion">
            <v-col md="13" lg="12" sm="12">
              <v-expansion-panels
                v-for="(item,i) in listregions"
                :key="i"
                class="mb-2"
              >
                <v-expansion-panel>
                  <v-expansion-panel-header>
                    <v-checkbox
                      v-model="selectedRegions"
                      @change="(event) => updateFormDataZoneIntervention('regions', event)"
                      :label="item.nom_region"
                      :value="item.id"
                    ></v-checkbox>
                  </v-expansion-panel-header>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-col>
          </v-row>
          <div v-if="selectedType_zone_interventions && selectedType_zone_interventions === 2 && !$v.selectedRegions.required">
            <span class="errorcustom">La région est obligatoire</span>
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
      components: {
      },
      mounted: function() {
     
        this.model.type_zone_interventions = this.listtypezones
        this.model.dimensions = this.dimensions
        this.model.source_financements = this.listsources
        this.model.type_sources = this.listsources.type_sources
        this.model.regions = this.listregions
        this.model.departements = this.listdepartements
      },
      computed: {
        ...mapGetters({
        listtypezones: 'type-zones/listtypezones',
        listsources: 'sources/listsources',
        listregions: 'regions/listregions',
        listdepartements: 'departements/listdepartements',
        listdimensions: 'dimensions/listdimensions',
      })},
      validations: {
        selectedRegions: {
          required: function(value) {
            if (this.selectedType_zone_interventions === 2) {
              return required(value)
            } else {
              return true
            }
          }
      },
      selectedDimensions: {
        required,
      },
     
    },
      data: () => ({
        listDepartements:[],
        filename : '',
        loading: false,
        message:null,
        color:null,
        valid: true,
        showRegionMedical: false,
        showDistrict: false,
        showZoneIntervention: false,
        showRegion: false,
        message:null,
        selectedRegions: [],
        selectedDepartements: [],
        selectedType_zone_interventions: [],
        model: {
          
        },
        
        rules:{
       
          zoneInterventionRules: [
          v => !!v || 'La zone d\'intervention est obligatoire'
          ],
        
          districtRules: [
          v => !!v || 'Le district est obligatoire',
          ],
          regionRules: [
          v => !!v || 'La région est obligatoire',
          ],
        },
      }),
      methods: {
       
        async updateFormDataZoneIntervention(field, value) {
          this.$store.commit('structures/updateFormDataZoneIntervention', { field, value})
         await this.$v.$touch();
          this.$store.commit('structures/setvalidation', this.$v)
        },
        async changeType_zone_intervention(e) {
          let field = "type_zone_interventions"
          let value = e.id
          this.$store.commit('structures/updateFormDataZoneIntervention', { field, value })
          console.log('************',e)
          this.selectedType_zone_interventions = e.id
  
          switch(e.libelle_zone){
            case 'National' : {
              this.showRegion=false
              this.selectedDepartement = []
              this.selectedRegion = []
            }
            break;
            case 'Régional' : {
              this.showRegion=true
              this.showZoneIntervention=true
            }
            break;
          }
        },
      },
     
    }
  </script>
  
  <style scoped>
  .errorcustom{
    color:#dd2c00 !important;
    background-color: white !important;
  }
  </style>