<template>
    <div>
        <h2 class="mb-5 primary custom-title-h2">Informations générales</h2>
        <v-card flat class="mx-auto mb-5 pl-10 pt-10 pr-10 pb-5">
          <v-row>
            <v-col md="4" lg="4" sm="12">
              <v-text-field
                label="Dénomination"
                outlined
                dense
                v-model="model.nom_structure"
                @change="(event) => updateFormDataInfosGenerales('nom_structure', event)"
                :rules="rules.nom_structureRules"
              ></v-text-field>
            </v-col>
            <v-col md="4" lg="4" sm="12">
              <v-select
                :items="itemsNatureStructure"
                v-model="model.donneur_receveur_mixte"
                @change="(event) => updateFormDataInfosGenerales('donneur_receveur_mixte', event)"
                :rules="rules.nature_structureRules"
                label="Nature structure"
                item-text="libelle"
                item-value="id"
                outlined
                dense
              ></v-select>
            </v-col>
            <v-col lg="4" md="4" sm="12">
              <v-autocomplete
                v-model="SelectedSource_financements"
                :items="listsources"
                :rules="rules.typeStructureRules"
                outlined
                dense
                label="Type de structure"
                item-text="libelle_source"
                item-value="id"
                return-object
                @change="changeSource_financement"
              >
              </v-autocomplete>
            </v-col>
            <v-col lg="4" md="4" sm="12">
              <v-autocomplete
              
                :items="listTypesSources"
                :rules="showTypeSource?rules.sousTypeRules:null"
                outlined
                dense
                label="Sous-type"
                item-text="libelle_type_source"
                item-value="id"
                return-object
                @change="changeType_source"
                v-if="showTypeSource"
              >
              </v-autocomplete>
             
            </v-col>
            <v-col lg="4" md="4" sm="12" v-if="showRegionMedical">
              <v-autocomplete
                :rules="showRegionMedical?rules.regionRules:null"
                :items="listregions"
                outlined
                dense
                label="Région"
                item-text="nom_region"
                item-value="id"          
                return-object
                @change="changeRegion"
              >
              </v-autocomplete>
            </v-col>
            <v-col lg="4" md="4" sm="12" v-if="showDistrict">
              <v-autocomplete
                v-model="SelectedDepartements"
                @change="(event) => updateFormDataInfosGenerales('departements', event)"
                :rules="showDistrict?rules.districtRules:null"
                :items="listDepartements"
                outlined
                dense
                label="District"
                item-text="nom_departement"
                item-value="id"
              >
              </v-autocomplete>
            </v-col>
            <v-col md="6" lg="6" sm="12" v-if="showNumAutorisation">
              <v-text-field
                label="N° autorisation"
                outlined
                dense
                v-model="model.numero_autorisation"
                @change="(event) => updateFormDataInfosGenerales('numero_autorisation', event)"
                :rules="showNumAutorisation?rules.autorisationRules:null"
              ></v-text-field>
            </v-col>
            <v-col md="6" lg="6" sm="12" v-if="showNumAgrement">
              <v-text-field
                label="N° agrément"
                outlined
                dense
                v-model="model.numero_agrement"
                @change="(event) => updateFormDataInfosGenerales('numero_agrement', event)"
                :rules="showNumAgrement?rules.agrementRules:null"
              ></v-text-field>
            </v-col>
            <v-col md="6" lg="6" sm="12" v-if="showAccordSiege">
              <v-flex>
                <v-btn
                  color="grey"
                  class="white--text"
                  @click="$refs.file.click()"
                  depressed
                >
                  Accord de siège
                  <v-icon right dark> mdi-cloud-upload </v-icon>
                </v-btn>
              </v-flex>
              <v-flex>{{filename}}</v-flex>
              <input
                type="file"
                id="file"
                name="accord_siege"
                ref="file"
                v-on:change="handleFileUpload"
                style="display: none"
              />
            </v-col>
            <v-col lg="6" sm="12" md="6" v-if="showDebutIntervention">
              <v-menu
                v-model="menu1"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="model.debut_intervention"
                    label="Début de l'intervention"
                    :rules="showDebutIntervention?rules.debutInterventionRules:null"
                    append-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    outlined
                    dense
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="model.debut_intervention"
                  @change="(event) => updateFormDataInfosGenerales('debut_intervention', event)"
                  @input="menu1 = false"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <v-col lg="6" sm="12" md="6" v-if="showFinIntervention">
              <v-menu
                v-model="menu2"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="model.fin_intervention"
                    label="Fin de l'intervention"
                    :rules="showFinIntervention?rules.finInterventionRules:null"
                    append-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    outlined
                    dense
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="model.fin_intervention"
                  @change="(event) => updateFormDataInfosGenerales('fin_intervention', event)"
                  @input="menu2 = false"
                ></v-date-picker>
              </v-menu>
            </v-col>
          </v-row>
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
     
    },
      data: () => ({
        itemsNatureStructure:[{id:'Donneur',libelle:'Bailleur'},{id:'Receveur',libelle:'Récipiendaire'},{id:'Mixte',libelle:'Mixte'}],
        listDepartements:[],
        filename : '',
        message:null,
        color:null,
        valid: true,
        showStructure: false,
        showTypeSource: false,
        showNumAutorisation: false,
        showAccordSiege: false,
        showNumAgrement: false,
        showAdresseStructure: false,
        showRegionMedical: false,
        showDistrict: false,
        showZoneIntervention: false,
        showRegion: false,
        selectedSource_financements: [],
        selectedType_sources: [],
        selectedRegions: [],
        selectedDepartements: [],
        selectedDimensions: [],
        selectedType_zone_interventions: [],
        model: {
          nom_structure:'',
          donneur_receveur_mixte:[],
          numero_autorisation:'',
          accord_siege:'',
          numero_agrement:'',
          adresse_structure:'',
          debut_intervention:'',
          fin_intervention:'',
          telephone_structure:'',
          email_structure:'',
        },
        
        rules:{
          debutInterventionRules: [
            v => !!v || 'La date de début de l\'intervention est obligatoire'
          ],
         
          finInterventionRules: [
            v => !!v || 'La date de fin de l\'intervention est obligatoire'
          ],
          zoneInterventionRules: [
          v => !!v || 'La zone d\'intervention est obligatoire'
          ],
         
          nom_structureRules: [
            v => !!v || 'La dénomination est obligatoire',
            (v) => (v && v.length <= 100) || "La dénomination ne doit pas dépasser 100 caractères",
            (v) => (v && v.length >= 2) || "La dénomination doit contenir au moins 2 caractères"
          ],
          typeStructureRules : [
          v => !!v || 'Le type de structure est obligatoire'
          ],
          nature_structureRules : [
          v => (v && !!v.length)|| 'La nature de la structure est obligatoire'
          ],
          sousTypeRules: [
          v => !!v || 'Le sous-type est obligatoire'
          ],
          agrementRules: [
            v => !!v || 'Le numéro d\'agrément est obligatoire'
          ],
          districtRules: [
          v => !!v || 'Le district est obligatoire',
          ],
          regionRules: [
          v => !!v || 'La région est obligatoire',
          ],
          autorisationRules: [
          v => !!v || 'Le numéro d\'autorisation est obligatoire',
          ],
        
        },
        date1: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      date2: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      menu1: false,
      menu2: false,
      imageData:null,
      }),
      methods: {
       
        updateFormDataInfosGenerales(field, value) {
          this.$store.commit('structures/updateFormDataInfosGenerales', { field, value })
        },
  
        updateShowZoneIntervention(value) {
            this.$store.commit('structures/setShowZoneIntervention', value)
        },
        updateShowAdresseStructure(value) {
            this.$store.commit('structures/setShowAdresseStructure', value)
        },
        
          handleFileUpload(e){
        //Recupère le fichier
        const input = this.$refs.file
        const files = input.files

        //Recupère l'extension
        let idxDot = files[0]?.name.lastIndexOf(".") + 1;
        let extFile = files[0]?.name.substr(idxDot, files[0].name.length).toLowerCase();
        let size = files[0]?.size/1024/1024 //La taille en Mbit
        console.log('Size-------------- ',size)
        if(files.length!=0){
          if (size <= 5 && (extFile=="jpg" || extFile=="jpeg" || extFile=="png" || extFile=="pdf" || extFile=="doc" || extFile=="docx")){
            this.model.accord_siege = files[0];
            let value = this.model.accord_siege
            let field = "accord_siege"
          this.$store.commit('structures/updateFormDataInfosGenerales', { field, value  })
            this.filename = files[0].name
          }else{
            alert("Seul les fichiers jpg/jpeg/png/pdf/doc/docx et de taille inférieur à 5Mb sont acceptés!");
          }
        }
      },
        async changeRegion(value) {
          
          //this.selectedRegions= []
          console.log('region id +++++ ',value)
          console.log(' departements +++++ ',this.listdepartements)
          //this.listdepartements = this.listdepartements.filter(item => item.region[0] === value);
          this.listDepartements = value?.departements
          this.selectedRegions=[value.id]
          //this.selectedRegions.push(value.id)
          
        },
       
        async changeSource_financement(source) {
          let field = "source_financements"
          let value = source.id
          this.$store.commit('structures/updateFormDataInfosGenerales', { field, value })
          this.showTypeSource=true
          this.selectedSource_financements = source
          this.listTypesSources = source.type_sources
          this.selectedType_sources = []
  
          switch(source.libelle_source){
            case 'EPS' : {
              console.log('************',this.showNumAutorisation)
              this.updateShowAdresseStructure(true)
              this.showRegionMedical=true
              this.showDistrict=true
  
              this.showNumAutorisation=false
              this.showNumAgrement=false
              this.showAccordSiege=false
              this.showDebutIntervention=false
              this.showFinIntervention=false
              this.updateShowZoneIntervention(false)
            }
            break;
            case 'SPS' : {
              this.showNumAgrement=false
       
              this.updateShowAdresseStructure(true)
              this.updateShowZoneIntervention(true)
  
            
              this.showAccordSiege=false
              this.showDebutIntervention=false
              this.showNumAutorisation=true
            }
            break;
            case 'PTF' : {
              this.showNumAutorisation=false
             
              this.showAccordSiege=true
              this.updateShowZoneIntervention(true)
              this.showDebutIntervention=true
              this.showFinIntervention=true
              this.updateShowAdresseStructure(true)
  
              this.showRegionMedical=false
              this.showDistrict=false
              this.showNumAgrement=true
            }
            break;
            case 'ONG' : {
              this.showNumAutorisation=false
              
              this.updateShowAdresseStructure(true)
              this.updateShowZoneIntervention(true)
  
  
       
              this.showAccordSiege=false
              this.showDebutIntervention=false
              this.showFinIntervention=false
              this.showRegionMedical=false
              this.showDistrict=false
              this.showNumAgrement=true
            }
            break;
            case 'RSE' : {
              this.showNumAutorisation=false
              this.showNumAgrement=false
              this.updateShowAdresseStructure(true)
              this.updateShowZoneIntervention(true)
  
  
             
              this.showAccordSiege=false
              this.showDebutIntervention=false
              this.showFinIntervention=false
              this.showRegionMedical=false
              this.showDistrict=false
            }
            break;
            case 'CT' : {
              this.showNumAutorisation=false
              this.showNumAgrement=false
              this.updateShowAdresseStructure(false)
              this.updateShowZoneIntervention(true)
              this.showAccordSiege=false
              this.showDebutIntervention=false
              this.showFinIntervention=false
              this.showRegionMedical=false
              this.showDistrict=false
            }
            break;
          }
          console.log('************',source)
        },
        async changeType_source(type_source) {
          let field = "type_sources"
          let value = type_source.id
          this.$store.commit('structures/updateFormDataInfosGenerales', { field, value })
          this.selectedType_sources = type_source
          console.log('************',type_source)
        },
      },
      metaInfo () {
        return {
          items: this.items,
        }
      }
    }
  </script>
  
  <style scoped>
  .errorcustom{
    color:#dd2c00 !important;
    background-color: white !important;
  }
  </style>