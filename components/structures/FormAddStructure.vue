<template>
  <div>
    <v-form class="" v-model="valid" ref="form" enctype="multipart/form-data">
      <v-card class="mx-auto mb-5 pl-10 pt-10 pr-10 pb-5">
        <v-row>
          <v-col md="4" lg="4" sm="12">
            <v-text-field
              label="Dénomination"
              outlined
              dense
              v-model="model.nom_structure"
              :rules="rules.nom_structureRules"
            ></v-text-field>
          </v-col>
          <v-col lg="4" md="4" sm="12">
            <v-autocomplete
              v-model="SelectedSource_financements"
              :items="listsources"
              :rules="rules.fournisseur_services_idRules"
              outlined
              dense
              label="Source de financement"
              item-text="libelle_source"
              item-value="id"
              return-object
              @change="changeSource_financement"
            >
            </v-autocomplete>
          </v-col>
          <v-col lg="4" md="4" sm="12">
            <v-autocomplete
              v-model="selectedType_sources"
              :items="selectedType_sources"
              :rules="this.showTypeSource==true?rules.fournisseur_services_idRules:null"
              outlined
              dense
              label="Type"
              item-text="libelle_type_source"
              item-value="id"
              return-object
              @change="changeType_source"
              v-if="showTypeSource"
            >
            </v-autocomplete>
          </v-col>
          <v-col md="4" lg="4" sm="12" v-if="showNumAutorisation">
            <v-text-field
              label="N° autorisation"
              outlined
              dense
              v-model="model.numero_autorisation"
              :rules="rules.firstnameRules"
            ></v-text-field>
          </v-col>
          <v-col md="4" lg="4" sm="12" v-if="showAccordSiege">
            <v-file-input
              v-model="files"
              color="deep-purple accent-4"
              counter
              label="Accord de siège"
              multiple
              placeholder=""
              prepend-icon="mdi-paperclip"
              outlined
              :show-size="1000"
              dense
              v-on:change="handleFileUpload"
            >
              <template v-slot:selection="{ index, text }">
                <v-chip v-if="index < 2" color="black" dark label small>
                  {{ text }}
                </v-chip>

                <span
                  v-else-if="index === 2"
                  class="text-overline grey--text text--darken-3 mx-2"
                >
                  +{{ files.length - 2 }} Fichier(s)
                </span>
              </template>
            </v-file-input>
          </v-col>
          <v-col md="4" lg="4" sm="12" v-if="showNumAgrement">
            <v-text-field
              label="N° agrément"
              outlined
              dense
              v-model="model.numero_agrement"
              :rules="rules.firstnameRules"
            ></v-text-field>
          </v-col>
          <v-col lg="4" sm="12" md="4" v-if="showDebutIntervention">
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
                  label="Dèbut de l'intervention"
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
                @input="menu1 = false"
              ></v-date-picker>
            </v-menu>
          </v-col>
          <v-col lg="4" sm="12" md="4" v-if="showFinIntervention">
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
                @input="menu2 = false"
              ></v-date-picker>
            </v-menu>
          </v-col>
        </v-row>
      </v-card>
      <h2 class="mb-5">Coordonnées siège</h2>
      <v-card class="mx-auto mb-5 pl-10 pt-10 pr-10 pb-5">
        <v-row>
          <v-col md="4" lg="4" sm="12" v-if="showAdresseStructure">
            <v-text-field
              label="Adresse structure"
              outlined
              dense
              v-model="model.adresse_structure"
              :rules="rules.firstnameRules"
            ></v-text-field>
          </v-col>
          <v-col md="4" lg="4" sm="12">
            <v-text-field
              label="Téléphone structure"
              outlined
              dense
              v-model="model.telephone_structure"
              :rules="rules.telephoneRules"
            ></v-text-field>
          </v-col>
          <v-col md="4" lg="4" sm="12">
            <v-text-field
              label="Email structure"
              outlined
              dense
              v-model="model.email_structure"
              :rules="rules.emailRules"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card>
      <h2 class="mb-5">Zone d'intervention</h2>
      <v-card class="mx-auto mb-5 pl-10 pt-5 pr-10 pb-5">
        <v-row>
          <v-col md="12" lg="12" sm="12">
            <v-radio-group
              :v-model="selectedType_zone_interventions"
              :rules="rules.sexeRules"
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
          <v-col md="12" lg="12" sm="12">
            <v-expansion-panels
              v-for="(item,i) in listregions"
              :key="i"
              class="mb-2"
            >
              <v-expansion-panel>
                <v-expansion-panel-header>
                  <v-checkbox
                    v-model="selectedRegions"
                    :label="item.nom_region"
                    :value="item.id"
                  ></v-checkbox>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <div v-for="item in item.departements" :key="item.id">
                    <v-checkbox
                      v-model="selectedDepartements"
                      :label="item.nom_departement"
                      :value="item.id"
                    ></v-checkbox>
                  </div>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-col>
        </v-row>
      </v-card>
      <h2 class="mb-5">Dimensions</h2>
      <v-card class="mx-auto mb-5 pl-10 pt-5 pr-10 pb-5">
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
              :label="item.libelle_dimension"
              :value="item.id"
            ></v-checkbox>
          </v-col>
        </v-row>
      </v-card>
      <h2 class="mb-5">Personne responsable</h2>
      <v-card class="mx-auto mb-5 pl-10 pt-10 pr-10 pb-5">
        <v-row>
          <v-col md="4" lg="4" sm="12">
            <v-text-field
              label="Fonction responsable"
              outlined
              dense
              v-model="model.fonction_responsable"
              :rules="rules.firstnameRules"
            ></v-text-field>
          </v-col>
          <v-col md="4" lg="4" sm="12">
            <v-text-field
              label="Prénom responsable"
              outlined
              dense
              v-model="model.firstname_responsable"
              :rules="rules.firstnameRules"
            ></v-text-field>
          </v-col>
          <v-col md="4" lg="4" sm="12">
            <v-text-field
              label="Nom responsable"
              outlined
              dense
              v-model="model.lastname_responsable"
              :rules="rules.firstnameRules"
            ></v-text-field>
          </v-col>
          <v-col md="4" lg="4" sm="12">
            <v-text-field
              label="Adresse Email responsable"
              outlined
              dense
              v-model="model.email_responsable"
              :rules="rules.emailRules"
            ></v-text-field>
          </v-col>
          <v-col md="4" lg="4" sm="12">
            <v-text-field
              label="Téléphone responsable"
              outlined
              dense
              v-model="model.telephone_responsable"
              :rules="rules.telephoneRules"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card>

      <v-btn
        
        class="mr-4 text-white"
        color="#1B73E8"
        @click="submitForm"
      >
        Enregistrer
      </v-btn>
    </v-form>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
  export default {
    components: {
    },
    mounted: function() {
      /* this.$store.dispatch('roles/getList') */
      /* this.$store.dispatch('structures/getList')
      this.$store.dispatch('fournisseurs/getList') */

      this.model.type_zone_interventions = this.listtypezones
      this.model.dimensions = this.dimensions
      this.model.source_financements = this.listsources
      this.model.type_sources = this.listsources.type_sources
      this.model.regions = this.listregions
      this.model.departements = this.listdepartements
    },
    computed: {
      ...mapGetters({
      /* listroles: 'roles/selectlistroles', */
      /* listfournisseurs: 'fournisseurs/selectlistfournisseurs',
      liststructures: 'structures/selectliststructures', */
      listtypezones: 'type-zones/listtypezones',
      //listtypesources: 'typesources/listtypesources',
      listsources: 'sources/listsources',
      listregions: 'regions/listregions',
      listdepartements: 'departements/listdepartements',
      listdimensions: 'dimensions/listdimensions',
    })},
    data: () => ({
      loading: false,
      message:null,
      color:null,
      valid: true,
      showFournisseur: false,
      showTypeSource: false,
      showNumAutorisation: false,
      showAccordSiege: false,
      showNumAgrement: false,
      showAdresseStructure: false,
      showRegion: false,
      message:null,
      selectedSource_financements: [],
      selectedType_sources: [],
      selectedRegions: [],
      selectedDepartements: [],
      selectedDimensions: [],
      selectedType_zone_interventions: [],
      model: {
        nom_structure:'',
        numero_autorisation:'',
        accord_siege:'',
        numero_agrement:'',
        adresse_structure:'',
        debut_intervention:'',
        fin_intervention:'',
        telephone_structure:'',
        email_structure:'',
        firstname_responsable:'',
        lastname_responsable:'',
        email_responsable:'',
        telephone_responsable:'',
        fonction_responsable:'',
      },
      rules:{
        nom_structureRules: [
          v => !!v || 'Dénomination est obligatoire'
        ],
        nameRules: [
          v => !!v || 'Champ obligatoire'
        ],
        firstnameRules: [
          v => !!v || 'Champ obligatoire'
        ],
        lastnameRules: [
          v => !!v || 'Champ obligatoire'
        ],
        emailRules: [
          v => !!v || 'l\'E-mail est obligatoire',
          v => /.+@.+\..+/.test(v) || 'E-mail mdoit etre valide',
        ],
        rolesRules: [
          v => (v && !!v.length) || 'Role est obligatoire',
        ],
        telephoneRules: [
          v => !!v || 'Téléphone est obligatoire',
        ],
        country_codeRules: [
          v => !!v || 'L\'indicatif du pays est obligatoire',
        ],
        fournisseur_services_idRules: [
          v => (!!v) || 'Fournisseur est obligatoire',
        ],
        structure_idRules: [
          v => (!!v) || 'Structure est obligatoire',
        ],
        adresseRules: [
          v => !!v || 'Adresse est obligatoire',
          v => (v && v.length <= 100) || 'Adresse doit etre inférieur à 50 caratères',
        ],
        nationalityRules: [
          v => !!v || 'Nationalité est obligatoire',
          v => (v && v.length <= 50) || 'Nationalité doit etre inférieur à 15 caratères',
        ],
        date_of_birthRules: [
          v => !!v || 'Date de naissance est obligatoire',
        ],
        place_of_birthRules: [
          v => !!v || 'Lieu de naissance est obligatoire',
          v => (v && v.length <= 50) || 'Lieu de naissance doit etre inférieur à 20 caratères',
        ],
        /* sexeRules: [
          v => !!v || 'Civilité est obligatoire',
        ], */
        type_identificationRules: [
          v => !!v || 'Type d\'identification est obligatoire',
        ],
        numero_identificationRules: [
          v => !!v || 'Numéro d\'identification est obligatoire'
        ],
        fonctionRules: [
          v => !!v || 'Fonction est obligatoire'
        ]
      },
      date1: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      date2: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      menu1: false,
      menu2: false,
      imageData:null,
    }),
    methods: {
      handleFileUpload(e){
        //Recupère le fichier
        //const input = this.$refs.file
        const files = this.files

        //Recupère l'extension
        let idxDot = files[0]?.name.lastIndexOf(".") + 1;
        let extFile = files[0]?.name.substr(idxDot, files[0].name.length).toLowerCase();
        let size = files[0]?.size/1024/1024 //La taille en Mbit
        console.log('Size-------------- ',size)
        if(files.length!=0){
          if (size <= 5 && (extFile=="jpg" || extFile=="jpeg" || extFile=="png")){
            this.model.accord_siege = files[0];
          }else{
            alert("Seul les images jpg/jpeg png et de taille inférieur à 2Mb sont acceptés!");
          }
        }
      },
      submitForm () {
        this.loading = true

        let validation = this.$refs.form.validate()

        let source_financements = [this.selectedSource_financements?.id]
        let type_sources = [this.selectedType_sources?.id]
        let departements = this.selectedDepartements
        let regions = this.selectedRegions
        let dimensions = this.selectedDimensions
        let type_zone_interventions = [this.selectedType_zone_interventions]
        
        let formData = new FormData();

        formData.append("nom_structure", this.model.nom_structure);
        formData.append("numero_autorisation",this.model.numero_autorisation);
        formData.append("accord_siege",this.model.accord_siege);
        formData.append("numero_agrement",this.model.numero_agrement);
        formData.append("adresse_structure",this.model.adresse_structure);
        formData.append("debut_intervention",this.model.debut_intervention);
        formData.append("fin_intervention",this.model.fin_intervention);
        formData.append("telephone_structure",this.model.telephone_structure);
        formData.append("email_structure",this.model.email_structure);

        formData.append("source_financements",source_financements);
        formData.append("type_sources",type_sources);
        formData.append("departements",departements);
        formData.append("regions",regions);
        formData.append("dimensions",dimensions);
        formData.append("type_zone_interventions",type_zone_interventions);

        formData.append("firstname_responsable",this.model.firstname_responsable)
        formData.append("lastname_responsable",this.model.lastname_responsable)
        formData.append("email_responsable",this.model.email_responsable)
        formData.append("telephone_responsable",this.model.telephone_responsable)
        formData.append("fonction_responsable",this.model.fonction_responsable)

        let data = {
          ...this.model,
          source_financements : source_financements,
          type_sources : type_sources,
          departements : departements,
          regions : regions,
          dimensions : dimensions,
          type_zone_interventions : type_zone_interventions
        }

        console.log('Donées formulaire source financements ++++++: ',data)

        console.log('FormData ++++++ : ',formData)



       validation && this.$msasFileApi.post('/structures',formData)
          .then((res) => {
            console.log('Donées reçus ++++++: ',res)
            this.$store.dispatch('toast/getMessage',{type:'success',text:res.data.message || 'Ajout réussi'})
            this.$router.push('/structures');
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
      async changeRole(role) {

        let checkRole = this.model.roles.filter(item => item.name === 'agent_structure').length;
        if(checkRole==1)
        this.showFournisseur=true
        else
        this.showFournisseur=false
        console.log('************',checkRole)
      },
      async changeSource_financement(source) {
        this.showTypeSource=true
        this.selectedSource_financements = source
        this.selectedType_sources = source.type_sources

        switch(source.libelle_source){
          case 'EPS' : {
            console.log('************',this.showNumAutorisation)
            this.showAdresseStructure=true

            this.showNumAutorisation=false
            this.showNumAgrement=false
            this.showAccordSiege=false
            this.showDebutIntervention=false
            this.showFinIntervention=false
          }
          break;
          case 'SPS' : {
            this.showNumAutorisation=true
            this.showAdresseStructure=true

            this.showNumAgrement=false
            this.showAccordSiege=false
            this.showDebutIntervention=false
            this.showFinIntervention=false
          }
          break;
          case 'PTF' : {
            this.showNumAgrement=true
            this.showAccordSiege=true
            this.showDebutIntervention=true
            this.showFinIntervention=true
            this.showAdresseStructure=true
          }
          break;
          case 'ONG' : {
            this.showNumAgrement=true
            this.showAdresseStructure=true

            this.showNumAutorisation=false
            this.showAccordSiege=false
            this.showDebutIntervention=false
            this.showFinIntervention=false
          }
          break;
          case 'RSE' : {
            this.showAdresseStructure=true

            this.showNumAutorisation=false
            this.showNumAgrement=false
            this.showAccordSiege=false
            this.showDebutIntervention=false
            this.showFinIntervention=false
          }
          break;
          case 'CT' : {
            this.showAdresseStructure=false

            this.showNumAutorisation=false
            this.showNumAgrement=false
            this.showAccordSiege=false
            this.showDebutIntervention=false
            this.showFinIntervention=false
          }
          break;
        }
        /* let checkSource = this.model.source_financements.filter(item => item.libelle_source === 'EPS').length;
        if(checkRole==1){
          this.showTypeSource=true
        }
        else
        this.showTypeSource=false */
        console.log('************',source)
      },
      async changeType_source(type_source) {
        this.selectedType_sources = type_source
        console.log('************',type_source)
      },
      async changeType_zone_intervention(e) {
        console.log('************',e)
        this.selectedType_zone_interventions = e
        switch(e.libelle_zone){
          case 'National' : {
            this.showRegion=false
            this.selectedDepartement = []
            this.selectedRegion = []
          }
          break;
          case 'Régional' : {
            this.showRegion=true
          }
          break;
        }
      },
    },
    metaInfo () {
      return {
        items: this.items,
      }
    }
  }
</script>
